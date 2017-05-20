$('#signupForm').submit(function(e){
    e.preventDefault();
    var role = $(this).data('role')
    var ajaxUrl = '' 

    switch(role){
        case 'root': ajaxUrl = '/root/signup'; break;
        case 'admin': ajaxUrl = '/root/admin/add'; break;
        case 'normal': ajaxUrl = '/user/signup'; break;
        default: ajaxUrl = '/user/signup'
    }


    $.ajax({
        type: 'POST',
        url: ajaxUrl,
        contentType: 'application/x-www-form-urlencoded',
        data: $(this).serialize()
    })
    .done(function(result){
        console.log(result)
        var data = result
        if(!data.tag && data.success === 0){
            showModal({
                success:false,
                msg:'数据库查询/存储失败！'
            })
        }else if(data.tag === 1 && data.success === 0){
            showModal({
                success:false,
                msg:'该用户已存在，请修改用户名！'
            })
        }else if(data.tag === 0 && data.success === 1){
            showModal({
                success:true,
                msg:'注册成功!',
                successCb: function(){
                    location.href = document.referrer
                }
            })
        }  

        $('#msgModal').modal({
            keyboard: true
        })     
    })
})


