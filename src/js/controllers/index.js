$(function () {
    // 导航栏点击
    $('.navbar .list li').eq(0).click(() => {
        location.href = './index.html'
    })

    $.ajax({
        type: "get",
        url: "../server/home.php",
        // data: "json",
        dataType: "json",
        success: function (response) {
            console.log(response)
            var len = response.length
            for (let i = 0; i < len; i++) {
                var li = $(`
                <li index=${response[i].id}>
                    <a href="javascript:;">
                        <img src="${response[i].imgpath}"
                            alt="">
                        <h4>${response[i].name}</h4>
                        <p class="desc">${response[i].introduce}</p>
                        <p class="price">
                            <span>${response[i].price}</span>
                            <del>${response[i].price1}</del>
                        </p>
                    </a>
                </li>
                `)
                $('.card ul').append(li)
            }
            // 点击进入详情页
            $('.card li').click(function () {
                var id = $(this).attr('index')
                var index= layer.load(1, {
                    shade: [0.1,'#fff'] //0.1透明度的白色背景
                })
                setTimeout(()=>{
                    layer.close(index);
                    location.href = './product.html' + '?id=' + id
                },700)
            })
            // 滚动导航栏固定
            // 滚动条事件节流

            window.onscroll = throttle(fn, ['a', 'b', 'c', 'd'])
            function fn(args) {
                if ($(document).scrollTop() >= 100) {
                    $('header').addClass('navbar-fixed-top')
                } else {
                    $('header').removeClass('navbar-fixed-top')
                }
            }
            // 节流
            function throttle(fn, ...args) {
                // 通过闭包保存一个标记flag
                let flag = true
                return function () {
                    if (!flag) {
                        return
                    }
                    flag = false
                    setTimeout(() => {
                        fn.apply(this, args)
                        flag = true
                    }, 10)
                }
            }
        }
    });

})




