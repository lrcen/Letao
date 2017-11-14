$(function() {
    //查询用户信息
    $.ajax({
        url: '/user/queryUserMessage',
        success: function(backData) {
            // console.log(backData);
            if(backData){
                $(".mui-media").html(template('userTmp', backData));
            }else {
                location.href = 'login.html';
            }
        }
    });

    //登出操作
    $('.logout button').on('click', function() {
        mui.confirm('你确定要退出登录吗?', '提示信息', ["取消", "确认"], function(e) {
            if(e.index == 1){
                $.ajax({
                    url: "/user/logout",
                    success: function(backData) {
                        if(backData.success) {
                            location.href = 'login.html';
                        }
                    }
                });
            }
        })
    });
});