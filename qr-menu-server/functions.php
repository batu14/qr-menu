<?php
function checkTurkishAndSpaces($text) {
    // Türkçe karakterler
    $turkishChars = ['ç', 'Ç', 'ğ', 'Ğ', 'ı', 'İ', 'ö', 'Ö', 'ş', 'Ş', 'ü', 'Ü'];
    
    // Sonuç array'i
    $result = [
        'hasTurkishChars' => false,
        'turkishCharsFound' => [],
        'hasSpaces' => false,
        'spaceCount' => 0,
        'isValid' => true,
        'message' => ''
    ];
    
    // Türkçe karakter kontrolü
    foreach ($turkishChars as $char) {
        if (strpos($text, $char) !== false) {
            $result['hasTurkishChars'] = true;
            $result['turkishCharsFound'][] = $char;
        }
    }
    
    // Boşluk kontrolü
    $spaceCount = substr_count($text, ' ');
    if ($spaceCount > 0) {
        $result['hasSpaces'] = true;
        $result['spaceCount'] = $spaceCount;
    }
    
    // Sonuç mesajı oluşturma
    if ($result['hasTurkishChars'] || $result['hasSpaces']) {
        $result['isValid'] = false;
        $messages = [];
        
        if ($result['hasTurkishChars']) {
            $messages[] = "Metinde Türkçe karakter(ler) bulundu: " . 
                         implode(', ', $result['turkishCharsFound']);
        }
        
        if ($result['hasSpaces']) {
            $messages[] = "Metinde {$result['spaceCount']} adet boşluk karakteri bulundu";
        }
        
        $result['message'] = implode('. ', $messages);
    } else {
        $result['message'] = "Metin geçerli: Türkçe karakter ve boşluk bulunmuyor";
    }
    
    return $result;
} 