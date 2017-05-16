$(function(){
    $('.delAdmin').click(function(e){
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
                        tr.children()[3].innerHTML = '删除成功'
                        setTimeout(function(){
                            tr.remove()
                        }, 500)
                    }
                })
            }

        })
    })


    $('#addnews').click(function() {
        $('#addNewsContainer').removeClass('hidden').addClass('show')

        $('#closeNewsForm').click(function() {
            $('#addNewsContainer').removeClass('show').addClass('hidden')
        })


        $('#addNewsForm').on('submit', function(e){
            e.preventDefault()

            $.ajax({
                type: 'POST',
                url: '/root/news/save',
                contentType: 'application/x-www-form-urlencoded',
                data: $(this).serialize()
            }).done(function(result) {
                console.log(result)
                if(result.tag === 0 && result.success === 1) {
                    $('#msgModal').on('show.bs.modal',  function() {
                        $('#modal-panel').removeClass('panel-danger').addClass('panel-success')
                        $('#message').text('发布成功')
                        $(this).off('show.bs.modal')
                    })
                    $('#msgModal').on('hidden.bs.modal',function(){
                        location.reload()
                    })
                }else if(result.tag === 1 && result.success === 0){
                    $('#msgModal').on('show.bs.modal',  function() {
                        $('#modal-panel').removeClass('panel-success').addClass('panel-danger')
                        $('#message').text('该标题已存在，请修改后再录入')
                        $(this).off('show.bs.modal')
                    })
                }
                $('#msgModal').modal({
                    keyboard: true
                })
                $(this).off('submit')
            })
        })
    })


    $('.delNews').click(function(e){
        var target = $(this)
        var id = target.data('id')
        var tr = $('.item-id-' + id)

        $.ajax({
            type: 'DELETE',
            url: '/root/news/del',
            contentType: 'application/json',
            data: JSON.stringify({
                _id: id
            })
        }).done(function(result){

            if(result.success === 1){
                $('#msgModal').on('show.bs.modal',  function() {
                    $('#modal-panel').removeClass('panel-success').addClass('panel-danger')
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
    })

})