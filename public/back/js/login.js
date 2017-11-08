$(function () {

    // 获取表单
    var $form = $("form");

    //表单校验功能
    //bootstrapValidator插件
    $fomr.bootstrapValidator({
        //显示的小图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },

        //设置字段名的校验规则
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
    });

});