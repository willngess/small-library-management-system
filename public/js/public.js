$(document).ready(function(){

    function helloUser(){
        var time = new Date().getHours()
        var helloStr = ''


        if(time > 6 && time <= 9){
            helloStr = '早上好'
        }else if(time > 9 && time <= 14){
            helloStr = '中午好'
        }else if(time > 14 && time <= 18){
            helloStr = '下午好'
        }else if(time > 0 && time <= 6){
            helloStr = '新的一天'
        }else {
            helloStr = '晚上好'
        }

        if($('#hello').text().indexOf(helloStr) != -1) {
            return
        }
        $('#hello').html(helloStr + $('#hello').html())

    }
    setTimeout(helloUser, 0)
    setInterval(helloUser,500)

    $('#signinForm').submit(function(e) {
        e.preventDefault()
        var path = $('[name="user[role]"]').val()

        $.ajax({
            type: 'POST',
            url: '/' + path + '/signin',
            contentType: 'application/x-www-form-urlencoded',
            data: $(this).serialize()
        })
        .done(function(result){
            console.log(result)
            var data = result
            if(data.tag === undefined && data.success === 0){
                $('#errMsg').removeClass('text-success').addClass('text-danger').text('数据库查询失败！')
            }else if(data.tag === 0 && data.success === 0){
                $('#errMsg').removeClass('text-success').addClass('text-danger').text('用户不存在！')
            }else if(data.tag === 1 && data.success === 0){
                $('#errMsg').removeClass('text-success').addClass('text-danger').text('密码错误！')
            }else if(data.tag === 1 && data.success === 1){
                $('#errMsg').removeClass('text-danger').addClass('text-success').text('登陆成功！')
                setTimeout(function(){
                    location.reload()
                },500)      
            }

        })
    })
})


function showModal(options){

    var idName = options.idName ? "#" + options.idName : '#msgModal'
    var success = options.success || false
    var msg = options.msg || '失败'
    var successCb = options.successCb || function(){}
    var failCb = options.failCb || function(){}

    if(success) {
        $(idName).on('show.bs.modal',  function() {
            $('#modal-panel').removeClass('panel-danger').addClass('panel-success')
            $('#message').text(msg)
            $(this).off('show.bs.modal')
        })
        $('#msgModal').on('hidden.bs.modal',successCb)
    }else {
        $(idName).on('show.bs.modal',  function() {
            $('#modal-panel').removeClass('panel-success').addClass('panel-danger')
            $('#message').text(msg)
            $(this).off('show.bs.modal')
        })
        $('#msgModal').on('hidden.bs.modal',failCb)
    }

}