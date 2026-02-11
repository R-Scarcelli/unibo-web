<?php
$conn = new mysqli("localhost", "root", "", "settembre", "3306");

if($conn->connect_error) {
    die("Connessione non riuscita".$conn->connect_error);
}

if($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo "Metodo non supportato";
    exit();
}

$regista = isset($_POST['Regista']) ? intval($_POST['Regista']) : 0;
$genere = isset($_POST['Genere']) ? intval($_POST['Genere']) : 0;
$anno = isset($_POST['Anno']) ? intval($_POST['Anno']) : 0;
$top = isset($_POST['Top']) ? intval($_POST['Top']) : 0;
$m = (isset($_POST['NumeroVotiMinimo']) && intval($_POST['NumeroVotiMinimo']) > 0) ? intval($_POST['NumeroVotiMinimo']) : 100;

if($anno > 2017 || $anno < 1900) {
    $anno = 0;
}

$resC = $conn->query("SELECT AVG(mediarecensioni) as media_globale FROM film");
$rowC = $resC->fetch_assoc();
$C = $rowC['media_globale'] ? $rowC['media_globale'] : 0;

$sql = "SELECT titolo, mediarecensioni, numerorecensioni FROM film WHERE numerorecensioni >= $m";

if ($regista > 0) $sql .= " AND regista = $regista";
if ($genere > 0)  $sql .= " AND genere = $genere";
if ($anno > 0)    $sql .= " AND anno = $anno";

$result = $conn->query($sql);
$film_classifica = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $v = $row['numerorecensioni'];
        $R = $row['mediarecensioni'];
        
        // 4. Calcolo Rating: (v / (v+m)) * R + (m / (v+m)) * C
        $rating = ($v / ($v + $m)) * $R + ($m / ($v + $m)) * $C;
        
        $film_classifica[] = [
            'titolo' => $row['titolo'],
            'rating' => $rating
        ];
    }
}

// 5. Ordinamento della classifica per Rating decrescente
usort($film_classifica, function($a, $b) {
    return $b['rating'] <=> $a['rating'];
});

// 6. Applicazione del limite Top
if ($top > 0) {
    $film_classifica = array_slice($film_classifica, 0, $top);
}

// 7. Output Elenco Numerato
echo "<h2>Classifica Film</h2>";
if (count($film_classifica) > 0) {
    echo "<ol>";
    foreach ($film_classifica as $film) {
        echo "<li>" . htmlspecialchars($film['titolo']) . " (Rating: " . round($film['rating'], 2) . ")</li>";
    }
    echo "</ol>";
} else {
    echo "Nessun film trovato per i criteri selezionati.";
}

$conn->close();
?>