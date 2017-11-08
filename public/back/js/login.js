$(function () {

    //获取表单
    var $form = $("form");

    //表单校验插件
    $form.bootstrapValidator({
        //显示的小图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },

        //表单校验规则设置
        fields: {
            username: {
                validators: {
                    notEmpty: {
                        message: '用户名不能为空!'
                    },

                    callback: {
                        message: '用户名不存在!'
                    }
                }
            },

            password: {
                validators: {
                    notEmpty: {
                        message: '密码不能为空!'
                    },

                    stringLength: {
                        min: 6,
                        max: 16,
                        message: '密码长度为6 - 16位!'
                    },

                    callback: {
                        message: '密码错误!'
                    }
                }
            }
        }
    });

    var validator = $("form").data('bootstrapValidator');
    // $("form").data('bootstrapValidator')会得到一个validator实例, resetForm方法可以重置样式以及输入框内容
    //重置按钮 重置输入框以及样式
    $('[type="reset"]').on("click", function() {
        validator.resetForm();
    })

    //提交按钮阻止默认行为, 使用ajax提交
    // $('[type="submit"]').on("click", function(e) { //给提交按钮注册事件
    
    //validator中提供了一个事件
    $form.on("success.form.bv", function(e) {
        e.preventDefault();

        $.ajax({
            url: '/employee/employeeLogin',
            type: 'post',
            data: $form.serialize(),
            success: function(backData) {
                // console.log(backData);
                if(backData.success) {
                    //说明登录成功, 跳转到首页
                    location.href = 'index.html';
                }

                if(backData.error === 1000) {
                    $form.data("bootstrapValidator").updateStatus("username", "INVALID", "callback");
                }

                if(backData.error === 1001) {
                    $form.data("bootstrapValidator").updateStatus("password", "INVALID", "callback");
                }
            }
        });
    })
});