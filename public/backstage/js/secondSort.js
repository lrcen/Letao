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
                $('tbody').html(template('secondsortTmp', backData));

                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion: 3,
                    totalPages: Math.ceil(backData.total / pageSize),
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
});