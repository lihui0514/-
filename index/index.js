
let layer = layui.layer;
// ----------------------获取个人信息
function getInfo() {
    $.ajax({
        url: '/my/userinfo',
        // type默认get可以不写
        // token携带去common.js
        // token过期验证去common.js
        // 因为除了登录和注册外,都需要请求做这两件事,这是重复代码,单独配置到js文件内进行维护
        success: function (res) {
            if (res.status == 0) {
                // 产品经理设计思路：
                //          1、名字：优先显示昵称，后则显示用户名！
                let name = res.data.nickname || res.data.username;
                $('.username').text(name);

                //          2、圆形区域：显示一个头像；有限显示一个图片，后则显示名字的第一个字
                if (res.data.user_pic != null) {
                    // 好处：图片不是一个地址，是base64位图片流(字符串)：直接在HTML页面中渲染，减少对服务器的一个请求
                    // 弊端：处理图片流字符串，把图片大小增加原来的30%，前端HTMl加载费劲
                    // 场景：处理小图，精灵图
                    $('.userinfo img').show().attr('src', res.data.user_pic)
                } else {
                    // 名字第一个字的截取
                    let str = name.substr(0, 1);
                    // 大写：防止第一个字是英文
                    str = str.toUpperCase();
                    // 设置
                    $('.avatar').show().css('display', 'inline-block').text(str);
                    // show方法会给DOM添加行内样式display：inline，需要单独设置css样式
                }
            }
        },
        // 见common


    });
}
getInfo();



// ----------------------退出功能
// 设置：开发过程中检查HTML结构
// 1、index首页------> 回到login.html页面
// 2、清空token

$('#logout').click(function () {
    // 弹出层，询问是否要退出
    layer.confirm('你确定退出吗？你退出了还得登录，你想好了吗？', function (index) {

        // 如果点击了确定，删除token，页面跳转
        localStorage.removeItem('token');
        location.href = '/login.html';
        layer.close(index); // 关闭当前弹出层
    });
});



// res.token值：设计思路
// 1、比如：zs登录，转跳主页index.html
// 2、network请求：发现有分舵url地址；复制下url地址为我所用
// 3、要求:主页上面的所有url请求,必须在请求头携带上token值(当前用户的凭证，为了安全),确保就是当前的用户在使用这些接口


// 问题1：其他用户没有登录，直接在地址栏输入index.html页面，直接转跳
//      解决：如何判断当前用户是登录过来的还是直接在地址栏输入的？判断有没有token存在
//      原因：用户是登录过来的，本地有token；如果是直接输入index.html过来的，没有token
if (localStorage.getItem('token') == null) {
    location.href = '/login.html';  //再回去
}


// 临时身份证：token
//      临时：某段事件有效，过了这段时间就作废（后台会判断，正在请求url接口，刚好到了服务器，验证token过期，直接返回一个接口过期，一些特殊的数据，需要重新登录）
// 问题2：zs去找ls玩，zs登录账号，很长时间后，其他用户继续使用其他接口的时候，判断token过期
//      解决:前端不管是否过期,前端只看返回数据,有某个特别的标注(文档),token过期! 
//      知识：去哪看返回数据$.ajax  complete  完成（不管成功失败，都能拿到数据）  不是成功
//      返回有过期标识的数据，也是个成功数据，不在success里面判断；
//      success：做返回正常数据的业务
//      complete：处理返回有明显标注数据业务


// 代码：index页面内所有请求，都需要通过complete处理过期事件！


// 问题3：代码角度上，每个ajax加complete处理过期时间，浪费时间
// 参考：封装函数
