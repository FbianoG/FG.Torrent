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

const limits = {
    fileSize: 5 * 1024 * 1024,
}

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: limits
})


module.exports = {
    upload
}