var mongoose = require('mongoose')
var BookSchema = require('../schemas/book')
var Book = mongoose.model('book', BookSchema)

module.exports = Book