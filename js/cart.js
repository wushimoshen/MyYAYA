$(function () {
    Promise.all([
        new Promise(function (resolve, reject) {
            $("#top").load("top.html", function () {
                console.log("加载了头部标签");
                resolve();
            })

        }),
        new Promise(function (resolve, reject) {
            $("#foot").load("bottom.html", function () {
                console.log("加载了两个标签");
                resolve();
            });

        })
    ]).then(function () {
        // console.log(2222);

        if (Cookie.getItem("username") && Cookie.getItem("password")) {
            $("#loginorno").html(`
            Hi，<a href="/mycenter/" title="进入个人中心" style="margin:0;">${Cookie.getItem("username")}</a>           
            <a href="/myCenter/myLevel.aspx" target="_blank" style="margin:0;" title="会员等级">
            <i class="icon user-level user-level-0"></i></a>  
            <a id="jifen_a" href="/vipclub/" title="我的积分"><i class="icon user-point"></i>0</a>                                   
            <a href="/mycenter/mymsg.aspx" class="user-msg" title="消息"><i class="icon"></i></a>          
            <a id="tuichu">退出</a>
    `)
            // 退出功能
            $("#tuichu").click(function () {
                Cookie.clear();
                $("#loginorno").html(`Hi，欢迎来丫丫！<a href="http://127.0.0.1/MYyaya/MyYAYA/html/login.html" rel="nofollow">登录</a><a href="http://127.0.0.1/MYyaya/MyYAYA/html/register.html"
                    rel="nofollow">免费注册</a>`)
            })
        }

        $(".top-weizhi").hover(function () {
            $(this).children("a").css("color", "#196");
            $(".city-wrap").css("display", "block")
            // console.log(2222);

        }, function () {
            $(this).children("a").css("color", "#333");
            $(".city-wrap").css("display", "none")
        })
        // 侧边栏
        $(".scroll-to-top").click(function () {
            window.scrollTo(0, 0);
        })
        // 个人中心

        $(".top-user,.top-user-show").hover(function () {
            $(".top-user").css("background", "#fff");
            console.log($(".top-user").offset().left);

            $(".top-user-show").css({
                display: "block",
                left: $(".top-user").offset().left,

            });
        }, function () {
            $(".top-user").css("background", "#e3e4e5");
            $(".top-user-show").css({
                display: "none"
            })
        });
        // 网站导航
        $(".top-sitemap,.top-sitemap-show").hover(function () {
            $(".top-sitemap").css("background", "#fff");
            $(".top-sitemap-show").css({
                display: "block",
            });
        }, function () {
            $(".top-sitemap").css("background", "#e3e4e5");
            $(".top-sitemap-show").css({
                display: "none"
            })
        });
        // 购物车栏目
        // 检查本地存储的数据
        let shopData = JSON.parse(window.localStorage.getItem("shopListData"));
        let shopCount = window.localStorage.getItem("shopListCount") * 1;
        let allchiked
        getInfo(shopData);
        // 单选框按钮
        $(".cart-box").on("click", ".cart-checkbox-x", function () {
            var index = $(this).parent().parent().parent().parent().index() - 1;
            if ($(this).is(":checked") == false) {
                console.log("111111111111111");
                shopData[index].ischeked = 0;
                console.log(index);
                window.localStorage.setItem("shopListData", JSON.stringify(shopData));
                getInfo(shopData);
            } else {
                console.log("22222222222222222");
                console.log(index);
                shopData[index].ischeked = 1;
                window.localStorage.setItem("shopListData", JSON.stringify(shopData));
                getInfo(shopData);
            }

        })
        // 删除按钮
        $(".cart-box").on("click", ".del", function () {
            let delIndex = $(this).parent().parent().parent().parent().index() - 1;
            console.log(delIndex);
            let message = confirm("确定要移出购物车吗?")
            if (message == true) {
                shopData.splice(delIndex, 1);
                window.localStorage.setItem("shopListData", JSON.stringify(shopData));
                shopCount--;
                window.localStorage.setItem("shopListCount", shopCount)
                getInfo(shopData);

            }
        })
        //删除选中按钮
        $(".cart-box").on("click", ".delall", function () {
            // 找到所有选中的标签
            let emptarr = [];
            let message = confirm("确定要删除选中商品吗?")
            if (message) {
                $.each($(".cart-checkbox-x"), function (indexInArray, valueOfElement) {
                    if ($(valueOfElement).is(":checked")) {
                        var index = $(this).parent().parent().parent().parent().index() - 1;
                        emptarr.push(index)
                    }

                });
                console.log(emptarr);
                // 无法正常删除  使用逆向循环来删除
                for(var i=emptarr.length-1;i>=0;i--){
                      shopData.splice(emptarr[i], 1);
                      shopCount--;
                }
                window.localStorage.setItem("shopListData", JSON.stringify(shopData));
                window.localStorage.setItem("shopListCount", shopCount)
                getInfo(shopData);
            }
            
            
        })

        // 添加按钮
        $(".cart-box").on("click", ".add", function () {
            let addIndex = $(this).parent().parent().parent().parent().index() - 1;
            let addEle = $(this).parent().parent().parent().parent();
            shopData.splice(addIndex, 0, shopData[addIndex]);
            shopCount++;
            window.location.reload();
            window.localStorage.setItem("shopListCount", shopCount)
            window.localStorage.setItem("shopListData", JSON.stringify(shopData));
            getInfo(shopData);
        });
        // 全选按钮
        $(".cart-box").on("click", ".cart-checkbox-all", function () {
            for (var i = 0; i < $(".cart-checkbox-all").length; i++) {
                $(".cart-checkbox-all")[i].checked = this.checked;
            }
            if ($(this).is(":checked") == false) {
                console.log(111);
                for (var i = 0; i < shopData.length; i++) {
                    shopData[i].ischeked = 0;
                }
                window.localStorage.setItem("shopListData", JSON.stringify(shopData));
                getInfo(shopData);

            } else {
                console.log(222);
                for (var i = 0; i < shopData.length; i++) {
                    shopData[i].ischeked = 1;
                }
                window.localStorage.setItem("shopListData", JSON.stringify(shopData));
                getInfo(shopData);
            }
        })







        function getInfo(shopData, shopCount) {
            if (shopData.length != 0) {
                // 声明变量
                var allnum = 0,
                    flax = true,
                    tempnum = 0,
                    allprice = 0;

                // 解析本地存储
                shopData.forEach(element => {
                    if (element.ischeked) {
                        allprice += element.price * 1;
                        tempnum++;
                    } else {
                        flax = false;
                    }
                    allnum++;
                });
                // 利用本地存储
                var html = shopData.map(ele => {
                    return `<div class="cart-item">
                        <div>
                            <div class="cart-check">
                                <label class="checkbox radio-box">
                                    <input type="checkbox" ${ele.ischeked ? "checked":""} class="cart-checkbox-x">
                                </label>
                            </div>
                            <div class="cart-product-box relative">
                                <div class="invalid-mark none">

                                </div>
                                <div class="product">
                                    <a href="/product/58201.html" target="_blank"
                                        class="block relative left pro-img-box"><img
                                            src="${ele.src}">
                                        <!----></a>
                                    <div class="product-title">
                                        <h5>
                                            <!----> <a href="/product/58201.html" target="_blank">${ele.des}</a>
                                        </h5>
                                        <div class="margin-top"></div>
                                        <div class="jiuji-serviceCur">
                                        </div>
                                        <div class="jiuji-server margin-top overflow-hide">
                                            <a href="javascript:;" class="grey-9">
                                                <i class="baoxiu"></i>
                                                选服务
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div class="unit-price">
                                    <b>${ele.price}</b>
                                </div>
                                <div class="discount">0.00</div>
                                <div class="count">
                                    <a href="javascript:;">-</a>
                                    <input type="text" value="1" disabled="disabled">
                                    <a href="javascript:;" class="add">+</a>
                                </div>
                                <div class="sum">
                                    <b class="red">
                                        <!---->${ele.price}</b>
                                </div>
                                <div class="action">
                                    <a href="javascript:;" class="move-to-favorate">移入收藏夹</a>
                                    <a class="del">删除</a>
                                </div>
                            </div>
                        </div>
                        </div>`
                }).join("");
                // console.log(allnum);

                // 重新渲染页面
                var htmlall = ` <div>
            <div class="cart-tab">
            <div class="left">
                <a class="cur">
                    全部商品
                    <span class="main-color">${allnum}</span>
                </a>
            </div>
            <div class="right">
                已选
                <span class="red num">${tempnum}</span>
                件，合计（不含运费）
                <b class="red zongjia">￥${allprice?allprice:"0.00"}</b>
            </div>
            </div>
            </div>
            <div class="cartmain">
            <div class="cart-item cart-title">
            <div class="cart-check">
                <label class="check radio-box">
                    <input type="checkbox" id="checkAll" ${ flax ? "checked":""} class="cart-checkbox-all">
                    全选
                </label>
            </div>
            <div class="cart-product-box">
                <div class="product">商品</div>
                <div class="unit-price">单价（元）</div>
                <div class="discount">优惠（元）</div>
                <div class="count">数量</div>
                <div class="sum">小计（元）</div>
                <div class="action">操作</div>
            </div>
            </div>
            ${html}
            <div class="cart-total">
            <div class="left margin-left">
                <label class="checkbox radio-box">
                    <input type="checkbox" ${ flax ? "checked":""} class="cart-checkbox-all">全选</label>
                <a href="javascript:;" class="delall">删除</a>
            </div>
            <div class="right">
                <span class="large-font">
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAABVklEQVRoQ+1Z7Q6DQAjD93/omSVmIZdD2gN0c+zncoKl5fhwE5GX5Pw2ZUbb1P9rTyl+38ZTDIlIA1gRwsiARbdlm5UKy5LrtwGoECHJeikDVnIjL5ElLS2hqd8zCTWAI3wRad3GgFWwWPk1gNk9jETxKxhACqN120RuIcpvVSFrAA4NnwBVdaNsDiCymZ5pAEm9UIiB5YdPHkSSOMUv2/+jThsAGim0G0WqLxt1tghOzzcAcpXC1geX+TGJb5HBsNpxX1qfbwBGIUtJUISZqjoQ0bq7C9JbwAYAFBxWTjQDVy53WTDu+ap22nUMbrNdO48DwCY1UvjcKEbYqBrqI9coBfjRACqWu4jkKPbQdtrdUUZ0vDCammsVqxP8OwCUDED2oL1QFgMN4IiAW5eqrtH028aSWQMgJzKqVUYnsop2uiKJob0QMJ+YRyJfI6lNxDhS/jQDOwmL/BPtMHfwAAAAAElFTkSuQmCC"
                        alt="" style="width: 20px; position: relative;  cursor: pointer;">
                </span>
                <span>已选商品
                    <b class="red large-font">${tempnum}</b> 件
                </span>
                <span>总计（不含运费）： <b class="red title-font">￥${allprice?allprice:"0.00"}</b>
                </span>
                <button id="goConfirm" class="button">结 算</button>
            </div>
            </div>
            </div>
            </div>`
                $(".cart-box").html(htmlall);

            } else {
                $(".cart-box").html(
                    `<div class="cart-nothing">
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAB4CAMAAAAOusbgAAAAe1BMVEUAAACcnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJyLpJD0AAAAKHRSTlMAi/OnfA5ZPwho1OLe7pxtyEUYsIE3zSuic/gkwpROMei5YFIdPY8RZWGCvAAAA+tJREFUaN7t2sliokAQBuBfRGQT2WRz3+v9n3BoTNJkEiY0RdrD+J28qFBUVRc0eHl5+X9Z2/Mdz+ARLQoL2q1JyKCdScIZutkkGDZ0s8sjEW3xDOvUnePp8guew6DtU05/TjXfgh6tlJ6SEEGP1E/3aMxI8KGJS0Shg1pEQgo9ZiRsmo97c1oRNLFI2ONNbFo2tAip5uFDSYdAS0lFxaKJ9LvDI/I6zKzEaZWykLwVmhbzjRMDGxLWqN0PyRkaTIiq5JTIwcASRR2s8ds8EpBPXDpBOMp8/00rEoIm6MVJDIAkhPhtIQk5BCIjKwsSLCiyraXzZtnry83V3bR6ytLJiMiGmtinlin6uJRZEaPWJJgBIA8CKNrSJzn68aogwoxzcQP6ZKIwZbtmIMLl4IEVajqoxGkn+qiLgWyrXD54vavRNuRBRsezze5ItbR/KW/fT/4QWODYU61X5OzcDCvK5ckbYPFVOl98hnAiodQU64blmvl7445H6MKuSnySKAo80XeYDlS7oGUfzTucSPDj3Alpe53/JVqxYn316GfVgr7jRYy8DolhqrzGx60RnqGAginV5OXZEcMECsy/LvJ8cpsMsKHaEgpy2YM5UqpF6s0rB1PWpIp6QZngsStR4YzmxeqACaA91kuqlayFgjFORdAf61C2fAULlW91D0YeVN1kXjNzS3usHXnoemO9fYy+ygrZaIfZUG098HHhRm9uyVgv9OWWFPKalzO4BW15BXWTmxe8guLnFn+huFo/O1UducVYlAvqK8Eg1+/3tnaMQU+lecVf07W3MyT+QmFvqCeX1QMyfHFKzR5SZwbwYq2VzF8H+kWDH2DZZglJ36Jsu0SZDUnXomxxd5nPVNsOnGxPGO4ycGM+e6wQDN6gX4gZ7YM15e6oFoBjPqigUln/epvXkbcrIgegcsCN8QESY1FW/04CgRvrmfqNsQmmaRPrmYpklA38iARDBdUqG/xYD7EB25SGuIFtRUOswGcVU1WFg5eXvu6XGX5iX2KMaz3JKjJC08Y/LI8LqtztCuOZ0Btvhy777IdNCObectk57EjHEc9XKjv/V0owhis13KNH1DVy2tRYHDNqOKO9dlGdP+7Ip53vp6YzYO43RwC+mOTgtuv60VCOHHeDanOwWe0RedMxcvqt4W450ut0ZfsZbNBxkQ+t4TuXR8ritJOl6PhjT2RfOxlvI9+bN5lzxxduM2S1orIc68XmUla013XncGxV9Bp8KQnhcme6JJw6a92f7E7HETvIosezq4Q+iTGGPbVUF3zH9qnFwjjO9MHL8b171tHOWVY3zxB8c4ZOjmsIiyDCy8uLFn8AqcsMXQUtLrMAAAAASUVORK5CYII=">
             <p>购物车里还没有商品，快 <a href="http://127.0.0.1/MYyaya/MyYAYA/html/shouye.html" target="_parent" class="main-color">去逛逛</a> 吧</p>
            </div> `)
            }
        }

    })
})