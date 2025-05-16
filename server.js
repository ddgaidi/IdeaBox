import dotenv from "dotenv";
dotenv.config();

import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sqlite3 from "sqlite3";
import { createServer } from "http";
import { Server as SocketIOServer } from "socket.io";

const app = express();
const server = createServer(app);
const io = new SocketIOServer(server, { cors: { origin: "*" } });

const SECRET_KEY = process.env.SECRET_KEY || "votre_secret_jwt"; // Clé secrète pour JWT
const DB_FILE = "./db.sqlite";

// Middleware globaux
app.use(cors());
app.use(bodyParser.json());

// Connexion SQLite
const db = new sqlite3.Database(DB_FILE, (err) => {
  if (err) {
    console.error("Erreur lors de la connexion à SQLite :", err.message);
  } else {
    console.log("Base de données SQLite connectée.");
  }
});

// Création des tables (ajout des colonnes upvotes/downvotes si elles n'existent pas)
db.serialize(() => {
  // Table des utilisateurs
  db.run(
    `CREATE TABLE IF NOT EXISTS users (
                                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                                        pseudonyme TEXT UNIQUE,
                                        email TEXT UNIQUE,
                                        password TEXT
     )`
  );

  // Table des suggestions
  db.run(
    `CREATE TABLE IF NOT EXISTS suggestions (
                                              id INTEGER PRIMARY KEY AUTOINCREMENT,
                                              pseudonyme TEXT,
                                              content TEXT,
                                              date TEXT,
                                              upvotes INTEGER DEFAULT 0,
                                              downvotes INTEGER DEFAULT 0
     )`
  );
});

// Middleware pour valider le token JWT
const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).send("Accès refusé. Aucun token fourni.");
  }

  try {
    const bearerToken = token.split(" ")[1]; // Supprime "Bearer " du token
    jwt.verify(bearerToken, SECRET_KEY, (err, user) => {
      if (err) return res.status(403).send("Token invalide.");
      req.user = user; // Stocke les données du token dans la requête
      next();
    });
  } catch (err) {
    return res.status(403).send("Token invalide.");
  }
};

// Route pour poster une suggestion
app.post("/post-suggestion", authenticateToken, (req, res) => {
  const { content } = req.body;
  const pseudonyme = req.user.pseudonyme;

  if (!content) {
    return res.status(400).send("Le contenu de la suggestion est vide.");
  }

  const date = new Date().toISOString();
  db.run(
    `INSERT INTO suggestions (pseudonyme, content, date, upvotes, downvotes) VALUES (?, ?, ?, 0, 0)`,
    [pseudonyme, content, date],
    (err) => {
      if (err) {
        console.error("Erreur lors de la création de la suggestion :", err.message);
        return res.status(500).send("Erreur serveur.");
      }
      res.status(201).send("Suggestion créée avec succès !");
    }
  );
});

// Route pour obtenir toutes les suggestions avec pagination
app.get("/suggestions", (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 15;
  const offset = (page - 1) * limit;

  db.get(`SELECT COUNT(*) AS total FROM suggestions`, (err, countResult) => {
    if (err) {
      return res.status(500).send("Erreur lors du chargement des suggestions.");
    }

    const total = countResult.total;

    db.all(
      `SELECT id, pseudonyme, content, date, upvotes, downvotes
            FROM suggestions
            ORDER BY upvotes DESC, downvotes ASC
            LIMIT ? OFFSET ?`,
      [limit, offset],
      (err, rows) => {
        if (err) {
          return res.status(500).send("Erreur lors du chargement des suggestions.");
        }

        res.status(200).json({ suggestions: rows, total });
      }
    );
  });
});

