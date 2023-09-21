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

const Ramais = mongoose.model('ramais', {
    setor: String,
    posto: String,
    ramal: Number,
})

module.exports = {
    Planos,
    Ramais
}