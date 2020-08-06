const jwt = require('jsonwebtoken')
const env = process.env.SECRET

function encode (user) {
    return jwt.sign(user, env)
}

function decode (token) {
    return jwt.verify(token, env)
}

module.exports = { encode, decode }