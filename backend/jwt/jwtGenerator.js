const jwt = require("jsonwebtoken")
require("dotenv").config();

const generateJwt = (id) => {

    const payload = {
        user: id
    }

    return jwt.sign(payload, process.env.jwtSecret, { expiresIn: '1hr' })
}

module.exports = generateJwt;