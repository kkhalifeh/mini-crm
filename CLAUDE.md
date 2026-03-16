# Mini CRM

## Stack

- **Frontend:** React + Vite (JavaScript), located in `/frontend`
- **Backend:** Node.js + Express, located in `/backend`
- **Database:** PostgreSQL, connected via `pg` driver

## Project Structure

```
mini-crm/
├── frontend/          # Vite React app
│   └── src/
├── backend/
│   ├── src/
│   │   ├── index.js       # Express entry point
│   │   ├── routes/        # Express route modules
│   │   └── db/
│   │       ├── migrate.js     # Migration runner
│   │       └── migrations/    # Plain SQL migration files (###_name.sql)
│   └── .env.example
├── .github/workflows/ci.yml
└── CLAUDE.md
```

## Conventions

- Backend uses CommonJS (`require`/`module.exports`)
- Migrations are plain SQL files, numbered sequentially (e.g., `001_create_contacts.sql`)
- Run migrations with `npm run migrate` from `/backend`
- Backend dev server: `npm run dev` (uses nodemon)
- Frontend dev server: `npm run dev` from `/frontend`
- API routes are mounted under `/api` prefix
- Environment variables go in `.env` (never committed); see `.env.example` for required vars

## Commands

| Task | Directory | Command |
|------|-----------|---------|
| Start frontend dev | `/frontend` | `npm run dev` |
| Start backend dev | `/backend` | `npm run dev` |
| Run migrations | `/backend` | `npm run migrate` |
| Build frontend | `/frontend` | `npm run build` |
| Lint frontend | `/frontend` | `npm run lint` |
