const jwt = require('jsonwebtoken')
const dotenv = require("dotenv")
dotenv.config()
const ResponseMessage = require('../constants/response.message')

const verifyToken = module.exports = {}

verifyToken.forUser = async function (req, res, next) {
    const token = req.headers.authorization
    if (token) {
        const accessToken = token.split(" ")[1]
        const SECRET_KEY_JWT = process.envSECRET_KEY_JWT
        jwt.verify(accessToken, SECRET_KEY_JWT, (err, decoded) => {
            if (err) {
                console.error(err)
                res.status(401).json({
                    status: false,
                    message: ResponseMessage.TOKEN_EXPRIDED,
                    error: ResponseMessage.TOKEN_EXPRIDED
                })
            } else {
                next()
            }
        })
    } else {
        res.status(401).json({
            status: false,
            message: ResponseMessage.USER_NOTE_AUTHENTICATED,
            error: ResponseMessage.USER_NOTE_AUTHENTICATED
        })
    }
}