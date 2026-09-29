# Jump Partners frontend

Next.js client for the 2-4 player online side-scrolling party platform game.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

Set `NEXT_PUBLIC_GAME_SERVER_URL` to point at the Socket.IO game server. When it is
not set, the client uses `http://localhost:3001`.

## Stack

- Next.js 14 App Router
- React and TypeScript
- Phaser 3 Canvas rendering
- Socket.IO client

The root route contains room creation, room joining, lobby, ready-up, gameplay,
round results, and next-round flow.
