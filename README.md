# HRG Heroes Backend (with auth)

This project now includes simple JWT authentication endpoints.

Environment:
- `MONGO_URI` - MongoDB connection string (optional)
- `JWT_SECRET` - secret used to sign JWTs (default: `change_this_secret`)
- `JWT_EXPIRES_IN` - token expiry (default: `7d`)

Endpoints:
- `POST /api/auth/signup`  - body: `{ name, email, password }` -> returns `{ token, user }`
- `POST /api/auth/login`   - body: `{ email, password }` -> returns `{ token, user }`

Protected routes:
All other API routes under `/api` (e.g. `/api/players`, `/api/teams`, `/api/matches`) require an `Authorization: Bearer <token>` header.

Install:
```bash
cd hrg-heroes-backend
npm install
```

Run:
```bash
npm run dev
```

If you encounter permissions errors while installing, ensure you own the project files, for example:
```bash
sudo chown -R $(whoami) /Users/shreyasdhanakshirur/Desktop/hobby/HRG-heroes/hrg-heroes-backend
npm install
```
# HRG Heroes - Backend

Simple Node/Express/Mongo backend storing ball-by-ball data as single source of truth.

Quick start:

1. Copy `.env.example` to `.env` and adjust `MONGO_URI`.
2. Install deps: `npm install`
3. Start in dev: `npm run dev`

APIs:
- `POST /api/players` create player
- `POST /api/teams` create team
- `POST /api/matches` create match
- `POST /api/matches/:matchId/deliveries` record delivery (ball)
- `GET /api/matches/:matchId/summary` compute match stats from balls
