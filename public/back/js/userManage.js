$(function() {

    var pageNum = 1;
    var pageSize = 5;

    function render() {
        $.ajax({
            url: '/user/queryUser',
            data: {
                page: pageNum,
                pageSize: pageSize
            },
            success: function(backData) {
                $('tbody').html(template('userTmp', backData));
    
                //分页
                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion: 3, //设置bootstrap版本为3, 默认为2, 为2时外层必须使用div元素, 为3时必须使用ul
                    totalPages: Math.ceil(backData.total / pageSize),
                    currentPage: pageNum,
                    numberOfPages: 6, //设置显示几个页
                    onPageClicked: function(arg1, arg2, arg3, page) { //共四个参数, 前三个没有用上, 自行百度
                        pageNum = page;
    
                        render();
                    }
                });
            }
        })
    }

    render();


    //点击禁用 / 启用按钮   使用代理,
    $('tbody').on("click", '.btn', function() {
        $("#changemodal .modal-body span").html($(this).html());

        $("#changemodal").modal('show');

        var id = $(this).parent().data('id');
        var isDelete = $(this).hasClass('btn-danger') ? 0 : 1;

        $(".btn-confirm").off().on('click', function() {
            $.ajax({
                url: '/user/updateUser',
                type: 'post',
                data: {
                    id: id,
                    isDelete: isDelete
                },
                success: function(backData) {
                    $("#changemodal").modal('hide');

                    render();
                }
            });
        });
    })
});