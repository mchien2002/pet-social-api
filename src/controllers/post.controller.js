const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { Post } = require('../models/post.model')
const ResponseMessage = require('../constants/response.message')
const postCtr = module.exports = {}
const fileUtil = require('../utils/file.util')
const s3Service = require("../includes/aws.service")
const FilePathConstant = require('../constants/file.pathaws')

postCtr.getTrending = async function (req, res) {
    try {
        const postTrending = await Post.find().populate("owner")
        return res.status(200).json({
            status: true,
            message: ResponseMessage.ACCTION_SUCCESSFULLY,
            data: postTrending
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
postCtr.removeNewFeed = async function (req, res) {

}
postCtr.editNewFeed = async function (req, res) {

}
postCtr.likeNewFeed = async function (req, res) {

}
postCtr.commentNewFeed = async function (req, res) {

}
postCtr.shareNewFeed = async function (req, res) {

}
