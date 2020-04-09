<?php
header('content-type:text/html;charset=utf-8');
$link = mysqli_connect('localhost','root','root','sys');
$id = $_POST["id"];
mysqli_query($link,'set names utf8');
$res = mysqli_query($link,"select * from sm_product where id in ($id)");
$arr = [];
while ($row = mysqli_fetch_assoc($res)) {
    $arr[] = $row;
}
if (!$row) {
    echo json_encode([
        'msg'=>'ok',
        'status'=>200,
        'data'=>$arr
    ]);
}else{
    echo json_encode([
        'msg'=>'not found',
        'status'=>404,
    ]);
}

