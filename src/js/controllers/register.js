$(function () {
    // 发送协议之前要同意协议  .cheched   .的操作在标签上不显示，但是能用，CheckBox自带的属性
    $(".btn-primary").click(function () {
        $(":input").blur();  //所有input元素失去焦点
        if (!$("#validate").valid()) {
            return;
        }
        register()
    });

    // 1、初始化校验
    $('#validate').validate({
        // errorElement: "em",
        errorClass: "red",
        rules: {
            username: {
                required: true,
                minlength: 2,
                maxlength: 5,
            },
            password: {
                required: true,
                minlength: 5,
                maxlength: 18
            },
            confirm_password: {
                required: true,
                // minlength: 5,
                equalTo: "#password"
            },
        },
        messages: {
            username: {
                required: "用户名不能为空",
                minlength: "用户名至少2个字",
                maxlength: '用户名不超过5个字'
            },
            password: {
                required: "密码不能为空",
                minlength: "密码至少5位",
                maxlength: '密码不能超过18位'
            },
            confirm_password: {
                required: "请输入密码",
                // minlength: "密码长度不能小于 5 个字母",
                equalTo: "两次密码输入不一致"
            },
        },
        focusCleanup: true,
    })

    var btnR = document.querySelector('.btn-primary')
    var btnL = document.querySelector('.btn-default')
    btnL.onclick = function () {
        location.href = './login.html'
    }
    // btnR.addEventListener('click', register)
    function register() {
        var checkbox = document.querySelector("[name='checkbox']").checked
        if (!checkbox) {
            alert('先同意协议')
            return
        }
        var username = document.querySelector("[name='username']").value.trim()
        var password = document.querySelector("[name='password']").value.trim()
        ajax({
            url: '../server/register.php',
            data: {
                username: username,
                password: password
            },
            method: 'post'
        }).then(res => {
            if (res.status === 2) {
                alert(res.msg)
                location.href = './login.html'
            } else if (res.status === 3) {
                alert(res.msg)
            } else if (res.status === 4) {
                alert(res.msg)
            }
        })
    }
})