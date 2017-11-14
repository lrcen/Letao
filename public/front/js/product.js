$(function () {

    function startLoading() {
        var start = 0;
        var end = 90;
        var timerID = null;
        var canvas = document.querySelector("#canvas");
        var context = canvas.getContext('2d');

        context.lineWidth = 4;
        context.strokeStyle = 'darkturquoise';

        timerID = setInterval(function () {
            context.clearRect(0, 0, 30, 30);
            context.beginPath();

            context.arc(15, 15, 13, Math.PI / 180 * start, Math.PI / 180 * end);
            context.stroke();

            start += 5;
            end += 5;

            if (start % 500 == 0) {
                clearInterval(timerID);
            }

        }, 10);
    }


    //获取url中的参数
    var proName = tools.getParamInUrlByKey('productid');
    // console.log(proName);
    //显示在搜索框上
    $('.search input').val(proName);

    var pageNum = 1;
    var pageSize = 999;
    // 发送ajax
    function render() {

        if ($('.sort a').hasClass('active')) {
            //如果四个选择中有任一个含有active, 说明发送的ajax中的data需要额外的参数, 否则只需要三个参数
            var type = $('.sort a.active').data('type');
            var sortBy = $('.sort a.active').children('i').hasClass('fa-angle-down') ? 2 : 1;

            var dataObj = {
                page: pageNum,
                pageSize: pageSize,
                proName: proName
            };

            dataObj[type] = sortBy;

            $.ajax({
                url: '/product/queryProduct',
                data: dataObj,
                success: function (backData) {
                    $('.lists ul').html(template('listsTmp', backData));
                }
            })

        } else {
            //未修改开始部分
            $.ajax({
                url: '/product/queryProduct',
                data: {
                    proName: proName,
                    page: pageNum,
                    pageSize: pageSize
                },
                success: function (backData) {
                    // console.log(backData);
                    $('.lists ul').html(template('listsTmp', backData));
                }
            });
            //未修改结束部分
        }
    }

    startLoading(); //开始进入页面, 加载
    setTimeout(function () {
        render(); //一秒后, 渲染数据
        end = 0;
        start = 0; //重置
    }, 1000);

    //搜索功能
    $('.search button').on('click', function () {
        var val = $(this).prev().val().trim();

        if (!val) {
            mui.toast('请输入搜索关键字');
            return false;
        }

        proName = val;

        //此时, ul里的内容已经是一开始渲染的数据了, 就是说原本写的div和canvas就不见了
        $('.lists ul').html('<div class="loading"><canvas id="canvas" width="30" height="30"></canvas></div>');

        startLoading();
        setTimeout(function () {
            render();
            end = 0;
            start = 0;
        }, 1000);
    })

    //价格和库存的排序
    // 实现点击切换
    $('.sort a').on("click", function () {

        if ($(this).hasClass('active')) {
            //有你没他 有他没你
            $(this).children('i').toggleClass('fa-angle-down').toggleClass('fa-angle-up');
        }

        $(this).addClass('active').siblings('a').removeClass('active').children('i').removeClass('fa-angle-up').addClass('fa-angle-down');

        var type = $(this).data('type'); //获取当前点击的a标签的自定义属性type, 依次判断要依照哪个进行排序. 第一个和第四个没有, 所以不进行排序
        // var sortBy = $(this).children('i').hasClass('fa-angle-down') ? 2 : 1;

        if (type) {
            //第一种做法
            //如果有值, 就发送请求
            // $.ajax({
            //     url: '/product/queryProduct',
            //     data: {
            //     page: pageNum,
            //     pageSize: pageSize,
            //     type: sortBy //但是, 后台接口要求的参数名并不是type, 可是我们怎么知道用户选的是price还是num或者其他?
            // }
            // });

            //因为data数据可以接收一个对象, 所以可以: 

            // var dataObj = {
            //     page: pageNum,
            //     pageSize: pageSize,
            //     proName: proName
            // };
            // dataObj[type] = sortBy;

            // $.ajax({
            //     url: '/product/queryProduct',
            //     data: dataObj,
            //     success: function(backData) {
            //         $('.lists ul').html(template('listsTmp', backData));
            //     }
            // });

            // 第二种做法
            // 直接修改render()函数

            $('.lists ul').html('<div class="loading"><canvas id="canvas" width="30" height="30"></canvas></div>');

            startLoading();
            setTimeout(function () {
                render();
                end = 0;
                start = 0;
            }, 1000);
        }

    });

});