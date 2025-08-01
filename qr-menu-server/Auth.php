<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
require_once 'database.php';

$action = $_POST['action'];

switch($action){
    case 'login':
      

    foreach($_POST as $key => $value){
      if(empty($value)){
        echo json_encode([
          'status' => 400,
          'message' => 'Lütfen tüm alanları doldurunuz.'
        ]);
        exit;
      }
    }
    
    $db = new Database('qr');
    $name = $_POST['name'];
    $password = $_POST['password'];

    $user = $db->read('user', ['name' => $name]);

    
    if (!empty($user)) {
        if (md5($password) === $user[0]['password']) {
            $token = bin2hex(random_bytes(32));
            $update = $db->update('user', ['token' => $token], ['id' => $user[0]['id']]);
            if ($update) {

                echo json_encode([
                    'status' => 200,
                    'token' => $token,
                    'message' => 'Giriş başarılı'
                ]);
            }else {
                echo json_encode([
                    'status' => 400,
                    'message' => 'Giriş başarısız'
                ]);
            }
        } else {
            echo json_encode([
                'status' => 400,
                'message' => 'Şifre hatalı. Lütfen tekrar deneyiniz.'
            ]);
        }
    } else {
        echo json_encode([
            'status' => 400,
            'message' => 'Kullanıcı bulunamadı'
        ]);
    }

break;
}





