$(function(){
    $('.del').click(function(e){
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
                        tr.children()[2].innerHTML = '删除成功'
                        setTimeout(function(){
                            tr.remove()
                        }, 500)
                    }
                })
            }

        })
    })
})