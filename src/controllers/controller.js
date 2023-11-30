const { Planos, Docs, Ramais, Sites, User } = require("../models/model")
const path = require('path')
const mid = require('./middlewares')
const fs = require('fs');



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

async function login(req, res) { // Validação de usuário e senha ao acessar a Aplicação
    let { user, password } = req.body
    let UserFind = await User.findOne({ user, password }, "-password")
    if (!UserFind) {
        return res.status(404).json({ message: "Usuário ou senha incorretos!" })
    }
    const token = await mid.createToken(UserFind._id)
    res.status(200).redirect(`/planos?id=${token}`)
}




// Criar 

async function createPlan(req, res) { // Cria Plano 
    const token = req.query.id
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
        res.status(201).redirect(`/config?id=${token}`)
    }
    catch (error) {
        res.status(500).send(error);
    }
}

async function createDocs(req, res) { // Cria Documento
    try {
        const token = req.query.id
        const id = await createId(Docs)
        let { name, category } = req.body
        const file = req.file
        if (!file || !name || !category || !id) {
            // por causa do "Multer" o file é salvo na pasta antes, 
            const filePath = path.join(__dirname, `../public/pdf/${file.filename}`) // localizar arquivo na pasta
            fs.unlinkSync(filePath) // Excluir arquivo da pasta
            return res.status(222).json({ message: "Todos os campos são obrigatórios!" })
        }
        name = name.toLowerCase()
        let create = new Date()
        let update = create
        const createDocs = await Docs.create({ id, name, src: file.filename, category, create, update })
        res.status(201).redirect(`/config?id=${token}`)
    } catch (error) {
        console.log({ status: 500, message: "Ocorreu algum erro!", error })
        res.status(500).json({ status: 500, message: "Ocorreu algum erro!", error })
    }
}

async function createRamal(req, res) { // Cria ramal
    const token = req.query.id
    try {
        let id = await createId(Ramais)
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
            res.status(201).redirect(`/config?id=${token}`)
        } else {
            console.log('Preencha todos os campos!');
        }
    } catch (error) {
        console.log({ message: error });
        res.status(500).json({ message: error })
    }
}

async function createSites(req, res) { // Cria ramal
    const token = req.query.id
    try {
        let id = await createId(Sites)
        let { name, web, src } = req.body
        let create = new Date()
        let update = create
        if (name && web) {
            name = name.toLowerCase()
            const createRamal = await Sites.create({
                id,
                name,
                web,
                src,
                update,
                create,
            })
            console.log('Site criado com sucesso!');
            res.status(201).redirect(`/config?id=${token}`)
        } else {
            console.log('Preencha todos os campos!', name);
        }
    } catch (error) {
        console.log({ message: error });
        res.status(500).json({ message: error })
    }
}




// Buscar

async function getBranches(req, res) { // Busca todos os "Ramais" no DataBase
    try {
        let ramais = await Ramais.find({})
        // console.log(req.headers.Authorization)
        // console.log(req.userId)
        res.json(ramais)
    }
    catch (error) {
        res.status(500).json({ message: 'Erro ao buscar ramais' });
    }
}

async function getDocs(req, res) { // Busca todos os "Documentos" no DataBase
    try {
        let docs = await Docs.find({})
        // console.log(req.headers.Authorization)
        // console.log(req.userId)
        res.json(docs)
    }
    catch (error) {
        res.status(500).json({ message: 'Erro ao buscar ramais' });
    }
}

async function getPlans(req, res) {  // Busca todos os "planos" no DataBase
    try {
        let plans = await Planos.find({})
        res.json(plans)
    }
    catch (error) {
        res.status(500).json({ message: 'Erro ao buscar planos' });
    }
}

async function getSites(req, res) {  // Busca todos os "Sites" no DataBase
    try {
        let sites = await Sites.find({})
        res.json(sites)
    }
    catch (error) {
        res.status(500).json({ message: 'Erro ao buscar Sites' });
    }
}



// Updates

