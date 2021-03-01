let form = layui.form;
form.verify({
    // 长度
    changdu: function (value, dom) {
        // value:使用规则的表单元素的值
        // dom：当前使用规则的DOM节点
        // 自己写：正则、不满足时的文字提醒！

        // 长度6-12位，不能出现空格
        let reg = /^\S{6,12}$/;
        if (reg.test(value) == false) {
            return '长度不满足要求'
        }
    },

    // 新密码和和确认密码必须一致
    same: function (value, dom) {
        // value:确认密码的值
        // 新密码值：设置类名.val()
        if ($('.newPwd').val() != value) {
            return '新密码和重复密码必须一致'
        }
    },

    // 旧密码和新密码不能一样   diff 设置给新密码
    diff: function (value, dom) {
        // value:新密码的值
        // 旧密码值：设置类名.val()
        if ($('.oldPwd').val() == value) {
            return '旧密码和新密码不能一样'
        }
    },

});
// --------------------------------------提交数据
$('.layui-form').on('submit', function (e) {
    e.preventDefault();
    // 1、数据验证：




    // 2、收集数据：form
    let data = $(this).serialize();
    // 3、提交数据
    $.ajax({
        url: '/my/updatepwd',
        type: 'POST',
        data: data,
        success: function (res) {
            layer.msg(res.message);  //无论修改成功或失败，都应该提醒
            if (res.status == 0) {
                $('form')[0].reset(); // DOM方法reset表示重置表单
            }
        }
    });
});