const jwtService = require('../utils/jwt')

async function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ message: "Token tidak ditemukan" });

    const decoded = jwtService.decodeAppToken(token)

    if (!decoded) {
        return res.status(401).json({ message: 'Invalid token' })
    }else{
        req.user = decoded
        next()
    }

}

module.exports = authenticateToken