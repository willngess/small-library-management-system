$(function(){
    $('#addbook').click(function(){
        $('.hidden').removeClass('hidden').addClass('show')

        $('#addBookForm').on('submit', function(e){
            e.preventDefault()

            $.ajax({
                type: 'POST',
                url: '/admin/book/save',
                contentType: 'application/x-www-form-urlencoded',
                data: $(this).serialize()
            }).done(function(result) {
                console.log(result)
                if(result.tag === 0 && result.success === 1) {
                    $('#msgModal').on('show.bs.modal',  function() {
                        $('#modal-panel').removeClass('panel-danger').addClass('panel-success')
                        $('#message').text('录入成功')
                        $(this).off('show.bs.modal')
                    })
                    $('#msgModal').on('hidden.bs.modal',function(){
                        location.reload()
                    })
                    // $('.show').removeClass('show').addClass('hidden')
                }else if(result.tag === 1 && result.success === 0){
                    $('#msgModal').on('show.bs.modal',  function() {
                        $('#modal-panel').removeClass('panel-success').addClass('panel-danger')
                        $('#message').text('该名字已存在，请修改后再录入')
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

    $('.del').click(function(e) {

        var target = $(this)
        var id = target.data('id')
        var tr = $('.item-id-' + id)

        $.ajax({
            type: 'DELETE',
            url: '/admin/book',
            contentType: 'application/json',
            data: JSON.stringify({
                _id: id
            })
        }).done(function(result){

            if(result.success === 1){
                tr.children().last().innerHTML = '删除成功'
                setTimeout(function(){
                    tr.remove()
                }, 500)
            }
        })
    })
})