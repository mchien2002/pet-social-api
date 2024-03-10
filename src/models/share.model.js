const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    post: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
    peopleShare: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
}, { versionKey: false, timestamps: true, strictPopulate: false })

const Share = mongoose.model('Share', schema)
module.exports = { Share }

