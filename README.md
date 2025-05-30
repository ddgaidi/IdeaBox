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
- [SvelteKit](https://kit.svelte.dev/) — Framework fullstack moderne pour construire des applications web performantes.
- [Svelte](https://svelte.dev/) — Compilateur qui transforme vos composants en JavaScript impératif et optimisé.
- [Vite](https://vitejs.dev/) — Outil de build frontend offrant un démarrage de serveur de développement instantané et une compilation optimisée pour la production.
- [TailwindCSS](https://tailwindcss.com/) — Framework CSS axé sur les utilitaires pour un prototypage et un design rapides.
- [TypeScript](https://www.typescriptlang.org/) — Sur-ensemble de JavaScript qui ajoute le typage statique optionnel.

### Backend
- [SvelteKit](https://kit.svelte.dev/) — Utilisé pour la gestion des points d'API et la logique côté serveur.
- [Node.js](https://nodejs.org/) — Environnement d'exécution JavaScript côté serveur sur lequel SvelteKit s'exécute.
- [Prisma](https://www.prisma.io/) — ORM (Object-Relational Mapper) de nouvelle génération pour Node.js et TypeScript, facilitant les interactions avec la base de données.
- [PostgreSQL](https://www.postgresql.org/) — Système de gestion de base de données relationnelle objet puissant et open source (tel que défini dans votre `schema.prisma`).
- [TypeScript](https://www.typescriptlang.org/) — Pour un code backend robuste, maintenable et typé.

---

By DML