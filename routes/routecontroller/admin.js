var User = require('../../dbfiles/models/user')
var Book = require('../../dbfiles/models/book')
var _ = require('underscore')

exports.index = function(req, res) {

    var adminName = req.session.user.name
    Book
    .find({createfrom: adminName})
    .exec(function(err, books) {
        if(err){
            return console.log('err in find: ' + err)
        }

        books.forEach(function(v,i) {
            if(v.borrowinfo.type) {
                v.populate('borrowinfo.from', name)
            }
        })

        res.render('admin', {
            title:'管理员' + adminName,
            books: books,
            role: 'admin'
        });
    })
}

exports.signinRequired = function(req, res, next){

     if(req.session.user && req.session.user.role == 'admin') {
            next()
    }else {
        res.render('signinrequired', {
            title: '管理员',
        })
    }
}

// post checkout book's name is exist
exports.checkoutBook = function(req, res){


    
}

// post book data
exports.saveBook = function(req, res){

    var _book = req.body.book
    console.log(_book)
    var name = _book.name
    Book.findOne({name: name}, function(err, book) {
        if(err) {
            return console.log('err in find: ' + err)
        }

        if(!book) {
            var book = new Book(_book)
            book.save(function(err, book) {
                if(err) {
                    return console.log('err in save: ' + err)
                }
                return res.json({
                        tag: 0,
                        success: 1
                    })
            })
        }else {
            return res.json({
                        tag: 1,
                        success: 0
                    })
        }
    })
}

// delete book
exports.delBook = function(req, res) {
    
    var _id = req.body._id

    Book.remove({_id: _id}, function(err, book) {
        if(err){
            return console.log("err in del: " + err)
        }
        return res.json({
            success: 1
        })
    })
}



// get updateBook page
exports.showUpdateBook = function(req, res) {

    var pageTitle = '更新书籍'
    var _id = req.params.id

    Book.findOne({_id: _id}, function(err, book) {
        if(err) {
            return console.log('err in find: err' + err)
        }

        res.render('updateBook', {
            title: pageTitle,
            role: 'admin',
            book: book
        })
    })

}

// post update book data
exports.updateBook = function(req, res) {

    console.log(req.body.book)
    var bookObj = req.body.book
    var _id = bookObj._id
    var _book = null
    Book.findById(_id, function(err, book){
        if(err){
            return console.log('err in find: ' + err)
        }
        _book = _.extend(book, bookObj)
        _book.save(function(err, book){
            if(err){
                console.log('err in save: ' + err)
                return res.json({
                    success: 0
                })
            }
            return res.json({
                success: 1
            })
        })
    })
}
