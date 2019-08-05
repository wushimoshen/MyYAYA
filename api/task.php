<?php
header("Content-Type:text/html;charset=UTF-8");
#先链接数据库
$con = mysqli_connect("127.0.0.1","root","","goods");
#读取json文件
$json = file_get_contents("list.json");
# 把JSON数据转换为数组
$data = json_decode($json,true);
// print_r($data);
#注入数据
for($i = 0;$i<count($data);$i++){
    $gid = $data[$i]["gid"];
    $img = $data[$i]["img"];
    $des = $data[$i]["des"];
    $price = $data[$i]["price"];
    $pingjia = $data[$i]["pingjia"];
    $sql = "INSERT INTO `list` (`gid`,`img`, `des`, `price`, `pingjia` ) VALUES ('$gid','$img', '$des', '$price', '$pingjia')";
    mysqli_query($con,$sql);
}
?>