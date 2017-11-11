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
            success: function(data) {
                $('tbody').html(template('firstsortTmp', data));

                $('#paginator').bootstrapPaginator({
                    bootstrapMajorVersion: 3,
                    totalPages: Math.ceil(data.total / pageSize),
                    numberOfPages: 5,
                    currentPage: pageNum,
                    onPageClicked: function(a, b, c, page) {
                        pageNum = page;

                        render();
                    }
                })
            }
        }); 
    }   

    render();

    var $form = $('form');
    $(".btn-add").on('click', function() {
        $('#addmodal').modal('show');
        // $form.bootstrapValidator({
        //     feedbackIcons: {
        //         valid: 'glyphicon glyphicon-ok',
        //         invalid: 'glyphicon glyphicon-remove',
        //         validating: 'glyphicon glyphicon-refresh'
        //     },

        //     fields: {
        //         categoryName: {
        //             validators: {
        //                 notEmpty: {
        //                     message: '分类名称不能为空!'
        //                 }
        //             }
        //         }
        //     }
        // });
    })

    


    // $form.on("success.form.bv", function(e) {
    //     e.preventDefault();
    // })
});