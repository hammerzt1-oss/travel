# Jump Partners game server

Authoritative Node.js + TypeScript + Express + Socket.IO server for the
2-4 player online side-scrolling party platform game.

## Run locally

```bash
npm install
npm run dev
```

Production build and start:

```bash
npm run build
npm start
```

The server listens on `http://localhost:3001` by default and exposes `/health`.

## Game service

- In-memory rooms with a 2-4 player limit;
- 30Hz authoritative simulation and approximately 20Hz state broadcast;
- clients submit input only; the server calculates movement, collisions, deaths,
  finish state, and score;
- 30-second reconnect window after disconnect;
- rooms disappear when the process restarts; no database is used in Phase 1.

Optional environment variables:

- `PORT`: listening port, default `3001`;
- `FRONTEND_ORIGIN`: Socket.IO CORS origin, default `*`.
