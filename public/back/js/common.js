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
    }, 1000);
})