<?php
include '../ImageUploader.php';
include '../database.php';
header('Access-Control-Allow-Origin: *');

$action = $_POST['action'];

switch($action){


    case'get_data':
        $db = new Database('qr');
        $categories = $db->read('category',['langCode' => 'tr']);
        if(!$categories){
            echo json_encode(['status' => 400, 'message' => 'Kategori bulunamadı']);
            exit;
        }

        echo json_encode(['status' => 200, 'data' => $categories]);
        exit;
        
        break;

    case'get_categories':
        $db = new Database('qr');
        $token = $_POST['token'];
        $check = $db->read('user',['token' => $token]);
        if(!$check){
            echo json_encode(['status' => 400, 'message' => 'Token geçersiz']);
            exit;
        }

        $categories = $db->read('category',['langCode' => $_POST['langCode']]);
        if(!$categories){
            echo json_encode(['status' => 400, 'message' => 'Kategori bulunamadı']);
            exit;
        }

        echo json_encode(['status' => 200, 'data' => $categories]);
        exit;

        break;
    case'create_category':
        foreach($_POST as $key => $value){
            if(empty($value) || $value == null){
                echo json_encode(['status' => 400, 'message' => $key . ' alanı boş bırakılamaz.']);
                exit;
            };
        }

        $db = new Database('qr');
        $token = $_POST['token'];
        $check = $db->read('user',['token' => $token]);
        if(!$check){
            echo json_encode(['status' => 400, 'message' => 'Token geçersiz']);
            exit;
        }



        $title = $_POST['title'];
        $image = $_FILES['image'];
        $langCode = $_POST['langCode'];

        $read = $db->read('category',['langCode' => $langCode,'title' => $title]);
        if(!$read){
            
            $uploader = new ImageUploader("uploads/category_images" ,5 * 1024 * 1024, ["jpg", "jpeg", "png", "gif", "webp"], true);
            $imagePath = $uploader->upload($image);

            if(!$imagePath){
                echo json_encode(['status' => 400, 'message' => $imagePath->error]);
                exit;
            }

            $create = $db->create('category',['title' => $title,'image' => $imagePath,'langCode' => $langCode]);
            if(!$create){
                echo json_encode(['status' => 400, 'message' => 'Kategori oluşturulamadı.']);
                exit;
            }

            echo json_encode(['status' => 200, 'message' => 'Kategori oluşturuldu.']);
            exit;
        }else{
            $oldImage = $read[0]['image'];

            $uploader = new ImageUploader("uploads/category_images" ,5 * 1024 * 1024, ["jpg", "jpeg", "png", "gif", "webp"], true);
            $imagePath = $uploader->upload($image);

            if(!$imagePath){
                echo json_encode(['status' => 400, 'message' => $imagePath->error]);
                exit;
            }

            $update = $db->update('category',['title' => $title,'image' => $imagePath],['langCode' => $langCode,'title' => $title]);
            if(!$update){
                echo json_encode(['status' => 400, 'message' => 'Kategori güncellenemedi.']);
                exit;
            }

            echo json_encode(['status' => 200, 'message' => 'Kategori güncellendi.']);
            if($oldImage){
                unlink($oldImage);
            }
            exit;
        }


    break;


    case'update_category':
        $db = new Database('qr');
        $token = $_POST['token'];
        $check = $db->read('user',['token' => $token]);
        if(!$check){
            echo json_encode(['status' => 400, 'message' => 'Token geçersiz']);
            exit;
        }

        if(isset($_FILES['image'])){
        $id = $_POST['id'];
        $title = $_POST['title'];
        $image = $_FILES['image'];
        $langCode = $_POST['langCode'];




        $read = $db->read('category',['id' => $id,'langCode' => $langCode]);
        if(!$read){
            echo json_encode(['status' => 400, 'message' => 'Kategori bulunamadı']);
            exit;
        }

        $oldImage = $read[0]['image'];

        $uploader = new ImageUploader("uploads/category_images" ,5 * 1024 * 1024, ["jpg", "jpeg", "png", "gif", "webp"], true);
        $imagePath = $uploader->upload($image);

        if(!$imagePath){
            echo json_encode(['status' => 400, 'message' => $imagePath->error]);
            exit;
        }

        $update = $db->update('category',['title' => $title,'image' => $imagePath],['id' => $id]);
        if(!$update){
            echo json_encode(['status' => 400, 'message' => 'Kategori güncellenemedi.']);
            exit;
        }

        echo json_encode(['status' => 200, 'message' => 'Kategori güncellendi.']);
        if($oldImage){
            unlink($oldImage);
        }
        exit;
    }else{
        $id = $_POST['id'];
        $title = $_POST['title'];
        $langCode = $_POST['langCode'];

        $update = $db->update('category',['title' => $title],['id' => $id]);
        if(!$update){
            echo json_encode(['status' => 400, 'message' => 'Kategori güncellenemedi.']);
            exit;
        }

        echo json_encode(['status' => 200, 'message' => 'Kategori güncellendi.']);
        exit;
    }
        break;


    case'delete_category':
        $db = new Database('qr');
        $token = $_POST['token'];
        $check = $db->read('user',['token' => $token]);
        if(!$check){
            echo json_encode(['status' => 400, 'message' => 'Token geçersiz']);
            exit;
        }

        $id = $_POST['id'];

        $read = $db->read('category',['id' => $id]);
        if(!$read){
            echo json_encode(['status' => 400, 'message' => 'Kategori bulunamadı']);
            exit;
        }
        $oldImage = $read[0]['image'];
        $delete = $db->delete('category',['id' => $id]);
        if(!$delete){
            echo json_encode(['status' => 400, 'message' => 'Kategori silinemedi.']);
            exit;
        }
        echo json_encode(['status' => 200, 'message' => 'Kategori silindi.']);
        if($oldImage){
            unlink($oldImage);
        }
        exit;

        break;

}


