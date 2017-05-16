var express = require('express');
var router = express.Router();
var User = require('./routecontroller/user')
var Index = require('./routecontroller/index')
var Admin = require('./routecontroller/admin')
var Root = require('./routecontroller/root')
var Comment = require('./routecontroller/comment')




module.exports = function(app) {

    // user session middleware
    app.use(function(req, res, next){
        
        var _user = null
        if(req.session.user){
            _user = {
                name: req.session.user.name,
                nickname: req.session.user.nickname,
                role: req.session.user.role,
                _id: req.session.user._id
            }
        }

        console.log(_user)
        
        app.locals.user = _user
        next()
    })
    app.use(function(req, res, next) {

        var url = req.originalUrl
        var _path = url.split('/')[1]
        if(!(_path == 'root' || _path == 'admin')){
            _path = 'user'
        }

        app.locals._path = '/' + _path

        next()
    })




    // GET Index Pages
    app.get('/', Index.index)
    app.get('/user/signup', User.showSignup)
    app.post('/user/signup', User.signup)
    app.get('/user/signup', User.showSignup)
    app.post('/user/signup', User.signup)
    app.post('/user/signin', User.signin)
    app.get('/user/logout', User.logout)
    
    app.get('/news/list', Index.newsList)
    
    app.post('/book/search', Index.searchBooks)
    app.get('/book/view/:id', Index.showBook)
    app.post('/book/comment', Index.signinRequired, Comment.save)
    app.post('/book/borrow', Index.borrow)
    app.get('/book/borrow/list/:id', Index.signinRequired, Index.showBorrowList)
    app.post('/book/info', Index.signinRequired, Index.bookInfo)


    // GET Root Pages
    app.get('/root', Root.signinRequired, Root.index)

    app.get('/root/signup', User.showSignup)
    app.post('/root/signup', User.signup)

    app.post('/root/checkout', User.checkout)
    app.post('/root/signin', User.signin)
    app.get('/root/logout', Root.signinRequired, User.logout)

    app.get('/root/admin/add', Root.signinRequired, Root.addAdmin)
    app.post('/root/admin/checkout', Root.signinRequired, User.checkout)
    app.post('/root/admin/add', Root.signinRequired, User.signup)
    app.delete('/root/admin/del', Root.signinRequired, User.del)

    app.get('/news/view/:id', Root.showNews)
    app.post('/root/news/save', Root.signinRequired, Root.saveNews)
    app.delete('/root/news/del', Root.signinRequired, Root.delNews)

    app.get('/root/user/list', User.adminSigninRequired, User.showUserList)
    app.get('/root/user/list', Root.signinRequired, User.del)


    // GET Admin Pages
    app.get('/admin', Admin.signinRequired, Admin.index)
    app.post('/admin/signin', User.signin)
    app.get('/admin/logout', Admin.signinRequired, User.logout)
    
    app.delete('/admin/book', User.adminSigninRequired, Admin.delBook)
    app.post('/admin/book/save', User.adminSigninRequired, Admin.saveBook)
    app.get('/admin/book/update/:id', User.adminSigninRequired, Admin.showUpdateBook)
    app.post('/admin/book/update', User.adminSigninRequired, Admin.updateBook)

}
