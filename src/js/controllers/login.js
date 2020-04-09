$(function () {
    $(".btn-primary").click(function () {
        console.log(222)
        $(":input").blur();  //所有input元素失去焦点
        if (!$("#validate").valid()) {
            return;
        }
        login()
    });
    $('#validate').validate({
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
            
        },
        focusCleanup: true,
    })
    // 发送协议之前要同意协议  .cheched   .的操作在标签上不显示，但是能用，CheckBox自带的属性
    var user = document.querySelector('[name="username"]')
    var cookie = getCookie('username')
    // console.log(cookie)
    if (cookie) {
        user.value = cookie
    }
    var btnR = document.querySelector('.btn-primary')
    // btnR.addEventListener('click', login)
    function login() {
        var checkbox = document.querySelector("[name='checkbox']").checked
        var username = document.querySelector("[name='username']").value.trim()
        var password = document.querySelector("[name='password']").value.trim()

        ajax({
            // url: '../server/login.php',
            url: '/login',
            data: {
                username: username,
                password: password
            },
            method: 'post'
        }).then(res => {
            if (res.status === 2) {
                // alert(res.msg)
                location.href = './index.html'
                if (checkbox) {
                    setCookie('username', username, 3600 * 24 * 2)
                }
            } else if (res.status === 3) {
                alert(res.msg)
            } else if (res.status === 4) {
                alert(res.msg)
            }
        })
    }
})