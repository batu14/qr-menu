<?php
class Database
{
    private $host = 'localhost';
    private $dbname;
    private $username = 'root';
    private $password = '';
    private $pdo;

    
    public function __construct($dbname = '') 
    {
        $this->dbname = $dbname; 
        try {
            $this->pdo = new PDO(
                "mysql:host={$this->host};dbname={$this->dbname};charset=utf8",
                $this->username,
                $this->password,
                [PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8 COLLATE utf8_general_ci"]
            );
            $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $e) {
            die("Veritabanı bağlantısı başarısız: " . $e->getMessage());
        }
    }

    
    public function create($table, $data)
    {
        try {
            $columns = implode(", ", array_keys($data));
            $placeholders = ":" . implode(", :", array_keys($data));
            $sql = "INSERT INTO $table ($columns) VALUES ($placeholders)";
            $stmt = $this->pdo->prepare($sql);

            foreach ($data as $key => $value) {
                $stmt->bindValue(":$key", $value);
            }

            if ($stmt->execute()) {
                return true;
            }
        } catch (PDOException $error) {
            return false;
        }
        return false;
    }

    
    public function read($table, $conditions = [])
    {
        $sql = "SELECT * FROM $table";
        if (!empty($conditions)) {
            $sql .= " WHERE " . implode(" AND ", array_map(function ($key) {
                return "$key = :$key";
            }, array_keys($conditions)));
        }

        $stmt = $this->pdo->prepare($sql);
        foreach ($conditions as $key => $value) {
            $stmt->bindValue(":$key", $value);
        }
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function readAll($table,$conditions = [])
    {
        $sql = "SELECT * FROM $table";
        if (!empty($conditions)) {
            $sql .= " WHERE " . implode(" AND ", array_map(function ($key) {
                return "$key = :$key";
            }, array_keys($conditions)));
        }

        $stmt = $this->pdo->prepare($sql);
        foreach ($conditions as $key => $value) {
            $stmt->bindValue(":$key", $value);
        }
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    
    

    
    public function update($table, $data, $conditions)
    {
        $setPart = implode(", ", array_map(function ($key) {
            return "$key = :$key";
        }, array_keys($data)));

        $wherePart = implode(" AND ", array_map(function ($key) {
            return "$key = :condition_$key";
        }, array_keys($conditions)));

        $sql = "UPDATE $table SET $setPart WHERE $wherePart";
        $stmt = $this->pdo->prepare($sql);

        foreach ($data as $key => $value) {
            $stmt->bindValue(":$key", $value);
        }

        foreach ($conditions as $key => $value) {
            $stmt->bindValue(":condition_$key", $value);
        }

        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

    
    public function delete($table, $conditions)
    {
        $wherePart = implode(" AND ", array_map(function ($key) {
            return "$key = :$key";
        }, array_keys($conditions)));

        $sql = "DELETE FROM $table WHERE $wherePart";
        $stmt = $this->pdo->prepare($sql);

        foreach ($conditions as $key => $value) {
            $stmt->bindValue(":$key", $value);
        }

        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

    public function createTable($table, $columns)
    {
    
        $table = $this->sanitizeTableName($table);
        
    
        $columnDefinitions = [
            
        ];
        foreach ($columns as $name => $definition) {
            $name = $this->sanitizeColumnName($name);
            $columnDefinitions[] = "`$name` $definition";
        }
        
    
        $sql = "CREATE TABLE IF NOT EXISTS `$table` (
            " . implode(",\n            ", $columnDefinitions) . "
        ) CHARACTER SET utf8 COLLATE utf8_general_ci";
        
        try {
            $this->pdo->exec($sql);
            return true;
        } catch (PDOException $e) {
    
            error_log("Tablo oluşturma hatası: " . $e->getMessage());
            return false;
        }
    }

    private function sanitizeTableName($table)
    {
    
        return preg_replace('/[^a-zA-Z0-9_]/', '', $table);
    }

    private function sanitizeColumnName($column)
    {
    
        return preg_replace('/[^a-zA-Z0-9_]/', '', $column);
    }

    public function getTables()
    {
        $sql = "SHOW TABLES";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_COLUMN);
    }

    /**
     * İki tabloyu birleştirerek veri çeker
     * @param string $table1 Birinci tablo adı
     * @param string $table2 İkinci tablo adı
     * @param string $joinCondition Birleştirme koşulu (örn: "table1.id = table2.table1_id")
     * @param array $columns Çekilecek kolonlar (boş bırakılırsa tüm kolonlar çekilir)
     * @param array $conditions WHERE koşulları (opsiyonel)
     * @param string $joinType Birleştirme tipi (INNER, LEFT, RIGHT, FULL)
     * @return array
     */
    public function joinTables($table1, $table2, $joinCondition, $columns = ["*"], $conditions = [], $joinType = "INNER")
    {
        // Kolonları formatla
        $columnList = implode(", ", $columns);
        
        // Join koşulunu oluştur
        $joinStr = "";
        foreach ($joinCondition as $key => $value) {
            $joinStr = "{$table1}.{$key} = {$table2}.{$value}";
        }
        
        // Ana sorguyu oluştur
        $sql = "SELECT {$columnList} FROM {$table1} 
                {$joinType} JOIN {$table2} ON {$joinStr}";

        // Eğer koşullar varsa WHERE kısmını ekle
        if (!empty($conditions)) {
            $sql .= " WHERE " . implode(" AND ", array_map(function ($key) {
                return "$key = :$key";
            }, array_keys($conditions)));
        }

        try {
            $stmt = $this->pdo->prepare($sql);
            
            // Koşulları bağla
            foreach ($conditions as $key => $value) {
                $stmt->bindValue(":$key", $value);
            }

            $stmt->execute();
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            error_log("Join sorgusu hatası: " . $e->getMessage());
            return [];
        }
    }
}
?>
