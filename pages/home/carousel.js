$(function(){
    function Carousel() {
        // 3、获取元素作为对象的属性
        this.carousel = document.querySelector('.carousel')
        this.ul = document.querySelector('.carousel ul')
        this.ols = document.querySelectorAll('.carousel ol li')
        this.leftBtn = document.querySelector('.carousel .left')
        this.rightBtn = document.querySelector('.carousel .right')
        this.uls = document.querySelectorAll('.carousel ul li')
        this.index = 1
        this.timerId = 0
        this.flag = true
    }
    // 最后一步，初始化函数
    Carousel.prototype.initi = function(){
        this.createLi()
        // **要用的变量用this 作为对象的属性
        // 4、给元素添加事件
        // 右键
        this.rightBtn.onclick = ()=>{
            this.right()
        }
        // 左键
        this.leftBtn.onclick = ()=>{
            // 箭头函数指向上一层作用域的this
            this.left()
        }
        // 分页器点击
        for (let i = 0; i < this.ols.length; i++) {
            this.ols[i].onclick = ()=>{
                this.dot(i+1)
            }
        }
        // 自动播放
        timerId = setInterval(()=>{
            console.log(this);
            this.right()
        },2000)
        // 鼠标移入
        this.ul.onmouseover = function(){
            clearInterval(timerId)
        }
        // 鼠标移出
        this.ul.onmouseout = ()=>{
            timerId = setInterval(()=>{
                this.right()
            },2000)
        }
    }
    // 创建节点的方法
    Carousel.prototype.createLi = function(){
        // 创建节点
        this.liLast = this.uls[0].cloneNode(true)
        this.liFirst = this.uls[this.uls.length-1].cloneNode
        (true)
        this.ul.appendChild(this.liLast)
        this.ul.insertBefore(this.liFirst,this.uls[0])
        // 父元素.insertBefore(新元素，旧元素)
        this.ul.style.width = (this.uls.length+2)*this.uls[0].clientWidth +'px'
        this.ul.style.left = -this.index*this.uls[0].clientWidth + 'px'
    }
    // 5、给构造函数的原型添加方法
    // 封装move函数
    Carousel.prototype.move = function(){
        this.flag = false
        move(this.ul,{
            left:-this.index*this.uls[0].clientWidth,
        },fn)
        let _this = this
        function fn() {
            _this.flag = true
            if (_this.index==_this.uls.length+1) {
                _this.index=1
                _this.ul.style.left = -_this.index*_this.uls[0].clientWidth+'px'
            }
            if (_this.index==0) {
                _this.index=_this.uls.length
                _this.ul.style.left = -_this.index*_this.uls[0].clientWidth+'px'
            }
            for (let i = 0; i < _this.ols.length; i++) {
                _this.ols[i].className = ''
            }
            _this.ols[_this.index-1].className = 'current'
        }
    }
    // 右键
    Carousel.prototype.right = function(){
        if (!this.flag) {
            return
        }
        this.index++
        this.move()
    }
    // 左键
    Carousel.prototype.left = function(){
        if (!this.flag) {
            return
        }
        this.index--
        this.move()
    }
    // 分页器
    Carousel.prototype.dot = function(i){
        if (!this.flag) {
            return
        }
        this.index = i
        this.move()
    }
    // 2、new创建对象
    var carousel = new Carousel()
    carousel.initi()
})