# Esercizio PHP
Scrivere il codice PHP valido (ovvero che esegua correttamente su server web Apache) che legga i dati che gli sono stati inviati tramite GET nelle variabili "A", "B" e "O".

In questa pagina, occorrerà:

    - Controllare che le variabili "A" e "B" non siano nulle e che siano valide, ovvero che siano numeri positivi e che sul db ci siano numeri appartenenti a quell'insieme.

    - Controllare che la variabile "O" non sia nulla e che sia uguale a "i" o "u".
    
    - Leggere tutti i numeri appartenenti a ciascun insieme (A e B) su database e inserirli in due vettori distinti.
    
    - Creare un nuovo vettore contenente l'unione dei due insiemi se O vale u, altrimenti dovrà contenere l'intersezione dei due insiemi.
    
    - Inserire sul db il nuovo insieme, usando come id dell'insieme il successivo all'id massimo.

Dovete supporre che il db esista (nome database: giugno; nome tabella: insiemi; username: root, pw: ''), che il demone mysql sia in ascolto sulla porta 3306 e che la tabella "insiemi" sia strutturata e riempita secondo le istruzioni che trovate nel file "README_DB.txt".

**Esempi con i dati di esempio presenti nel file README_DB.txt**
    - Se A=1, B=2 e O=u i seguenti numeri dovranno essere inseriti all'interno del db (colonna valore): 19, 2, 14, 98, 1. Tutte queste righe avranno il valore 3 nella colonna insieme.
    - Se A=1, B=2 e O=i i seguenti numeri dovranno essere inseriti all'interno del db (colonna valore): 19. Questa riga avrà il valore 3 nella colonna insieme.

# ReadmeDB
Istruzioni per creare il database e la tabella

Andare in phpmyAdmin e andare nella voce di menu a tab "SQL".

1. Creare il DB

CREATE DATABASE giugno

2. Andare nel database appena creato e create la tabella

CREATE TABLE `insiemi` (
  `id` int(11) NOT NULL,
  `valore` int(11) NOT NULL,
  `insieme` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf16;

ALTER TABLE `insiemi`
ADD PRIMARY KEY (`id`);

ALTER TABLE `insiemi`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

3. Popolare il DB

INSERT INTO `insiemi` (`id`, `valore`, `insieme`) VALUES
(1, 19, 1),
(2, 2, 1),
(3, 14, 1),
(4, 98, 2),
(5, 1, 2),
(6, 19, 2);
