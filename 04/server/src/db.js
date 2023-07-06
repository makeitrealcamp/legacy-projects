const mongoose = require("mongoose")

function connect() {
  const mongoUri = process.env.MONGO_URI
  mongoose.connect(mongoUri)

  mongoose.connection.once("open", () => {
    console.log("✅ Connected to mongo data base!")
  })

  mongoose.connection.on("error", (err) => {
    console.log("❌ No connection to database", err)
  })

  return mongoose.connection
}

module.exports = { connect }
