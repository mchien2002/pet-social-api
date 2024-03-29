const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    follower: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
}, { versionKey: false, timestamps: true, strictPopulate: false })

const Follower = mongoose.model('Follower', schema)
module.exports = { Follower }

