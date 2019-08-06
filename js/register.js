$(function () {
    // 底部标签引入
    $(".bottom").load("bottom.html");

    /* 图形验证码 */
    let imgCodeText = "";
    /* 短信验证码 */
    let msgText = 2222;
    /* 密码 */
    let passwordAText = "";
    let passwordBText = "";
    /* 用户名 */
    let usernameText = "";
    /* 手机号码 */
    let phoneText = "";
    // 邮箱
    let emailText = "";


    let userName = $("#userUID"); //用户名
    let phone = $("#usermobile2"); //手机号码
    let passwordA = $("#userpwd3"); //密码
    let passwordB = $("#userpwd4"); //确认密码
    let email = $("#usermail"); //邮箱
    let imgCode = $('#yzmcode2'); //验证码
    let sendMsgBtn = $("#phonecode2"); //短信验证码
    let msgCode = $("#getCode2"); //获取短信验证码


    /* 验证码处理 */

    (new Captcha({
        fontSize: 30
    })).draw(document.querySelector('#vCodeImg2'), r => {
        console.log(r, '验证码1');
        imgCodeText = r;
        /* 自动触发标签失去焦点的事件 */
        imgCode.trigger("blur");
    });


    $("#getYanzhengma").click(function () {
        (new Captcha({
            fontSize: 30
        })).draw(document.querySelector('#vCodeImg2'), r => {
            console.log(r, '验证码1');
            imgCodeText = r;
            imgCode.trigger("blur");
        });
    })

    let regname = /^[a-zA-Z0-9\u4e00-\u9fa5]{4,16}$/;
    let regpwd = /^[a-zA-Z0-9]{6,16}$/;
    let regphone = /^1[3-9]\d{9}$/;
    let regemail = /^[\w-\+&%]+@[\w-\+&%]+\.[a-zA-Z]+$/;
    // 失去焦点事件
    userName.blur(function () {
        let text = $.trim($(this).val());
        usernameText = text;
        if (!regname.test(text)) {
            $("#layui-layer41").addClass("form-group-error");
        } else {
            $("#layui-layer41").removeClass("form-group-error")
        }
    })
    passwordA.blur(function () {
        let text = $.trim($(this).val());
        passwordAText = text;
        if (!regpwd.test(text)) {
            $("#layui-layer42").addClass("form-group-error")
        } else {
            $("#layui-layer42").removeClass("form-group-error")
        }
    })
    passwordB.blur(function () {
        let text = $.trim($(this).val());
        passwordBText = text;
        if (passwordBText != passwordAText) {
            $("#layui-layer43").addClass("form-group-error")
        } else {
            $("#layui-layer43").removeClass("form-group-error")
        }
    })
    phone.blur(function () {
        let text = $.trim($(this).val());
        phoneText = text;
        if (!regphone.test(text)) {
            $("#layui-layer44").addClass("form-group-error")
        } else {
            $("#layui-layer44").removeClass("form-group-error")
        }
    })
    email.blur(function () {
        let text = $.trim($(this).val());
        emailText = text;
        if (!regemail.test(text)) {
            $("#layui-layer45").addClass("form-group-error")
        } else {
            $("#layui-layer45").removeClass("form-group-error")
        }
    })
    // 验证码
    imgCode.blur(function (e) {
        let text = $(this).val();
        if (imgCodeText.toLowerCase() != text.toLowerCase()) {
            $("#layui-layer46").addClass("form-group-error")
        } else {
            $("#layui-layer46").removeClass("form-group-error")
        }
    });
    // 提交按钮
    $("#regbut2").click(function () {
        let isCheck = $("#mmprovision2").is(":checked");
        if (!isCheck) {
            alert("请阅读并同意用户协议");
            return;
        }
        if (sendMsgBtn.val() != msgText) {
            alert("短信验证码错误");
            return
        }


        //检查是否满足条件
        if (usernameText.length != 0 &&
            phoneText.length != 0 &&
            msgText.length != 0 &&
            emailText.length != 0 &&
            passwordAText.length != 0 &&
            passwordBText.length != 0 &&
            imgCodeText.length != 0 && $(".form-group-error").length == 0
        ) {
            //满足就发送网络请求
            $.ajax({
                type: "post",
                url: "../api/register.php",
                dataType: "json",
                data: `username=${usernameText}&password=${passwordAText}&phone=${phoneText}`,
                // dataType: "dataType",
                success: function (response) {
                    console.log(response);
                    /* 先检查请求的结果，然后做出对应的处理 */
                    if (response.status == "success") {
                        alert(response.msg);
                        /* 跳转到登录页面 */
                        window.location.href = "http://127.0.0.1/MYyaya/MyYAYA/html/login.html"
                    } else {
                        alert(response.msg);
                    }
                }
            });
        } else {
            console.log(usernameText, phoneText, msgText);

        }

        //     // http://127.0.0.1/day-31/Code/login/sever/api/register.php 
        //     // http://127.0.0.1/day-31/Code/login/server/api/register.php
    })


})