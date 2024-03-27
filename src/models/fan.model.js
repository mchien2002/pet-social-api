const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    fan: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
}, { versionKey: false, timestamps: true, strictPopulate: false })

const Fan = mongoose.model('Fan', schema)
module.exports = { Fan }

