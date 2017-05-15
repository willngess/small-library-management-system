var mongoose = require('mongoose')

var NewsSchema = new mongoose.Schema({
    // 新闻标题
    title: String,
    // 内容
    content: String,
    // 创建的管理员
    createfrom: String,
    // 创建时间
    meta:{
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

NewsSchema.pre('save', function(next){
    if(this.isNew){
        this.meta.createAt = this.meta.updateAt = Date.now()
    }else{
        this.meta.updateAt = Date.now()
    }

    next()
})

NewsSchema.statics = {
    fetch: function(cb){
        return this.find({}).sort('meta.createAt').exec(cb)
    },
    findById: function(id, cb){
        return this.findOne({_id: id}).exec(cb)
    }
}

module.exports = NewsSchema