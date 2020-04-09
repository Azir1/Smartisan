// 运动函数，传入节点名，目标属性，运动结束后执行的函数
function move(ele,obj,fn) {
    let res 
    let timer = {} //每个属性值对应每个定时器
    for (let attr in obj) {
        let target = obj[attr]
        if (attr=='opacity') {  //获取透明度目标值
            target = target*100
        }
        timer[attr] = setInterval(function(){
            let initial 
            if (attr=='opacity') {
                initial = getStyle(ele,attr) //透明度不能取整，parseInt()向下取整后就是0
                initial = initial*100
                console.log(initial);
            }else{
                initial = parseInt(getStyle(ele,attr))  // 得到的初始样式是带px符号，所以要parseInt()
            }
            // 计算比例,取绝对值
            let persent = (target-initial)/10
            if (persent>0) {
                persent = Math.ceil(persent)
            }else{
                persent = Math.floor(persent)
            }

            initial += persent
            if (initial==target) {  //清除对应的每个定时器
                clearInterval(timer[attr])
                delete timer[attr]
                let k = 0
                for(let f in timer){
                    k++
                }
                // 因为复杂数据类型不可以比较大小，所以要借助k
                if (k==0) {
                    fn()
                }
            }else{ //这边必须是else ，否则清除定时器后，设置的样式依然执行，影响fn()重新设置样式
                if (attr=='opacity') {
                    ele.style[attr] = initial/100
                }else{
                    ele.style[attr] = initial + 'px'   
                }
            }

        },20)
        
    }
    return res
}

// 获取元素的css样式
function getStyle(ele, attr) {
    if (window.getComputedStyle) {   //IE8以下不支持
        return window.getComputedStyle(ele)[attr]
    } else {
        return ele.clientStyle[attr]
    }
}