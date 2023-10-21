const mongoose = require('mongoose')

const Planos = mongoose.model('planos', {
    id: { type: Number, unique: true },
    nome: { type: String, unique: true },
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
    create: Date,
    update: Date,
    active: Boolean,
})

const Ramais = mongoose.model('ramais', {
    setor: String,
    posto: String,
    ramal: { type: String, unique: true },
})

module.exports = {
    Planos,
    Ramais
}