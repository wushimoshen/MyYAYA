$(function () {
    // 加载页面
    CreatheadAndBotton();
    
    // 根据cookie里面的数据生成标签
    if(Cookie.getItem("src")){
        let html = "";
        // for(var i =0;i<5;i++){
        //     html +=`<li class="thumb-item"><img src=${Cookie.getItem("src")} class="responsive-image thumb choosed-thumb" >
        //                     </li>`
        // }
        $(".font-22").html("￥"+Cookie.getItem("price"));
        $(".titleDes").html(Cookie.getItem("des"));
        $(".thumb-item").eq(0).html(`<img src=${Cookie.getItem("src")} class="responsive-image thumb choosed-thumb" >`);
    }
    // 小事件处理
    $(".radio-item").click(function (e) { 
        e.preventDefault();
        $(this).addClass("checked").siblings().removeClass("checked");
    });
    // 放大镜之小图切换
    $(".thumb-item").hover(function(){
        $(this).addClass("cur").siblings().removeClass("cur");
        $(".preview-image").eq($(this).index()).addClass("cur").siblings().removeClass("cur");
    })
    // 放大镜使用
    var magnifierConfig = {
        magnifier: "#magnifier1", //最外层的大容器
        // container:".preview-box",
        width: 400, //承载容器宽
        height: 400, //承载容器高
        moveWidth: null, //如果设置了移动盒子的宽度，则不计算缩放比例
        zoom: 2 //缩放比例
    };

    var _magnifier = magnifier(magnifierConfig);

    // 先检查本地存储中是否有数据
    var tempcount= window.localStorage.getItem("shopListCount");
    var tempdata =JSON.parse(window.localStorage.getItem("shopListData"));
    var dataCount = tempcount?tempcount:0;
    var dataArray = tempdata?tempdata:[];
    // console.log(dataArray);
    // console.log(tempcount);
    var src = $(".responsive-image").eq(0).attr("src");
        var des = $(".titleDes").html();
        var price = $(".font-22").html().slice(1);
        var ischeked = 1;
        var dataAll = {src,des,price,ischeked};
    // 点击加入购物车的时候把数据存入本地储存
    $(".primary[data-v-4ed7f6fb]").click(function(){
        $(".ant-notification-topRight").show().delay(2000).hide(200);
        dataCount++;
        $("#cartcount").text(dataCount);
        dataArray.push(dataAll);
        console.log(dataArray);
        //把数据存入本地存储
        window.localStorage.setItem("shopListData",JSON.stringify(dataArray))
        window.localStorage.setItem("shopListCount",dataCount)
    })
})