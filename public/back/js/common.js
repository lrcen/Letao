// 跳转时的进度条效果

//ajax全局事件 共6个
// ajax.start() 第一个ajax请求开始时触发
//ajax.stop() 当最后一个请求结束时触发

//注册给document或者window

$(document).ajaxStart(function() {
    NProgress.start(); //进度条开始
});

$(document).ajaxStop(function() {
    //因为都是在本地, 速度会很快, 手动增加延时
    setTimeout(function() {
        NProgress.done(); //进度条结束
    }, 500);
});

    //判断是否已经登录, 如果当前url中不包含login.html, 即不是登录页面, 进行判断
    if(location.href.indexOf('login.html') == -1) {
        $.ajax({
            url: '/employee/checkRootLogin',
            success: function(backData) {
                if(backData.error === 400) {
                    location.href = 'login.html';
                }
            }
        })
    }


    var nowtime = new Date();
    var hour = nowtime.getHours();
    var when = $(".greet p:first-of-type span");
    if(hour >= 6 && hour <= 10) {
        when.html('早上');
    }else if(hour > 10 && hour <= 13) {
        when.html("中午");
    }else if(hour > 13 && hour <= 18) {
        when.html("下午");
    }else if(hour > 18 && hour <= 23) {
        when.html("晚上");
    }else {
        when.html("凌晨");
    }


    $('.sorts').prev().on('click', function() {
        $(this).next().slideToggle();
    });


    $('#detail-infos .topbar a:first-of-type').on('click', function() {
        // $('#aside').animate({'left': '-20%'}, 1000);
        // $('#detail-infos').animate({'margin-left': 0}, 1000);

        $('#aside').toggleClass('active');
        $('#detail-infos').toggleClass('active');
        $('#detail-infos .topbar').toggleClass('active');
    });

    $('#detail-infos .topbar a:last-of-type').on('click', function() {
        $('#modal').modal('show');

        //如果在这里面注册点击退出事件, 那么每次触发上面的模态框show事件, 
        //就会注册一次该事件, 而on注册事件是可以多次注册的, 不会发生覆盖,
        //当真正触发退出事件时, 可能会已经被注册很多次, 而如果该事件内有
        //ajax请求, 就会执行多次, 所以可以注册在外面.如果就想注册在这里, 做法如下:
        $('.btn-quit').off().on('click', function() {
            //off() : 解绑所有事件
            //off('事件名'): 解绑所有指定事件
            $.ajax({
                url: '/employee/employeeLogout',
                success: function(backData) {
                    if(backData.success) {
                        location.href = 'login.html';
                    }
                }
            });
        })
    });