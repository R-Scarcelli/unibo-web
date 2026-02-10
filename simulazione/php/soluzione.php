<?php
$conn = new mysqli("localhost", "root", "", "esami");

header('Content-Type: application/json');

function sendJson($status, $message, $data = []): void {
    echo json_encode(['status' => $status, 'message' => $message, 'data' => $data]);
    exit();
}

if ($conn->connect_error) {
    sendJson('error', "Connessione fallita: " . $conn->connect_error);
}
$conn->set_charset("utf8mb4");

$tableName = 'harrypotter';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $fields = ['name', 'species', 'gender', 'house', 'dateOfBirth', 'yearOfBirth', 'ancestry', 'eyeColour', 'hairColour'];
    $data = [];

    foreach ($fields as $f) {
        if (!isset($_POST[$f])) sendJson('error', "Campo '$f' mancante.");
        $data[$f] = $_POST[$f];
    }
    
    if (!filter_var($data['yearOfBirth'], FILTER_VALIDATE_INT)) {
         sendJson('error', "Il campo yearOfBirth deve essere un intero.");
    }

    $cols = "`" . implode("`, `", $fields) . "`";
    $qmarks = str_repeat('?,', count($fields) - 1) . '?';
    $stmt = $conn->prepare("INSERT INTO `$tableName` ($cols) VALUES ($qmarks)");
    if (!$stmt) sendJson('error', "Errore preparazione query.");
    
    $types = "ssssissss";
    $stmt->bind_param($types, ...array_values($data));
    
    if (!$stmt->execute()) sendJson('error', "Errore inserimento.");
    
    $lastId = $conn->insert_id;
    $stmt->close();
    
    $stmt = $conn->prepare("SELECT * FROM `$tableName` WHERE id = ?");
    $stmt->bind_param('i', $lastId);
    $stmt->execute();
    $record = $stmt->get_result()->fetch_assoc();
    $stmt->close();

    sendJson('success', "Personaggio inserito con successo.", $record ?? []);

} elseif ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $id = filter_var($_GET['id'] ?? null, FILTER_VALIDATE_INT);

    if ($id) {
        $stmt = $conn->prepare("SELECT * FROM `$tableName` WHERE id = ?");
        if (!$stmt) sendJson('error', "Errore preparazione query.");
        
        $stmt->bind_param('i', $id);
        $stmt->execute();
        $personaggio = $stmt->get_result()->fetch_assoc();
        $stmt->close();

        if (!$personaggio) sendJson('error', "Personaggio non trovato.");
        
        sendJson('success', "Personaggio trovato.", $personaggio);
    } else {
        $result = $conn->query("SELECT * FROM `$tableName`");
        if (!$result) sendJson('error', "Errore query.");
        
        $personaggi = $result->fetch_all(MYSQLI_ASSOC);
        sendJson('success', "Elenco di tutti i personaggi.", $personaggi);
    }

} else {
    sendJson('error', "Metodo non supportato.");
}

$conn->close();
?>