$(function () {
    // 底部标签引入
    $(".bottom").load("bottom.html");




    // 登录切换
    $(".login-tab").on("click", "li", function () {
        $(this).addClass("login-on").siblings().removeClass("login-on");
        $(".login-style").eq($(this).index()).show().siblings().hide();
    })
    let user = $("#txtUser");
    let pwd = $("#Userpwd");
    let imgCode = $("#txtCode");
    let imgCodeText = "";
    let username = "";
    let password = "";
    // 验证码
    (new Captcha({
        fontSize: 30
    })).draw(document.querySelector('#vCodeImg'), r => {
        console.log(r, '验证码1');
        imgCodeText = r;
        /* 自动触发标签失去焦点的事件 */
        imgCode.trigger("blur");
    });
    //尝试读取Cookie
    let usmA = Cookie.getItem("username");
    let pwdA = Cookie.getItem("password");
    if (usmA && pwdA) {
        $.post({
            url: "../api/login.php",
            dataType: "json",
            data: `username=${usmA}&password=${pwdA}`,
            success: function (response) {
                $(".tishi").show().html(response.msg);
                if (response.status == "success") {
                    // 保存账号信息
                    Cookie.setItem("username", username, 7);
                    Cookie.setItem("password", password, 7);
                    window.location.href = "http://127.0.0.1/MYyaya/MyYAYA/html/shouye.html";
                }
            }
        })
    }
    // 登录按钮
    $("#logbtn").click(function () {
        if (user.val().length == 0) {
            $(".tishi").show().html("请输入账号！")
            return;
        }
        if (user.val().length != 0 && pwd.val().length == 0) {
            $(".tishi").show().html("请输入密码！")
            return;
        }
        if (user.val().length != 0 && pwd.val().length != 0) {
            $(".tishi").hide();
            $("#logincode").show();
            $("#logbtn").click(function () {
                username = user.val();
                password = pwd.val();


                if (imgCode.val().toLowerCase() != imgCodeText.toLowerCase()) {
                    $(".tishi").show().html("验证码错误");
                    return;
                }
                // 发送网络请求
                $.post({
                    url: "../api/login.php",
                    dataType: "json",
                    data: `username=${username}&password=${password}`,
                    success: function (response) {
                        $(".tishi").show().html(response.msg);
                        if (response.status == "success") {
                            // 保存账号信息
                            Cookie.setItem("username", username, 7);
                            Cookie.setItem("password", password, 7);
                            window.location.href = "http://127.0.0.1/MYyaya/MyYAYA/html/shouye.html";
                        }
                    }
                })
            })
        }
    })


})