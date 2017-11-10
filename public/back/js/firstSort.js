$(function() {

    var pageNum = 1;
    var pageSize = 5;

    function render() {
        $.ajax({
            url: '/category/queryTopCategoryPaging',
            data: {
                page: pageNum,
                pageSize: pageSize
            },
            success: function(backData) {
                $('tbody').html(template('sortTmp', backData));
    
                $('#paginator').bootstrapPaginator({
                    bootstrapMajorVersion: 3,
                    totalPages: Math.ceil(backData.total / pageSize),
                    currentPage: pageNum,
                    numberOfPages: 3,
                    onPageClicked: function(arg1, arg2, arg3, page) {
                        pageNum = page;
    
                        render();
                    }
                });
            }
        });
    }

    render();


    var $form = $('form');

    $(".btn-add").on('click', function() {
        $("#addmodal").modal("show");

        $form.bootstrapValidator({
            feedbackIcons: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },

            fields: {
                categoryName: {
                    validators: {
                        notEmpty: {
                            message: '分类名称不能为空!'
                        }
                    }
                }
            }
        });
    })

    //当表单校验成功时
    $form.on('success.form.bv', function() {
        $.ajax({
            url: '/category/addTopCategory',
            type: 'post',
            data: $form.serialize(),
            success: function(backData) {
                $("#addmodal").modal('hide');

                //因为新增的数据会渲染到第一页
                pageNum = 1;

                render();

                $form.data('bootstrapValidator').resetForm(); // 只会重置样式

                $form[0].reset(); //h5的新方法, 重置所有表单元素为默认值, 效果和type=reset一样
            }
        });
    })  

    //点击取消时
    $('.btn-cancel').on('click', function() {
        $form.data('bootstrapValidator').resetForm();
        $form[0].reset();
    })
})