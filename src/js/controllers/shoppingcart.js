$(function () {
    // 导航栏点击
    $('.navbar .list li').eq(0).click(() => {
        location.href = './index.html'
    })
    var data = localStorage.getItem('data')
    if (!Boolean(data)||data=='[]') {
        $('.tb').html('<div>你的购物车还没有商品，快去<a href="./index.html">添加</a>吧！</div>')
        return false
    } else {
        data = JSON.parse(data) //解析json字符串
        var arr = data.map(item => {//map遍历数组，并返回新数组
            return item.id  //返回新数组合集
        })
        var id = arr.join(',')//数组分割 1,2,3
        $.ajax({  //得到id后发请求
            type: "post",
            url: "../server/shoppingcart.php",
            data: {
                id: id
            },
            dataType: "json",
            success: function (response) {
                // 返回的数据加载到页面
                var res = response.data
                let len = res.length
                for (let i = 0; i < len; i++) {
                    // fliter 筛选符合要求的数据，并返回数组
                    var index = data.filter(item=>{
                        return item.id==res[i].id
                    })
                    var tr = $(`
                    <tr class="product" id=${res[i].id} price=${res[i].price}>
                        <td>
                            <input type="checkbox" class='check'>
                            <img src=${res[i].imgpath}
                                alt="">
                            <span class='name'>${res[i].name}</span>&nbsp;&nbsp;
                            <span>${res[i].introduce}</span>
                        </td>
                        <td>
                            <span class='price'>${res[i].price}</span>
                        </td>
                        <td>
                            <span class="reduce"></span>
                            <input type='number' class='num' value=${index[0].num}>
                            <span class="plus"></span>
                        </td>
                        <td>
                            <span>￥${res[i].price*index[0].num}</span>
                        </td>
                        <td>
                            <span class='del'></span>
                        </td>
                    </tr>
                    `)
                    $('.tb').append(tr)
                }
                total()
                // 点击标题，去详情页
                $('.name').click(function(){
                    let id = $(this).parent().parent().attr('id')
                    location.href = `./product.html?id=${id}`
                })
                // 全选操作
                $('[type="checkbox"]').last().click(()=>{
                    if ($('[type="checkbox"]').last().prop('checked')) {
                        $('[type="checkbox"]').prop('checked',true)
                    }else{
                        $('[type="checkbox"]').prop('checked',false)
                    }
                    total()
                })
                // 单选操作
                $('.check').click(function(){
                    // 伪数组转为数组，然后every看是否都为true
                    var arr = Array.from($(".check"))
                    let res = arr.every(item=>{
                        return $(item).prop('checked')
                    })
                    if (res) {
                        $('[type="checkbox"]').last().prop('checked',true)
                    }else{
                        $('[type="checkbox"]').last().prop('checked',false)
                    }
                    total()
                })
                // 数量加减
                $('.reduce').click(function(){
                    let n = $(this).next().val()
                    n = n*1 - 1
                    if (n<=0) {
                        n=1
                    }
                    $(this).next().val(n)
                    var id = $(this).parent().parent().attr('id')
                    var res = data.findIndex(item=>{
                        return item.id == id
                    })
                    data[res].num = n
                    localStorage.setItem('data',JSON.stringify(data))
                    total()
                })
                $('.plus').click(function(){
                    let n = $(this).prev().val()
                    n = n*1
                    n++
                    if (n>=10) {
                        n=10
                    }
                    $(this).prev().val(n)
                    var id = $(this).parent().parent().attr('id')
                    var res = data.findIndex(item=>{
                        return item.id == id
                    })
                    data[res].num = n
                    localStorage.setItem('data',JSON.stringify(data))
                    total()
                })
                // 删除商品
                $('.del').click(function(){
                    var res = $(this).parent().parent().attr('id')
                    let data2 = JSON.parse(localStorage.getItem('data'))
                    var index = data2.findIndex(item=>{
                        return item.id == res
                    })
                    data2.splice(index,1)
                    localStorage.setItem('data',JSON.stringify(data2))
                    // 直接在这里删除元素，不需要刷新页面
                    $(this).parent().parent().remove()
                    let data3 = localStorage.getItem('data')
                    if (data3.length == 0||data3=='[]') {
                        $('.tb').html('<div>你的购物车还没有商品，快去<a href="./index.html">添加</a>吧！</div>')
                    }
                    total()
                })
                // 删除选中的商品
                $('.delAll').click(function(){
                    $('.check').each((index,item)=>{
                        if ($(item).prop('checked')) {
                            let data = localStorage.getItem('data')
                            data = JSON.parse(data)
                            let id = $(item).parent().parent().attr('id')
                            let i = data.findIndex(item=>{
                                return item.id == id
                            })
                            data.splice(i,1) //从指定位置开始，删除数组中的一个元素
                            localStorage.setItem('data',JSON.stringify(data))
                            // 直接在这里删除元素，不需要刷新页面
                            $(item).parent().parent().remove()
                            data = JSON.parse(localStorage.getItem('data'))
                            if (data.length == 0) {
                                $('.tb').html('<div>你的购物车还没有商品，快去<a href="./index.html">添加</a>吧！</div>')
                            }
                        }
                        total()
                    })
                })
                // 去结算+选择的id
                $('.account button').click(function(){
                    var arr = Array.from($('.check'));
                    var res = arr.filter((item)=>{
                        return $(item).prop('checked') 
                    })
                    var id = res.map(item=>{
                        return $(item).parent().parent().attr('id')
                    })
                    if (id.length==0) {
                        layer.msg('您还没选择任何商品');
                        return false;
                    }
                    var str = ''
                    for (let j = 0; j < id.length; j++) {
                        str += `id=${id[j]}&` ;
                    }
                    str = str.substr(0,str.length-1)
                    location.href = './order.html?'+str
                })
            }
        });
    }
// 计算小计，总价，总数量
function total(){
    // 选中每个数字框
    $('.num').each((index,item)=>{
        var res = $(item).val()*$(item).parent().prev().children().text()
        res = res.toFixed(2)
        $(item).parent().next().children().text(res)
    })
    let totalNum = 0
    let totalPrice = 0
    let total = 0
    
    $(".check").each((index,item)=>{
        total += $(item).parent().siblings().eq(1).children('.num').val()*1
        if ($(item).prop('checked')) { //总价
            totalPrice += $(item).parent().siblings().eq(2).text()*1
            totalNum += $(item).parent().siblings().eq(1).children('.num').val()*1
        }
        
       
        $('.total').text(totalPrice.toFixed(2))
        $('.selected').text(totalNum)
        $('.all').text(total)
    })
}


})