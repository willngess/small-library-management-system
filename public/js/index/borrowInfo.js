$(function(){

    $('.info').click(function(e) {
        var target = $(this)
        var bookid = target.data('bookid')

        $.ajax({
            type: 'POST',
            url: '/book/info',
            contentType: 'application/json',
            data: JSON.stringify({
                bookid: bookid
            })
        }).done(function(result) {

            if (result &&result.success == 1) {
                showModal({
                    success: 1,
                    msg: '还书成功！',
                    successCb: function(){
                        location.reload()
                    }
                })
                
            }else{
                showModal({
                    success: false,
                    msg: '还书失败，请刷新后重试！',
                    failCb: function(){
                        location.reload()
                    }
                })
            }

            $('#msgModal').modal({
                keyboard: true
            })

        })
    })
})
