document.addEventListener('DOMContentLoaded', () => {
    const main = document.querySelector('main');
    const caricaBtn = document.querySelector('button');

        function moveUp(pokemonDiv){
            const previousDiv = pokemonDiv.previousElementSibling;
            if (previousDiv && previousDiv.classList.contains('pokemon-card')) {
                mainElement.insertBefore(pokemonDiv, previousDiv);
                updateButtons();
            }
        }
       
        function moveDown(pokemonDiv) {
            const nextDiv = pokemonDiv.nextElementSibling;
            if (nextDiv && nextDiv.classList.contains('pokemon-card')) {
                mainElement.insertBefore(nextDiv, pokemonDiv);
                updateButtons();
            }
        }

    // Funzione per aggiornare lo stato dei bottoni Up/Down
    function updateButtons() {
        const allCards = mainElement.querySelectorAll('.pokemon-card');
        
        allCards.forEach((card, index) => {
            const upButton = card.querySelector('.btn-up');
            const downButton = card.querySelector('.btn-down');
            
            // Disabilita il bottone Up per il primo elemento
            if (index === 0) {
                upButton.disabled = true;
                upButton.setAttribute('aria-disabled', 'true');
            } else {
                upButton.disabled = false;
                upButton.setAttribute('aria-disabled', 'false');
            }
            
            // Disabilita il bottone Down per l'ultimo elemento
            if (index === allCards.length - 1) {
                downButton.disabled = true;
                downButton.setAttribute('aria-disabled', 'true');
            } else {
                downButton.disabled = false;
                downButton.setAttribute('aria-disabled', 'false');
            }
        });
    }

 

    caricaBtn.addEventListener('click', async() => {
        main.innerHTML = '';
        
        function createPokeDiv(pokemon){
            const pokeDiv = document.createElement('div');
            pokeDiv.classList.add('pokemon-card');
            pokeDiv.setAttribute('role', 'article');
            pokeDiv.setAttribute('aria-label', `Scheda Pokemon: ${pokemon.name}`);

            const ul = document.createElement('ul');
            ul.setAttribute('aria-label', `Dettagli di ${pokemon.name}`);

            const liId = document.createElement('li');
            liId.innerHTML = '<strong>ID: </strong>' + pokemon.id;
            ul.appendChild(liID);

            const liName = document.createElement('li');
            liName.innerHTML = '<strong>Name: </strong>' + pokemon.name;
            ul.appendChild(liName);

            pokemon.type.forEach(type => {
                const liType = document.createElement('li');
                liType.innerHTML = '<strong>Type: </stong>' + type;
                ul.appendChild(liType);
            });

            pokeDiv.appendChild(ul);

            const btnDown = document.createElement('button');
            btnDow.textContent = 'Down';
            btnDown.classList.add('btn-down');
            btnDown.setAttribute('type', 'button');
            btnDown.setAttribute('aria-label', `Sposta ${pokemon.name} verso il basso`);
            btnDown.addEventListener('click', () => {
                moveDown(pokemonDiv);
            });

            const upButton = document.createElement('button');
            upButton.textContent = 'Up';
            upButton.classList.add('btn-up');
            upButton.setAttribute('type', 'button');
            upButton.setAttribute('aria-label', `Sposta ${pokemon.name} verso l'alto`);
            upButton.addEventListener('click', () => {
                moveUp(pokemonDiv);
            });

            return pokemonDiv;

        }

        try {
            const response = await fetch('data.json');
            const pokemonData = response.data.data;

            if(!Array.isArray(response.data)) {
                main.innerHTML = '<p style="color: red;">Errore: Nessun dato trovato nel file JSON.</p>';
                return;
            }

            pokemonData.forEach(pokemon => {
                    const pokemonCard = createPokeDiv(pokemon);
                    main.appendChild(pokemonCard);
            });

            updateButtons();

        } catch (error) {
            console.error('Errore durante il caricamento dei dati:', error);
            main.innerHTML = '<p style="color: red;">Errore durante il caricamento dei dati. Verifica che il file data.json sia presente.</p>';
        }
    });
})