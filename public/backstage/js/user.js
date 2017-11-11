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
            success: function(data) {
                $('tbody').html(template('userTmp', data));

                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion: 3,
                    totalPages: Math.ceil(data.total / pageSize),
                    numberOfPages: 5,
                    currentPage: pageNum,
                    onPageClicked: function(a, b, c, page) {
                        pageNum = page;

                        render();
                    }
                });
            }
        });
    }

    render();


    var id = 0;
    var isDelete = 0;
    $('tbody').on('click', 'button', function() {
        id = $(this).parent().data('id');
        isDelete = $(this).hasClass('btn-danger') ? 0 : 1;

        $('#modifymodal').modal('show');

        $(".btn-sure").off().on('click', function() {
            $.ajax({
                url: '/user/updateUser',
                type: 'post',
                data: {
                    id: id,
                    isDelete: isDelete
                },
                success: function(data) {
                    $('#modifymodal').modal('hide');
                    render();
                }
            })
        })
    })
})