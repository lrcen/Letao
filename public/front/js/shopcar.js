$(function () {

    //下拉刷新组件
    mui.init({
        pullRefresh: {
            container: ".mui-scroll-wrapper",
            down: {
                auto: true,
                callback: function () {
                    setTimeout(function() {
                        mui('.mui-scroll-wrapper').pullRefresh().endPulldownToRefresh();

                        $.ajax({
                            url: "/cart/queryCart",
                            type: 'get',
                            success: function (backData) {
                                console.log(backData);
                                $('#content ul').html(template('cartTmp', {data: backData}));
                            }
                        });
                    }, 1000);
                }
            }
        }
    });


    //修改
    $('#content').on('tap', '.mui-icon-compose', function() {
        mui.confirm(, '编辑商品', ["取消", "确认"], function(e) {
            if(e.index == 1) {
                $.ajax({
                    url: '/cart/updateCart',
                    type: 'post',
                    data: {
                        id: id,
                        size: size,
                        num: num
                    },
                    success: function(backData) {
                        console.log('haha');
                    }
                })
            }
        });
    })

    //删除
    $('#content').on("tap", ".mui-icon-trash", function () {
        var id = $(this).data("id");
        $.ajax({
            url: '/cart/deleteCart',
            data: {
                id: id
            },
            success: function (backData) {
                // console.log(backData);
                mui('.mui-scroll-wrapper').pullRefresh().pulldownLoading();
            }
        });
    });

    //计算总价
    var total = 0;
    $('#content').on('change', ".choose", function() {
        $(".choose:checked").each(function(index, ele) {
            total += ele.dataset.price * ele.dataset.num;
        })
        // console.log(total);
        $('#pay strong').text(total.toFixed(2)); //保留2位小数
    })
});