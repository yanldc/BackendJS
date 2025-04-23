const jwt = require ('jsonwebtoken')
const {jwtSecret} = require('../config/secret')

module.exports = (req, res, next) => {
    const token = req.headers['authorization'];

    if(!token) return res.status(401).json({error: "token não fornecido"});

    jwt.verify(token, jwtSecret, (err, decoded) =>{
        if (err)  return res.status(403).json({error: "token não autorizado"});
        req.userId = decoded.id
        next()

    });
}