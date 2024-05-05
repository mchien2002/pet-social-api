const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    post: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true },
    peopleLike: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
}, { versionKey: false, timestamps: true, strictPopulate: false })

const Like = mongoose.model('Like', schema)
module.exports = { Like }

