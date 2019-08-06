$(function () {
    // // 模块化
    Promise.all([
        new Promise(function (resolve, reject) {
            $("#head").load("header.html", function () {
                console.log("加载了两个标签");
                resolve();
            });

        }),
        new Promise(function (resolve, reject) {
            $("#foot").load("bottom.html", function () {
                console.log("加载了两个标签");
                resolve();
            });

        }), new Promise(function (resolve, reject) {
            $("#tool-bar").load("rightbox.html", function () {
                console.log("加载了右侧标签");
                resolve();
            });

        })
    ]).then(function () {
        if(Cookie.getItem("username")&&Cookie.getItem("password")){
            $("#loginorno").html(`
            Hi，<a href="/mycenter/" title="进入个人中心" style="margin:0;">${Cookie.getItem("username")}</a>           
            <a href="/myCenter/myLevel.aspx" target="_blank" style="margin:0;" title="会员等级">
            <i class="icon user-level user-level-0"></i></a>  
            <a id="jifen_a" href="/vipclub/" title="我的积分"><i class="icon user-point"></i>0</a>                                   
            <a href="/mycenter/mymsg.aspx" class="user-msg" title="消息"><i class="icon"></i></a>          
            <a id="tuichu">退出</a>
            `)
        }
        // 退出功能
        $("#tuichu").click(function(){
            Cookie.clear();
            $("#loginorno").html(`Hi，欢迎来丫丫！<a href="http://127.0.0.1/MYyaya/MyYAYA/html/login.html" rel="nofollow">登录</a><a href="http://127.0.0.1/MYyaya/MyYAYA/html/register.html"
                            rel="nofollow">免费注册</a>`)
        })
        $(".top-weizhi").hover(function () {
            $(this).children("a").css("color", "#196");
            $(".city-wrap").css("display", "block")
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
            // console.log($(".top-user").offset().left);

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
        // 头部购物车
        $(".header-cart-a,.header-cart-box").hover(function () {
            $(".header-cart-box").toggle();
        })

        // 导航栏
        $.getJSON(
            "../server/nav.json",
            function (json) {
                (new MarganList(json)).init();
            }
        )
        let listAll = $(`<div class='alllist'>全部商品分类</div>`);
        listAll.appendTo($(".navigation .relative"));
        $(".alllist").hover(function () {
            $(".nav").show();
        }, function () {
            $(".nav").hide();
        })
        $('.navigation').on('mouseenter', '.nav', function () {
            $(this).show();
        });
        $('.navigation').on('mouseleave', '.nav', function () {
            $(this).hide();
        });
    });
    // 根据数据渲染页面
    let orderType = 0;
    let getList = (page) => {
        $.ajax({
            type: "post",
            url: "../api/getDatalist.php",
            data: `page=${page}&orderType=${orderType}`,
            dataType: "json",
            success: function(response) {
                console.log(response);
                // [2] 根据数据渲染页面
                var res = response.data.map(ele => {
                   return `<li data-id="${ele.gid}">
                    <a class="big_img" href="javascript:void(0)"><img src=${ele.img} alt=""></a>
                    <div class="all_small_img">
                        <a href=""><img class="samll_img" src=${ele.img} alt=""></a>
                    </div>
                    <a class="god_title">${ele.des}</a>
                    <i class="price_now">${ele.price}</i>
                    <p>已有<a href="">${ele.pingjia}</a>评价</p>
                    <div class="tool">
                            <a href="">对比</a>
                            <a href="">收藏</a>
                        </div>
                   </li>`
                }).join("");
                $(".god_list").html(res);
            }
        });

    }
    getList(0);
      //[2] 获取总页码
      $.ajax({
        type: "post",
        url: "../api/getPageCount.php",
        dataType: "json",
        success: function(response) {
            let pageSize = response.data.count;
            var res = "";
            for (let i = 0; i < pageSize; i++) {
             res += `<li>${i+1}</li>`;
            }
            $(".page_bottom").html(`
               <dl>
            <dt class="page_item">共40条</dt>
            <dd id="pre">&lt;</dd>
            <ul class="page_num">  
              ${res}
            </ul>
            <dd id="next">&gt;</dd>
        </dl>`);
        $(".page_bottom").children().children().eq(2).children().eq(0).addClass("active");
            
        }
    });
    $(".page_bottom").on("click", "li", function() {
        var index = $(this).index();
        /* (1) 设置当前标签的选中状态 */
        $(this).addClass("active").siblings().removeClass("active");
        /* (2) 发送网络更新页面 */
        getList(index);
        // console.log(this);
        
    })

    $(".god_bar li a").click(function() {
        orderType = $(this).index();
        getList(0);
    })
})