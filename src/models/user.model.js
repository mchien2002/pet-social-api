const mongoose = require("mongoose")


const schema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    fullname: { type: String, required: true, },
    avatar: { type: String },
    petType: { type: Number, required: true, },
    address: { type: String },
    birthdate: { type: String, required: true },
    phone: { type: String },
    password: { type: String, required: true },
    // collections: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
}, { versionKey: false, timestamps: true, strictPopulate: false })


const User = mongoose.model('User', schema)
User.createIndexes()
    .then(() => {
        console.log('UNIQUE INDICATOR HAS BEEN CREATED FOR USERS')
    })
    .catch((err) => {
        console.error(`Lỗi khi tạo chỉ mục duy nhất: ${err}`)
    })
module.exports = { User }

