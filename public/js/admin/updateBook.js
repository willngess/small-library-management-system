$(document).ready(function(){


    $('#updateBookForm').on('submit', function(e){
        e.preventDefault()

        console.log('sdfasdj')

        $.ajax({
            type: 'POST',
            url: '/admin/book/update',
            contentType: 'application/x-www-form-urlencoded',
            data: $(this).serialize()
        }).done(function(result) {
            if(result && result.success === 1) {
                showModal({
                    success:true,
                    msg: '更新成功！'
                })
            }else{
                showModal({
                    success: false,
                    msg: '更新失败，请稍后重试',
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