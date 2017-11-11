$(function() {
    var pageNum = 1;
    var pageSize = 5;

    var render = function() {
        $.ajax({
            url: '/product/queryProductDetailList',
            data: {
                page: pageNum,
                pageSize: pageSize
            },
            success: function(backData) {
                $("tbody").html(template('prolistTmp', backData));

                $('#paginator').bootstrapPaginator({
                    bootstrapMajorVersion: 3,
                    totalPages: Math.ceil(backData.total / pageSize),
                    currentPage: pageNum,
                    onPageClicked: function(arg1, arg2, arg3, page) {
                        pageNum = page;

                        render();
                    }
                })
            }
        });
    }
    render();

    $('.btn-add').on('click', function() {
        $('#addmodal').modal('show');

        $.ajax({
            url: '/category/querySecondCategoryPaging',
            type: 'get',
            data: {
                page: 1,
                pageSize: 100
            },
            success: function(backData) {
                $(".dropdown-menu").html(template('secondSortTmp', backData));
            }

        });
    })

    $('.dropdown-menu').on('click', 'a', function() {
        $('.choosesort').text($(this).text());

        $('#brandId').val($(this).data('id'));

        $form.data('bootstrapValidator').updateStatus('brandId', 'VALID');
    })

    //校验表单
    var $form = $('form');
    $form.bootstrapValidator({
        excluded: [],

        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },

        fields: {
            brandId: {
                validators: {
                    notEmpty: {
                        message: '请选择分类 !'
                    }
                }
            },

            proName: {
                validators: {
                    notEmpty: {
                        message: '商品名称不能为空 !'
                    }
                }
            },

            proDesc: {
                validators: {
                    notEmpty: {
                        message: '商品描述不能为空 !'
                    }
                }
            },

            num: {
                validators: {
                    notEmpty: {
                        message: '商品库存不能为空 !'
                    },

                    regexp: {
                        regexp: /^[1-9]\d{0,3}$/,
                        message: '格式不符, 请输入小于10000的正整数, 如: 9999'
                    }
                }
            },

            size: {
                validators: {
                    notEmpty: {
                        message: '商品尺码不能为空 !'
                    },

                    regexp: {
                        regexp: /^[1-7]\d-[1-7]\d$/,
                        message: '格式不符, 请输入一个尺码区间, 区间范围为10-79 如: 10 - 50'
                    }
                }
            },

            oldPrice: {
                validators: {
                    notEmpty: {
                        message: '商品原价不能为空 !'
                    }
                }
            },

            price: {
                validators: {
                    notEmpty: {
                        message: '商品原价不能为空 !'
                    }
                }
            },

            forcheck: {
                validators: {
                    notEmpty: {
                        message: '请选择三张图片 !'
                    }
                }
            }
        }
    })


    // 重置样式 内容等
    function resetAll(){
        $form.data('bootstrapValidator').resetForm();
        $form[0].reset();

        $('.choosesort').text('请选择二级分类');
        $('#brandId').val('');

        $('.img-box img').remove();
        $('#forcheck').val('');
    }

    $('.btn-cancel').on('click', function() {
        resetAll();
    })

    $('#btn-pic').fileupload({
        dateType: 'json',
        done: function(e, data) {
            // console.log(data.result);
            $('.img-box').prepend('<div class="preview" data-name="'+data.result.picName+'" data-addr="'+data.result.picAddr+'"> <i class="glyphicon glyphicon-remove"></i> <img src="'+data.result.picAddr+'"> </div>');

            if($('.img-box .preview').length === 3) {
                $form.data('bootstrapValidator').updateStatus('forcheck', 'VALID');
            }else {
                $form.data('bootstrapValidator').updateStatus('forcheck', 'INVALID');
            }

            $('.preview i').on('click', function() {
                $(this).parent().empty().remove();

                if($('.img-box .preview').length === 3) {
                    $form.data('bootstrapValidator').updateStatus('forcheck', 'VALID');
                }else {
                    $form.data('bootstrapValidator').updateStatus('forcheck', 'INVALID');
                }
            })
        }
    })

    var data = '';
    $form.on('success.form.bv', function() {
        data = $form.serialize();
        // console.log(data);

        data += '&picName1=' + $('.img-box .preview')[0].dataset.name + '&picAddr1=' + $('.img-box .preview')[0].dataset.addr;
        data += '&picName2=' + $('.img-box .preview')[1].dataset.name + '&picAddr2=' + $('.img-box .preview')[1].dataset.addr;
        data += '&picName3=' + $('.img-box .preview')[2].dataset.name + '&picAddr3=' + $('.img-box .preview')[2].dataset.addr;

        $.ajax({
            url: '/product/addProduct',
            type: 'post',
            data: data,
            success: function(backData) {
                $('#addmodal').modal('hide');

                pageNum = 1;
                
                render();
            }
        })
    })
});