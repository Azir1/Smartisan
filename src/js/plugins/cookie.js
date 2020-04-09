// cookie的获取 getCookie('age')
function getCookie(key){
    // 获取所有cookie
    var cookies = document.cookie
    cookies = decodeURI(cookies)
    var arr = cookies.split('; ')    
    var length = arr.length
    for (let i = 0; i < length; i++) {
        var brr = arr[i].split('=')      
        if (brr[0]===key) {
            return brr[1]
        }
    }
}

// 设置cookie setCookie("name","张三"，'50','/')
function setCookie(key,value,seconds=0,path='/'){
    if (seconds==0) {
        document.cookie = `${key}=${value};path=${path}`
    } else {
        var date = new Date(+new Date()-8*3600*1000+seconds*1000)
        document.cookie = `${key}=${value};expires=${date};path=${path}`
    }
}

// 删除cookie setCookie("name",'path')
function removeCookie(key,path="/") {
    setCookie(key,null,-1,path)
}

