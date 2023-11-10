const express = require('express')
const routes = require('./src/routes/router')
const db = require('./src/database/db')
const { config } = require('dotenv')
const app = express()
config()
const port = process.env.PORT

app.use(express.urlencoded({ extended: true }));
app.use(express.static('./src/public'))
app.use(express.json())
app.use(routes)
app.get('/', (req, res) => res.sendFile(__dirname + '/src/public/html/index.html'))

db.connectDataBase()

app.listen(port, () => {
    console.log(`Servidor funcionando na porta:`, port)
})