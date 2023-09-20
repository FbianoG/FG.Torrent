const mongoose = require('mongoose')

const Planos = mongoose.model('planos', {
    nome: {
        type: String,
        unique: true,
    },
    login: String,
    password: String,
    web: String,
    data: {
        cod: String,
        tel: String,
        email: String,
        att: String,
        guia: String,
        senha: String,
        obs: String,
    },
})

module.exports = Planos