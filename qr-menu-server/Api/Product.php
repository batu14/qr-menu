<?php
header('Access-Control-Allow-Origin: *');
require_once '../database.php';
require_once '../ImageUploader.php';


$action = $_POST['action'];


switch($action){


    case 'getTranslation':
        $db = new Database('qr');
        $langCode = $_POST['langCode'];
        $translation = $db->read('detail_translation',['langCode' => $langCode]);
        if(!$translation){
            echo json_encode(['status' => 400, 'message' => 'Translation bulunamadı']);
            exit;
        }

        echo json_encode(['status' => 200, 'message' => 'Translation başarıyla getirildi', 'data' => $translation]);
        exit;
        break;
        


    case 'getFood':
        $db = new Database('qr');
        $id = $_POST['id'];
        $food = $db->read('products',['id' => $id]);
        if(!$food){
            echo json_encode(['status' => 400, 'message' => 'Ürün bulunamadı']);
            exit;
        }
        echo json_encode(['status' => 200, 'message' => 'Ürün başarıyla getirildi', 'data' => $food]);
        exit;
        break;

    case 'get_data':
        $db = new Database('qr');
        
        $langCode = $_POST['langCode'];
        $products = $db->read('products',['langCode' => $langCode,'isActive' => 1]);
        if(!$products){
            echo json_encode(['status' => 400, 'message' => 'Ürün bulunamadı']);
            exit;
        }

        echo json_encode(['status' => 200, 'message' => 'Ürünler başarıyla getirildi', 'data' => $products]);
        exit;
        break;

    case 'delete_product':
        $db = new Database('qr');
        $token = $_POST['token'];
        $check = $db->read('user',['token' => $token]);
        if(!$check){
            echo json_encode(['status' => 400, 'message' => 'Token geçersiz']);
            exit;
        }

        $id = $_POST['id'];
        $read = $db->read('products',['id' => $id]);
        if(!$read){
            echo json_encode(['status' => 400, 'message' => 'Ürün bulunamadı']);
            exit;
        }


        $oldImage = $read[0]['image'];
        if($oldImage){
            $deleteImage = unlink($oldImage);
            if(!$deleteImage){
                echo json_encode(['status' => 400, 'message' => 'Resim silinemedi']);
            }else{
                $delete = $db->delete('products',['id' => $id]);
                if(!$delete){
                    echo json_encode(['status' => 400, 'message' => 'Ürün silinemedi']);
                    exit;
                }
                echo json_encode(['status' => 200, 'message' => 'Ürün silindi']);
                exit;
            }
        }

        

        break;

    case 'update_product':
        $db = new Database('qr');
        $token = $_POST['token'];
        $check = $db->read('user',['token' => $token]);
        if(!$check){
            echo json_encode(['status' => 400, 'message' => 'Token geçersiz']);
            exit;
        }

        foreach($_POST as $key => $value){
            if(empty($value) || $value == null){
                echo json_encode(['status' => 400, 'message' => $key . ' alanı boş bırakılamaz.']);
                exit;
            };
        }

         $id = $_POST['id'];
         $title = $_POST['title'];
         $description = $_POST['description'];
         $price = $_POST['price'];
         $time = $_POST['time'];
         $categoryId = $_POST['categoryId'];
         $values = $_POST['values'];
         $ingredients = $_POST['ingredients'];
         $allergens = $_POST['allergens'];
         $isActive = $_POST['isActive'];
         $langCode = $_POST['langCode'];
         
         if(isset($_FILES['image'])){
             
             
        $image = $_FILES['image'];

         $read = $db->read('products',['id' => $id,'langCode' => $langCode]);
         if(!$read){
            echo json_encode(['status' => 400, 'message' => 'Ürün bulunamadı']);
            exit;
         }

         
        $oldImage = $read[0]['image'];

        $uploader = new ImageUploader("uploads/product_images" ,5 * 1024 * 1024, ["jpg", "jpeg", "png", "gif", "webp"], true);
        $imagePath = $uploader->upload($image);

        if(!$imagePath){
            echo json_encode(['status' => 400, 'message' => $imagePath->error]);
            exit;
        }

       


        $update = $db->update('products',
        [
        'title' => $title,
        'description' => $description,
        'category' => $categoryId,
        'price' => $price,
        'time' => $time,
        'image' => $imagePath,
        'vvalues' => $values,
        'ingredients' => $ingredients,
        'allergens' => $allergens,
        'isActive' => $isActive
        ],
        [
            'id' => $id,
            'langCode' => $langCode
        ]);

        if(!$update){
            echo json_encode(['status' => 400, 'message' => 'Ürün güncellenemedi']);
            exit;
        }else{
            echo json_encode(['status' => 200, 'message' => 'Ürün güncellendi']);
            unlink($oldImage);
            exit;

        }





        }else{


            $update = $db->update('products',
            [
                'title' => $title,
                'description' => $description,
                'price' => $price,
                'time' => $time,
                'category' => $categoryId,
                'vvalues' => $values,
                'ingredients' => $ingredients,
                'allergens' => $allergens,
                'isActive' => $isActive
            ],
            [
                'id' => $id,
                'langCode' => $langCode
            ]);

            if(!$update){
                echo json_encode(['status' => 400, 'message' => 'Ürün güncellenemedi']);
                exit;
            }

            echo json_encode(['status' => 200, 'message' => 'Ürün güncellendiiiiii']);
            exit;
        }




    case 'get_products':
        $db = new Database('qr');
        $token = $_POST['token'];
        $check = $db->read('user',['token' => $token]);
        if(!$check){
            echo json_encode(['status' => 400, 'message' => 'Token geçersiz']);
            exit;
        }

        $langCode = $_POST['langCode'];
        $products = $db->read('products',['langCode' => $langCode]);
        if(!$products){
            echo json_encode(['status' => 400, 'message' => 'Ürün bulunamadı']);
            exit;
        }

        echo json_encode(['status' => 200, 'message' => 'Ürünler başarıyla getirildi', 'data' => $products]);
        exit;
        break;

    case 'create_product':
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
        $description = $_POST['description'];
        $price = $_POST['price'];
        $time = $_POST['time'];
        $categoryId = $_POST['categoryId'];
        $image = $_FILES['image'];
        $values = $_POST['values'];
        $ingredients = $_POST['ingredients'];
        $allergens = $_POST['allergens'];
        $isActive = $_POST['isActive'];
        $langCode = $_POST['langCode'];

        $read = $db->read('products',['title' => $title,'langCode' => $langCode]);
        if($read){
            echo json_encode(['status' => 400, 'message' => 'Ürün zaten mevcut']);
            exit;
        }

        $uploader = new ImageUploader("uploads/product_images" ,5 * 1024 * 1024, ["jpg", "jpeg", "png", "gif", "webp"], true);
        $imagePath = $uploader->upload($image);

        if(!$imagePath){
            echo json_encode(['status' => 400, 'message' => $imagePath->error]);
            exit;
        }

        $create = $db->create('products',[
            'title' => $title,
            'description' => $description,
            'price' => $price,
            'time' => $time,
            'category' => $categoryId,
            'image' => $imagePath,
            'vvalues' => $values,
            'ingredients' => $ingredients,
            'allergens' => $allergens,
            'langCode' => $langCode,
            'isActive' => $isActive,
        ]);

        if(!$create){
            echo json_encode(['status' => 400, 'message' => 'Ürün oluşturulamadı']);
            exit;
        }

        echo json_encode(['status' => 200, 'message' => 'Ürün oluşturuldu']);
        exit;

        break;

}







