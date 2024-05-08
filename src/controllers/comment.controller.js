const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { Post } = require('../models/post.model')
const { Like } = require('../models/like.model')
const { Follower } = require('../models/follower.model')
const { Comment } = require('../models/comment.model')
const ResponseMessage = require('../constants/response.message')
const commentCtr = module.exports = {}
const fileUtil = require('../utils/file.util')
const s3Service = require("../includes/aws.service")
const FilePathConstant = require('../constants/file.pathaws')

commentCtr.newComment = async function (req, res) {
    try {
        const newComment = req.body
        const newCommentData = await Comment.create(newComment)
        return res.status(201).json({
            status: true,
            message: ResponseMessage.ACCTION_SUCCESSFULLY,
            data: newCommentData
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            status: false,
            message: ResponseMessage.ACTION_FAILURE,
            error: ResponseMessage.ACTION_FAILURE
        })
    }
}