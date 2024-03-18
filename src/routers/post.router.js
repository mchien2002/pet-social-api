const router = require('express').Router()
const postCtr = require('../controllers/post.controller')
const verifyToken = require('../middlewares/verify.token')
const { uploadTemp } = require('../middlewares/multer.middleware')

router.get('/newfeeds', verifyToken.forUser, postCtr.getTrending)
router.post('/post', uploadTemp.fields([{ name: 'img', maxCount: 5 }, { name: 'video', maxCount: 5 }]), postCtr.postNewFeed)
router.delete('/post/:postId', verifyToken.forUser, postCtr.removeNewFeed)
router.put('/post/:postId', verifyToken.forUser, postCtr.editNewFeed)
router.post('/post/like', verifyToken.forUser, postCtr.likeNewFeed)
router.post('/post/comment', verifyToken.forUser, postCtr.commentNewFeed)
router.post('/post/share', verifyToken.forUser, postCtr.shareNewFeed)

module.exports = router