class ListManager {
    // 构造器属性
    constructor(data) {
        // 获取数据
        this.dataHead = data.dataHead;
        // 主要部分
        this.dataMain = data.dataMain;
        // 主要之左边栏
        this.dataleft = data.dataMain.dataleft;
        // 主要之左边之左上
        this.leftAd = data.dataMain.dataleft.leftAd;
        // 主要之左边之左下
        this.bottomAd = data.dataMain.dataleft.bottomAd;
        // 主要之中间
        this.dataMillde = data.dataMain.dataMillde;
        // 主要之右边
        this.dataright = data.dataMain.dataMillde;
        // 底部
        this.dataright = data.dataMain.dataright;
        this.footerList = data.footerList;
        // 各个区块
        this.oBox = document.createElement("div");
    }
    // 设置各种原型对象方法
    init() {
        this.oBox.className = `box-${this.dataHead.title} box`;
        this.oBox.innerHTML = this.createHTML();
        document.body.appendChild(this.oBox);
        this.mouseEnter();
        // this.mouseEnter();
    }
    // 处理标签
    createHTML() {
        /* 处理标签 */
        let htm1 = this.creatMainHead();
        let htm2 = this.creatMainList();
        let htm3 = this.creatMainRight();
        let htm4 = this.creatFoot();
        // var oBox = document.createElement("div");
        // oBox.className = "box";
        let result = htm1 + htm2 + htm3 + htm4;
        return result;
        // document.body.appendChild(oBox);
        // this.root = oBox;
        // this.uls = oBox.querySelectorAll(".list");
    }
    // 头部标签
    creatMainHead() {
        return `<div id="main" class="diy-floor">
        <div class="main-title">
            <img src= ${this.dataHead.src} alt="">
        </div>
        <div class="main-main">
            <div class="left-ad">
                <a href="" title=${this.leftAd.titile} class="top-ad">
                    <img src=${this.leftAd.img} alt="" width="190px" height="290px">
                    <div class="div-tip">
                        <h3>${this.leftAd.h3}</h3>
                        <p>${this.leftAd.p}</p>
                    </div>
                </a>
                <div class="bottom-ad">
                    <a href="" class="text-ad" title=${this.bottomAd.title}>${this.bottomAd.href}
                        <em></em>
                    </a>
                    <dl>
                        <dt>${this.bottomAd.dt}</dt>
                        <dd>
                            <span>${this.bottomAd.dd[0]}</span>
                            <span>${this.bottomAd.dd[1]}</span>
                            <span>${this.bottomAd.dd[2]}</span>
                            <span>${this.bottomAd.dd[3]}</span>
                        </dd>
                    </dl>
                </div>
            </div>`
    }
    creatMainList() {
        // let shopList = document.createElement("div");
        // shopList.className = "shop-list";
        let html = "";
        this.dataMillde.forEach(element => {
            html += `<li>
                        <a href="" title=${element.titile} class="anim-left">
                            <img src=${element.img} alt="">
                            <div class="div-tip">
                                <h3>${element.h3}</h3>
                                <p>${element.p}</p>
                                <div>${element.div}</div>
                            </div>
                        </a>
                    </li>`
        });
        let res = `<div class ="shop-list"><ul>${html}</ul></div>`;
        return res;
    }
    creatMainRight() {
        let html1 = "";
        this.dataright.forEach(element => {
            html1 += `<a href="" class="top-ad anim-left" >
                    <img src=${element.img} alt="">
                    <div class="div-tip">
                        <h3>${element.h3}</h3>
                        <p>${element.p}</p>
                    </div>
                </a>`
        });
        let res = `<div class ="right-ad">${html1}</div></div>`;
        return res;

    }
    creatFoot() {
        let html = "";
        this.footerList.list.forEach(element => {
            html += `<a href="">${element}</a>`
        });
        let res = `<div class="main-brank">
            <div class="brank-list">
                <span class="left">${this.footerList.title}</span>
            ${html}</div></div>`;
        return res;
    }
    // 鼠标移入移出方法
    mouseEnter() {
        $(".anim-left").hover(function () {
            $(this).children("img").css("right", "10px")
        }, function () {
             // 鼠标移出时
             $(this).children("img").css("right", "0px")
        });
    }
}