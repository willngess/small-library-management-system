var User = require('../../dbfiles/models/user')

// GET Signin Page
exports.showSignin = function(req, res){

    var role = req.originalUrl.split('/')[1]
    var title = ''

    switch(role){
        case 'root': title = '超级管理员登陆'; break;
        case 'admin': title = '一般管理员登陆'; break;
        case 'normal': title = '登陆'; break;
        default: titile = '登陆'
    }    

    res.render('signin', {
        title: title,
        role: role,
        type: '登陆',
        page: 'signle'
    })

}

// POST User Data
exports.signin = function(req, res) {

    var _user = req.body.user 
    var name = _user.name

    User.findOne({name: name}, function(err, user){

        if(err){
            console.log('err in find: ' + err)
            return res.json({
                    success: 0
                   })
        }
        if(!user){
            return res.json({
                    tag: 0,
                    success: 0
                    })
        }
        if(user){
            var _password = req.body.user.password

            user.comparePassword(_password, function(err, isMatch){
                if(err){
                    return  res.json({
                                success: 0
                            })
                }
                if(isMatch){

                    req.session.user = {
                        name: user.name,
                        nickname: user.nickname,
                        role: user.role,
                        _id: user._id
                    }
                    return res.json({
                            tag: 1,
                            success: 1
                            })
                }else {
                    return res.json({
                            tag: 1,
                            success: 0
                        })
                }              
            })
        }
    })
}

//  get to  logout
exports.logout = function(req, res) {

    // var path = req.session.user.role
    delete req.session.user

    res.redirect('/')
}

// get signup page
exports.showSignup = function(req, res) {

    var role = req.path.split('/')[1]
    if(!(role == 'admin' || role == 'root')){
        role = 'normal'
    }
    var title = ''

    switch(role){
        case 'root': title = '超级管理员注册'; break;
        case 'normal': title = '用户注册'; break;
    }

    res.render('signup', {
        title: title,
        role: role,
        type: '注册',
        page: 'signle'
    })
}

// POST Signup
exports.signup = function(req, res) {


    console.log(req.body.user)
    var _user = req.body.user
    var role = _user.role

    if(role == 'root'){
        User.findOne({role: 'root'}, function(err, rootUser) {

            if(err){
                res.json({
                    success:0
                })
                return console.log('err in find:' + err)
            }
            if(rootUser){
                return res.json({
                            tag: 1,
                            success: 0
                        })
            }else{
                var _rootUser = new User(_user)
                _rootUser.save(function(err, rootUser) {
                    if(err){
                        res.json({
                            success:0
                        })
                        return console.log('err in save:' + err)
                    }

                    return res.json({
                                tag: 0,
                                success: 1
                            })
                })
            }
        })
    }else if(role == 'admin'){

        User.findOne({name: _user.name}, function(err, adminUser) {

            if(err){
                res.json({
                    success:0
                })
                return console.log('err in find:' + err)
            }
            if(adminUser){
                return res.json({
                            tag: 1,
                            success: 0
                        })
            }else{

                var _adminUser = new User(_user)
                _adminUser.save(function(err, adminUser) {
                    if(err){
                        res.json({
                            success:0
                        })
                        return console.log('err in save:' + err)
                    }
                    return res.json({
                            tag: 0,
                            success: 1
                        })
                })
            }
        })
    }else if(role == 'normal') {

        User.findOne({name: _user.name}, function(err, normalUser) {

            if(err){
                res.json({
                    success:0
                })
                return console.log('err in find:' + err)
            }
            if(normalUser){
                return res.json({
                            tag: 1,
                            success: 0
                        })
            }else{

                var _normalUser = new User(_user)
                _normalUser.save(function(err, normalUser) {
                    if(err){
                        res.json({
                            success:0
                        })
                        return console.log('err in save:' + err)
                    }
                    return res.json({
                            tag: 0,
                            success: 1
                        })
                })
            }
        })
    }
}


// USER SIGNIN CHECKOUT
exports.checkout = function(req, res) {
    var userName = req.body.userName || ''
    var role = req.originalUrl.split('/')[1]

    User.findOne({name: userName}, function(err, user){
        if(err){
            console.log('err in find:' + err)
        }
        console.log(user)
        if(user){

            if(user.role == role || (user.role == 'admin' && role == 'root')){
                return res.json({
                    tag:1,
                    success: 1,
                    role: 1
                })
            }else {
                return res.json({
                    tag: 1,
                    success: 1,
                    role: 0
                })
            }

        }else{
            return res.json({
                tag: 0,
                success: 1
            })
        }
    })
}

// delete user data

exports.del = function(req, res){
    var id = req.query.id

    User.remove({_id: id}, function(err, user){
        if(err) {
            return console.log('err in del: ' + err)
        }
        return res.json({
            success: 1
        })
    })
}

exports.adminSigninRequired = function(req, res, next) {

    if(req.session.user && (req.session.user.role == 'admin' || req.session.user.role == 'root')) {
            next()
    }else {
        res.render('signinrequired', {
            title: '管理员',
        })
    }
}