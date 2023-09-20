const { Planos, Ramais } = require("../models/model")


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
    try {
        let plans = await Planos.find({})
        res.json(plans)
    }
    catch (error) {
        res.status(500).json({ message: 'Erro ao buscar planos' });
    }
}

async function findPlan(req, res) {
    let plan = await Planos.findOne({ nome: req.query.nome })
    res.json(plan)
}

async function updatePlan(req, res) {
    try {
        let { id, nome, login, password, web, cod, tel, email, att, guia, senha, obs } = req.body
        nome = nome.toLowerCase()
        let autorizado = await Planos.findOneAndUpdate({ _id: id }, {
            nome: nome,
            login: login,
            password: password,
            web: web,
            data: {
                cod: cod,
                tel: tesl,
                email: email,
                att: att,
                guia: guia,
                senha: senha,
                obs: obs,
            }
        },
            {
                new: true
            })
        res.json(autorizado)
    }
    catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar o plano' });
    }
}


module.exports = {
    createPlan,
    getPlans,
    findPlan,
    updatePlan,
}