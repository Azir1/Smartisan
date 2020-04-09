<?php
header('content-type:text/html;charset=utf-8');
$link = mysqli_connect('localhost','root','root','sys');
mysqli_query($link,'set names utf8');
$username = $_POST["username"];
$password = $_POST["password"];
$res = mysqli_query($link,"select * from sm_user where username='$username'");
$row = mysqli_fetch_assoc($res);
if ($row) {
    $arr = [
        "msg"=>"用户名已存在",
        "status"=>3
    ];
}else{
    $res = mysqli_query($link,"insert user(username,password)values ('$username','$password')");
    // $row = mysqli_fetch_assoc($res);
    if ($res) {
        $arr = [
            "msg"=>"注册成功",
            "status"=>2,
        ];
    }else{
        $arr = [
            "msg"=>"注册失败",
            "status"=>4,
        ];
    }
}
echo json_encode($arr);
