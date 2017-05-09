$(function(){
    $('#updateBookForm').on('submit', function(e){
        e.preventDefault()

        $.ajax({
            type: 'POST',
            url: '/admin/book/update',
            contentType: 'application/x-www-form-urlencoded',
            data: $(this).serialize()
        }).done(function(result) {
            if(result && result.success === 1) {
                $('#msgModal').on('show.bs.modal',  function() {
                    $('#modal-panel').removeClass('panel-danger').addClass('panel-success')
                    $('#message').text('更新成功')
                    $(this).off('show.bs.modal')
                })
                // $('#msgModal').on('hidden.bs.modal',function(){
                //     location.reload()
                // })
            }else if(result && result.success === 0){
                $('#msgModal').on('show.bs.modal',  function() {
                    $('#modal-panel').removeClass('panel-success').addClass('panel-danger')
                    $('#message').text('更新失败，请重新输入')
                    $(this).off('show.bs.modal')
                })
            }
            $('#msgModal').modal({
                keyboard: true
            })
        })
    })
})