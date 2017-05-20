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
                        showModal({
                            success: true,
                            msg: '删除成功!',
                            successCb: function(){
                                setTimeout(function(){
                                    tr.remove()
                                }, 500)
                            }
                        })
                    }else {
                        showModal({
                            success: false,
                            msg: '删除失败，请稍后再试！',
                            failCb: function(){
                                location.reload()
                            }
                        })
                    }

                    $('#msgModal').modal({
                        keyboard: true
                    })
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

                    showModal({
                        success: true,
                        msg: '发布成功！',
                        successCb: function(){
                            location.reload()
                        }
                    })
                }else if(result.tag === 1 && result.success === 0){
                    showModal({
                        success: false,
                        msg: '该标题已存在，请修改后再录入',
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
                showModal({
                    success: true,
                    msg: '删除成功！',
                    successCb: function(){
                        setTimeout(function(){
                            tr.remove()
                        },500)
                    }
                })
            }else {
                showModal({
                    success: false,
                    msg: '删除失败，请稍后后重试！',
                    successCb: function(){
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