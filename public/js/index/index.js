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
                    var borrowStr = '<button class="borrow btn btn-default btn-info btn-sm" data-bookid="' + item._id + '" data-tid="' + userid + '">借阅</button>'
                }

                booksTbodyStr += '<tr class="item-id-' + item._id +'">'+
                        '<td>' + item.name + '</td>' +
                        '<td>' + item.classification + '</td>' +
                        '<td>' + item.borrowinfo + '</td>' +
                        '<td>' + item.createAt + '</td>' +
                        '<td><a target="_blank" href="/book/view/' + item._id + '">查看</a></td>' + 
                        '<td>' + borrowStr + '</td>'
                    '</tr>'
            }

            $('#booksTbody').html(booksTbodyStr)

            $(".borrow").click(borrowHandle)
        }) 
    })


    $(".borrow").click(borrowHandle)

    function borrowHandle(e){
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
                showModal({
                    success: false,
                    msg:'无权限,请登陆后在进行操作！',
                })
            }else if(!result.isExist){

                showModal({
                    success: false,
                    msg: '该书籍已被删除，看看其他的书籍吧！',
                    failCb: function(){
                        location.reload()
                    }
                })
            }else if(result.success === 0) {

                showModal({
                    success: false,
                    msg: '借阅失败,请稍后重试！',
                    failCb: function(){
                        location.reload()
                    }
                })
            }else if(result.success === 1){

                showModal({
                    success: true,
                    msg: '借阅成功',
                    successCb: function(){
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