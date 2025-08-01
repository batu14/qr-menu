<?php
include_once '../database.php';
header('Access-Control-Allow-Origin: *');
$action = $_POST['action'];

switch($action) {


    case'get_reviews':
        $db = new Database('qr');
        $token = $_POST['token'];
        $check = $db->read('user', ['token' => $token]);
        if(!$check){
            echo json_encode(['status' => 400, 'message' => 'Token geçersiz']);
            exit;
        }
        $read = $db->read('review');
        if(!$read){
            echo json_encode(['status' => 400, 'message' => 'Review bulunamadı']);
            exit;
        }
        echo json_encode(['status' => 200, 'data' => $read]);
        exit;
    break;

    case'add_review':
        $db = new Database('qr');
        $create = $db->create('review',[
            'name' => $_POST['name'],
            'surname' => $_POST['surname'],
            'mail' => $_POST['mail'],
            'comment' => $_POST['comment'],
            'rating' => $_POST['rating'],
            'date' => date('Y-m-d H:i:s'),
        ]);
        if(!$create){
            echo json_encode(['status' => 400, 'message' => 'Review oluşturulamadı']);
            exit;
        }
        echo json_encode(['status' => 200, 'message' => 'Review oluşturuldu']);
        exit;
    break;


    case'get_review_translation':
        $db = new Database('qr');
        $read = $db->read('review_translation',['langCode' => $_POST['langCode']]);
        if(!$read){
            echo json_encode(['status' => 400, 'message' => 'Review translation bulunamadı']);
            exit;
        }
        echo json_encode(['status' => 200, 'data' => $read]);
        exit;
    break;


    case'getSocialLinks':
        $db = new Database('qr');
        $read = $db->read('social');
        if(!$read){
            echo json_encode(['status' => 400, 'message' => 'Social bulunamadı']);
            exit;
        }
        echo json_encode(['status' => 200, 'data' => $read]);
        exit;
    break;

    case'get_detail_translation':
        $db = new Database('qr');
        $token = $_POST['token'];
        $check = $db->read('user', ['token' => $token]);
        if(!$check){
            echo json_encode(['status' => 400, 'message' => 'Token geçersiz']);
            exit;
        }
        $read = $db->read('detail_translation',['langCode' => $_POST['langCode']]);
        if(!$read){
            echo json_encode(['status' => 400, 'message' => 'Detail translation bulunamadı']);
            exit;
        }
        echo json_encode(['status' => 200, 'data' => $read]);
        exit;
    break;


    case'detail_translation':
        $db = new Database('qr');
        $token = $_POST['token'];
        $check = $db->read('user', ['token' => $token]);
        if(!$check){
            echo json_encode(['status' => 400, 'message' => 'Token geçersiz']);
            exit;
        }
        foreach($_POST as $key => $value){
            if(empty($value)){
                echo json_encode(['status' => 400, 'message' => 'Tüm alanları doldurunuz']);
                exit;
            }
        }
        $read = $db->read('detail_translation',['langCode' => $_POST['langCode']]);
        if(!$read){
            $create = $db->create('detail_translation',[
                'langCode' => $_POST['langCode'],
                'button' => $_POST['button'],
                'kalori' => $_POST['kalori'],
                'protein' => $_POST['protein'],
                'karbonhidrat' => $_POST['karbonhidrat'],
                'yag' => $_POST['yag'],
                'vvalues' => $_POST['vvalues'],
                'allergens' => $_POST['allergens'],
            ]);
            if(!$create){
                echo json_encode(['status' => 400, 'message' => 'Detail translation oluşturulamadı']);
                exit;
            }
            echo json_encode(['status' => 200, 'message' => 'Detail translation oluşturuldu']);
            exit;
        }else{
            $update = $db->update('detail_translation',[
                'button' => $_POST['button'],
                'kalori' => $_POST['kalori'],
                'protein' => $_POST['protein'],
                'karbonhidrat' => $_POST['karbonhidrat'],
                'yag' => $_POST['yag'],
                'vvalues' => $_POST['vvalues'],
                'allergens' => $_POST['allergens'],
            ],['langCode' => $_POST['langCode']]);
            if(!$update){
                echo json_encode(['status' => 400, 'message' => 'Detail translation güncellenemedi']);
                exit;
            }
            echo json_encode(['status' => 200, 'message' => 'Detail translation güncellendi']);
            exit;
        }
        exit;

        


    break;


    case'getTranslation':

        $db = new Database('qr');
        $read = $db->read('detail_translation',['langCode' => $_POST['langCode']]);
        if(!$read){
            echo json_encode(['status' => 400, 'message' => 'Detail translation bulunamadı']);
            exit;
        }
        echo json_encode(['status' => 200, 'data' => $read[0]]);
        exit;
    break;


    case'getTranslation_menu':
        $db = new Database('qr');
        $read = $db->read('menu_translaiton',['langCode' => $_POST['langCode']]);
        if(!$read){
            echo json_encode(['status' => 400, 'message' => 'Menu translation bulunamadı']);
            exit;
        }
        echo json_encode(['status' => 200, 'data' => $read]);
        exit;
    break;

    case'get_menu_translation':
        $db = new Database('qr');
        $token = $_POST['token'];
        $check = $db->read('user', ['token' => $token]);
        if(!$check){
            echo json_encode(['status' => 400, 'message' => 'Token geçersiz']);
            exit;
        }
        $read = $db->read('menu_translaiton',['langCode' => $_POST['langCode']]);
        if(!$read){
            echo json_encode(['status' => 400, 'message' => 'Menu translation bulunamadı']);
            exit;
        }
        echo json_encode(['status' => 200, 'data' => $read]);
        exit;
    break;

    case'menu_translation':
        $db = new Database('qr');
        $token = $_POST['token'];
        $check = $db->read('user', ['token' => $token]);
        if(!$check){
            echo json_encode(['status' => 400, 'message' => 'Token geçersiz']);
            exit;
        }
        foreach($_POST as $key => $value){
            if(empty($value)){
                echo json_encode(['status' => 400, 'message' => 'Tüm alanları doldurunuz']);
                exit;
            }
        }
        $read = $db->read('menu_translaiton',['langCode' => $_POST['langCode']]);
        if(!$read){
            $create = $db->create('menu_translaiton',[
                'title' => $_POST['title'],
                'language' => $_POST['language'],
                'wifi' => $_POST['wifi'],
                'rate' => $_POST['rate'],
                'social' => $_POST['social'],
                'langCode' => $_POST['langCode']
            ]);
            if(!$create){
                echo json_encode(['status' => 400, 'message' => 'Menu translation oluşturulamadı']);
                exit;
            }
            echo json_encode(['status' => 200, 'message' => 'Menu translation oluşturuldu']);
            exit;
        }else{
            $update = $db->update('menu_translaiton',[
                'title' => $_POST['title'],
                'language' => $_POST['language'],
                'wifi' => $_POST['wifi'],
                'rate' => $_POST['rate'],
                'social' => $_POST['social'],
            ],['langCode' => $_POST['langCode']]);
            if(!$update){
                echo json_encode(['status' => 400, 'message' => 'Menu translation güncellenemedi']);
                exit;
            }
            echo json_encode(['status' => 200, 'message' => 'Menu translation güncellendi']);
            exit;
        }
        
        exit;
    break;

    case'delete_social':

        $db = new Database('qr');
        $token = $_POST['token'];
        $check = $db->read('user', ['token' => $token]);
        if(!$check){
            echo json_encode(['status' => 400, 'message' => 'Token geçersiz']);
            exit;
        }

        $delete = $db->delete('social', ['id' => $_POST['id']]);
        if(!$delete){
            echo json_encode(['status' => 400, 'message' => 'Social silinemedi']);
            exit;
        }
        echo json_encode(['status' => 200, 'message' => 'Social silindi']);
        exit;   
    break;

    case'update_social':
        $db = new Database('qr');
        $token = $_POST['token'];
        $check = $db->read('user', ['token' => $token]);
        if(!$check){
            echo json_encode(['status' => 400, 'message' => 'Token geçersiz']);
            exit;
        }

        foreach($_POST as $key => $value){
            if(empty($value)){
                echo json_encode(['status' => 400, 'message' => 'Tüm alanları doldurunuz']);
                exit;
            }
        }

        $update = $db->update('social', ['name' => $_POST['name'], 'link' => $_POST['link']], ['id' => $_POST['id']]);
        if(!$update){
            echo json_encode(['status' => 400, 'message' => 'Social güncellenemedi']);
            exit;
        }
        echo json_encode(['status' => 200, 'message' => 'Social güncellendi']);
        exit;
    break;

    case'get_socials':
        $db = new Database('qr');
        $token = $_POST['token'];
        $check = $db->read('user', ['token' => $token]);
        if(!$check){
            echo json_encode(['status' => 400, 'message' => 'Token geçersiz']);
            exit;
        }

        $read = $db->read('social');
        if(!$read){
            echo json_encode(['status' => 400, 'message' => 'Social bulunamadı']);
            exit;
        }
        echo json_encode(['status' => 200, 'data' => $read]);
        exit;
    break;

    case'add_social':

        $db = new Database('qr');
        $token = $_POST['token'];
        $check = $db->read('user', ['token' => $token]);
        if(!$check){
            echo json_encode(['status' => 400, 'message' => 'Token geçersiz']);
            exit;
        }

        foreach($_POST as $key => $value){
            if(empty($value)){
                echo json_encode(['status' => 400, 'message' => 'Tüm alanları doldurunuz']);
                exit;
            }
        }

        $read = $db->read('social', ['name' => $_POST['name']]);
        if(!$read){
            $create = $db->create('social', ['name' => $_POST['name'], 'link' => $_POST['link']]);

            if(!$create){
                echo json_encode(['status' => 400, 'message' => 'Social oluşturulamadı']);
                exit;
            }
            echo json_encode(['status' => 200, 'message' => 'Social oluşturuldu']);
            exit;
        }else{
            $update = $db->update('social', ['link' => $_POST['link']], ['name' => $_POST['name']]);
            if(!$update){
                echo json_encode(['status' => 400, 'message' => 'Social güncellenemedi']);
                exit;
            }
            echo json_encode(['status' => 200, 'message' => 'Social güncellendi']);
            exit;
        }


        break;


    case 'get_wifi':
        $db = new Database('qr');
        $token = $_POST['token'];
        $check = $db->read('user', ['token' => $token]);
        
        if (!$check) {
            echo json_encode(['status' => 400, 'message' => 'Token geçersiz']);
            exit;
        }

        $read = $db->read('wifi', ['id' => 1]);
        if (!$read) {
            echo json_encode(['status' => 400, 'message' => 'Wifi bulunamadı']);
            exit;
        }
        
        echo json_encode(['status' => 200, 'data' => $read]);
        exit;
    break;


    case 'get_review_translation':
        $db = new Database('qr');
        $token = $_POST['token'];
        $check = $db->read('user', ['token' => $token]);
        
        if (!$check) {
            echo json_encode(['status' => 400, 'message' => 'Token geçersiz']);
            exit;
        }

        $read = $db->read('review_translation',['langCode' => $_POST['langCode']]);
        if(!$read){
            echo json_encode(['status' => 400, 'message' => 'Review translation bulunamadı']);
            exit;
        }
        echo json_encode(['status' => 200, 'data' => $read]);
        exit;
    break;

    case 'rewiew_translation':
        $db = new Database('qr');
        $token = $_POST['token'];
        $check = $db->read('user', ['token' => $token]);
        
        if (!$check) {
            echo json_encode(['status' => 400, 'message' => 'Token geçersiz']);
            exit;
        }

        foreach ($_POST as $key => $value) {
            if (empty($value)) {
                echo json_encode(['status' => 400, 'message' => 'Tüm alanları doldurunuz']);
                exit;
            }
        }

        $read = $db->read('review_translation',['langCode' => $_POST['langCode']]);
        if(!$read){
            $create = $db->create('review_translation',
            [
                'title' => $_POST['title'],
                'subtitle' => $_POST['subtitle'],
                'name' => $_POST['name'],
                'surname' => $_POST['surname'],
                'mail' => $_POST['mail'],
                'comment' => $_POST['comment'],
                'button' => $_POST['button'],
                'security' => $_POST['security'],
                'langCode' => $_POST['langCode']
            ]);
            if(!$create){
                echo json_encode(['status' => 400, 'message' => 'Review translation oluşturulamadı']);
                exit;
            }
            echo json_encode(['status' => 200, 'message' => 'Review translation oluşturuldu']);
            exit;
        }else{
            $update = $db->update('review_translation',
            [
                'title' => $_POST['title'],
                'subtitle' => $_POST['subtitle'],
                'name' => $_POST['name'],
                'surname' => $_POST['surname'],
                'mail' => $_POST['mail'],
                'comment' => $_POST['comment'],
                'button' => $_POST['button'],
                'security' => $_POST['security'],
            ],['langCode' => $_POST['langCode']]);
            if(!$update){
                echo json_encode(['status' => 400, 'message' => 'Review translation güncellenemedi']);
                exit;
            }
            echo json_encode(['status' => 200, 'message' => 'Review translation güncellendi']);
            exit;
        }
        
        echo json_encode(['status' => 200, 'message' => 'Review translation processed']);
        exit;
    break;

    case 'update_wifi':
        $db = new Database('qr');
        $token = $_POST['token'];
        $check = $db->read('user', ['token' => $token]);
        
        if (!$check) {
            echo json_encode(['status' => 400, 'message' => 'Token geçersiz']);
            exit;
        }

        foreach ($_POST as $key => $value) {
            if (empty($value)) {
                echo json_encode(['status' => 400, 'message' => 'Tüm alanları doldurunuz']);
                exit;
            }
        }

        $read = $db->read('wifi', ['id' => 1]);
        if (!$read) {
            $create = $db->create('wifi', [
                'ssid' => $_POST['ssid'],
                'password' => $_POST['password']
            ]);
            
            if (!$create) {
                echo json_encode(['status' => 400, 'message' => 'Genel ayarlar oluşturulamadı']);
                exit;
            }
            
            echo json_encode(['status' => 200, 'message' => 'Genel ayarlar oluşturuldu']);
            exit;
        } else {
            $update = $db->update('wifi', [
                'ssid' => $_POST['ssid'],
                'password' => $_POST['password']
            ], ['id' => 1]);
            
            if (!$update) {
                echo json_encode(['status' => 400, 'message' => 'Genel ayarlar güncellenemedi']);
                exit;
            }
            
            echo json_encode(['status' => 200, 'message' => 'Genel ayarlar güncellendi']);
            exit;
        }
    break;

    default:
        echo json_encode(['status' => 400, 'message' => 'Geçersiz işlem']);
        exit;
    break;
}









