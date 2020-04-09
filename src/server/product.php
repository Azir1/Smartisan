<?php
header('content-type:text/html;charset=utf-8');
$link = mysqli_connect('localhost','root','root','sys');
mysqli_query($link,'set names utf8');
$id = $_POST["id"];
$res = mysqli_query($link,"select * from sm_product where id='$id'");
$row = mysqli_fetch_assoc($res);
if ($row) {
    echo json_encode([
        'msg'=>'ok',
        'status'=>200,
        'data'=>$row
    ]);
}else{
    echo json_encode([
        'msg'=>'not found',
        'status'=>'404'
    ]);
}