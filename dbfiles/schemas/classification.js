var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId

var ClassificationSchema = new Schema({
    // 分类的名字
    name: String,
    // 创建的管理员
    createfrom: {
        type: ObjectId,
        ref: 'User'
    }
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

ClassificationSchema.pre('save', function(next){
    if(this.isNew){
        this.meta.createAt = this.meta.updateAt = Date.now()
    }else{
        this.meta.updateAt = Date.now()
    }

    next()
})

ClassificationSchema.statics = {
    fetch: function(cb){
        return this.find({}).sort('meta.createAt').exec(cb)
    },
    findById: function(id, cb){
        return this.findOne({_id: id}).exec(cb)
    }
}

module.exports = ClassificationSchema