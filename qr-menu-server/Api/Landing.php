<?php
include '../ImageUploader.php';
include '../database.php';
header('Access-Control-Allow-Origin: *');

$action = $_POST['action'];

switch($action){


    case'get_data':
        $db = new Database('qr');
        $data = $db->read('landing',['langCode' => 'tr']);
        if($data){
            echo json_encode(['status' => 200, 'data' => $data]);
        }else{
            echo json_encode(['status' => 400, 'message' => 'Landing bulunamadı']);
        }
        break;

    case'get_landing':
        $db = new Database('qr');

        $token = $_POST['token'];

        $check = $db->read('user',['token' => $token]);
        if(!$check){
            echo json_encode(['status' => 400, 'message' => 'Token geçersiz']);
            exit;
        }

        $landing = $db->read('landing',['langCode' => $_POST['lang']]);
        if($landing){
            echo json_encode(['status' => 200, 'data' => $landing]);
        }else{
            echo json_encode(['status' => 400, 'message' => 'Landing bulunamadı']);
        }
        break;

    case'update_landing':
        $db = new Database('qr');
        $token = $_POST['token'];
        $check = $db->read('user',['token' => $token]);
        if(!$check){
            echo json_encode(['status' => 400, 'message' => 'Token geçersiz']);
            exit;
        }
        $langCode = $_POST['langCode'];
        $title = $_POST['title'];
        $location = $_POST['location'];
        $link = $_POST['link'];
        $phone = $_POST['phone'];

        $read = $db->read('landing',['langCode' => $langCode]);
        if(!$read){
            $create = $db->create('landing',['title' => $title,'location' => $location,'link' => $link,'phone' => $phone,'image' => null,'langCode' => $langCode]);
            if(!$create){
                echo json_encode(['status' => 400, 'message' => 'Landing oluşturulamadı']);
                exit;
            }
            echo json_encode(['status' => 200, 'message' => 'Landing oluşturuldu']);
            exit;
        }

        $update = $db->update('landing',['title' => $title,'location' => $location,'link' => $link,'phone' => $phone ,],['langCode' => $langCode]);
        if(!$update){
            echo json_encode(['status' => 400, 'message' => 'Landing güncellenemedi']);
            exit;
        }
        echo json_encode(['status' => 200, 'message' => 'Landing güncellendi']);
        exit;
        
        break;

        case'update_landing_image':
            $db = new Database('qr');
            $token = $_POST['token'];
            $check = $db->read('user',['token' => $token]);
            if(!$check){
                echo json_encode(['status' => 400, 'message' => 'Token geçersiz']);
                exit;
            }
            $langCode = $_POST['langCode'];
            $logo = $_FILES['logo'];

            $read = $db->read('landing',['langCode' => $langCode]);
            if(!$read){
                echo json_encode(['status' => 400, 'message' => 'Landing bulunamadı önce yazı alanlarını giriniz.']);
                exit;
            }


            $oldImage = $read[0]['image'];
          

            $uploader = new ImageUploader("uploads/landing_images/" ,5 * 1024 * 1024, ["jpg", "jpeg", "png", "gif", "webp"], true);
            $imagePath = $uploader->upload($logo);
         
            if(!$imagePath){
                echo json_encode(['status' => 400, 'message' => $imagePath->error]);
                exit;
            }

            $update = $db->update('landing',['image' => $imagePath],['langCode' => $langCode]);

            if(!$update){
                echo json_encode(['status' => 400, 'message' => 'Landing görseli güncellenemedi']);
                exit;
            }

            echo json_encode(['status' => 200, 'message' => 'Landing görseli güncellendi']);
            if($oldImage){
                unlink($oldImage);
            }

            exit;

        break;


}


