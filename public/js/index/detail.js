$(function(){
    $('.comment').click(function(e){

        var target = $(this)
        var toName = target.data('name')
        var toId = target.data('tid')
        var commentId = target.data('cid')

        $('textarea').html('回复' + toName + '：')

        if($('#toId').length > 0){
            $('#toId').val(toId)
        }else{
            $('<input>').attr({
                type: 'hidden',
                id: 'toId',
                name: 'comment[tid]',
                value: toId
            }).appendTo('#commentForm')

        }
       
        if ($('#commentId').length > 0) {
            $('#commentId').val = commentId
        } else {
            $('<input>').attr({
                type: 'hidden',
                id: 'commentId',
                name: 'comment[cid]',
                value: commentId
            }).appendTo('#commentForm')
        }
    })
})