$(function() {
    $('.delNormalUser').click(function(e){
        var target = $(this)
        var id = target.data('id')
        var tr = $('.item-id-' + id)
        var name = tr.children()[0].innerText

        $.ajax({
            type: 'POST',
            url: '/root/admin/checkout',
            contentType: 'application/json',
            data: JSON.stringify({
                userName: name
            })
        }).done(function(result){

            console.log(result)
            if(result.role === 1 && result.tag === 1 && result.success === 1){
                $.ajax({
                    type: 'DELETE',
                    url: '/root/admin/del?id=' + id
                }).done(function(result){
                    if(result.success === 1){
                        $('#msgModal').on('show.bs.modal',  function() {
                            $('#modal-panel').removeClass('panel-danger').addClass('panel-success')
                            $('#message').text('删除成功！')
                            $(this).off('show.bs.modal')
                        })
                        $('#msgModal').on('hidden.bs.modal',function(){
                            tr.remove()
                            $(this).off('hidden.bs.modal')
                        })
                    }else {
                       $('#msgModal').on('show.bs.modal',  function() {
                            $('#modal-panel').removeClass('panel-success').addClass('panel-danger')
                            $('#message').text('删除失败， 请刷新后重试！')
                            $(this).off('show.bs.modal')
                        }) 
                    }
                    $('#msgModal').modal({
                        keyboard: true
                    })
                })
            }
        })
    })
})