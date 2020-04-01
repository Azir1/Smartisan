<?php
header('content-type:text/html;charset=utf-8');
$link = mysqli_connect('localhost','root','root','sys');
mysqli_query($link,'set names utf8');
$username = $_POST["username"];
$password = $_POST["password"];
$res = mysqli_query($link,"select * from user where username='$username'");
$row = mysqli_fetch_assoc($res);
if ($row) {
    $res = mysqli_query($link,"select * from user where username='$username' and password='$password'");
    $row = mysqli_fetch_assoc($res);
    if ($row) {
        $arr = [
            "msg"=>"登录成功",
            "status"=>2
        ];
    }else{
        $arr = [
            "msg"=>"密码错误",
            "status"=>3
        ];
    }
}else{
    $arr = [
        "msg"=>"用户名不存在",
        "status"=>4
    ];
}
echo json_encode($arr);
