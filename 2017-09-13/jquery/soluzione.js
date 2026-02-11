document.addEventListener('DOMContentLoaded', () => {
    const table = document.querySelector('table');
    const rowHeaders = document.querySelectorAll('tr:not(:first-child) th');
    const colHeaders = document.querySelectorAll('tr:first-child th');

    const updateCellColor = (td) => {
        // La riga è attiva se il genitore (tr) ha la classe
        const activeRow = td.parentElement.classList.contains('row-active');
        // La colonna è attiva se la cella STESSA (td) ha la classe
        const activeCol = td.classList.contains('col-active');

        if (activeRow && activeCol) {
            td.style.backgroundColor = '#00F'; // Blu
        } else if (activeRow) {
            td.style.backgroundColor = '#0F0'; // Verde
        } else if (activeCol) {
            td.style.backgroundColor = '#F00'; // Rosso
        } else {
            td.style.backgroundColor = '#FFF'; // Bianco
        }
    };
    
    // Righe
    rowHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const row = header.parentElement;
            row.classList.toggle('row-active');
            row.querySelectorAll('td').forEach(td => updateCellColor(td));
        });
    });

    // Colonne
    colHeaders.forEach((header, index) => {
        header.addEventListener('click', () => {
            const rows = document.querySelectorAll('tr:not(:first-child)');
            rows.forEach(row => {
                const td = row.querySelectorAll('td')[index];
                if (td) {
                    // Applichiamo la classe al TD, non al genitore!
                    td.classList.toggle('col-active');
                    updateCellColor(td);
                }
            });
        });
    });
});