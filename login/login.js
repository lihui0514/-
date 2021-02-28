let layer = layui.layer;
let form = layui.form;  //为了后续的表单验证

// -----------------------------------------------------切换功能
// 去注册
$('#goto-register').on('click', function () {
    $('#login').hide();
    $('#register').show()
})
// 去登录
$('#goto-login').on('click', function () {
    $('#login').show();
    $('#register').hide()
})

// -------------------------------------------------------验证
form.verify({
    // 用于比较复杂的验证，函数形式
    changdu: function (value, dom) {
        // value:使用规则的表单元素的值
        // dom：当前使用规则的DOM节点
        // 自己写：正则、不满足时的文字提醒！


        let reg = /^\S{6,12}$/;
        if (reg.test(value) == false) {
            return '长度不满足要求'
        }
    },
    // 简写形式：数组[正则规则，不满足的文字提醒]
    pass: [
        /^[\S]{6,12}$/
        , '密码必须6到12位，且不能出现空格'
    ]
});



// -------------------------------------------------------注册功能
// html是form表单,按钮、表单元素 name属性和参数名设置一致，JS收集数据，$.ajax()
$('#register form').on('submit', function (e) {
    e.preventDefault();
    // 1、收集数据  两种方式：jq方式   layui.form模块
    let data = $(this).serialize();
    // 2、提交数据
    $.ajax({
        url: 'http://ajax.frontend.itheima.net/api/reguser',
        type: 'post',  // 类型
        data: data,//收到的数据
        // 成功的函数
        success: function (res) {
            layer.msg(res.message)


            if (res.status == 0) {
                //去登陆
                $('#goto-login').click();

                //让注册的表单置空，重置
                $('#register form')[0].reset();
            }
        }
    })
})





// -------------------------------------------------------登录功能
$('#login form').on('submit', function (e) {
    e.preventDefault();
    // 1、收集数据  两种方式：jq方式   layui.form模块
    let data = $(this).serialize();
    // 2、提交数据
    $.ajax({
        url: 'http://ajax.frontend.itheima.net/api/login',
        type: 'post',  // 类型
        data: data,//收到的数据
        // 成功的函数
        success: function (res) {
            // res.token值：设计思路
            // 1、比如：zs登录，转跳主页index.html
            // 2、network请求：url地址；复制下url地址为我所用
            // 3、要求:主页上面的所有url请求,必须在请求头携带上token值(当前用户的凭证，为了安全),确保就是当前的用户在使用这些接口

            // 代码：
            // 拿到token:res.token(怎么处理，其他地方也能用)
            // 一会儿转跳index.html 所有请求要用到token；
            layer.msg(res.message);
            if (res.status == 0) {
                location.href = '../index.html';
                localStorage.setItem('token', res.token);
            }
        }
    })
})