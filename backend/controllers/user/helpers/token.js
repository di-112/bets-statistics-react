const jwt = require('jsonwebtoken')

const createToken = userId => {
    const secret = process.env.JWT_SECRET

    return jwt.sign({
        Id: userId
    }, secret)
}

module.exports = {
    createToken
}
