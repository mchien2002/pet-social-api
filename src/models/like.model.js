const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    post: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
    peopleLike: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
}, { versionKey: false, timestamps: true, strictPopulate: false })

const Like = mongoose.model('Like', schema)
module.exports = { Like }

