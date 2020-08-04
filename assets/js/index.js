$(function () {
    var layer = layui.layer;

    // 1.调用获取用户信息函数
    getUserInfo()

    // 3.退出功能
    $('#btnLogout').on('click', function () {
        // 需要弹出层
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function (index) {
            layer.close(index);
            // 3.1 删除本地token
            localStorage.removeItem('token');
            // 3.2 页面跳转
            location.href = '/login.html'
        });
    })



    // 1.获取用户信息的函数封装
    function getUserInfo() {
        $.ajax({
            type: 'get',
            url: '/my/userinfo',

            success: function (res) {
                // console.log(res)
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                // layer.msg(res.message)
                // 2.调用渲染用户信息的函数
                renderUser(res.data);
            }
        })
    }


    // 2.封装渲染用户信息的函数
    function renderUser(user) {
        // 2.1获取用户信息
        var name = user.nickname || user.username;
        $('#welcome').html('欢迎' + name);

        // 2.2渲染用户头像
        // 先判断，用户头像信息，有图片就渲染图片，没有图片就渲染文字头像
        if (user.user_pic !== null) {
            $('.layui-nav-img').show().attr('src', user.user_pic)
            $('.text-avatar').hide();
        } else {
            $('.layui-nav-img').hide()
            $('.text-avatar').show().html(name[0].toUpperCase());
        }
    }

})