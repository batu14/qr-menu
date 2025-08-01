<?php
class ImageUploader {
    public $targetDir;
    private $maxSize;
    private $allowedTypes;
    public $error;

    public function __construct($targetDir = "uploads/",
        $maxSize = 5 * 1024 * 1024, 
        $allowedTypes = ["jpg", "jpeg", "png", "gif", "webp"],
        $mkdir = false) {
        $this->targetDir = $targetDir . "/";
        $this->maxSize = $maxSize;
        $this->allowedTypes = $allowedTypes;

        // Hedef klasör yoksa oluştur
        if($mkdir){
            if (!file_exists($this->targetDir)) {
                if (!mkdir($this->targetDir, 0777, true)) {
                    $this->error = "Klasör oluşturulamadı: " . $this->targetDir . " - " . error_get_last()['message'];
                }
            }
            chmod($this->targetDir, 0777); // Klasör izinlerini ayarla
        }
    }

    public function upload($file,$name = null) {
        $fileName = basename($file["name"]);
        $fileSize = $file["size"];
        $fileTmp = $file["tmp_name"];
        $fileExt = strtolower(pathinfo($fileName, PATHINFO_EXTENSION));
        $newFileName =$name != null ? $name . '.' . $fileExt : uniqid() . '.' . $fileExt; // Benzersiz bir dosya adı oluştur

        // Dosya boyutunu kontrol et
        if ($fileSize > $this->maxSize) {
            $this->error = "Dosya boyutu çok büyük. Maksimum: " . ($this->maxSize / 1024 / 1024) . " MB";
            return false;
        }

        // Dosya formatını kontrol et
        if (!in_array($fileExt, $this->allowedTypes)) {
            $this->error = "Geçersiz dosya türü. Sadece: " . implode(", ", $this->allowedTypes);
            return false;
        }

        // Dosyayı hedef klasöre taşı
        if (move_uploaded_file($fileTmp, $this->targetDir . $newFileName)) {
            return $this->targetDir . $newFileName; // Yüklenen dosyanın yolu
        } else {
            $this->error = "Dosya yükleme sırasında bir hata oluştu.";
            return false;
        }
    }

    // Birden fazla dosyayı yüklemek için yeni fonksiyon
    public function uploadMultiple($files) {
        $uploadedFiles = [];
        $errors = [];

        foreach ($files["name"] as $key => $name) {
            $file = [
                "name" => $files["name"][$key],
                "type" => $files["type"][$key],
                "tmp_name" => $files["tmp_name"][$key],
                "error" => $files["error"][$key],
                "size" => $files["size"][$key]
            ];

            $result = $this->upload($file);
            if ($result) {
                $uploadedFiles[] = $result;
            } else {
                $errors[] = $this->getError();
            }
        }

        if (!empty($errors)) {
            $this->error = implode(", ", $errors); // Tüm hataları birleştir
        }

        return $uploadedFiles;
    }

    public function getError() {
        return $this->error;
    }
}
