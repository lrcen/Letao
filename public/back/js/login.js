$(function () {

    // 获取表单
    var $form = $("form");

    //表单校验功能
    //bootstrapValidator插件
    $form.bootstrapValidator({
        //显示的小图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },

        //设置字段名的校验规则
        fields: {
            username: {
                validators: {
                    //不能为空条件
                    notEmpty: {
                        //提示信息, 为空时
                        message: '用户名不能为空!'
                    }
                }
            },
    
            password: {
                validators: {
                    notEmpty: {
                        message: '密码不能为空!'
                    },
    
                    //校验密码的长度
                    stringLength: {
                        //最小长度
                        min: 6,
                        //最大长度
                        max: 16,
                        message: '密码长度为6 - 16位'
                    }
                }
            }
        }
    });

    //重置按钮, 重置输入框以及样式
    $("[type='reset']").on("click", function() {
        // $form.data('bootstrapValidator'); 会得到一个validator实例
        $form.data('bootstrapValidator').resetForm();
    });

    //阻止表单的默认行为, 要使用ajax
    $('[type="submit"]').on("click", function(e) {
        e.preventDefault();

        //当点击登录时, 发送ajax请求
        $.ajax({
            url: "/employee/employeeLogin",
            type: 'post',
            // form对象.serialize()方法可以获取表单中所有带有name属性的表单元素, 并以 key=value&key2=value2&.. 进行拼接
            data: $form.serialize(),
            success: function(backData) {
                console.log(backData);
            }
        });
    });

});