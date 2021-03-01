$.ajaxPrefilter(function (obj) {
    // 拿到内部对象：url complete；有什么用？
    // 目标：


    // 1、根路径不能写死；
    obj.url = 'http://ajax.frontend.itheima.net' + obj.url;
    obj.url;



    // 登录 注册接口就一定不需要配置
    // 注册：请求头里面没有携带token
    // 返回：标识没有token，返回token过期的数据；

    // 验证包含/my  url地址
    if (obj.url.indexOf('/my') != -1) {
        // 2、每个index页面中包含ajax：请求头里面携带了token!有可能是过期
        obj.headers = {
            Authorization: localStorage.getItem("token")
        };


        // 3、complete不想每个ajax都写；配置下：不是所有的请求都需要配置的！
        obj.complete = function (xhr) {
            // 后台设置：token失败，返回的都是下面数据：1 身份认证失败
            // xhr当前请求xhr实例化  原生的东西
            let obj = JSON.parse(xhr.responseText);
            if (obj.status == 1 && obj.message == "身份认证失败！") {
                // 1、回到login.html
                location.href = '/login.html';
                // 2、同时清除过期token
                localStorage.removeItem('token')
            }
        }
    }


});