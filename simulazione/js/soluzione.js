document.addEventListener('DOMContentLoaded', () => {
    const inputNumber = document.querySelector('input[type="number"]');
    const buttons = document.querySelectorAll('button');
    const buttonLeggiPersonaggio = document.querySelector(buttons[0]);
    const buttonLeggiTuttiPersonaggi = document.querySelector(buttons[1]);
    const mainElement = document.querySelector('main');

    buttonLeggiPersonaggio.addEventListener('click', async () => {
        const idValue = inputNumber.value.trim();
        mainElement.innerHTML = '';

        const index = parseInt(idValue, 10) - 1;
        
        if (isNaN(index) || index < 0) {
            mainElement.innerHTML = '<p style="color: red;">Errore: Inserisci un numero intero positivo (es. 1, 2, 3, 4).</p>';
            return;
        }

        try {
            const response = await axios.get('personaggio.json');
            const personaggi = response.data;
            
            const personaggio = personaggi[index];

            if (personaggio) {
                const ul = document.createElement('ul');
                ul.setAttribute('aria-label', `Dettagli del personaggio ${personaggio.name}`);

                for (const key in personaggio) {
                    if (personaggio.hasOwnProperty(key)) {
                        const li = document.createElement('li');
                        li.textContent = `${key.charAt(0).toUpperCase() + key.slice(1)}: ${personaggio[key]}`;
                        ul.appendChild(li);
                    }
                }
                mainElement.appendChild(ul);
            } else {
                mainElement.innerHTML = `<p style="color: blue;">Personaggio all'indice ${index + 1} non trovato nel file.</p>`;
            }

        } catch (error) {
            mainElement.innerHTML = '<p style="color: red;">Errore nel caricamento del personaggio (GET).</p>';
        }
    });

    buttonLeggiTuttiPersonaggi.addEventListener('click', async () => {
        mainElement.innerHTML = '';

        try {
            const response = await axios.post('personaggi.json', {});
            const personaggi = response.data;

            if (!Array.isArray(personaggi) || personaggi.length === 0) {
                mainElement.innerHTML = '<p>Nessun personaggio trovato.</p>';
                return;
            }

            const table = document.createElement('table');
            const caption = document.createElement('caption');
            caption.textContent = 'Elenco di tutti i personaggi';
            table.appendChild(caption);

            const keys = Object.keys(personaggi[0]);
            const headers = keys.filter(key => key !== 'name');
            headers.unshift('Nome');

            const thead = document.createElement('thead');
            const headerRow = document.createElement('tr');
            
            headers.forEach(key => {
                const th = document.createElement('th');
                th.scope = 'col';
                th.textContent = key.charAt(0).toUpperCase() + key.slice(1);
                headerRow.appendChild(th);
            });
            thead.appendChild(headerRow);
            table.appendChild(thead);

            const tbody = document.createElement('tbody');
            personaggi.forEach(personaggio => {
                const row = document.createElement('tr');
                
                const thName = document.createElement('th');
                thName.scope = 'row';
                thName.textContent = personaggio.name;
                row.appendChild(thName);

                keys.filter(key => key !== 'name').forEach(key => {
                    const td = document.createElement('td');
                    td.textContent = personaggio[key];
                    row.appendChild(td);
                });

                tbody.appendChild(row);
            });
            table.appendChild(tbody);

            mainElement.appendChild(table);

        } catch (error) {
            mainElement.innerHTML = '<p style="color: red;">Errore nel caricamento dei personaggi (POST).</p>';
        }
    });
});