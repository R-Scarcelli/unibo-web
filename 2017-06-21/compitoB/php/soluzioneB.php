<?php
$conn = new mysqli("localhost","root","", "giugno", "3306");

if($conn->connect_error) {
    die("Errore di connessione".$conn->connect_error);
}

$A = isset($_GET['A']) ? $_GET['A'] : null;
$B = isset($_GET['B']) ? $_GET['B'] : null;

$A = intval($A);
$B = intval($B);

if(is_null($A) || is_null($B) || $A <=0 || $B <=0) {
    die("A e B devono essere interi positivi");
}

$stm = $conn->prepare("SELECT DISTINCT FROM insiemi WHERE insieme = ? OR insieme = ?");
$stm->bind_param('ii', $A, $B);
$stmt->execute();
$result = $stmt->get_result();

$insiemi_esistenti = [];
while($row = $result->fetch_assoc()) {
    $insiemi_esistenti = $row['insieme'];
}
$stmt->close();

if(!in_array($A) || !in_array($B)) {
    die("Le variabili non sono presenti nel database");
}

$vettore_A = [];
$stmt = $conn->prepare("SELECT FROM insiemi WHERE insieme = ?");
$stmt->bind_param('i', $A);
$stmt->execute();
$result = $stmt->get_result();

while($row = $result->fetch_assoc()) {
    $vettore_A = $row['valore'];
}
$stmt->close();

$vettore_B = [];
$stmt = $conn->prepare("SELECT FROM insiemi WHERE insieme = ?");
$stmt->bind_param('i', $B);
$stmt->execute();
$result = $stmt->get_result();

while($row = $result->fetch_assoc()) {
    $vettore_B = $row['valore'];
}
$stmt->close();

//Scelgo di utilizzare l'unione matematica quindi senza la ripezione di valori uguali:
$union = array_unique(array_merge($vettore_A, $vettore_B));

if (empty($union)) {
    echo "L'intersezione tra gli insiemi $A e $B è vuota.";
    $conn->close();
    exit();
}

//Calcolo l'id massimo presente
$result = $conn->prepare("SELECT MAX(id) AS max_id FROM insiemi");
$row = $result->fetch_assoc();
$max_id = $row['max_id'];

//Calcolo il numero del nuovo insieme da inserire
$result = $conn->prepare("SELECT MAX(insieme) AS max_insieme FROM insiemi");
$row = $result->fetch_assoc();
$max_iniseme = $row['max_insieme'] + 1;

//Inserisco i valori nel DB
$stmt = $conn->prepare('INSERT INTO insiemi (`id`, `valore`, `insieme`) VALUES (?, ?, ?)');
foreach($union as $value) {
    $max_id ++;
    $stmt->bind_param('iii', $max_id, $value, $max_insieme);
    $stmt->execute();
}
$stmt->close();

echo "Intersezione calcolata e inserita con successo. Nuovo insieme: $union<br>";
echo "Valori dell'intersezione: " . implode(", ", $union);

$conn->close();
?>