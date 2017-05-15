$(document).ready(function(){

    function helloUser(){
        var time = new Date().getHours()
        var helloStr = ''


        if(time > 6 && time <= 9){
            helloStr = '早上好'
        }else if(time > 9 && time <= 14){
            helloStr = '中午好'
        }else if(time > 14 && time <= 19){
            helloStr = '下午好'
        }else{
            helloStr = '晚上好'
        }

        if($('#hello').text().indexOf(helloStr) != -1) {
            return
        }
        $('#hello').text(helloStr + $('#hello').text())

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
                console.log('数据库查询失败')
            }else if(data.tag === 0 && data.success === 0){
                console.log('用户不存在')
            }else if(data.tag === 1 && data.success === 0){
                console.log('密码错误')
            }else if(data.tag === 1 && data.success === 1){
                console.log('登陆成功')
                location.reload()
            }       

        })
    })
})