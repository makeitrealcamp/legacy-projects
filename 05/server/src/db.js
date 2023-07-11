const mongoose = require("mongoose")

function connect() {
    const mongoUri = process.env.MONGO_URI
    
    mongoose.connect(process.env.MONGO_URI)
    mongoose.connection.once("open",()=>{
        console.log("connection with mongo OK")
    })
    mongoose.connection.on("error", (err)=>{
        console.log("something wen wrong!", err)
    })
    return mongoose.connection
}
module.exports ={connect}