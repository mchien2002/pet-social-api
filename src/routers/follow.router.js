const router = require('express').Router()
const followCtr = require('../controllers/follow.controller')
const verifyToken = require('../middlewares/verify.token')

router.post('/follow', followCtr.followUser)

module.exports = router