// 生产模式下安装gulp,导入gulp
const gulp = require('gulp');

// css压缩模块
const cleanCss = require('gulp-clean-css');

// 不兼容的css自动加前缀
const autoPrefixer = require('gulp-autoprefixer');

// 压缩js
const uglify = require('gulp-uglify');

// es6转es5  注意babel版本
// npm i -D gulp-babel babel-preset-env babel-core
/* 
新建项目，在项目的根目录下创建一个文件名为“.babelrc”的配置文件
输入代码：
{
    "presets":["es2015"]
}
*/
const babel = require('gulp-babel');

// 清除目标文件夹
const clean = require('gulp-clean');

// 配置服务器
const server = require('gulp-webserver');

// sass编译 cnpm
// const sass = require('gulp-sass');

// 取出要用的方法
const {task, src, dest, parallel, watch ,series} = gulp

// 1、加前缀并压缩css
task('cssHandler',() => {
    return src('./src/css/*.css')
            .pipe(autoPrefixer())  //自动加前缀
            .pipe(cleanCss()) //压缩
            .pipe(dest('./dist/css'))
})
// 2、移动css下的libs
task('moveCssLibs',()=>{
    return src('./src/css/libs/**')
            .pipe(dest('./dist/css/libs'))
})
// 3、移动所有img
task('moveImg',()=>{
    return src('./src/img/**')
            .pipe(dest('./dist/img'))
})
// 4、转es5压缩js
task('jsHandler',()=>{
    return src('./src/js/controllers/*.js')
            .pipe(babel())//转es5才能压缩 
            .pipe(uglify())  //压缩js
            .pipe(dest('./dist/js/controllers'))
})
// 5、移动js下的libs
task('moveJsLibs',()=>{
    return src('./src/js/libs/**')
            .pipe(dest('./dist/js/libs'))
})
// 6、移动js下的plugins
task('moveJsPlugins',()=>{
    return src('./src/js/plugins/**')
            .pipe(dest('./dist/js/plugins'))
})
// 7、移动pages
task('movepages',()=>{
    return src('./src/pages/**')
            .pipe(dest('./dist/pages'))
})
// // 8、移动php文件  跨域请求
// task('movephp',()=>{
//     return src('./src/server/**')
//             .pipe(dest('./dist/server'))
// })
// 9、删除dist目录
// 如果每次打包的时候起不一样的名字，会造成有些文件没有用，但是还占据空间。所以每次在打包之前应该先将之前的文件夹情空，然后再打包。
task('delHandler',()=>{
    return src('./dist')
            .pipe(clean())
})
// 10、配置服务器
task('server',()=>{
    return src('./dist') //找到要打开页面的文件夹，作为网站的根目录
            .pipe(server({ //服务器需要一些配置
                host:'localhost',//域名，可以自定义
                port:9000,//端口号 0-65535，尽量不使用0-1023
                open:'./pages/index.html',//默认打开的首页，从dist下的目录开始书写
                livereload:true, //自动刷新浏览器 - 热重启
                proxies:[ //每个代理配置都在proxies里面
                    // 每一个代理配置就是一个对象
                    {
                        source:'/home',//源，代理标识符
                        // 直接请求下面的地址也拿不到东西，因为跨域了
                        target:'http://localhost/smartisan/src/server/home.php'
                    },
                    {
                        source:'/login',//源，代理标识符
                        // 直接请求下面的地址也拿不到东西，因为跨域了
                        target:'http://localhost/smartisan/src/server/login.php'
                    },
                    {
                        source:'/nav',//源，代理标识符
                        // 直接请求下面的地址也拿不到东西，因为跨域了
                        target:'http://localhost/smartisan/src/server/nav.php'
                    },
                    {
                        source:'/order',//源，代理标识符
                        // 直接请求下面的地址也拿不到东西，因为跨域了
                        target:'http://localhost/smartisan/src/server/order.php'
                    },
                    {
                        source:'/product',//源，代理标识符
                        // 直接请求下面的地址也拿不到东西，因为跨域了
                        target:'http://localhost/smartisan/src/server/product.php'
                    },
                    {
                        source:'/register',//源，代理标识符
                        // 直接请求下面的地址也拿不到东西，因为跨域了
                        target:'http://localhost/smartisan/src/server/register.php'
                    },
                    {
                        source:'/shoppingcart',//源，代理标识符
                        // 直接请求下面的地址也拿不到东西，因为跨域了
                        target:'http://localhost/smartisan/src/server/shoppingcart.php'
                    }
                ]
            }))
})
// 11、监视任务
task('watchcss', () => {
    watch('./src/css/**',series('cssHandler','moveCssLibs'))
})
task('watchimg',()=>{
    watch('./src/img/**',parallel('moveImg'))
})
task('watchjs',()=>{
    // 当js文件发生改变时，执行任务
    watch('./src/js/**',series('jsHandler','moveJsLibs','moveJsPlugins'))
})
task('watchhtml',()=>{
    watch('./src/pages/**',parallel('movepages'))
})


// 12、导出默认任务
exports.default = series(
    'delHandler',
    parallel('cssHandler','moveCssLibs','moveImg','jsHandler','moveJsLibs','moveJsPlugins','movepages'),
    'server',
    parallel('watchcss','watchimg','watchjs','watchhtml')
)





