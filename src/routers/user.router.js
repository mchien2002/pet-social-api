const router = require('express').Router()
const userCtr = require('../controllers/user.controller')
const verifyToken = require('../middlewares/verify.token')

router.post('/user/signup', userCtr.signupAccount)
router.post('/user/signin', userCtr.loginAccount)

module.exports = router