// Route pour mettre à jour les votes (upvote/downvote)
app.post("/vote", authenticateToken, (req, res) => {
  const { suggestionId, type } = req.body;
  const userId = req.user.id; // Extraire l'ID utilisateur du token
  const validTypes = ["upvote", "downvote"];

  if (!suggestionId || !type || !validTypes.includes(type)) {
    return res.status(400).send("Requête invalide.");
  }

  db.get(
    `SELECT * FROM votes WHERE suggestionId = ? AND userId = ?`,
    [suggestionId, userId],
    (err, existingVote) => {
      if (err) {
        console.error("Erreur lors de la vérification du vote :", err.message);
        return res.status(500).send("Erreur serveur.");
      }

      // Si l'utilisateur a déjà voté sur cette suggestion
      if (existingVote) {
        // Si le vote est du même type, on retire ce vote
        if (existingVote.type === type) {
          db.run(
            `DELETE FROM votes WHERE id = ?`,
            [existingVote.id],
            (err) => {
              if (err) {
                console.error("Erreur lors de la suppression du vote :", err.message);
                return res.status(500).send("Erreur lors de la suppression du vote.");
              }

              // Mise à jour du compteur dans la table suggestions
              const column = type === "upvote" ? "upvotes" : "downvotes";
              db.run(
                `UPDATE suggestions SET ${column} = ${column} - 1 WHERE id = ?`,
                [suggestionId],
                (err) => {
                  if (err) {
                    console.error("Erreur lors de la mise à jour des votes :", err.message);
                    return res.status(500).send("Erreur serveur.");
                  }
                  res.status(200).send(`Vote retiré (${type}) pour la suggestion ${suggestionId}.`);
                }
              );
            }
          );
        } else {
          // Si le vote est d'un type différent, on le bascule
          const oldColumn = existingVote.type === "upvote" ? "upvotes" : "downvotes";
          const newColumn = type === "upvote" ? "upvotes" : "downvotes";

          db.run(
            `UPDATE votes SET type = ? WHERE id = ?`,
            [type, existingVote.id],
            (err) => {
              if (err) {
                console.error("Erreur lors de la mise à jour du vote :", err.message);
                return res.status(500).send("Erreur serveur.");
              }

              // Mettre à jour les compteurs (retrait et ajout)
              db.run(
                `UPDATE suggestions
                                SET ${oldColumn} = ${oldColumn} - 1, ${newColumn} = ${newColumn} + 1
                                WHERE id = ?`,
                [suggestionId],
                (err) => {
                  if (err) {
                    console.error("Erreur lors de la mise à jour des votes :", err.message);
                    return res.status(500).send("Erreur serveur.");
                  }
                  res.status(200).send(`Vote mis à jour pour la suggestion ${suggestionId}.`);
                }
              );
            }
          );
        }
      } else {
        // Si l'utilisateur n'a pas encore voté pour cette suggestion
        db.run(
          `INSERT INTO votes (suggestionId, userId, type) VALUES (?, ?, ?)`,
          [suggestionId, userId, type],
          (err) => {
            if (err) {
              console.error("Erreur lors de l'ajout du vote :", err.message);
              return res.status(500).send("Erreur serveur.");
            }

            // Mettre à jour le compteur dans la table suggestions
            const column = type === "upvote" ? "upvotes" : "downvotes";
            db.run(
              `UPDATE suggestions SET ${column} = ${column} + 1 WHERE id = ?`,
              [suggestionId],
              (err) => {
                if (err) {
                  console.error("Erreur lors de la mise à jour des votes :", err.message);
                  return res.status(500).send("Erreur serveur.");
                }
                res.status(200).send(`Vote enregistré (${type}) pour la suggestion ${suggestionId}.`);
              }
            );
          }
        );
      }
    }
  );
});

// Route pour s'inscrire
app.post("/register", async (req, res) => {
  const { pseudonyme, email, password } = req.body;

  if (!pseudonyme || !email || !password) {
    return res.status(400).send("Tous les champs sont obligatoires.");
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    db.run(
      `INSERT INTO users (pseudonyme, email, password) VALUES (?, ?, ?)`,
      [pseudonyme, email, hashedPassword],
      (err) => {
        if (err) {
          console.error("Erreur lors de l'inscription :", err.message);
          return res.status(500).send("Erreur lors de l'inscription.");
        }
        res.status(201).send("Utilisateur enregistré avec succès.");
      }
    );
  } catch (err) {
    console.error("Erreur lors de l'inscription :", err.message);
    res.status(500).send("Erreur serveur.");
  }
});

// Route pour se connecter
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send("Email et mot de passe requis.");
  }

  db.get(
    `SELECT * FROM users WHERE email = ?`,
    [email],
    async (err, user) => {
      if (err || !user) {
        return res.status(401).send("Utilisateur introuvable.");
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).send("Mot de passe incorrect.");
      }

      const token = jwt.sign({ id: user.id, pseudonyme: user.pseudonyme }, SECRET_KEY, {
        expiresIn: "1h",
      });
      res.status(200).json({ token });
    }
  );
});

// Lancement du serveur
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});