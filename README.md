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
