# AGENTS.md

## Cursor Cloud specific instructions

### Overview

TaskFlow is a RESTful API for task management built with Node.js, Express, TypeScript, Prisma ORM, and MySQL. There is no frontend — it is a backend-only API served on port 3333 under the `/api` prefix.

### MySQL

MySQL 8.0 must be running before starting the application. Start it with:

```bash
sudo mysqld --user=mysql --datadir=/var/lib/mysql &
```

The dev database is `task_flow_db` with user `taskflow` / password `taskflow123`. The Prisma shadow database feature requires the MySQL user to have global `CREATE` privileges (not just on `task_flow_db`).

### Environment Variables

Copy `.env.example` to `.env` and fill in:
- `DATABASE_URL=mysql://taskflow:taskflow123@localhost:3306/task_flow_db`
- `JWT_SECRET=super-secret-jwt-key-for-dev`

### Key Commands

| Action | Command |
|---|---|
| Install deps | `npm install` |
| Lint | `npx eslint .` |
| Build | `npm run build` |
| Dev server (hot-reload) | `npm run start:dev` |
| Run migrations | `npx prisma migrate dev` |
| Prisma Studio (DB GUI) | `npx prisma studio` |

### API Routes

All routes are under `/api`. Public: `POST /api/users` (register), `POST /api/sessions` (login). All other routes require `Authorization: Bearer <jwt>` header. See `src/http/routes.ts` for full list.

### Gotchas

- The register endpoint expects `passwordConfirmation` (not `confirmPassword`).
- Prisma uses `fullTextSearch` and `fullTextIndex` preview features specific to MySQL — do not switch to another database provider.
- There are no automated test files in this codebase. Testing is done via API calls (curl, Postman, etc.).
