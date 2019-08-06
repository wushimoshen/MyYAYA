<?php
# 先获取提交的参数
$username = $_REQUEST["username"];
$password = $_REQUEST["password"];

# 连接数据库并且到数据库中进行查询
$db = mysqli_connect("127.0.0.1", "root", "", "goods");
 
# 用户名存在 && 密码要正确
# 检查指定的用户名
$sql = "SELECT * FROM  users WHERE username = '$username'";
$result = mysqli_query($db,$sql);
$pwd = mysqli_fetch_array($result);
$data = array("status" => "", "msg" => "", "data" => "");
if(mysqli_num_rows($result) == "0")
{
  $data["status"] = "error";
  $data["msg"] = "用户名不存在！";
}else{
  /* 检查密码是否正确 */
  if($password != $pwd["password"])
  {
    $data["status"] = "error";
    $data["msg"] = "密码不正确！";
  }else{
    $data["status"] = "success";
    $data["msg"] = "恭喜你，登录成功！";
  }
}

echo json_encode($data, true);


?>