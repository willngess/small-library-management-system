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

    console.log(ajaxUrl)

    $.ajax({
        type: 'POST',
        url: ajaxUrl,
        contentType: 'application/x-www-form-urlencoded',
        data: $(this).serialize()
    })
    .done(function(result){
        var data = result
        if(!data.tag && data.success === 0){
            console.log('数据库查询/存储失败')
        }else if(data.tag === 1 && data.success === 0){
            console.log('该用户已存在')
        }else if(data.tag === 0 && data.success === 1){
            console.log('注册成功')
            signupSuccess(role)
        }       
    })
})


function signupSuccess(role) {
    if(role != 'admin'){
        location.href = '/' + role
    }else {
        location.href = document.referrer
    }
}