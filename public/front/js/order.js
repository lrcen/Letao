$(function() {

    var id = tools.getParamInUrlByKey('productid');
    // console.log(id);

    $.ajax({
        url: '/product/queryProductDetail',
        data: {
            id: id
        },
        success: function(backData) {
        //    console.log(backData);
            $('.mui-scroll').html(template('detailTmp', backData));

            var gallery = mui('.mui-slider');
            gallery.slider({
              interval: 3000
            });

            mui(".mui-numbox").numbox();
        }
    });

    $('.mui-scroll').on('click', "li", function() {
        $(this).addClass('active').siblings("li").removeClass('active');
    });

    //添加至购物车
    $('.btn-addcar').on('click', function() {
        var num = $('.num input').val();
        var size = $(".size ul li.active").text();

        if(!size) {
            mui.toast('请选择尺码');
            return false;
        }

        $.ajax({
            url: '/cart/addCart',
            type: 'post',
            data: {
                productId: id,
                num: num,
                size: size
            },
            success: function(backData) {
                // console.log(backData);
                if(backData.error === 400) {
                    location.href = 'login.html?linkfrom=' + location.href;
                }else {
                    mui.confirm('添加商品至购物车成功 !', '提示', ["去购物车", "继续购物"], function(e) {
                        if(e.index == 0) {
                            location.href = "shopcar.html";
                        }
                    })
                }
            }
        })
    });

    
    
});