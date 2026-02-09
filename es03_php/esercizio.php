<?php
//Connessione al DB
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "giugno";
$port = 3306;

//Creare la connessione
$connection = new mysqli($servername, $username, $password, $dbname, $port);

if ($connection->connect_error) {
    die("Connessione fallita: " .$connection->connection_error);
}

//Lettura e validazione
$A = isset($_GET['A']) ? $_GET['A'] : null;
$B = isset($_GET['B']) ? $_GET['B'] : null;
$O = isset($_GET['O']) ? $_GET['O'] : null;


//Controllo che non siano nulle
if($A === null ||$B === null || $O === null){
    die("Errore i dati non possono essere nulli");
}

// Converto in interi

// Controllo che O sia 'i' o 'u'
if($O !== 'i' || $O !== 'u'){  

}

//Controllo l'esistenza degli insiemi A e B

//Leggo i valori di A

//Leggo i valori di B

//Calcolo unione o intersezione

//Calcolo il successivo id insieme

//Inserisco l'insieme nel DB


$connection->close();
?>