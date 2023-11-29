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
    id: { type: Number, unique: true },
    setor: { type: String, unique: true },
    ramal: { type: String, unique: true },
    create: Date,
    update: Date,
})

const Docs = mongoose.model('docs', {
    id: { type: Number, unique: true },
    name: { type: String, unique: true },
    src: { type: String, unique: true },
    category: String,
    create: Date,
    update: Date,
})

const User = mongoose.model("user", {
    user: String,
    password: String
})

const Sites = mongoose.model("sites", {
    id: { type: Number, unique: true },
    name: { type: String, unique: true },
    web: { type: String, unique: true },
    src: String,
    create: Date,
    update: Date,

})

module.exports = {
    Planos,
    Docs,
    Ramais,
    Sites,
    User,
}