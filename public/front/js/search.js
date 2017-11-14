
$(function() {
    // 查询本地缓存
    function getStorage(){
        var history = localStorage.getItem('search-history');

        return JSON.parse(history);
    }

    // 查历史记录 并渲染
    function render() {
        //如果没有键为search-history, 则函数返回null, 所以当没有时, 给一个空数组, 方便后续操作
        var historyArr = getStorage() || [];
    
        $(".history").html(template('historyTmp', {arr: historyArr}));
    }

    render();

    //清空历史记录
    $(".history").on('click', ".clear-history", function() {
        mui.confirm('确定清空搜索历史记录吗? -  Are you sure to clear the search history?', '系统提示', ["确定", "取消"], function(e) {
            if(e.index === 0) {
                localStorage.removeItem('search-history');
                render();
            }
        });
    });


    //删除某一条数据
    $('.history').on('click', '.remove-history', function() {
        var index = $(this).data('index');
        //先拿到本地缓存数据
        var historyArr = getStorage();

        //通过索引删除数组中对应位置的元素
        historyArr.splice(index, 1);// splice会改变原数组

        //再把原数组变成字符串存放回缓存中
        localStorage.setItem('search-history', JSON.stringify(historyArr) );

        //重新渲染
        render();
    });

    //新增记录
    // 当点击搜索后, 新增当前搜索的记录
    $(".btn-search").on("click", function() {
        var val = $(".search input").val().trim();
        $(".search input").val('');
        var historyArr = getStorage() || []; //有可能有记录, 有可能没有

        if(!val) {
            mui.toast('请输入搜索关键字');
            return false;
        }

        //如果已搜索的内容已经存在于记录中
        var indexIn = historyArr.indexOf(val);
        if(indexIn !== -1) {
            //删除该记录
            historyArr.splice(indexIn, 1);
        }

        //如果记录超过20条, 则只保留20条, 最后的记录删除
        if(historyArr.length >= 20) {
            historyArr.pop();
        }

        //上述两个判断不能调换顺序, 如果先判断是否大于等于20, 假设满足, 删除了最后一条记录, 再判断是否重复, 可能会再删除一条, 会导致可能删除两条!

        historyArr.unshift(val);

        localStorage.setItem('search-history', JSON.stringify(historyArr));

        render();

        location.href="product.html?productid=" + val;
    });

    
});