async function updatePlan(req, res) {  // Atualiza "Planos" no DataBase
    try {
        const token = req.query.id
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
        })
        res.status(204).redirect(`/config?id=${token}`)
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Ocorreu algum erro ao atualizar o plano!' });
    }
}

async function updateDocs(req, res) { // Atualiza "Documento" no DataBase
    try {
        const token = req.query.id
        let { id, name, category } = req.body
        if (!id || !name || !category) {
            return res.status(400).json({ menssage: "Preencha todos os campos do 'Formulário de Atualização'" })
        }
        name = name.toLowerCase()
        const update = new Date()
        const file = req.file
        const originalDoc = await Docs.findOne({ id }) // localizar o documento no DataBase
        const lastSrc = originalDoc.src // Extrair nome do pdf salvo no "Documento"
        if (file) {
            // excluir pdf  usando "FS"
            const filePath = path.join(__dirname, `../public/pdf/${lastSrc}`) // localizar arquivo na pasta
            try {
                fs.unlinkSync(filePath) // Excluir arquivo da pasta
                console.log(`Arquivo anterior (${lastSrc}) excluído com sucesso.`)
            } catch (prosseguir) { }
            const updateDocs = await Docs.findOneAndUpdate({ id }, { id, name, category, src: file.filename, update })
            return res.status(204).redirect(`/config?id=${token}`)
        } else {
            let updateDocs = await Docs.findOneAndUpdate({ id }, { id, name, category, update })
            return res.status(204).redirect(`/config?id=${token}`)
        }
    } catch (error) {
        return res.status(500).json({ message: "Ocorreu algum erro!" });
    }
}

async function updateBranche(req, res) { // Atualiza "Ramais" no DataBase

    try {
        const token = req.query.id
        let { id, setor, ramal } = req.body
        let update = new Date()
        setor = setor.toLowerCase()
        let brancheUpdate = await Ramais.findOneAndUpdate({ id: id }, { setor, ramal, update, })
        res.status(201).redirect(`/config?id=${token}`)
    }
    catch (error) {
        res.status(500).json({ message: "Erro ao atualizar os dados! ", error })
    }
}

async function updateSite(req, res) { // Atualiza "Sites" no DataBase
    try {
        const token = req.query.id
        let { id, name, src, web } = req.body
        if (name == '' || web == '' || !name || !web) {
            return res.status(401).json({ message: "'Nome' e 'URL do Site' devem estar preenchidos!" })
        }
        name = name.toLowerCase()
        const updadeSite = await Sites.findOneAndUpdate({ id }, { name, web, src })
        return res.status(204).redirect(`/config?id=${token}`)
    } catch (error) {
        return res.status(500).json({ message: "Ocorreu algum erro!", error })
    }
}



//Acessar html
async function planos(req, res) {
    res.status(200).sendFile(path.join(__dirname, "../public/html/planos.html"))
}
async function termos(req, res) {
    res.status(200).sendFile(path.join(__dirname, "../public/html/termos.html"))
}
async function guias(req, res) {
    res.status(200).sendFile(path.join(__dirname, "../public/html/guias.html"))
}
async function cadastro(req, res) {
    res.status(200).sendFile(path.join(__dirname, "../public/html/cadastro.html"))
}
async function etiqueta(req, res) {
    res.status(200).sendFile(path.join(__dirname, "..", "public", "html", "etiqueta.html"))
}
async function ramais(req, res) {
    res.status(200).sendFile(path.join(__dirname, "..", "public", "html", "ramais.html"))
}
async function sites(req, res) {
    res.status(200).sendFile(path.join(__dirname, "..", "public", "html", "sites.html"))
}
async function config(req, res) {
    res.status(200).sendFile(path.join(__dirname, "..", "public", "html", "config.html"))
}




module.exports = {
    createPlan,
    createRamal,
    getPlans,
    updatePlan,
    getBranches,
    getSites,
    updateBranche,
    login,
    planos,
    termos,
    guias,
    cadastro,
    etiqueta,
    ramais,
    sites,
    config,
    createDocs,
    createSites,
    getDocs,
    updateDocs,
    updateSite,

}