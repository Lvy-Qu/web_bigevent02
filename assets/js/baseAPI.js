var baseURL = 'http://ajax.frontend.itheima.net';

// 拦截每一次ajax请求
$.ajaxPrefilter(function (options) {
    options.url = baseURL + options.url;

    // 判断，请求路径是否包含 /my/
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }



    // 页面加载完毕之后，所有请求都需要验证用户身份
    options.complete = function (res) {
        // 获取请求之后的回应代码
        var data = res.responseJSON;
        // console.log(data);
        if (data.status == 1 && data.message == '身份认证失败！') {
            localStorage.removeItem('token');
            location.href = '/login.html'
        }
    }
})


