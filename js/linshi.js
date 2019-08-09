let aa = [];
var a = document.querySelectorAll(".main-pic-link .main-pic");
var b = document.getElementsByClassName("lines-2 mt-5");
var c = document.getElementsByClassName("red font-14 el-popover__reference");
var d = document.querySelectorAll(".grey-9 .grey-9");
var f = document.querySelectorAll(".sku-color .flex-child-noshrink");
    for(var i = 0;i<a.length;i++){
        let obj = {};
        obj.img = a[i].src;
        obj.title = f[i].title;
        aa.push(obj);
    };
    Array.from(b).forEach((ele,i)=>{
        aa[i].des = ele.innerText; 
    })
    Array.from(c).forEach((ele,i)=>{
        aa[i].price = ele.innerText; 
    })
    Array.from(d).forEach((ele,i)=>{
        aa[i].pingjia = ele.innerText; 
    })
        let obj = {}
        obj.head = {};
        obj.head.img = $(this).find(".header-img")[0].src;
        obj.head.headerName = $(this).find(".header-name").eq(0).text();
        obj.head.i1 = $(this).find(".i-icon").eq(0).attr("class");
        obj.head.headerStar = $(this).find(".header-star").eq(0).text();
        obj.head.i2 = $(this).find(".i-icon").eq(1).attr("class");
        obj.body = [];
        $(this).find(".pd-item").each(function() {
            let a = {};
            a.src = $(this).find(".pd-img")[0].src;
            a.name = $(this).find(".pd-name").eq(0).text();
            a.price = $(this).find(".pd-price").children().eq(0).text().replace("￥", "");
            a.oPrice = $(this).find(".pd-price").children().eq(1).text().replace("￥", "");
            obj.body.push(a);
        })
        obj.footer = {};
        obj.footer.activ = $(this).find(".pd-tip").eq(0).text();
        obj.footer.quan = $(this).find(".pd-btn-merchant").eq(0).text();
        aa.push(obj)
    }), {
        /* <li class="brand-rec-item">
                                    <a class="pd-header bg-c43d7e">
                                        <img src="http://img.800pharm.com/images/20190726/20190726134842_119.png" class="header-img">
                                        <div class="header-info">
                                            <p class="header-name">成都隆安堂大药房<i class="i-icon icon-gold"></i></p>
                                            <!--with:40%为五星-->
                                            <p class="header-star">综合评分:<span class="i-icon h-star"></span></p>
                                        </div>
                                    </a>
                                    <ul class="pd-container">
                                        <li class="pd-item">
                                            <a href="http://www.800pharm.com/shop/product-100815-1476808.html" title="龟龄集" target="_blank">
                                                <img src="http://img.800pharm.com/images/20160112/20160112101036_436.jpg" class="pd-img">
                                                <div class="pd-wrapper">
                                                    <p class="pd-name">龟龄集</p>
                                                    <p class="pd-price">
                                                        <em>￥246.00</em>
                                                        <del>￥528.00</del>
                                                    </p>
                                                </div>
                                            </a>
                                        </li>
                                        <li class="pd-item">
                                            <a href="http://www.800pharm.com/shop/product-100815-1428240.html" title="东维力 左卡尼汀口服溶液 " target="_blank">
                                                <img src="http://img.800pharm.com/images/20151023/20151023095246_587.png" class="pd-img">
                                                <div class="pd-wrapper">
                                                    <p class="pd-name">东维力 左卡尼汀口服溶液 </p>
                                                    <p class="pd-price">
                                                        <em>￥48.00</em>
                                                        <del>￥65.00</del>
                                                    </p>
                                                </div>
                                            </a>
                                        </li>
                                        <li class="pd-item">
                                            <a href="http://www.800pharm.com/shop/product-100815-1548207.html" title="海马补肾丸" target="_blank">
                                                <img src="http://img.800pharm.com/images//pms/upload/images/original/072017/26150/eb63d5fec2f85f82156a9728b189b2af2393ca95.jpg" class="pd-img">
                                                <div class="pd-wrapper">
                                                    <p class="pd-name">海马补肾丸</p>
                                                    <p class="pd-price">
                                                        <em>￥124.00</em>
                                                        <del>￥316.00</del>
                                                    </p>
                                                </div>
                                            </a>
                                        </li>
                                    </ul>
                                    <div class="pd-bottom">
                                            <p class="pd-tip">领券再消费，有20元优惠券待领取</p>
                                        <a href="http://www.800pharm.com/shop/index-100815.html" class="pd-btn-merchant">进店领券</a>
                                    </div>
                                </li> */
    }

// let arr = [];
// $(".doc-consult-item").each(function() {
//     let temp = [];
//     let o = {};
//     o.img = $(this).find(".intro-box-top img")[0].src;
//     o.name = $(this).find(".intro-box-top .pd-name").eq(0).text();
//     o.fen = $(this).find(".intro-box-top .pd-star").eq(0).text();
//     o.type = $(this).find(".intro-box-top p").eq(2).text();
//     o.num = $(this).find(".intro-box-top .pd-num .doc_num").eq(0).text();
//     let o1 = {};
//     o1.img = $(this).find(".intro-hover-box img")[0].src;
//     o1.name = $(this).find(".intro-hover-box .pd-name").eq(0).text();
//     o1.fen = $(this).find(".intro-hover-box .pd-star").eq(0).text().replace(/满 意 度 ：/, "");
//     o1.fen1 = $(this).find(".intro-hover-box .pd-star").eq(1).text().replace(/回复速度：/, "");
//     temp.push(o);
//     temp.push(o1);
//     arr.push(temp);
// })

