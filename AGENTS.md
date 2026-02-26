# AGENTS.md

## Cursor Cloud specific instructions

### Overview

TaskFlow API is a Node.js/Express backend-only REST API for task management with JWT auth, Prisma ORM, and MySQL. See `README.md` for full description and API routes.

### Services

| Service | How to run |
|---------|-----------|
| **MySQL** | `sudo service mysql start` — must be running before the API. DB name: `task_flow_db`, user: `taskflow`, password: `taskflow123`. |
| **API (dev)** | `npm run start:dev` — runs on port 3333 with tsx watch (hot reload). |

### Key caveats

- **MySQL must be started manually** before running the API: `sudo service mysql start`. It does not auto-start in the cloud VM.
- The `.env` file must exist with `DATABASE_URL`, `JWT_SECRET`, `NODE_ENV`, and `PORT`. Copy from `.env.example` if missing.
- Prisma migrations: run `npx prisma migrate dev` after schema changes. For existing migrations use `npx prisma migrate deploy`.
- The Prisma shadow database requires the MySQL user to have global `CREATE` privileges (`GRANT ALL ON *.* TO 'taskflow'@'localhost'`).
- The API has no global error-handling middleware — unhandled errors (e.g. Zod validation failures with wrong field names) crash the server. The `tsx watch` process auto-restarts on code changes but **not** on runtime crashes.
- **Registration endpoint** field names: `name`, `email`, `password`, `passwordConfirmation` (camelCase, not snake_case).

### Standard commands

- **Lint**: `npx eslint .`
- **Build**: `npm run build`
- **Dev**: `npm run start:dev` (port 3333)
- **Prisma Studio**: `npx prisma studio`
