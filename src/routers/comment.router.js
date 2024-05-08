const router = require('express').Router()
const commentCtr = require('../controllers/comment.controller')
const verifyToken = require('../middlewares/verify.token')

router.post('/comment', commentCtr.newComment)

module.exports = router