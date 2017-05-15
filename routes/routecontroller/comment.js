var Comment = require('../../dbfiles/models/comment')

 // comment

 exports.save = function(req, res) {

    var _comment = req.body.comment
    var bookId =  _comment.book

    if(_comment.cid){
        Comment.findById(_comment.cid, function(err, comment){
            var replay = {
                from: _comment.from,
                to: _comment.tid,
                content: _comment.content
            }
            
            comment.reply.push(replay)
            comment.save(function(err, comment){

                if(err) {
                    return console.log('err in save comment: ' + err)
                }

                res.redirect('/book/view/' + bookId)
            })
        })
    }else{
        var comment = new Comment(_comment)
        comment.save(function(err, comment){
             if(err){
                // res.json({
                //     success: 0
                // })
                return console.log('err in save comment: ' + err)
            }
            // res.json({
            //     success: 1
            // })
            res.redirect('/book/view/' + bookId)
        })
    }
}