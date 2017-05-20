$(function(){
    $('#addbook').click(function(){
        $('#addBookContainer').removeClass('hidden').addClass('show')

        $('#closeBookForm').click(function(e) {
            $('#addBookContainer').removeClass('show').addClass('hidden')
        })

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
                    showModal({
                        success: true,
                        msg: '录入成功!',
                        successCb: function(){
                            location.reload()
                        }
                    })
                }else if(result.tag === 1 && result.success === 0){
                    showModal({
                        success: false,
                        msg: '该名字已存在，请修改后再录入!',
                    })
                }
                $('#msgModal').modal({
                    keyboard: true
                })
                $(this).off('submit')
            })
        })
    })

    $('.delBook').click(function(e) {

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
            console.log(result)
            if(result && result.success === 1){
                showModal({
                    success: true,
                    msg: '删除成功!',
                    successCb: function(){
                        setTimeout(function(){
                            tr.remove()
                        }, 500)
                    }
                })
            }else{
                showModal({
                    success: true,
                    msg: '删除失败!',
                })
            }
            
            $('#msgModal').modal({
                keyboard: true
            })
        })
    })
})