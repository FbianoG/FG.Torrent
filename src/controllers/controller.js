const { Planos, Ramais } = require("../models/model")




// Funções

async function createId(e) { // Function para crianção de um ID presonalizado
    for (let i = 1; i < 9999; i++) {
        try {
            let findId = await e.findOne({ id: i })
            if (!findId) {
                return i
            }
        } catch (error) {
            console.error({ menssage: "Um erro foi encontrado: ", error })
        }
    }
}

function newDate() { // Função para criar uma nova data
    let Data = new Date()
    let day = Data.getDate()
    let months = Data.getMonth() + 1
    let year = Data.getFullYear()
    return `${day}/${months}/${year}`
}




// Controllers

async function createPlan(req, res) { // Cria plano de saúde 
    let id = await createId(Planos)
    let create = new Date()
    let update = create
    let active = false
    let { nome, login, password } = req.body
    nome = nome.toLowerCase()
    if (!nome) {
        return console.log("É necessário preencher o 'nome'!");
    }
    try {
        await Planos.create({ id, create, active, nome, login, password, update, web: "", data: { cod: "", tel: "", email: "", att: "", guia: "", senha: "", obs: "" } })
        console.log('Plano incluido com sucesso');
        res.status(201).redirect('/config.html')
    }
    catch (error) {
        res.status(500).send(error);
    }
}

async function createRamal(req, res) { // Cria ramal
    let id = await createId(Ramais)
    try {
        let { setor, ramal } = req.body
        let create = new Date()
        let update = create
        if (setor && ramal) {
            setor = setor.toLowerCase()
            const createRamal = await Ramais.create({
                id,
                setor,
                ramal,
                create,
                update,
            })
            console.log('Ramal criado com sucesso!');
            res.status(201).redirect('/config.html')
        } else {
            console.log('Preencha todos os campos!');
        }
    } catch (error) {
        console.log({ message: error });
        res.status(500).json({ message: error })
    }
}

async function getRamais(req, res) { // Busca todos os "Ramais" mo DataBase
    try {
        let ramais = await Ramais.find({})
        res.json(ramais)
    }
    catch (error) {
        res.status(500).json({ message: 'Erro ao buscar ramais' });
    }
}

async function getPlans(req, res) {  // Busca todos os "planos" mo DataBase
    try {
        let plans = await Planos.find({})
        res.json(plans)
    }
    catch (error) {
        res.status(500).json({ message: 'Erro ao buscar planos' });
    }
}

async function getData(req, res) { // Busaca todos os "Planos", "Ramais" para configuração
    let inf = req.query.inf
    if (inf == "Planos") {
        const getData = await Planos.find({})
        res.json(getData)
    } else if (inf == "Ramais") {
        const getData = await Ramais.find({})
        res.json(getData)
    }
}

async function updatePlan(req, res) {  // Atualiza "Planos" no DataBase
    try {
        let activeStatus = req.body.active
        if (activeStatus == "0") {
            activeStatus = false
        } else {
            activeStatus = true
        }
        let update = new Date()
        let { id, nome, login, password, web, cod, tel, email, att, guia, senha, obs } = req.body
        nome = nome.toLowerCase()
        let PlanUpdate = await Planos.findOneAndUpdate({ id: id }, {
            nome,
            login,
            password,
            web,
            data: {
                cod,
                tel,
                email,
                att,
                guia,
                senha,
                obs,
            },
            update,
            active: activeStatus,
        }, { new: true })
        console.log({ message: "O plano foi ataualizado com sucesso:", PlanUpdate })
        res.status(204).redirect('/config.html')
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Erro ao atualizar o plano' });
    }
}

async function updateBranche(req, res) { // Atualiza "Ramais" no DataBase

    try {
        let { id, setor, ramal } = req.body
        let update = new Date()
        setor = setor.toLowerCase()
        let brancheUpdate = await Ramais.findOneAndUpdate({ id: id }, {
            setor,
            ramal,
            update,
        }, { new: true })
        console.log(brancheUpdate);
        res.status(201).redirect("/config.html")
    }
    catch (error) {
        res.status(500).json({ message: "Erro ao atualizar os dados! ", error })
    }
}




module.exports = {
    createPlan,
    createRamal,
    getPlans,
    updatePlan,
    getRamais,
    getData,
    updateBranche
}