var mongoose = require('mongoose')
var ClassificationSchema = require('../schemas/classification')
var Classification = mongoose.model('classification', ClassificationSchema)

module.exports = Classification