<?php
header('Access-Control-Allow-Origin: *');
require_once '../database.php';
$content = file_get_contents("status.txt");
preg_match('/status=(true|false)/', $content, $matches);

if (isset($matches[1])) {
    if ($matches[1] === "true") {
        echo 1;
    } else {
        $db = new Database('qr');

        $action = $_POST['action'];

        switch ($action) {
            case'setup':
                $db->createTable('category', [
                    'id' => 'INT AUTO_INCREMENT PRIMARY KEY',
                    'title' => 'TEXT',
                    'image' => 'TEXT',
                    'langCode' => 'TEXT'
                ]);
        
                $db->createTable('detail_translation', [
                    'id' => 'INT AUTO_INCREMENT PRIMARY KEY',
                    'button' => 'TEXT',
                    'kalori' => 'TEXT',
                    'protein' => 'TEXT',
                    'karbonhidrat' => 'TEXT',
                    'yag' => 'TEXT',
                    'vvalues' => 'TEXT',
                    'allergens' => 'TEXT',
                    'langCode' => 'TEXT'
                ]);
        
                $db->createTable('landing', [
                    'id' => 'INT AUTO_INCREMENT PRIMARY KEY',
                    'title' => 'TEXT',
                    'location' => 'TEXT',
                    'link' => 'TEXT',
                    'phone' => 'TEXT',
                    'image' => 'TEXT',
                    'langCode' => 'TEXT'
                ]);
        
                $db->createTable('language', [
                    'id' => 'INT AUTO_INCREMENT PRIMARY KEY',
                    'name' => 'TEXT',
                    'code' => 'TEXT',
                    'isActive' => 'INT'
                ]);
        
                $db->createTable('menu_translaiton', [
                    'id' => 'INT AUTO_INCREMENT PRIMARY KEY',
                    'title' => 'TEXT',
                    'language' => 'TEXT',
                    'wifi' => 'TEXT',
                    'rate' => 'TEXT',
                    'social' => 'TEXT',
                    'langCode' => 'TEXT'
                ]);
        
                $db->createTable('products', [
                    'id' => 'INT AUTO_INCREMENT PRIMARY KEY',
                    'title' => 'TEXT',
                    'description' => 'TEXT',
                    'category' => 'TEXT',
                    'price' => 'TEXT',
                    'time' => 'TEXT',
                    'image' => 'TEXT',
                    'vvalues' => 'TEXT',
                    'ingredients' => 'TEXT',
                    'allergens' => 'TEXT',
                    'langCode' => 'TEXT',
                    'isActive' => 'INT'
                ]);
        
                $db->createTable('review', [
                    'id' => 'INT AUTO_INCREMENT PRIMARY KEY',
                    'name' => 'TEXT',
                    'surname' => 'TEXT',
                    'mail' => 'TEXT',
                    'comment' => 'TEXT',
                    'rating' => 'TEXT',
                    'date' => 'TEXT'
                ]);
        
                $db->createTable('review_translation', [
                    'id' => 'INT AUTO_INCREMENT PRIMARY KEY',
                    'title' => 'TEXT',
                    'subtitle' => 'TEXT',
                    'name' => 'TEXT',
                    'surname' => 'TEXT',
                    'mail' => 'TEXT',
                    'comment' => 'TEXT',
                    'button' => 'TEXT',
                    'security' => 'TEXT',
                    'langCode' => 'TEXT'
                ]);
        
                $db->createTable('social', [
                    'id' => 'INT AUTO_INCREMENT PRIMARY KEY',
                    'name' => 'TEXT',
                    'link' => 'TEXT',            
                ]);
        
        
                $db->createTable('user', [
                    'id' => 'INT AUTO_INCREMENT PRIMARY KEY',
                    'name' => 'TEXT',
                    'password' => 'TEXT',
                    'token' => 'TEXT',
                ]);
        
                $db->create('user',[
                    'name'=>'admin',
                    'password'=>'c8837b23ff8aaa8a2dde915473ce0991',
                    'token'=>''
                ]);
        
                $db->createTable('wifi',[
                    'id' => 'INT AUTO_INCREMENT PRIMARY KEY',
                    'ssid' => 'TEXT',
                ]);
        
                echo 1;

        break;
            }
    }
} else {
    echo 0;
}

