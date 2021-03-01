let layer = layui.layer;
// ---------------  创建剪裁区
// - 调用cropper方法，创建剪裁区
$('#image').cropper({
    // 纵横比(宽高比)
    aspectRatio: 1 / 1, // 正方形
    // 指定预览区域
    preview: '.img-preview' // 指定预览区的类名（css选择器字符串）
});


// ----------------------------上传图片
// 1、更换打开文件按钮
$('.openimg').click(function () {
    $('#file').click();
});
// 2、当我们通过系统提供文件夹打开某个图片时：
$('#file').change(function () {
    // 1、收集图片信息对象
    let imgObj = this.files[0];

    // 2、转化为临时地址（了解）
    let src = URL.createObjectURL(imgObj);

    // 3、通过cropper插件吧临时地址替换上
    $('#image').cropper("replace", src);
});

// ----------------------------提交图片数据
$('.sure').click(function () {
    // 1、准备数据：用插件准备base64位字符串
    // 调用插件方法，剪裁图片；剪裁之后得到一张canvas格式的图片
    let canvas = $('#image').cropper('getCroppedCanvas', {
        width: 100,
        height: 100
    });
    //  把canvas图片转成base64格式，得到超长字符串
    let str = canvas.toDataURL('image/png');


    // 2、ajax提交数据
    $.ajax({
        url: '/my/update/avatar',
        type: 'POST',
        data: {
            avatar: str,
        },
        sunccess: function (res) {
            // 3、提交成功后
            layer.msg(res.message);
            if (res.status == 0) {
                window.parent.getInfo();
            }
        },
    })
})