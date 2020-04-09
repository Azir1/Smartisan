
$(function(){
    // 登录，注册
    var cookie = getCookie('username')
    if (cookie) {
        $('.info .user>span').html(`${cookie}`)
        $('.logout1').addClass('logout')
        $('.logout1 ul li').eq(5).click(()=>{
            removeCookie('username')
            $('.logout1').removeClass('logout')
            location.reload()
        })
    }else{
        $('.login').click(()=>{
            location.href = './login.html'
        })
    }
    let data = localStorage.getItem('data')
    
    if (!Boolean(data)) {//空的
        $('.empty').css({
            display:'block'
        })
        $('.product').css({
            display:'none'
        })
    }else{
        $('.empty').css({
            display:'none'
        })
        $('.product').css({
            display:'block'
        })
        data = JSON.parse(data)
        let id = data.map((item,index)=>{
            return item.id
        })
        id = id.join(',')
        $.ajax({
            type: "post",
            url: "../server/nav.php",
            data: {
                id:id
            },
            dataType: "json",
            success: function (response) {
                if (response.status===200) {
                    // 本地存储获取数据
                    let data = JSON.parse(localStorage.getItem('data'))
                    let res = response.data
                    let len = res.length
                    let num = 0
                    let total = 0
                    for (let i = 0; i < len; i++) {
                        let index = data.findIndex(item=>{
                            return item.id == res[i].id
                        })
                        num += data[index].num
                        total += data[index].num*res[i].price
                        let li = $(`
                        <li>
                            <img src=${res[i].imgpath} alt="">
                            <div>
                                <h4>${res[i].name}</h4>
                                <p>${res[i].introduce}</p>
                                <p class="price">
                                    <span>￥${res[i].price}</span>× <span>${data[index].num}</span>
                                </p>
                            </div>
                        </li>
                        `)
                        
                        $('.product ul').append(li)
                    }
                    $('.totalPrice span').text(num)
                    $('.totalPrice i').text('￥'+total)
                    
                }
            }
        });
    }
    // 购物车
    $('.total button').click(()=>{
        location.href = './shoppingcart.html'
    })
    $('.shop').click(()=>{
        location.href = './shoppingcart.html'
    })

    





})