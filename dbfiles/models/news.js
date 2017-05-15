var mongoose = require('mongoose')
var NewsSchema = require('../schemas/news')
var News = mongoose.model('news', NewsSchema)

module.exports = News