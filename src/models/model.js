const mongoose = require('mongoose')

const Planos = mongoose.model('planos', {
    id: { type: Number, unique: true, required: true },
    nome: { type: String, unique: true, required: true },
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
    id: {type: Number, unique: true},
    setor: { type: String, unique: true },
    ramal: { type: String, unique: true },
    create: Date,
    update: Date,
})

module.exports = {
    Planos,
    Ramais
}