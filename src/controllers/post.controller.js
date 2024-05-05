const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { Post } = require('../models/post.model')
const { Like } = require('../models/like.model')
const { Share } = require('../models/share.model')
const { Comment } = require('../models/comment.model')
const ResponseMessage = require('../constants/response.message')
const postCtr = module.exports = {}
const fileUtil = require('../utils/file.util')
const s3Service = require("../includes/aws.service")
const FilePathConstant = require('../constants/file.pathaws')

postCtr.getTrending = async function (req, res) {
    try {
        const onwerId = req.query.owner_id;
        let postTrending = await Post.find(onwerId ? { ownerId: onwerId } : {}).populate("owner");
        postTrending.sort((a, b) => b.createdAt - a.createdAt);
        await Promise.all(postTrending.map(async post => {
            post._doc.likeCount = await Like.countDocuments({ post: post.id });
            post._doc.shareCount = await Share.countDocuments({ post: post.id });
            post._doc.comments = await Comment.find({ post: post.id }).populate("peopleComment")
        }));
        return res.status(200).json({
            status: true,
            message: ResponseMessage.ACCTION_SUCCESSFULLY,
            data: postTrending
        });
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            status: false,
            message: ResponseMessage.ACTION_FAILURE,
            error: ResponseMessage.ACTION_FAILURE,
        })
    }
}

postCtr.postNewFeed = async function (req, res) {
    try {
        const newPost = req.body
        let mediaAttach = []
        req.files['img']?.forEach(imgFile => {
            const name = fileUtil.generateImageFile()
            s3Service.s3Uploadv3(imgFile.path, name, FilePathConstant.AWS_PATH_IMAGE)
            mediaAttach.push(name)
        });
        req.files['video']?.forEach(videoFile => {
            const name = fileUtil.generateMp4File()
            s3Service.s3Uploadv3(videoFile.path, name, FilePathConstant.AWS_PATH_IMAGE)
            mediaAttach.push(name)
        });
        newPost.attachFiles = mediaAttach
        const newPosted = await Post.create(newPost)
        return res.status(201).json({
            status: true,
            message: ResponseMessage.ACCTION_SUCCESSFULLY,
            data: newPosted
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            status: false,
            message: ResponseMessage.ACTION_FAILURE,
            error: ResponseMessage.ACTION_FAILURE,
        })
    }
}
postCtr.likePost = async function (req, res) {
    try {
        const newLike = req.body
        const liked = await Like.findOne({ peopleLike: newLike.userId, post: newLike.postId })
        if (liked) {
            return res.status(201).json({
                status: true,
                message: ResponseMessage.ACCTION_SUCCESSFULLY,
            })
        } else {
            const newLikeDataJson = {
                post: newPost.postId,
                peopleLike: newPost.userId
            }
            const newLikeData = await Like.create(newLikeDataJson)
            const postUpdate = await Post.findById(newLike.postId).populate("owner")
            return res.status(201).json({
                status: true,
                message: ResponseMessage.ACCTION_SUCCESSFULLY,
                data: postUpdate
            })
        }
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            status: false,
            message: ResponseMessage.ACTION_FAILURE,
            error: ResponseMessage.ACTION_FAILURE,
        })
    }
}

postCtr.removeNewFeed = async function (req, res) {

}
postCtr.editNewFeed = async function (req, res) {

}

postCtr.commentNewFeed = async function (req, res) {

}
postCtr.shareNewFeed = async function (req, res) {

}
