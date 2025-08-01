<?php
include '../ImageUploader.php';
include '../database.php';
header('Access-Control-Allow-Origin: *');

$action = $_POST['action'];

switch($action){


    case'getLanguages':
        $db = new Database('qr');
        $read = $db->read('language');
        if(!$read){
            echo json_encode(['status' => 400, 'message' => 'Diller bulunamadı']);
            exit;
        }
        echo json_encode(['status' => 200, 'message' => 'Diller başarıyla getirildi.', 'data' => $read]);
        exit;
        break;

    case'get_languages':
        $db = new Database('qr');
        $token = $_POST['token'];
        $check = $db->read('user',['token' => $token]);
        if(!$check){
            echo json_encode(['status' => 400, 'message' => 'Token geçersiz']);
            exit;
        }
        $read = $db->read('language');
        if(!$read){
            echo json_encode(['status' => 400, 'message' => 'Diller bulunamadı']);
            exit;
        }
        echo json_encode(['status' => 200, 'message' => 'Diller başarıyla getirildi.', 'data' => $read]);
        exit;

        exit;
        break;
        case'create_language':
            $db = new Database('qr');
            $token = $_POST['token'];
            $check = $db->read('user',['token' => $token]);
            if(!$check){
                echo json_encode(['status' => 400, 'message' => 'Token geçersiz']);
                exit;
            }
            

            foreach($_POST as $key => $value){
               if($value == null){
                echo json_encode(['status' => 400, 'message' => 'Tüm alanları doldurunuz.']);
                exit;
               }
            }

            $name = $_POST['name'];
            $code = $_POST['code'];
            $isActive = $_POST['isActive'] ? true : false;

            $read = $db->read('language',['code' => $code]);
            if($read){
                echo json_encode(['status' => 400, 'message' => 'Dil zaten mevcut']);
                exit;
            }

            $create = $db->create('language',['name' => $name,'code' => $code,'isActive' => $isActive]);
            if(!$create){
                echo json_encode(['status' => 400, 'message' => 'Dil oluşturulamadı']);
                exit;
            }
            echo json_encode(['status' => 200, 'message' => 'Dil oluşturuldu']);
            exit;

        break;


        case'update_language':
            $db = new Database('qr');
            $token = $_POST['token'];
            $check = $db->read('user',['token' => $token]);
            if(!$check){
                echo json_encode(['status' => 400, 'message' => 'Token geçersiz']);
                exit;
            }

            foreach($_POST as $key => $value){
                if($value == null){
                    echo json_encode(['status' => 400, 'message' => 'Tüm alanları doldurunuz.']);
                    exit;
                }
            }


            $id = $_POST['id'];
            $name = $_POST['name'];
            $code = $_POST['code'];
            $isActive = $_POST['isActive'] ? true : false;

            $read = $db->read('language',['id' => $id]);
            if(!$read){
                echo json_encode(['status' => 400, 'message' => 'Dil bulunamadı']);
                exit;
            }

            $update = $db->update('language',['name' => $name,'code' => $code,'isActive' => $isActive],['id' => $id]);
            if(!$update){
                echo json_encode(['status' => 400, 'message' => 'Dil güncellenemedi']);
                exit;
            }
            echo json_encode(['status' => 200, 'message' => 'Dil güncellendi']);
            exit;
            

            break;



        case'delete_language':
            $db = new Database('qr');
            $token = $_POST['token'];
            $check = $db->read('user',['token' => $token]);
            if(!$check){
                echo json_encode(['status' => 400, 'message' => 'Token geçersiz']);
                exit;
            }

            $id = $_POST['id'];
            $delete = $db->delete('language',['id' => $id]);
            if(!$delete){
                echo json_encode(['status' => 400, 'message' => 'Dil silinemedi']);
                exit;
            }
            echo json_encode(['status' => 200, 'message' => 'Dil silindi']);
            exit;

        break;





}


