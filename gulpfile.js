// 生产模式下安装gulp,导入gulp
const gulp = require('gulp');

// css压缩模块
const cleanCss = require('gulp-clean-css');

// 不兼容的css自动加前缀
const autoPrefixer = require('gulp-autoprefixer');

// 压缩js
const uglify = require('gulp-uglify');

// es6转es5 
// npm i -D gulp-babel babel-core babel-preset-es2015
const babel = require('gulp-babel');

// 清除目标文件夹
const clean = require('gulp-clean');

// 配置服务器
const server = require('gulp-webserver');

// sass编译 cnpm
const sass = require('gulp-sass');

// 取出要用的方法
const {task, src, dest, parallel, watch ,series} = gulp

// 1、打包css


// 2、转es5压缩js



