       function CreatheadAndBotton() {
           // // 模块化
           Promise.all([
               new Promise(function (resolve, reject) {
                   $("#head").load("yyheader.html", function () {
                       // console.log("加载了两个标签");
                       resolve();
                   });

               }),
               new Promise(function (resolve, reject) {
                   $("#foot").load("bottom.html", function () {
                       // console.log("加载了两个标签");
                       resolve();
                   });

               }), new Promise(function (resolve, reject) {
                   $("#tool-bar").load("rightbox.html", function () {
                       // console.log("加载了右侧标签");
                       resolve();
                   });

               })
           ]).then(function () {
               var tempCount = window.localStorage.getItem("shopListCount");
               if (tempCount) {
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
                   // window.scrollTo(0, 0);
                   $("html,body").animate({
                       scrollTop: 0
                   })
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
               // 首页购物车样式和内容
               var dataItem = JSON.parse(window.localStorage.getItem("shopListData"));
               magerUI(dataItem);

               function magerUI(data) {
                   if (data.length != 0) {
                       let num = 0;
                       let price = 0;
                       data.forEach(ele => {
                           if (ele.ischeked) {
                               price += ele.price * 1;
                               num++;
                           }
                       })
                       // 根据数据渲染购物列表

                       let html = data.map(ele => {
                        //    console.log(ele.price);
                           
                           return `    <li class="listitemli">
                        <div class="lileft">
                            <img src="${ele.src}" alt="">
                        </div>
                        <dl class="liright">
                            <dt>
                                <a href="">${ele.des}</a>
                            </dt>
                            <dd class="todl">
                                <span class="red">￥${ele.price}</span>
                                <b></b>
                                    <div class="count">
                                            <a href="javascript:;">-</a>
                                            <input type="text" value="1" disabled="disabled">
                                            <a href="javascript:;" class="add">+</a>
                                        </div>
                                <a class="shanchu displaynone red">删除</a>
                            </dd>
                        <dd>
                            <a href="javascript:;" class="grey-9">
                                <i class="baoxiu"></i>
                                选服务
                            </a>
                        </dd>
                        </dl>
                        </li>`
                       }).join("");
                       let ullist = `<ul class=ullist>${html}</ul>    <div class="jiesuan">
                    <p>共<span>${num}</span>件商品 总计:<i class="red">￥${price?price:0.00}</i></p>
                    <a href="http://127.0.0.1/MYyaya/MyYAYA/html/cart.html">去结算</a>
                  </div>
                  
                  `
                       $(".header-cart-box").html(ullist);
                   } else {
                       $(".header-cart-box").html(
                           `<div class="cart-nothing-1">
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAB4CAMAAAAOusbgAAAAe1BMVEUAAACcnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJyLpJD0AAAAKHRSTlMAi/OnfA5ZPwho1OLe7pxtyEUYsIE3zSuic/gkwpROMei5YFIdPY8RZWGCvAAAA+tJREFUaN7t2sliokAQBuBfRGQT2WRz3+v9n3BoTNJkEiY0RdrD+J28qFBUVRc0eHl5+X9Z2/Mdz+ARLQoL2q1JyKCdScIZutkkGDZ0s8sjEW3xDOvUnePp8guew6DtU05/TjXfgh6tlJ6SEEGP1E/3aMxI8KGJS0Shg1pEQgo9ZiRsmo97c1oRNLFI2ONNbFo2tAip5uFDSYdAS0lFxaKJ9LvDI/I6zKzEaZWykLwVmhbzjRMDGxLWqN0PyRkaTIiq5JTIwcASRR2s8ds8EpBPXDpBOMp8/00rEoIm6MVJDIAkhPhtIQk5BCIjKwsSLCiyraXzZtnry83V3bR6ytLJiMiGmtinlin6uJRZEaPWJJgBIA8CKNrSJzn68aogwoxzcQP6ZKIwZbtmIMLl4IEVajqoxGkn+qiLgWyrXD54vavRNuRBRsezze5ItbR/KW/fT/4QWODYU61X5OzcDCvK5ckbYPFVOl98hnAiodQU64blmvl7445H6MKuSnySKAo80XeYDlS7oGUfzTucSPDj3Alpe53/JVqxYn316GfVgr7jRYy8DolhqrzGx60RnqGAginV5OXZEcMECsy/LvJ8cpsMsKHaEgpy2YM5UqpF6s0rB1PWpIp6QZngsStR4YzmxeqACaA91kuqlayFgjFORdAf61C2fAULlW91D0YeVN1kXjNzS3usHXnoemO9fYy+ygrZaIfZUG098HHhRm9uyVgv9OWWFPKalzO4BW15BXWTmxe8guLnFn+huFo/O1UducVYlAvqK8Eg1+/3tnaMQU+lecVf07W3MyT+QmFvqCeX1QMyfHFKzR5SZwbwYq2VzF8H+kWDH2DZZglJ36Jsu0SZDUnXomxxd5nPVNsOnGxPGO4ycGM+e6wQDN6gX4gZ7YM15e6oFoBjPqigUln/epvXkbcrIgegcsCN8QESY1FW/04CgRvrmfqNsQmmaRPrmYpklA38iARDBdUqG/xYD7EB25SGuIFtRUOswGcVU1WFg5eXvu6XGX5iX2KMaz3JKjJC08Y/LI8LqtztCuOZ0Btvhy777IdNCObectk57EjHEc9XKjv/V0owhis13KNH1DVy2tRYHDNqOKO9dlGdP+7Ip53vp6YzYO43RwC+mOTgtuv60VCOHHeDanOwWe0RedMxcvqt4W450ut0ZfsZbNBxkQ+t4TuXR8ritJOl6PhjT2RfOxlvI9+bN5lzxxduM2S1orIc68XmUla013XncGxV9Bp8KQnhcme6JJw6a92f7E7HETvIosezq4Q+iTGGPbVUF3zH9qnFwjjO9MHL8b171tHOWVY3zxB8c4ZOjmsIiyDCy8uLFn8AqcsMXQUtLrMAAAAASUVORK5CYII=">
            </div> `)
                   }
               }

           });
       }