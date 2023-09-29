const mongoose = require('mongoose')
const { config } = require('dotenv')

async function connectDataBase() {
    try {
        config()
        let user = process.env.MONGODB_USERNAME
        let password = process.env.MONGODB_PASSWORD
        await mongoose.connect(`mongodb+srv://${user}:${password}@cluster0.p2xagpb.mongodb.net/?retryWrites=true&w=majority`)
        console.log('DataBase conectado');
    } catch (error) {
        console.error({ message: error })
    }
}

module.exports = { connectDataBase }
