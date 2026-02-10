<?php
$conn = new mysqli("localhost", "root", "", "giugno");

if($conn->connect_error){
    die("Errore di connessione".$conn->connect_error);
}

//Lettura delle variabili A e B con GET
$A = isset($_GET['A']) ? $_GET['A'] : null;
$B = isset($_GET['B']) ? $_GET['B'] : null;

//Controllo che le variabili siano valide e non nulle
if($A === null || $B === null || !is_numeric($A) || !is_numeric($B) || $A <=0 || $B <=0) {
    die("A e B non devono assumere dei valori interi positivi");
}

//Conveerto il valore in intero
$A = intval($A);
$B = intval($B);

//Controllo che gli insiemi esistano nel database
$stmt = $conn->prepare("SELECT DISTINCT FROM insiemi WHERE insieme = ? OR insieme = ?");
$stmt->bind_param('ii', $A, $B);
$stmt->execute();
$result = $stmt->get_result();

$insiemiEsistenti = [];
while ($row = $result->fetch_assoc()) {
    $insiemiEsistenti = $row['insieme'];
}
$stmt->close();

if(!in_array($A) || !in_array($B)){
    die("Gli insiemi selezionati non sono presenti nel database");
}

//Lettura dell'insieme A
$vettore_A = [];
$stmt = $conn->prepare("SELECT FROM insiemi WHERE insieme = ?");
$stmt->bind_param('i', $A);
$stmt->execute();
$result = $stmt->get_result();

while ($row = $result->fetch_assoc()) {
    $vettore_A = $row['valore'];
}
$stmt->close();

//Lettura dell'insieme B
$vettore_B = [];
$stmt = $conn->prepare("SELECT FROM insiemi WHERE insieme = ?");
$stmt->bind_param('i', $B);
$stmt->execute();
$result = $stmt->get_result();

while ($row = $result->fetch_assoc()) {
    $vettore_B = $row['valore'];
}
$stmt->close();

//Calcolo del vettore intersezione
$intersection = array_intersect($vettore_A, $vettore_B);

//Calcolo l'Id massimo e il nuovo insieme
$result = $conn->prepare("SELECT MAX(id) AS max_id FROM insiemi");
$row = $result->fetch_assoc();
$max_id = $row['max_id'];

$result = $conn->prepare("SELECT MAX(insieme) AS max_insieme FROM insiemi");
$row = $result->fetch_assoc();
$max_iniseme = $row['max_insieme'] + 1;

//Inserisco il nuovo insieme nel db
$stmt = $conn->prepare("INSERT INTO insiemi (id, valore, insieme) VALUES (?, ?, ?)");
foreach( $intersection as $value) {
    $max_id ++;
    $stmt->bind_param('iii', $max_id, $value, $max_iniseme);
    $stmt->execute();
}
$stmt->close();

$conn->close();
?>