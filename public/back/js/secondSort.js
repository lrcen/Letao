$(function() {

    var pageNum = 1;
    var pageSize = 5;

    function render() {

        $.ajax({

            url: '/category/querySecondCategoryPaging',
            data: {
                page: pageNum,
                pageSize: pageSize
            },
            success: function(backData) {
                // console.log(backData);

                $('tbody').html(template('sortTmp', backData));

                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion: 3,
                    totalPages: Math.ceil(backData.total / pageSize),
                    numberOfPages: 5,
                    onPageClicked: function(arg1, arg2, arg3, page) {
                        pageNum = page;

                        render();
                    }
                });
            }
        });

    }

    render();

    //添加分类
    $(".btn-add").on('click', function() {
        $("#addmodal").modal('show');

        $.ajax({
            url: '/category/queryTopCategoryPaging',
            data: {
                page: 1,
                pageSize: 100
            },
            success: function(backData) {
                $('.dropdown-menu').html(template('firstsortTmp', backData));

            }
        });
    })

    $(".dropdown-menu").on("click", 'a', function() {
        $('.choosesort').text($(this).text());

        $("#categoryId").val($(this).data('id'));

        $form.data('bootstrapValidator').updateStatus('categoryId', 'VALID');
    })

    // 点击上传图片, 发送ajax请求给服务器, 服务器会返回图片的存储位置, 把该路径给img
    $("#btn-pic").fileupload({
        dataType: 'json',
        done: function(e, data) {
            // console.log(data.result.picAddr);

            $('.img-box img').attr('src', data.result.picAddr);

            $("#brandLogo").val(data.result.picAddr);

            $form.data('bootstrapValidator').updateStatus('brandLogo', 'VALID');
        }
    });

    // $('#btn-pic').on('change', function() {
        // console.log($(this).prop('files')[0]); //prop('files')获取图片的信息, 拿到图片的名字
    //     var file = document.querySelector('#btn-pic').files[0]; //原生的方式
    //     // console.log(file);
    //     // 2. 创建fileReader
    //     var reader = new FileReader();
    //     //3. 加载并读取file
    //     reader.readAsDataURL(file);
    //     //4. 使用file
    //     reader.onload = function() {
    //         console.log(reader.result);
    //         // $.ajax({
    //         //     url: '/category/addSecondCategoryPic',
    //         //     type: 'post',
    //         //     data: {
    //         //         pic1: reader.result
    //         //     },
    //         //     success: function(backData) {
    //         //         console.log(backData);
    //         //     }
    //         // })
    //     }
        
    // })

    //表单校验
    var $form = $('form');
    $form.bootstrapValidator({
        //不进行校验的元素, 这样代表全部校验
        excluded: [],

        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },

        fields: {
            categoryId: {
                validators: {
                    notEmpty: {
                        message: '请选择一级分类 !'
                    }
                }
            },

            brandName: {
                validators: {
                    notEmpty: {
                        message: '分类名称不能为空 !'
                    }
                }
            },

            brandLogo: {
                validators: {
                    notEmpty: {
                        message: '请选择一张图片 !'
                    }
                }
            }
        }
    });

    //当校验成功时
    $form.on('success.form.bv', function(e) {
        e.preventDefault();

        $.ajax({
            url: '/category/addSecondCategory',
            type: 'post',
            data: $form.serialize(),
            success: function(backData) {
                if(backData.success) {
                    $("#addmodal").modal('hide');

                    pageNum = 1;
                    render();

                    $form.data('bootstrapValidator').resetForm();
                    $form[0].reset();

                    $('#categoryId').val('');
                    $('#brandLogo').val('');

                    $(".choosesort").text('请选择一级分类');
                    $(".img-box img").attr('src', 'images/none.png');
                }
            }
        })
    })

    //当点击取消按钮时
    $('.btn-cancel').on('click', function() {
        $form.data('bootstrapValidator').resetForm();
        $form[0].reset();

        $("#categoryId").val('');
        $("#brandLogo").val('');

        $('.choosesort').text('请选择一级分类');
        $('.img-box img').attr('src', 'images/none.png');
    })

})