var baseURL = 'http://ajax.frontend.itheima.net';

// 拦截每一次ajax请求
$.ajaxPrefilter(function (options) {
    options.url = baseURL + options.url;
})