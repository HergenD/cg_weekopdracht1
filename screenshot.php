<?php 
$url = $_POST['input'];
$file_name = "images\\" . md5($url) . ".jpg";
$file_path = "C:\\xampp\\htdocs\\week1\\". $file_name;
if (!file_exists($file_path)){
$exec = "C:\\PROGRA~1\\MOZILL~1\\firefox.exe -screenshot ". $file_path ." ". $url . " --window-size=1200,900";
exec($exec);
}
echo $file_name;
?>