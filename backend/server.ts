import 'dotenv/config'
import { createServer } from 'node:http'
import express from 'express'
import cors from 'cors'
import { Server } from 'socket.io'
import type { ClientMessage } from '../shared/gameProtocol'
import { RoomManager, type RoomEvent } from './game/roomManager'

const app = express()
const httpServer = createServer(app)
const port = Number(process.env.PORT || 3001)
const allowedOrigins = (process.env.FRONTEND_ORIGIN || '*')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean)
const corsOrigin = allowedOrigins.includes('*') ? '*' : allowedOrigins
const httpCorsOrigin = (origin: string | undefined, callback: (error: Error | null, value?: boolean) => void) => {
  if (!origin || allowedOrigins.includes('*') || allowedOrigins.includes(origin)) {
    callback(null, true)
    return
  }
  callback(new Error('CORS origin is not allowed'))
}

app.use(cors({ origin: httpCorsOrigin }))
app.get('/', (_req, res) => {
  res.json({
    service: 'party-platform-server',
    status: 'ok',
    websocket: true,
  })
})
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'party-platform-server', timestamp: new Date().toISOString() })
})

const io = new Server(httpServer, {
  cors: {
    origin: corsOrigin,
    methods: ['GET', 'POST'],
  },
  transports: ['websocket', 'polling'],
})

const roomManager = new RoomManager((event: RoomEvent) => {
  if (event.type === 'error') {
    io.sockets.sockets.get(event.socketId)?.emit('server_message', event)
    return
  }
  if (event.type === 'kicked') {
    const target = io.sockets.sockets.get(event.socketId)
    target?.leave(`room:${event.roomId}`)
    target?.emit('server_message', { type: 'kicked', message: event.message })
    return
  }
  const room = io.sockets.adapter.rooms.get(`room:${event.roomId}`)
  if (!room) return
  for (const socketId of room) {
    io.sockets.sockets.get(socketId)?.emit('server_message', event)
  }
})

io.on('connection', (socket) => {
  socket.on('client_message', (message: ClientMessage) => {
    if (!message || typeof message.type !== 'string') {
      socket.emit('server_message', { type: 'error', code: 'INVALID_MESSAGE', message: '消息格式无效' })
      return
    }
    const session = roomManager.handle(socket.id, message)
    if (!session) return
    socket.data.playerId = session.playerId
    socket.data.roomId = session.roomId
    socket.join(`room:${session.roomId}`)
    socket.emit('server_message', { type: 'session', ...session })
    roomManager.sync(socket.id)
  })

  socket.on('disconnect', () => {
    roomManager.disconnect(socket.id)
  })
})

const FIXED_STEP_SECONDS = 0.017
const FIXED_STEP_MS = FIXED_STEP_SECONDS * 1000
const MAX_FIXED_UPDATES = 3
const IGNORE_PHYSICS_UPDATE_MS = 100
let lastFixedUpdateAt = Date.now()
setInterval(() => {
  const now = Date.now()
  const elapsed = now - lastFixedUpdateAt

  // The APK advances the controller in 17ms fixed slices. Keep the remainder
  // in the accumulator, cap catch-up work, and discard a stalled frame after
  // the configured 100ms threshold.
  if (elapsed >= IGNORE_PHYSICS_UPDATE_MS) {
    lastFixedUpdateAt = now
    return
  }

  const updates = Math.min(MAX_FIXED_UPDATES, Math.floor(elapsed / FIXED_STEP_MS))
  for (let index = 0; index < updates; index += 1) {
    roomManager.tick(FIXED_STEP_SECONDS)
    lastFixedUpdateAt += FIXED_STEP_MS
  }
}, FIXED_STEP_MS)

httpServer.listen(port, '0.0.0.0', () => {
  console.log(`[party-platform-server] listening on ${port}`)
})
