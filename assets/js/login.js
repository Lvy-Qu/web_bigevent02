$(function () {
    var form = layui.form;
    var layer = layui.layer;
    // 点击去注册账号的链接
    $('#link_reg').on('click', function () {
        $('.login-box').hide();
        $('.reg-box').show();
    })

    // 点击去登录的链接
    $('#link_login').on('click', function () {
        $('.login-box').show();
        $('.reg-box').hide();
    })
    // 验证规则

    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码为6-12位，不能包含空格！'],
        repwd: function (value) {
            if ($('#reg-pwd').val() !== value) {
                return "两次密码输入不一致";
            }
        }
    })
    // 注册功能
    $('#form_reg').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            type: 'post',
            url: '/api/reguser',
            data: {
                username: $('#form_reg [name=username]').val(),
                password: $('#form_reg [name=password]').val()
            },

            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg(res.message);
                // 触动切换到登录的a链接的点击行为
                $('#link_login').click();
                // 清空注册表单的内容
                $('#form_reg')[0].reset();
            }
        })
    })

    // 登录功能
    $('#form_login').on('submit', function (e) {
        e.preventDefault();
        // 发送ajax
        $.ajax({
            type: 'post',
            url: '/api/login',
            data: $(this).serialize(),
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                // 登录成功提示
                layer.msg(res.message);

                // 保存token
                localStorage.setItem('token', res.token);
                location.href = '/index.html'
            }
        })
    })

})