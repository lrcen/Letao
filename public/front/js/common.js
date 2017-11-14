mui('.mui-scroll-wrapper').scroll({
	indicators: false
});

// 获取地址栏中的参数

// function getParamInUrl() {

// 	var urlParam = location.search; //?key=value&key=value...

// 	urlParam = urlParam.slice(1);

// 	var urlArr = urlParam.split("&");
// 	var urlObj = {};

// 	for (var i = 0; i < urlArr.length; i++) {
// 		urlObj[urlArr.split("=")[0]] = urlArr.split("=")[1];
// 	}

// 	return urlObj;
// }

// function getParamInUrlByKey(key) {
// 	return getParamInUrl()[key];
// }

var tools = {
	getParamInUrl: function () {
		var urlParam = location.search; //?key=value&key=value...

		//解码操作
		urlParam = decodeURI(urlParam);

		urlParam = urlParam.slice(1);

		var urlArr = urlParam.split("&");
		var urlObj = {};

		for (var i = 0; i < urlArr.length; i++) {
			urlObj[urlArr[i].split("=")[0]] = urlArr[i].split("=")[1];
		}

		return urlObj;
	},

	getParamInUrlByKey: function(key) {
		return this.getParamInUrl()[key];
	}
}