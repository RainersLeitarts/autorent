const jwt = require('jsonwebtoken')
require('dotenv').config()


const verifyJwt = async (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.status(401).json({message: "No token"})

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) return res.status(403).json({message: "Invalid token"})
        next()
    })
}

module.exports = {
    verifyJwt
}