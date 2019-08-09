       function CreatheadAndBotton(){
       // // 模块化
        Promise.all([
            new Promise(function (resolve, reject) {
                $("#head").load("yyheader.html", function () {
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
            var tempCount =window.localStorage.getItem("shopListCount");
            if(tempCount){
                $("#cartcount").html(tempCount);
                
            }
            
            if (Cookie.getItem("username") && Cookie.getItem("password")) {
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
            $("#tuichu").click(function () {
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
    }