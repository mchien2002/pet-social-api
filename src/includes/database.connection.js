const mongoose = require("mongoose")
const dotenv = require("dotenv").config()

const databaseConnection = module.exports = async () => {
    const MONGO_USERNAME = process.env.MONGO_USERNAME
    const MONGO_PASSWORD = process.env.MONGO_PASSWORD
    const MONGO_DATABASE = process.env.MONGO_DATABASE
    var mongoUrl = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0.38af9pz.mongodb.net/`
    try {
        mongoose.connect(mongoUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            dbName: MONGO_DATABASE
        }, () => {
            console.log("CONNECTED MONGODB")
        })
    } catch (error) {
        this.callonsole.log(`Error connecting to MongoDB: ${error}`)
    }
}