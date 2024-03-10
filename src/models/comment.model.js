const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    post: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
    peopleComment: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    content: { type: String }
}, { versionKey: false, timestamps: true, strictPopulate: false })

const Comment = mongoose.model('Comment', schema)
module.exports = { Comment }

