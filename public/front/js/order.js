$(function() {

    var id = tools.getParamInUrlByKey('productid');
    // console.log(id);

    $.ajax({
        url: '/product/queryProductDetail',
        data: {
            id: id
        },
        success: function(backData) {
           console.log(backData);
            $('.mui-scroll').html(template('detailTmp', {arr: [backData]}));

            var gallery = mui('.mui-slider');
            gallery.slider({
              interval: 3000
            });
        }
    });

    $('.mui-scroll').on('click', "li", function() {
        $(this).addClass('active').siblings("li").removeClass('active');
    });

    
});