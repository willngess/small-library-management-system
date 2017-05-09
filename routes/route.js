var express = require('express');
var router = express.Router();
var User = require('./routecontroller/user')
var Index = require('./routecontroller/index')
var Admin = require('./routecontroller/admin')
var Root = require('./routecontroller/root')




module.exports = function(app) {

    // user session middleware
    app.use(function(req, res, next){
        
        var _user = null
        if(req.session.user){
            _user = {
                name: req.session.user.name,
                nickname: req.session.user.nickname,
                role: req.session.user.role
            }
        }
        app.locals.user = _user
        next()
    })
    app.use(function(req, res, next) {

        var url = req.originalUrl
        var path = ''
        if(url != '/') {
            path = url.split('/')[1]
        }else{
            path = 'user'
        }

        app.locals.path = path

        next()
    })




    // GET Index Pages
    app.get('/', Index.index)


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
    app.delete('/root/admin/del:id', Root.signinRequired, User.del)


    // GET Admin Pages
    app.get('/admin', Admin.signinRequired, Admin.index)
    app.post('/admin/signin', User.signin)
    app.get('/admin/logout', Admin.signinRequired, User.logout)
    app.post('/admin/book/save', Admin.signinRequired, Admin.saveBook)
    app.delete('/admin/book', Admin.signinRequired, Admin.delBook)
    app.get('/admin/book/update/:id', Admin.signinRequired, Admin.showUpdataBook)
    app.post('/admin/book/update', Admin.signinRequired, Admin.updateBook)
}
