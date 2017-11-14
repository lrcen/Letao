$(function() {

    $('.btn-getcode').on('click', function() {
        var that = $(this);
        var count = 60;
        $(this).addClass('disabled').text(count + '秒后重新获取').prop('disabled', true);
        $.ajax({
            url: "/user/vCode",
            success: function(backData) {
                // console.log(backData);
                mui.alert(backData.vCode, '验证码', "确认");
            }
        });
        var timerID = setInterval(function() {
            count--;
            that.text(count + "秒后重新获取");
            if(count === 0) {
                clearInterval(timerID);
                that.text('获取验证码').prop('disabled', false).removeClass('disabled');
            }
        }, 1000);
    })

    //校验信息
    $('.btn-register').on('click', function() {
        var username = $('[name="username"]').val().trim();
        var password = $('[name="password"]').val().trim();
        var conpassword = $('[name="conpassword"]').val().trim();
        var mobile = $('[name="mobile"]').val().trim();
        var vcode = $('[name="vCode"]').val().trim();

        if(!username) {
            mui.toast('用户名不能为空');
            return false;
        }else if(username.indexOf(" ") != -1) {
            mui.toast('用户名不能含有空格');
            return false;
        }

        if(!password) {
            mui.toast('密码不能为空');
            return false;
        }else if(password.length < 6 || password.length > 16) {
            mui.toast('密码长度为6 - 16位');
            return false;
        }else if(password.indexOf(" ") != -1) {
            mui.toast('密码不能包含空格');
            return false;
        }

        if(!conpassword) {
            mui.toast('请再次输入密码');
            return false;
        }else if(conpassword !== password) {
            mui.toast('两次密码输入不一致');
            return false;
        }

        if(!mobile) {
            mui.toast('手机号不能为空');
            return false;
        }else if(!/1[34578]\d{9}/.test(mobile)) {
            mui.toast('手机号格式不正确');
            return false;
        }

        if(!vcode) {
            mui.toast('请输入验证码');
            return false;
        }

        $.ajax({
            url: '/user/register',
            type: 'post',
            data: {
                username: username,
                password: password,
                mobile: mobile,
                vCode: vcode
            },
            success: function(backData) {
                if(backData.success){
                    location.href = 'user.html';
                }else {
                    mui.toast(backData.message);
                }
            }
        });
    });


});