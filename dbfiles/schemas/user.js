var mongoose = require('mongoose')
var bcrypt = require('bcrypt-nodejs')
var SALT_WORK_FACTOR = 10

var UserSchema = new mongoose.Schema({
    // 用户名
    name:{
        unique: true,
        type: String
    },
    // 昵称
    nickname:{
        unique: true,
        type: String,
        default: ''
    },
    // 密码 哈希加盐处理
    password: String,
    // 权限 'root' 超级管理员 'admin' 一般管理员 'normal' 一般用户
    role: String,
    // 姓名
    realname: String,
    // Phone
    phone: String,
    // 创建日期以及修改日期
    meta: {
        createAt: {
            type: Date,
            default: Date.now()
        },
        updateAt: {
            type: Date,
            default: Date.now()
        }
    }
})

UserSchema.pre('save', function(next) {

    var user = this

    if(this.isNew){
        this.meta.createAt = this.meta.createAt = Date.now()
    }else{
        this.meta.updateAt = Date.now()
    }

    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt){
        if(err){
            return next(err)
        }

        bcrypt.hash(user.password, salt, null, function(err, hash){
            if(err){
                return next(err)
            }
            user.password = hash
            next()
        })
    })

})

UserSchema.methods = {
    comparePassword : function(_password, cb){


        // console.log('_password', _password)
        // console.log('this.password', this.password)

        bcrypt.compare(_password, this.password, function(err, isMatch){
            if(err){
                // console.log('compare: ' + err)
                return cb(err)
            }

            cb(null, isMatch)
        })

    }
}

UserSchema.statics = {
    fetch: function(cb){
        return this.find({}).sort('meta.createAt').exec(cb)
    },
    findById: function(id, cb){
        return this.findOne({_id: id}).exec(cb)
    }
}

module.exports = UserSchema