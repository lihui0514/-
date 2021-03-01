let form = layui.form;
let layer = layui.layer;
// -------------------------------------获取基本信息
// 设计：
//      1、用户名：disabled，不让修改，注意不是昵称 
//      2、页面加载，获取曾经注册的信息
function get() {
    $.ajax({
        url: '/my/userinfo',
        success: function (res) {
            if (res.status == 0) {
                // 完成数据回填,表单赋值
                form.val('info', res.data);
            }
        }
    });
}
get();


// --------------------------------------提交数据
$('.layui-form').on('submit', function (e) {
    e.preventDefault();
    // 1、数据验证：不需要写！
    // 2、收集数据：form
    let data = $(this).serialize();
    // 3、提交数据
    $.ajax({
        url: '/my/userinfo',
        type: 'POST',
        data: data,
        success: function (res) {
            if (res.status == 0) {
                layer.msg(res.message);
                // 4、商品需求：更新数据成功，index头部也需要更新
                //       需要让父级的获取用户信息ajax重新调用
                window.parent.getInfo();
            }
        }
    });
});




// --------------------------------------重置，回复到填写一开始
$('.reset').click(function (e) {
    e.preventDefault();

    // 获取用户数据 ajax 重新调用
    get();
})
