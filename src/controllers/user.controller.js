const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { User } = require('../models/user.model')
const ResponseMessage = require('../constants/response.message')
const userCtr = module.exports = {}

userCtr.signupAccount = async function (req, res) {
    try {
        const newUser = req.body
        if (newUser.username.length < 6) {
            return res.status(400).json({
                status: false,
                message: ResponseMessage.ACTION_FAILURE,
                error: ResponseMessage.USERNAME_NOTENOUGH,
            })
        } else if (newUser.password.length < 8) {
            return res.status(400).json({
                status: false,
                message: ResponseMessage.PASSWORD_NOTENOUGH,
                error: ResponseMessage.PASSWORD_NOTENOUGH,
            })
        }
        hashPassword(newUser.password, async function (err, hashedPassword) {
            if (err) {
                myLogger.error(`Lỗi khi băm mật khẩu: ${err}`)
                return
            }
            newUser.password = hashedPassword
            newUserCreated = await User.create(newUser)
            return res.status(200).json({
                status: true,
                message: ResponseMessage.ACCTION_SUCCESSFULLY,
                data: newUserCreated
            })
        })
    } catch (error) {
        switch (error.code) {
            case 11000: {
                if (err.keyPattern.username == 1) {
                    res.status(500).json({
                        status: false,
                        message: ResponseMessage.ACTION_FAILURE,
                        error: ResponseMessage.USER_ACCOUNT_EXIST
                    })
                } else if (err.keyPattern.phone == 1) {
                    res.status(500).json({
                        status: false,
                        message: ResponseMessage.ACTION_FAILURE,
                        error: ResponseMessage.USER_PHONE_EXIST
                    })
                }
                break
            }
            default:
                console.error(error)
                res.status(500).json({
                    status: false,
                    message: ResponseMessage.ACTION_FAILURE,
                    error: ResponseMessage.ACTION_FAILURE
                })
        }
    }
}
userCtr.loginAccount = async function (req, res) {
    try {
        const userInfoLogin = req.body
        const userLogin = await User.findOne({username: userInfoLogin.username})
        const validPassword = await bcrypt.compare(userInfoLogin.password, userLogin.password)
        if (!validPassword) {
            return res.status(401).json({
                status: false,
                message: ResponseMessage.ACTION_FAILURE,
                error: ResponseMessage.PASSWORD_WRONG
            })
        } else {
            userLogin._doc.token = await generateAccessToken(userLogin, '45d')
            const { password, ...others } = userLogin._doc
            return res.status(200).json({
                status: true,
                message: ResponseMessage.ACCTION_SUCCESSFULLY,
                data: others
            })
        }
        
    } catch (error) {
        console.error(error)
        res.status(500).json({
            status: false,
            message: ResponseMessage.ACTION_FAILURE,
            error: ResponseMessage.USER_ACCOUNT_NOTREGIS
        })
    }
}

userCtr.forgotPassword = async function (req, res) {

}

async function generateAccessToken(acc, expiresIn) {
    const SECRET_KEY_JWT = process.env.SECRET_KEY_JWT
    var token = jwt.sign(
        { userId: acc._id, role: acc.role },
        SECRET_KEY_JWT,
        { expiresIn: expiresIn }
    )
    return token
}

function generateRandomPassword() {
    const length = 8
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    let password = ""
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length)
        password += charset[randomIndex]
    }
    return password
}

function hashPassword(plainPassword, callback) {
    bcrypt.hash(plainPassword, 10, function (err, hash) {
        if (err) {
            callback(err)
            return
        }
        callback(null, hash)
    })
}
