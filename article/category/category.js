let layer = layui.layer;

// -------------------------------列表加载
function getList() {
    $.ajax({
        url: '/my/article/cates',
        success: function (res) {

            if (res, status == 0) {
                let str = '';
                res.data.forEach(item => {
                    str += `<tr>
                    <td>${item.name}</td>
                    <td>${item.alias}</td>
                    <td>
                        <button type="button" class=layui-btn layui-btn-xs btnEdit>编辑<button>
                        <button type="button" class=layui-btn layui-btn-xs layui-btn-danger  btnDelete>删除<button>
                    </td>
                  </tr>`;
                });
                $('tbody').html(str);
            }
        }
    });
}
getList();


// -------------------------------添加类别
$('.add').click(function () {
    let add_str = `<form class="layui-form add-form" action="" style="margin: 30px; margin-left: 0px;" id="add_form">
                  <div class="layui-form-item">
                    <label class="layui-form-label">类别名称</label>
                    <div class="layui-input-block">
                      <input type="text" name="name" required lay-verify="required" placeholder="请输入标题" autocomplete="off" class="layui-input">
                    </div>
                  </div>
                  <div class="layui-form-item">
                    <label class="layui-form-label">类别别名</label>
                    <div class="layui-input-block">
                      <input type="text" name="alias" required lay-verify="required" placeholder="请输入标题" autocomplete="off" class="layui-input">
                    </div>
                  </div>
                  <div class="layui-form-item">
                    <div class="layui-input-block">
                      <button class="layui-btn" lay-submit lay-filter="formDemo">确认添加</button>
                      <button type="reset" class="layui-btn layui-btn-primary">重置</button>
                    </div>
                  </div>
                </form>`;
    layer.open({
        type: 1,  // 弹窗里面有丰富HTML结构内容
        title: '添加类别',//左上角显示标题
        content: add_str,//弹窗内容HTML
        area: ['500px', '250px'],//area区域，弹窗宽高 
        success: function (dom, index) {
            // dom是弹窗的dom节点
            // index是弹窗的标识
            // 弹窗成功后：在此函数内部可以获取到form表单元素
            addSub(index);
        }
    });
});

function addSub(numb) {
    $('.add-form').on('submit', function (e) {
        e.preventDefault();

        //1、提交数据
        let data = $(this).serialize();
        // 2、ajax提交
        $.ajax({
            url: '/my/article/addcates',
            type: 'POST',
            data: data,
            sunccess: function (res) {
                layer.msg(res.message);
                if (res.status == 0) {
                    // 再次调用列表接口
                    getList();
                    // 关闭弹窗
                    layer.close(numb);
                }
            }
        })
    })
};