$(document).ready(function() {

    $('#searchClfica').submit(function(e) {
        e.preventDefault()

        var userid = $(this).data('userid')

        $.ajax({
            type: 'POST',
            url: '/book/search',
            contentType: 'application/x-www-form-urlencoded',
            data: $(this).serialize()
        })
        .done(function(result) {
            var books = JSON.parse(result.books)

            console.log(books.slice(-1))
            var booksTbodyStr = '' 

            for(item of books) {

                if(item.borrowinfo && item.borrowinfo.type == true) {
                    var borrowStr = '<button class="borrow btn btn-default btn-info btn-sm" data-bookid="' + item._id + '" data-tid="' + userid + '" disabled>借阅</button>'
                }else {
                    var borrowStr = '<button class=" borrow btn btn-default btn-info btn-sm active data-bookid="' + item._id + '" data-tid="' + userid + '">借阅</button>'
                }

                booksTbodyStr += '<tr class="item-id-' + item._id +'">'+
                        '<td>' + item.name + '</td>' +
                        '<td>' + item.classification + '</td>' +
                        '<td>' + item.borrowinfo + '</td>' +
                        '<td>' + item.createAt + '</td>' +
                        '<td><a target="_blank" href="../admin/book/view/' + item._id + '">查看</a></td>' + 
                        '<td>' + borrowStr + '</td>'
                    '</tr>'
            }

            $('#booksTbody').html(booksTbodyStr)
        }) 
    })


    $(".borrow").click(function(e){
        var target = $(this)
        var bookid = target.data('bookid')
        var tid = target.data('tid')
        $.ajax({
            type:'POST',
            url:'/book/borrow',
            contentType: 'application/json',
            data:JSON.stringify({
                bookid: bookid,
                tid: tid
            })
        }).done(function(result) {

            if(!result.isSignin){
                $('#msgModal').on('show.bs.modal',  function() {
                    $('#modal-panel').removeClass('panel-danger').addClass('panel-success')
                    $('#message').text('无权限,请登陆后在进行操作！')
                    $(this).off('show.bs.modal')
                })

            }else if(!result.isExist){
                $('#msgModal').on('show.bs.modal',  function() {
                    $('#modal-panel').removeClass('panel-danger').addClass('panel-success')
                    $('#message').text('该书籍已被删除，刷新后看看其他的书籍吧！')
                    $(this).off('show.bs.modal')
                })
            }else if(result.success === 0) {
                $('#msgModal').on('show.bs.modal',  function() {
                    $('#modal-panel').removeClass('panel-danger').addClass('panel-success')
                    $('#message').text('借阅失败,请刷新后重试！')
                    $(this).off('show.bs.modal')
                })

            }else if(result.success === 1){
                $('#msgModal').on('show.bs.modal',  function() {
                    $('#modal-panel').removeClass('panel-danger').addClass('panel-success')
                    $('#message').text('借阅成功')
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