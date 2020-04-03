$(function(){
    var url = location.href
    var res = url.split('?')[1]
    
    var id = res.split('=')[1]
    console.log(id)
    $.ajax({
        type: "post",
        url: "../../server/product.php",
        data: {
            id:id
        },
        dataType: "json",
        success: function (response) {
            var data = response.data
            console.log(data)
            var ul = $(`
            <ul class="img-list">
                <li>
                    <img src="https://resource.smartisan.com/resource/2d5bac538fef9800aa5cd8420cfcdc12.jpg?x-oss-process=image/resize,w_64/format,webp"
                        alt="">
                </li>
                <li>
                    <img src="https://resource.smartisan.com/resource/2d5bac538fef9800aa5cd8420cfcdc12.jpg?x-oss-process=image/resize,w_64/format,webp"
                        alt="">
                </li>
                <li>
                    <img src="https://resource.smartisan.com/resource/2d5bac538fef9800aa5cd8420cfcdc12.jpg?x-oss-process=image/resize,w_64/format,webp"
                        alt="">
                </li>
            </ul>
            <div class="bigimg">
                <img src=${data.imgpath}
                    alt="">
            </div>
            <ul class="info">
                <li>
                    <p>${data.name}</p>
                    <p>
                        <span>${data.introduce}</span>
                        <span>${data.price}</span>
                    </p>
                </li>
                <li>
                    <h4>促销活动</h4>
                    <span>${data.promote}</span>
                </li>
                <li>
                    <h4>分辨率</h4>
                    <span>1080P</span>
                </li>
                <li>
                    <h4>颜色选择</h4>
                    <span>白色</span>
                    <span>黑色</span>
                </li>
                <li>
                    <h4>数量选择</h4>
                    <span></span>
                </li>
                <li>
                    <h4>服务说明</h4>
                    <span>*${data.explain}</span>
                </li>
            </ul>
            `)
            $('section .wrap').prepend(ul)
        }

    });
    $('.addCart').click(function(){
        var username = getCookie('username')
        // 先判断是否登录
        if (!username) {
            alert('请先登录')
            location.href = '../login/login.html'
            return false
        }
        // 再判断是否已经加入购物车了
        var data = localStorage.getItem('data')
        if (!data) {  // 本地储存没有数据
            var arr = []
            var obj = {
                username:username,
                id:id,
                num:1
            }
            arr.push(obj)
            str = JSON.stringify(arr)
            // 存数据
            localStorage.setItem('data',str)
        }else{ // 本地储存有数据
            //这条数据，本地储存中是否存在
            let res = JSON.parse(data)
            let index = res.findIndex(item=>{
                return item.id == id
            })
            if (index==-1) {
                // 原本数据中不存在
                var obj = {
                    username:username,
                    id:id,
                    num:1
                }
                res.push(obj)
            }else{
                // 这条数据存在
                res[index].num++
            }
            localStorage.setItem('data',JSON.stringify(res))
        }

    })


})




// $('.addCart').click(()=>{
//     console.log(123)
//     // jq中阻止默认行为 return false
//     // 号称阻止一切，除了默认行为，还能阻止冒泡
//     // 判断用户是否登录
//     var username = getCookie(username)
//     console.log(username)
//     if (!username) {
//         alert('请先登录')
//         location.href = '../login/login.html'
//         return false
//     }
//     // var arr = []
//     // 数组在这边，不能每次都为空
//     // 应该是判断本地存储中有没有数据
//     var data = localStorage.getItem('data')
//     // 此时data是json字符串 - 转成数组
//     if (data) { // 本地存储中有值，直接用这个数组就行
//         data = JSON.parse(data)
//         // 数组方法filter-新数组  every-每一个都满足  some-至少一个满足
//         // 判断当前用户是否加入过这个商品
//         var res = data.some((item)=>{
//             return item.id === id
//         })
//         // 上面可以直接findIndex>0 就找到了，data的some方法就不用了
//         if (res) {//有这个商品
//             // 应该在data中找到小对象，然后给小对象中的num++
//             // find-数组中找到符合的元素   findIndex
//             var index = data.findIndex(item=>{
//                 return item.id==id
//             })
//             data[index].num++

//         }else{ //没有这个对象
//             var obj = {
//             id:id,
//             username:username,
//             num:1
//         }
//         arr.push(obj)
//         }
//          // 直接将这个大数组转成json字符串，放到本地存储
//     localStorage.setItem('data',JSON.stringify(data))
//     }else{  //本地存储没有数据
//         var arr = []
//         // 获取商品信息，组合成一个对象
//         var obj = {
//             id:id,
//             username:username,
//             num:1
//         }
//         arr.push(obj)
//         localStorage.setItem('data',JSON.stringify(data))
//     }
   

//     // 先将对象放到数组中
//     // 同一个商品加入购物车，数量+1就行了，判断id是否存在，如果存在，就数量+1
//     // 将数组转成json字符串，再放入本地存储
//     // var str = JSON.stringify(arr)
//     // localStorage.setItem('data',str)
//     return false

// })
// 添加购物车成功后，应该去购物车




