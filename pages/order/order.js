$(function(){
    // 导航栏点击
    $('.navbar .list li').eq(0).click(() => {
        location.href = '../home/home.html'
    })
    // 获取选中的id
    let url = location.href;
    var res = url.split('?');
    res = res[1].split('&');
        var id = res.map(item=>{
        return item.split('=')[1]
    })
    id = id.join(',')
    // 发送ajax请求
    $.ajax({
        type: "post",
        url: "../../server/order.php",
        data: {
            id:id
        },
        dataType: "json",
        success: function (response) {
            let total = 0
            let num = 0
            let data = JSON.parse(localStorage.getItem('data'))
            if (response.status === 200) {
                let res = response.data
                let len = res.length
                for (let i = 0; i < len; i++) {
                    let index = data.findIndex(item=>{
                        return item.id == res[i].id
                    })
                    let li = $(`
                    <tr class="pro">
                        <td>
                            <img src=${res[i].imgpath} alt="">
                            <span>${res[i].name}</span>&nbsp;&nbsp;
                            <span>${res[i].introduce}</span>
                        </td>
                        <td>
                            <span>￥${res[i].price}</span>
                        </td>
                        <td>
                            <span>${data[index].num}</span>
                        </td>
                        <td>
                            <span>￥${data[index].num*res[i].price}</span>
                        </td>
                    </tr>
                    `)
                    total += data[index].num*res[i].price
                    num += data[index].num
                    $('.tb').append(li)
                }
            }
            // 计算总额
            $('.total').text(total)
            $('.num').text(num)
        }
    });
})

