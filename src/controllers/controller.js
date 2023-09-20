const Planos = require("../models/model")


async function createPlan(req, res) {
    let { nome, login, password, web, cod, tel, email, att, guia, senha, obs } = req.body
    nome = nome.toLowerCase()
    try {
        await Planos.create({ nome, login, password, web, data: { cod, tel, email, att, guia, senha, obs } })
        console.log('Plano incluido com sucesso');
        res.status(201).redirect('/home.html')
    }
    catch (err) {
        res.status(500).send(err);

    }
}


async function getPlans(req, res) {
    let plans = await Planos.find({})
    res.json(plans)
}

async function findPlan(req, res) {
    const input = req.query.nome
    let plan = await Planos.findOne({ nome: input })
    res.json(plan)
}

async function updatePlan(req, res) {
    let { id, nome, login, password, web, cod, tel, email, att, guia, senha, obs } = req.body
    nome = nome.toLowerCase()

    let atualizado = await Planos.findOneAndUpdate({ _id: id }, {
        nome: nome,
        login: login,
        password: password,
        web: web,
        data: {
            cod: cod,
            tel: tel,
            email: email,
            att: att,
            guia: guia,
            senha: senha,
            obs: obs,
        }
    })
    res.redirect('/home.html')


}


module.exports = {
    createPlan,
    getPlans,
    findPlan,
    updatePlan,
}