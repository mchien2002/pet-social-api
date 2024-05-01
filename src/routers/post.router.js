const router = require('express').Router()
const postCtr = require('../controllers/post.controller')
const verifyToken = require('../middlewares/verify.token')
const { uploadTemp } = require('../middlewares/multer.middleware')

router.get('/newfeeds', postCtr.getTrending)
router.post('/post', uploadTemp.fields([{ name: 'img', maxCount: 5 }, { name: 'video', maxCount: 5 }]), postCtr.postNewFeed)
router.post('/post/like', postCtr.likePost)
router.delete('/post/:postId', postCtr.removeNewFeed)
router.put('/post/:postId', postCtr.editNewFeed)
router.post('/post/comment', postCtr.commentNewFeed)
router.post('/post/share', postCtr.shareNewFeed)

module.exports = router