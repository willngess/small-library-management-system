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
                $('#msgModal').on('show.bs.modal',  function() {
                    $('#modal-panel').removeClass('panel-danger').addClass('panel-success')
                    $('#message').text('还书成功！')
                    $(this).off('show.bs.modal')
                })
            }else{
                $('#msgModal').on('show.bs.modal',  function() {
                    $('#modal-panel').removeClass('panel-danger').addClass('panel-success')
                    $('#message').text('还书失败，请刷新后重试！')
                    $(this).off('show.bs.modal')
                })
            }

            $('#msgModal').on('hidden.bs.modal',function(){
                location.reload()
            })

            $('#msgModal').modal({
                keyboard: true
            })

        })
    })
})
