<?php
/* (1) 接收前端提交的参数：用户名 && 密码 && 手机号码 */
/* (2) 检查用户名和手机号码是否已经被使用，如果已经被使用返回错误信息提醒用户 */
/* (3) 如果满足注册的条件，那么就把当前的账户保存起来 */


/* 数据库操作：命令行  ||  通过编程语言PHP   ||  利用自带的网页工具  */
# INSERT INTO `userList` (`username`, `password`, `phone`) VALUES ('zs', '0000000', '18689429780');


// 01-先连接到服务器的数据库(选择表)
/* 参数1：服务器地址 */
/* 参数2：用户名 */
/* 参数3：密码 */
/* 参数4：数据库名字 */
$db = mysqli_connect("127.0.0.1","root","","goods");

$username = $_REQUEST["username"];
$password = $_REQUEST["password"];
$phone = $_REQUEST["phone"];

$sql = "INSERT INTO `users` (`username`, `password`, `phone`) VALUES ('$username', '$password', '$phone')";
$result = mysqli_query($db, $sql);

// #bool(false)  | bool(true)
// var_dump($result);

/* 返回JSON数据给客户端 */
/* 规范：{"status":"success","msg":"注册成功","data":""} */
$data = array("status"=>"", "msg"=>"", "data"=>"");
if($result)
{
  $data["status"] = "success";
  $data["msg"] = "恭喜你，注册成功！";
}else{
  $data["status"] = "error";
  $data["msg"] = "抱歉，用户名或者手机号码已经被注册了！";
}
echo json_encode($data,true);

?>