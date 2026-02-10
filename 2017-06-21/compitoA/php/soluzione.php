<?php
$conn = new mysqli("localhost", "root", "", "giugno");

if($conn->connect_error){
    die("Errore di connessione".$conn->connect_error);
}

$conn->close();
?>