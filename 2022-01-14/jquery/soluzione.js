document.addEventListener('DOMContentLoaded', () => {
    const table1 = document.querySelector('table');
    const table2 = document.querySelector('div.copia table');
    const button = document.querySelector('button');

    const col = 6;
    const row = 7;
    const matrice = [];

    for(let r = 0; r < row; r++) {
        matrice[r] = [];
        const tr = document.createElement('tr');
        
        for(let c = 0; c < col; c++){
            const valore= Math.floor(Math.random() * 2) + 1;
            matrice[r][c] = valore;
            const td = document.createElement('td');
            td.style.backgroundColor = (valore === 1) ? 'blue' : 'red';

            td.addEventListener('click', async() => {
                td.style.backgroundColor = 'transparent';
                matrice[r][c] = 0;
            });
            tr.appendChild(td);
        }
        table1.appendChild(tr);
    }

    button.addEventListener('click', () => {
        table2.innerHTML = '';
        for(let r = 0; r < row; r ++) {
            const tr = document.createElement('tr');

            for(let c = 0; c < col; c++) {
                const td = document.createElement('td');

                if(matrice[r][c] === 1) {
                    td.textContent = '1';
                } else if (matrice[r][c] === 2) {
                    td.textContent = '2';
                } else {
                    td.textContent = '0';
                }
                
                tr.appendChild(td);
            }
            table2.appendChild(tr);
        }
    });
});