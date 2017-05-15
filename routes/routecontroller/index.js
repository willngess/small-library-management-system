
var Book = require('../../dbfiles/models/book')
var News = require('../../dbfiles/models/news')
var Comment = require('../../dbfiles/models/comment')
var moment = require('moment')

exports.index = function(req, res) {


    Book.find({classification: 'js'})
        .exec(function(err, books) {

            if(err)  {
                return console.log('err in find: ' + err)
            }

            News.find({})
                .sort('meta.createAt')
                .exec(function(err, news) {

                    if(err) {
                        return console.log('err in find news: ' + err)
                    }

                    res.render('index', {
                        title: '图书管理系统',
                        books: books,
                        news: news.slice(-1)[0]
                    })
                })
        })
}

// post normal isSignin
exports.signinRequired = function(req, res, next) {

    if(req.session.user && req.session.user.role == 'normal') {
        next()
    }else{
        res.render('signinrequired', {
            title: '超级管理员',
        })
    }

}

exports.searchBooks = function(req, res) {

    var _classification = req.body.search.classification

    Book.find({classification: _classification})
        .sort('meta.createAt')
        .exec(function(err, books) {

            if(err)  {
                return console.log('err in find: ' + err)
            }

            var booksObj = []
            for(item of books) {
                console.log(item)
                var obj = {}
                obj._id = item._id
                obj.name = item.name
                obj.classification = item.classification

                if(item.borrowinfo && item.borrowinfo.info == true) {
                    obj.borrowinfo = item.borrowinfo.from + '已借出，时间 ' + moment(item.borrowinfo.meta).format('MM/DD/YY')
                }else{
                    obj.borrowinfo = item.location
                }

                obj.createAt = moment(item.meta.createAt).format('MM/DD/YYYY, h:mm:ss a')
                booksObj.push(obj)
            }

            res.json({
                r:1,
                books:JSON.stringify(booksObj)
            })
        })
}

// get bookdetail page
exports.showBook = function(req, res) {

    var _id = req.params.id

    Book.findOne({_id: _id})
        .exec(function(err, book) {
            if(err) {
                return console.log('err in find: err' + err)
            }

            Comment.find({book: _id})
                .sort()
                .populate('from', 'name')
                .populate('reply.from reply.to', 'name')
                .exec(function(err, comments) {

                    res.render('bookdetail', {
                        title: book.name + '信息',
                        book: book,
                        comments: comments.reverse()
                    })
                })
        })
}

// get newsList page
exports.newsList = function(req, res) {

    News.find({})
        .sort('meta.createAt')
        .exec(function(err, news) {

            if(err) {
                return console.log('err in find news: ' + err )
            }

            res.render('newsList', {
                title: '新闻列表',
                news: news.reverse()
            })
        })
}

// post borrow book
exports.borrow = function(req, res) {

    var bookid = req.body.bookid

    console.log(typeof bookid)
    console.log(bookid)

    var tid = req.body.tid

    if(!(req.session.user.role == 'root' || req.session.user.role == 'admin' || req.session.user.role == 'normal')) {
        res.json({
            isSignin: false,
            success: 0,
            isExist: false
        })
    }else{

        Book.findOne({_id: bookid})
            .exec(function(err, book) {

                if(err) {
                    return console.log('err in find book: ' + err)                
                }
                if(!book) {
                    res.json({
                        isSignin: true,
                        success: 0,
                        isExist: false
                    }) 
                }else {
                    book.borrowinfo.info = true
                    book.borrowinfo.from = tid   
                    book.borrowinfo.meta = Date.now()

                    book.save(function(err, book) {
                        if(err) {
                            return console.log('err in save book: ' + err)
                        }
                        res.json({
                            isSignin: true,
                            success: 1,
                            isExist: true
                        })
                    })
                }
            })
    }
}

// get borrowList page
exports.showBorrowList = function(req, res) {

    var _id = req.params.id

    Book.where('borrowinfo.from')
        .gte(_id)
        .exec(function(err, books) {
            if(err) {
                return console.log(err)
            }
            res.render('borrowList', {
                title: '我的书籍',
                books: books
            })
        })

}

// post info book
exports.bookInfo = function(req, res) {

    var bookid = req.body.bookid


    Book.findByIdAndUpdate(bookid, {$set: {'borrowinfo.from': '', 'borrowinfo.info': false}}, function(err, book) {
        if(err) {
            console.log(err)
            return res.json({
                success: 0
            })
        }
        res.json({
            success:1
        })
    })
}