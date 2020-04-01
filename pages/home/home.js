
$(function(){
    // 购物车
    $('')
    // 登录，注册
    var login = document.querySelector('.login')
    var register = document.querySelector('.register')
    var info = document.querySelector('.info')
    var cookie = getCookie('username')
    var lis = document.querySelectorAll('li')
    // console.log(cookie)
    if (cookie) {
        $('.info .user>span').html(`${cookie}`)
    //     info.innerHTML = `
    // <span style="color:gray">欢迎&nbsp;&nbsp;<span style="color:#fff">${cookie}&nbsp;</span></span>
    // <span class="logout">退出</span>
    // `
        var logout = document.querySelector('.logout')
        logout.onclick = function () {
            removeCookie('username')
            console.log(1)
            info.innerHTML = `
        <span class="login">登录</span>
        <span class="register">注册</span>
        `
        }
    }
    login.onclick = function () {
        location.href = '../login/login.html'
    }
    register.onclick = function () {
        location.href = '../register/register.html'
    }
    lis[0].onclick = function () {
        // location.href = './list.html'
    }

})