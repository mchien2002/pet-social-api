const mongoose = require("mongoose")


const schema = new mongoose.Schema({
    title: { type: String },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    attachFiles: [{ type: String }],
    
}, { versionKey: false, timestamps: true, strictPopulate: false })


const Post = mongoose.model('Post', schema)
Post.createIndexes()
    .then(() => {
        console.log('UNIQUE INDICATOR HAS BEEN CREATED FOR POSTS')
    })
    .catch((err) => {
        console.error(`Lỗi khi tạo chỉ mục duy nhất: ${err}`)
    })
module.exports = { Post }

