const { Planos, Ramais } = require("../models/model")


async function createPlan(req, res) {
    let { nome, login, password, web, cod, tel, email, att, guia, senha, obs } = req.body
    nome = nome.toLowerCase()
    try {
        await Planos.create({ nome, login, password, web, data: { cod, tel, email, att, guia, senha, obs } })
        console.log('Plano incluido com sucesso');
        res.status(201).redirect('/config.html')
    }
    catch (error) {
        res.status(500).send(error);
    }
}

async function createRamal(req, res) {
    try {
        let { setor, posto, ramal } = req.body
        if (setor && posto && ramal) {
            setor = setor.toLowerCase()
            posto = posto.toLowerCase()
            const createRamal = await Ramais.create({
                setor: setor,
                posto: posto,
                ramal: ramal
            })
            console.log('Ramal incluido com sucesso');
            res.status(201).redirect('/home.html')
        } else {
            console.log('Os campos não foram preenchidos');
        }
    } catch (error) {
        res.status(500).send({ message: error })
    }
}

async function getRamais(req, res) {
    try {
        let ramais = await Ramais.find({})
        res.json(ramais)
    } 
    catch (error) {
        res.status(500).json({ message: 'Erro ao buscar ramais' });
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
                tel: tel,
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
        res.json({message: "O plano foi ataualizado com sucesso:", autorizado})
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Erro ao atualizar o plano' });
    }
}



module.exports = {
    createPlan,
    createRamal,
    getPlans,
    findPlan,
    updatePlan,
    getRamais,
}