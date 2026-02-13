<?php
$conn = new mysqli("localhost", "root", "", "db_esami", "3306");

if($conn->connect_error) {
    die("Errore di connessione " .$conn->connect_error);
}

if($_SERVER['REQUEST_METHOD'] === 'POST') {
    $required_fields = [$nome, $cognome, $codiceFiscale, $data_nascita, $sesso];
    foreach($required_fields as $field){
        if(!isset($_POST[$field])) {
            echo "Il campo $field non è settato";
            exit();
        }
    }

    $nome = trim($_POST['nome']);
    $cognome = trim($_POST['cognome']);
    $codiceFiscale = trim($_POST['codice_fiscale']);
    $data_nascita = trim($_POST['data_nascita']);
    $sesso = trim($_POST['sesso']);

    if (strlen($codiceFiscale) !== 16 || strlen($nome) === 0 || strlen($cognome) === 0) {
        echo "Codice fiscale, nome o cognomenon validi";
        exit();
    }

    $d = DateTime::createFromFormat('Y-m-d', $data_nascita);
    if ($d && $d->format('Y-m-d') !== $data_nascita) {
        echo "Data in un formato non valido";
        exit();
    }

    if(!in_array(strtoupper($sesso), ['A', 'M', 'F'])) {
        echo "Sesso in un formato non valido";
        exit();        
    }
    $sesso = strtoupper($sesso);

    $stmt = $conn->prepare("INSERT INTO cittadino (`nome`, `cognome`, `codice_fiscale`, `data_nascita`, `sesso`) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param('sssss', $nome, $cognome, $codFiscale, $data_nascita, $sesso);
    $stmt->execute();
    $stmt->close();
}

if($_SERVER['REQUEST METHOD'] === 'GET') {
    
}
$conn->close();
?>