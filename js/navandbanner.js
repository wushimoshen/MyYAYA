

class MarganList {
    constructor(data) {
        this.data = data;
        this.data1 = data.data1;
        this.data2 = data.data2;
        this.data3 = data.data3;
        this.data4 = data.data4;
        this.currentIndex = 0;
        this.index = 0;
        this.sliderBoxItemCount = this.data3.length;
        // this.root = null;
    }
    creatHtml() {
        // this.oBox = document.createElement("div");
        this.oBox= $(".navigation .wrapper")[0];
        this.oUl = document.createElement("ul");
        this.oUl.className = "nav";
        this.navShang = $("<div class='navshang'></div>");
        this.navShang.html(this.creatShang());
        this.oSlider = document.createElement("div");
        this.oSlider.className = "slider";
        this.oBox.appendChild(this.oUl);
        // this.oBox.appendChild(this.oSlider);
        this.oBox.appendChild(this.navShang[0]);
        // document.body.appendChild(this.oBox);
        // this.root = oBox;
        this.sliderBox = null;
        this.sliderNav = null;
        this.sliderControl = null;
    }
    // 导航栏
    creatShang(){
       return `
           
            <a href="http://127.0.0.1/MYyaya/MyYAYA/html/shouye.html">首页</a>
            <div id="div-bdxh" style="display: none">
                <a href="/shoplist/2-0-0-0-0-0-0-0-0-0-0-0-0-0-0-0-1.html">本店现货<i style="display: block; width: 28px; height: 14px; line-height: 12px; text-align: center; background: #4FB99F; font-size: 12px; position: absolute; top: -5px; right: 5px; text-shadow: none; color: #fff;">hot<s style="position: absolute; left: 0; bottom: -4px; width: 0; height: 0; border-top: 5px solid #4FB99F; border-right: 5px solid transparent;"></s></i></a>
            </div>

            <div class="left sub_nav">
                <a href="//huishou.yaya.cn" target="_blank" rel="nofollow">旧机回收</a>
                <div>
                    <a href="//huishou.yaya.cn/NewLpList" target="_blank">二手良品</a>
                </div>
            </div>

            <a href="/bargain/" target="_blank" rel="nofollow">一手优品</a>


            <div class="left sub_nav">
                <a href="/after-service" target="_blank" class="navsh" rel="nofollow">售后维修</a>
                <div>
                    <a target="_blank" href="/shouhou/list1.html">售后公告</a>
                    <a target="_blank" href="/shouhou/list22.html">常见问题</a>
                </div>
            </div>

            <div class="left sub_nav">
                <a href="/news/" target="_blank" class="navzx">丫丫头条</a>
                <div>
                    <a target="_blank" href="/news/list13-1.html">行业资讯</a>
                    <a target="_blank" href="/news/list12-1.html">数码评测</a>
                </div>
            </div>

            <a href="/ranks.html">人气排行</a>
        
        `
    }
    // 导航栏左边
    creatNav() {
        let html = "";
        this.data1.forEach((element, i) => {
            html += `<li class="nav-li">
        <p><b><i class="icon ${element.iconf}"></i><a title="${element.title}" href="">${element.title}</a><s>&gt;</s></b></p>
        <span>${element.list.map(ele=> `<a href="">${ele}</a>`).join("")}</span>
        <div class="list"><div class="left">${this.creatList(i)}</div>
        <div class="right">
            <div class ="menu_ad">
            <a href="https://www.yaya.cn/product/57646.html" title="iPhone 8 Plus" style="border-top: 0px none;">
            <img src="../img/${this.data4[i].f}" width="200" height="230"></a>
            <a href="https://www.yaya.cn/product/77775.html" title="华为 nova 5 Pro">
            <img src="../img/${this.data4[i].e}" width="200" height="230"></a>
            </div>
        </div>
        </div>
            </li>`
        });
        // console.log(html);
        this.oUl.innerHTML = html;
    }
    // 导航栏右边
    creatList(i) {
        // console.log(this.data2[i]);
        let html = "";
        this.data2[i].forEach(ele => {
            html += `<div>
                <h4>${ele.title}</h4>
                <p>
                    ${ele.list.map(ele=> `<a href="http://127.0.0.1/MYyaya/MyYAYA/html/list.html">${ele}</a>`).join("")}
                </p>
            </div>`
        })
        return html;
    }
   
    // 滑入滑出事件函数
    addmouseEnterWithLeave() {
            $(".nav-li").mouseenter(function(){
                $(this).addClass("current").siblings().removeClass("current");
                $(this).children(".list").addClass("listCurrent").parent().siblings().children(".list").removeClass("listCurrent");
                // console.log("hahah");
                
            })
            $(".nav-li").mouseleave(function(){
                $(this).removeClass("current");
                $(this).children(".list").removeClass("listCurrent");
            })
    }

 
    // 初始化方法
    init() {
        this.creatHtml();
        this.creatNav();
        this.addmouseEnterWithLeave();

    }
}
// 实例化



                            
/* <a href="https://www.yaya.cn/product/57646.html" title="iPhone 8 Plus" style="border-top: 0px none;">
<img src="https://img2.ch999img.com/newstatic/1526/fbea6cf7dd532e.jpg" width="200" height="230"></a>

<a href="https://www.yaya.cn/product/77775.html" title="华为 nova 5 Pro">
<img src="https://img2.ch999img.com/newstatic/1529/fbea5e0ba93e39.jpg" width="200" height="230"></a> */

