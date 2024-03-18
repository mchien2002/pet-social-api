const { model } = require('mongoose')
const multer = require('multer')

const uploadTemp = multer({ dest: 'uploads/temps/' })


module.exports = { uploadTemp }