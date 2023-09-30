const mongoose = require('mongoose')
const { config } = require('dotenv')

async function connectDataBase() {
    try {
        config()
        let url = process.env.MONGODB_URL
        await mongoose.connect(url)
        console.log('DataBase conectado');
    } catch (error) {
        console.error({ message: error })
    }
}

module.exports = { connectDataBase }
