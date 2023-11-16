const jwt = require('jsonwebtoken')

const secretKey = 'AplicationFGTorrent';





async function verifyToken(req, res, next) {
    const token = req.query.id
    if (!token) {
        return res.status(401).json({ auth: false, message: 'É necessário fazer login para acessar esta página.' })
    }
    try {
        const decoded = jwt.verify(token, secretKey)
        req.userId = decoded.id
        next()
    } catch (error) {
        return res.status(500).redirect("/")
    }
}

async function createToken(e) {
    const token = await jwt.sign({ id: e }, secretKey, { expiresIn: "1h" })
    return token
}


// ! multer 

// npm i multer

// Middleware
const multer = require('multer')
const path = require('path')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./src/public/pdf/") // diretório parte do root até à pasta alvo (tem que criar a pasta antes para funcionar)
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})
const fileFilter = function (req, file, cb) { // "fileFilter" são as configuraçãoes do documento

    const allowedFileTypes = /pdf/; // Aceitar apenas arquivos com extensões específicas
    const extname = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedFileTypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb('Erro: Tipos de arquivo permitido é: PDF');
    }
}
const limits = { // Ajusta o tamanho máximo permitido
    fileSize: 5 * 1024 * 1024, // 4 MB
}
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: limits
})








// HTML
// precisa incluir este atributo ao <form>









module.exports = {
    createToken,
    verifyToken,
    upload
}