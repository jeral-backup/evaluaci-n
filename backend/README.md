# Backend (Express + Sequelize)

Overview

- Express server with session-based authentication.
- Sequelize ORM connected to MySQL/MariaDB via `mysql2`.
- Models: `User`, `Vehicle`, `Maintenance`.
- CRUD endpoints for Vehicles and Maintenances, protected by session.

Setup

1. Copy `.env.example` to `.env` and fill values (DB credentials, SESSION_SECRET).
2. Install dependencies:

```powershell
cd backend; npm install
```

3. Run the server (development):

```powershell
npm run dev
```

Notes

- For MariaDB use same MySQL connection settings; MariaDB is wire-compatible.
- Session store is the default memory store (not for production). Replace with Redis or another store for production.
