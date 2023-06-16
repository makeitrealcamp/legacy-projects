require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const { connectDB } = require('./database')
const { routesConfig } = require('./routes.config')
const http = require('http')
const { Server } = require('socket.io')

const SokectServer = Server
const app = express()
const server = http.createServer(app)

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

const io = new SokectServer(server, {
  cors: {
    origin: ['http://localhost:3000', 'https://sillevon.vercel.app'],
    credentials: true,
  },
})

global.onlineUsers = new Map()

io.on('connection', (socket) => {
  console.log('A user has connected')
  global.chatSocket = socket
  socket.on('add-user', (userId) => {
    onlineUsers.set(userId, socket.id)
  })
  socket.on('send-message', (data) => {
    const sendUserSocket = onlineUsers.get(data.to)
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit('message-recieve', data.body)
    }
  })
})

connectDB()
routesConfig(app)

module.exports = server
