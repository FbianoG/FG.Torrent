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
        return res.status(500).json({ auth: false, message: 'Sessão expirada. Faça login novamente.' })
    }
}

async function createToken(e) {
    const token = await jwt.sign({ id: e }, secretKey, { expiresIn: "1h" })
    return token
}



module.exports = {
    createToken,
    verifyToken,
}