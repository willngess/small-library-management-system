
var User = require('../../dbfiles/models/user')
var Book = require('../../dbfiles/models/book')
var News = require('../../dbfiles/models/news')
// root page index
exports.index = function(req, res){

    User.find({role: 'admin'})
        .exec(function(err, users){
            if(err){
                console.log('err in find user:', err)
            }

            Book.find({})
                .sort('createfrom')
                .exec(function(err, books) {
                    if(err) {
                        return console.log('err in find book:',err)
                    }

                    News.fetch(function(err, news) {
                        if(err) {
                            return console.log('err in find news:',err)
                        }

                        res.render('root', {
                            title: '超级管理员',
                            role: 'root',
                            admins: users,
                            books: books,
                            news: news
                    })
                })
        })
    })

}

// root user is signin required
exports.signinRequired = function(req, res, next){

    if(req.session.user && req.session.user.role == 'root') {
        next()
    }else{
        res.render('signinrequired', {
            title: '超级管理员',
        })
    }
}

// show addAdmin page
exports.addAdmin = function(req, res){

    res.render('signup', {
        title: '一般管理员注册',
        role: 'admin'
    })

}

exports.showNews = function(req, res) {

    var _id = req.params.id

    News.findById(_id, function(err, news) {

        if(err) {
            return console.log('err in find news: ' + err)
        }

        res.render('news', {
            title: '新闻',
            news: news,            
            role: 'news'
        })
    })

}

// post news data
exports.saveNews = function(req, res) {

    var _news = req.body.news
    var _newsTitle = _news.title
    console.log(_news)

    News.findOne({title: _newsTitle}, function(err, news) {

        if(err) {
            return console.log('err in find news: ' + err)
        }

        if(!news) {
            var news = new News(_news)
            news.save(function(err, news) {

                if(err) {
                    return console.log(err)
                }

                return res.json({
                    tag: 0,
                    success: 1
                })
            })
        }else{
            return res.json({
                tag: 1,
                success: 0
            })
        }
    })
}

