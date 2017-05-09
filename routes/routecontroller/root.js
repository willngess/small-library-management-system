
var User = require('../../dbfiles/models/user')

// root page index
exports.index = function(req, res){

    User.find({role: 'admin'}, function(err, users){
        if(err){
            console.log('err in find:', err)
        }

        res.render('root', {
            title: '超级管理员',
            role: 'root',
            admins: users
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


