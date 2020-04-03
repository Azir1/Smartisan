$(function(){
    $.ajax({
        type: "get",
        url: "../../server/home.php",
        // data: "json",
        dataType: "json",
        success: function (response) {
            console.log(response)
            var len = response.length 
            for (let i = 0; i < len; i++) {
                var li =$(`
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
            $('.card li').click(function(){
                var id = $(this).attr('index')
                console.log(id)
                location.href = '../product/product.html'+'?id='+id
            })
        }
    });
    





})




