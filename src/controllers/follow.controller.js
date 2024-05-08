const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { Post } = require('../models/post.model')
const { Like } = require('../models/like.model')
const { Follower } = require('../models/follower.model')
const { Comment } = require('../models/comment.model')
const ResponseMessage = require('../constants/response.message')
const followCtr = module.exports = {}
const fileUtil = require('../utils/file.util')
const s3Service = require("../includes/aws.service")
const FilePathConstant = require('../constants/file.pathaws')


followCtr.followUser = async function (req, res) {
    try {
        const newFollow = req.body
        const fl = await Follower.findOne({ follower: newFollow.followerId, user: newFollow.userId })
        if (fl) {
            return res.status(201).json({
                status: true,
                message: ResponseMessage.ACCTION_SUCCESSFULLY,
            })
        } else {
            const newFLJson = {
                follower: newFollow.followerId,
                user: newFollow.userId
            }
            const newFLData = await Follower.create(newFLJson)
            return res.status(201).json({
                status: true,
                message: ResponseMessage.ACCTION_SUCCESSFULLY,
                data: newFLData
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
