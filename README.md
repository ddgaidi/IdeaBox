# 💡 IdeaBox

**IdeaBox** est une plateforme communautaire de suggestions où les utilisateurs peuvent proposer des idées, voter pour ou contre celles des autres, et voir le tout se mettre à jour en temps réel.

---

## 🚀 Fonctionnalités

- 🔐 **Connexion / Inscription** des utilisateurs
- 🧠 **Ajout d'idées** par tous les membres connectés
- 👍👎 **Votes pour et contre** sur chaque suggestion
- 🕒 **Mise à jour en temps réel** via WebSocket (Socket.IO)
- 🔍 **Filtrage dynamique** par popularité ou date *(fonctionnalité bonus)*

---

## 🛠️ Technologies utilisées

### Frontend
- [SvelteKit](https://kit.svelte.dev/) — Framework moderne fullstack
- [TailwindCSS](https://tailwindcss.com/) — Utilitaires CSS rapides et responsives
- TypeScript

### Backend
- [Express.js](https://expressjs.com/) — Serveur web Node.js léger
- [Socket.IO](https://socket.io/) — Temps réel pour la synchronisation des votes et suggestions
- [SQLite](https://sqlite.org/) — Base de données légère et embarquée
- [CORS](https://www.npmjs.com/package/cors), [body-parser](https://www.npmjs.com/package/body-parser)

---

## 📦 Installation

### 1. Cloner le projet

```bash
git clone https://github.com/ddgaidi/ideabox.git
cd ideabox
```

By DML