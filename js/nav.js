
$(function(){
    // 登录，注册
    
    var cookie = getCookie('username')
    if (cookie) {
        $('.info .user>span').html(`${cookie}`)
        $('.logout1').addClass('logout')
        $('.logout1 ul li').eq(5).click(()=>{
            removeCookie('username')
            $('.logout1').removeClass('logout')
        })
    }else{
        $('.login').click(()=>{
            location.href = '../login/login.html'
        })
    }
    
    // 购物车
    $('.total button').click(()=>{
        location.href = '../shoppingcart/shoppingcart.html'
    })
    $('.shop').click(()=>{
        location.href = '../shoppingcart/shoppingcart.html'
    })

    





})