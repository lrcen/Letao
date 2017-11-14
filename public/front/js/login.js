$(function() {
    var link = location.search;
    link = link.replace("?linkfrom=", "");
    // console.log(link);

    $('.btn-login').on("click", function() {
        var username = $('[type="text"]').val();
        var password = $('[type="password"]').val();

        if(!username) {
            mui.toast('请输入用户名');
            return false;
        }

        if(!password) {
            mui.toast('请输入密码');
            return false;
        }

        $.ajax({
            url: "/user/login",
            type: 'post',
            data: {
                username: username,
                password: password
            },
            success: function(backData) {
                // console.log(backData);
                if(backData.error) {
                    mui.toast(backData.message);
                }else {
                    //登录成功, 如果是因为购物未登录, 则因为跳转回购物页, 如果是手动点进登录, 则跳转到用户中心
                    if(link){
                        location.href = link;
                    }else {
                        location.href = 'user.html';
                    }
                }
            }
        });
    })

});
