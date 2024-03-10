const uuid = require('uuid');
const fileUtil = module.exports = {}


fileUtil.generateImageFile = function () {
    const uniqueName = `IMAGE_${uuid.v4()}.jpg`
    return uniqueName
}

fileUtil.generateMp4File = function () {
    const uniqueName = `VIDEO_${uuid.v4()}.mp4`
    return uniqueName
}