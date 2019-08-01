// 创建活动推荐标签
function creatTuijian(json){
    let html = "";
    json.forEach(element => {
        html+=` <li class="margin-right">
        <a href="https://www.yaya.cn/product/68436.html" target="topic" title=${element.title}>
        <img class="get-src" data-src="611" src=${element.src} width="232" height="270">
        </a>
        </li>`
    });
    let diyList = $(`<div class="diy-list">
    <ul class="overflow-hide">${html}</ul>
    </div>
    `)
    $("#go_topic").append(diyList);
}
// 发送网络请求数据
$.getJSON(
    "../server/nav.json",
    function(json){
        creatTuijian(json.data5);
    }
)