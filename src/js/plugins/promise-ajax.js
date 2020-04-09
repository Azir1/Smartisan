/**
 * @description: 使用promise语法封装的ajax请求
 * @param {object} obj参数
 *  obj.url     表示请求路径，必选项
 *  obj.method  表示请求方式，默认get
 *  obj.async       表示是否异步，可选项，默认是异步
 *  obj.data        请求携带的数据(请求体),可选项，没有默认值 - 对象
 *  obj.dataType    请求希望返回的数据类型，可选项，默认为json
 * @return: Promise对象，使用then或catch解决回调地狱
 */

// 封装ajax请求
function ajax(obj) {
// 判断是否传入了url
    if (!obj.url) {
        throw new Error('请传入url')
    }
    // 判断传入的url格式
    if (Object.prototype.toString.call(obj.url)!="[object String]") {
        throw new Error("url格式不对")
    }
    // 判断是否传入请求方式,默认get
    if (!obj.method) {
        obj.method = 'get'
    }
    // 判断请求方式是否正确
    if (obj.method!='get'&&obj.method!='post') {
        throw new Error('必须是get或post请求')
    }
    // 判断是否传入是否异步，默认异步
    if (obj.async==undefined) { //这边必须是undefined
        obj.async = true
    }
    // 判断传入的异步是否出错
    if (obj.async!=true&&obj.async!=false) {
        throw new Error('是否异步必须是一个布尔值')
    }
    // 判断传入的想要的数据格式
    if (!obj.dataType) {
        obj.dataType = 'json'
    }
    if (obj.dataType!='json'&&obj.dataType!='string') {
        throw new Error('想要的数据格式只能是string或json')
    }
    // 判断是否传入参数
    let data
    if (obj.data) {
        if (Object.prototype.toString.call(obj.data)==="[object Object]") {
            // 转换传入数据的格式
            data = params(obj.data)
        }else{
            throw new Error('传入的数据格式必须为对象')
        }
    }else{
        obj.data = null
    }
    // 判断是否传入了函数，避免出错
    if (!obj.success) {
        obj.success = function(){}
    }
    if (!obj.error) {
        obj.error = function(){}
    }
    // 发请求
    let xhr
    // 兼容
    try {
        xhr = new XMLHttpRequest()
    } catch (error) {
        xhr = new ActiveXObject("Microsoft.XMLHTTP")
    }
    return new Promise(function(resolve,reject){
        // 监听状态
        xhr.onreadystatechange = function(){
            if (xhr.readyState===4) {
                if (xhr.status>=200 && xhr.status<300) {
                    let res = xhr.responseText
                    if (obj.dataType==='json') {
                        res = JSON.parse(res)
                    }
                    // 判断数据类型
                    resolve(res)
                }else{
                    reject()
                }
            }
        }
        // 判断请求方式
        if (obj.method === 'get') {
            xhr.open('get',obj.url + "?" + data,obj.async)
            xhr.send()
        }else if (obj.method === 'post') {
            xhr.open('post',obj.url,obj.async)
            xhr.setRequestHeader("content-type","application/x-www-form-urlencoded")
            xhr.send(data)
        }
    })
// 将传入的数据对象转换成 attr = 值&attr = 值
    function params(data) {
        var arr = []
        for(var attr in data){
            arr.push(attr + '=' + data[attr])
        }
        return arr.join("&")
    }
}

// ajax({
//     method:'post',//请求方法，默认get
//     url:'./province.php',
//     data:{
//         provinceName:"江苏省"  //传入数据,必须是对象
//     },
//     async:true,  //默认异步
//     dataType:'json', //希望返回的数据类型默认json，也可以是string
// }).then(function(res){
//     console.log(res)
// })










