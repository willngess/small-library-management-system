$(function(){

    $('#updateUserForm').on('submit', function(e){
        e.preventDefault()

        console.log(1111)

        var role = $(this).data('role')

        if(role == 'normal') {
            role = 'user'
        }
        console.log('/' + role + '/update')

        $.ajax({
            type: 'POST',
            url: '/' + role + '/update',
            contentType: 'application/x-www-form-urlencoded',
            data: $(this).serialize()
        }).done(function(result) {
            console.log(result)
            if(result && result.tag === 0){
                showModal({
                    success: false,
                    msg: '该用户不存在！'
                })
            }else if(result.success === 0) {
                showModal({
                    success: false,
                    msg: '更新失败，请刷新后重试！'
                })
            }else if(result.success === 1){
                showModal({
                    success: true,
                    msg: '更新成功！'
                })
            }
            $('#msgModal').modal({
                keyboard: true
            })
        })
    })
})

    
