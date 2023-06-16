const mongoose = require('mongoose')

const mongoUri = process.env.MONGODB_URI

const optionsConnection = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}

let connection
async function connectDB() {
  if (connection) return
  connection = mongoose.connection
  connection.once('open', () => {
    console.log('Connection with mongo OK')
  })
  connection.on('disconnected', () => {
    console.log('Disconnected successfull')
  })
  connection.on('error', (error) => {
    console.log('Something went wrong!', error)
  })
  await mongoose.connect(mongoUri, optionsConnection)
}

async function disconnectedDB() {
  if (!connection) return

  await mongoose.disconnect()
}

async function cleanupDB() {
  for (const collection in connection.collections) {
    await connection.collections[collection].deleteMany({})
  }
}

module.exports = { connectDB, disconnectedDB, cleanupDB }
