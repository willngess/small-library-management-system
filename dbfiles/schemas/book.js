var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId

var BookSchema = new Schema({
    // 书籍名字
    name: String,
    // 书籍分来
    classification: String,
    // 书籍简介
    description: String,
    // 录入管理员
    createfrom: String,
    // 存放位置
    location:String,
    // 借出还入记录
    borrowinfo: {
        from: {
            type: ObjectId,
            ref: 'User'
        },
        // 是否借出
        info: {
            type: Boolean,
            defaut: false
        },   
        meta: {
            type: Date,
            default: Date.now()
        }
    },
    // 录入时间以及修改时间
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


BookSchema.pre('save', function(next) {
    if(this.isNew){
        this.meta.createAt = this.meta.updateAt = Date.now()
    }
    next()
})

BookSchema.statics = {
    fetch: function(cb){
        return this.find({}).sort('meta.createAt').exec(cb)
    },
    findById: function(id, cb){
        return this.findOne({_id: id}).exec(cb)
    }
}

module.exports = BookSchema