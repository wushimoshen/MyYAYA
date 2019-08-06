class MarganNav {
    constructor(data) {
        this.data = data;
        this.data3 = data.data3.img;
        this._i =  data.data3.index
        this.currentIndex = 0;
        // this.obannerBg = $(".banner-bg");
        this.index = 0;
        this.sliderBoxItemCount = this.data3.length;
    }
    creatHtml() {
        this.oBox= $(".banner-bg .wrapper")[0];
        this.oSlider = document.createElement("div");
        this.oSlider.className = "slider";
        this.oBox.appendChild(this.oSlider);
        this.Sidebox = document.createElement("div");
        this.Sidebox.className = "side_box overflow-hide";
        this.Sidebox.innerHTML = this.creatRight();
        this.oBox.appendChild(this.Sidebox);
        this.sliderBox = null;
        this.sliderNav = null;
        this.sliderControl = null;
    }
    creatBanner() {
        // 创建轮播图放图片的标签
        let sliderBox = document.createElement("ul");
        sliderBox.className = "slider-box";
        let html = this.data3.map((ele) => {
            return `<li class="slider-box-item"><img src=${ele}></li>`
        }).join("");
        sliderBox.innerHTML = html;
        // 创建轮播图放按钮的标签
        let sliderControl = document.createElement("div");
        sliderControl.className = "slider-control";
        sliderControl.innerHTML = `
         <span class="prev">&lt;</span>
         <span class="next">&gt;</span>
    `
        // 创建轮播图放小图标的标签
        let sliderNav = document.createElement("ol");
        sliderNav.className = "slider-nav";
        let html2 = this.data3.map((ele, index) => {
            return `<li class="slider-nav-item"></li>`
        }).join("");
        sliderNav.innerHTML = html2;
        this.oSlider.appendChild(sliderBox)
        this.oSlider.appendChild(sliderControl)
        this.oSlider.appendChild(sliderNav)
        // this.slider = slider;
        // 需要用到就先存起来
        this.sliderBox = sliderBox;
        this.sliderNav = sliderNav;
        this.sliderControl = sliderControl;
    }
    creatRight(){
      
       let html= `<div class="user-login">
        <dl>
            <dt><a href="/myCenter/" target="_blank"><img id="userPic" src="../img/empty.png"></a></dt>
            <dd id="userInfo"><p class="orange">丫丫网欢迎您～</p><a href="http://127.0.0.1/MYyaya/MyYAYA/html/login.html">登录</a>&nbsp;<a href="http://127.0.0.1/MYyaya/MyYAYA/html/register.html">注册</a></dd>
        </dl>
        <div style="margin:6px 0 0 6px;" class="login-text">欢迎回家！您可登录 <a href="/vipclub/" target="_blank" class="main-color">会员俱乐部</a></div>
    </div>
    <div class="notice">
        <h3 class="side_title side-tab"><a href="/news/" target="_blank">丫丫头条</a><span class="change-icon" style="display: block;"><a href="/news/" target="_blank" style="margin-right: 0; font-size: 12px;">更多 &gt;</a></span></h3>
        <ul>
                    <li><a href="/news/13898.html" title="【丫粉的节日】丫丫会员同盟会 积分当钱花 不换就清零"><i>[资讯]&nbsp;</i>【丫粉的节日】丫丫会员同盟会 ...</a></li>
                
                    <li><a href="/news/14239.html" title="【新店开业】庆丫丫网关上店开业活动圆满成功！"><i>[资讯]&nbsp;</i>【新店开业】庆丫丫网关上店开业...</a></li>
                    <li><a href="/news/14122.html" title="【618年中大促销】&nbsp;全场最高直降1749元&nbsp;再享千元换新补贴！"><i>[资讯]&nbsp;</i>【618年中大促销】&nbsp;全场最高直...</a></li>
        </ul>
    </div>
    <div class="service">
        <h3 class="side_title"><b>特色服务</b></h3>
        <div class="service-menu">
            <a href="/vipclub/" target="_blank"><i class="icon vip service-icon"></i><span>会员俱乐部</span></a>
            <a href="/stores" target="_blank"><i class="icon md service-icon"></i><span>门店查询</span></a>
            <!-- <a href="/rankinglist.aspx" target="_blank"><i class="icon js service-icon"></i><span>热门排行</span></a> -->
            <a href="/event/2393.html" target="_blank"><i class="icon zc service-icon"></i><span>加盟招商</span></a>
            
            <a href="/vipclub/" target="_blank"><i class="icon qd service-icon"></i><span>签到赚积分</span></a>
            
            <a href="/shouhou/" target="_blank"><i class="icon bx service-icon"></i><span>丫丫快修</span></a>
            <a href="/help/13529.html" target="_blank" style="border-right: 0;"><i class="icon yb service-icon"></i><span>延保/意外保</span></a>

            <a href="/bargain/" target="_blank"><i class="icon ys service-icon"></i><span>一手优品</span></a>
            <a href="https://huishou.yaya.cn/NewLpList/1" target="_blank"><i class="icon es service-icon"></i><span>二手良品</span></a>
            <a href="https://huishou.yaya.cn/" target="_blank" style="border-right: 0;"><i class="icon hs service-icon"></i><span>旧机回收</span></a>
        </div>
     </div>`
        return html;
    }
    //   封装一个轮播图下一张的方法
    next() {
        // 拿到标签
        this.index++;
        /*临界值检查*/
        if (this.index > (this.sliderBoxItemCount - 1)) {
            this.index = 0;
        }
        this.sliderBox.style.left = -(this.index) * 760 + "px";
        // $(".slider-box").css(`left`,`-${this.index*680+"px"}`)
        this.switchSlider(this.index);
        $(".banner-bg").css("background",this._i[this.index])
    }
    // 上一张的方法
    prev() {
        this.index--;
        /*临界值检查*/
        if (this.index < 0) {
            this.index = this.sliderBoxItemCount - 1;
        }
        this.sliderBox.style.left = -this.index * 760 + "px";
        this.switchSlider(this.index);
    }
    // 自动播放
    autoPlayer() {
        this.timer = setInterval(() => {
            this.next();
        }, 2000);
    }
    // 鼠标滑过的时候定时器停止
    addMouseHandle() {
        this.oSlider.onmouseenter = () => {
            clearInterval(this.timer);
            this.sliderControl.style.display = "block";
            // $(this).css("display","block");
        }
        //    离开的时候启动
        this.oSlider.onmouseleave = () => {
            this.autoPlayer();
            this.sliderControl.style.display = "none";
        }
    }
    // 点击左右按钮的时候切换图片
    addEventHandle() {
        this.sliderControl.onclick = (e) => {
            if (e.target.className == "prev") {
                this.prev();
            }
            if (e.target.className == "next") {
                this.next();
            }
        }
    }
    // 小图标根据图片的切换而切换背景颜色
    switchSlider(index) {
        $(".slider-nav-item").eq(index).addClass("active").siblings().removeClass("active");
    }
    // 滑入小图标切换对应的图片
    addMouseHandleWithItem() {
        Array.from(this.sliderNav.children).forEach((ele, index) => {
            ele.onmouseenter = () => {
                this.index = index;
                this.sliderBox.style.left = -this.index * 760 + "px";
                $(".banner-bg").css("background",this._i[this.index])
                this.switchSlider(this.index);
            }
        })
        $(".slider-nav-item").mouseenter(function () {
            $(".slider-box").css(`left`, `-${this.index*760+"px"}`);
            console.log("aaaaaaaaa");

        })

    }
    // 初始化方法
    init() {
        this.creatHtml();
        this.creatBanner();
        this.autoPlayer();
        this.addMouseHandle();
        this.addEventHandle();
        this.switchSlider(0);
        this.addMouseHandleWithItem();
    }
}