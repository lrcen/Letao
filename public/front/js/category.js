$(function() {

    var currentId = 0;

    $.ajax({
        url: '/category/queryTopCategory',
        success: function(backData) {
            // console.log(backData);
            $('.firstsort ul').html(template('firstsortTmp', backData));

            currentId = backData.rows[0].id;

            renderSecond(currentId);
        }
    });

    $('.firstsort ul').on('click', 'li', function() {
        $(this).addClass('active').siblings().removeClass('active');

        renderSecond($(this).data('id'));

        mui('.mui-scroll-wrapper').scroll()[1].scrollTo(0,0,500);
    })

    function renderSecond(id) {

        $.ajax({
            url: '/category/querySecondCategory',
            data: {
                id: id
            },
            success: function(backData) {
                // console.log(backData);
                $('.secondsort ul').html(template('secondsortTmp', backData));
            }
        });

    }

})