document.addEventListener('DOMContentLoaded', () => {
    const popup = document.querySelector('div.popup');
    const sliderImages = document.querySelectorAll('img');
    const follBtn = document.querySelector('button.foll');
    const prevBtn = document.getElementById('prev');
    const closeBtn = document.querySelector('button.close');
    const pictureDiv = document.querySelector('div.picture');

    let currentIndex = -1;
    let images = [];


    popup.style.display = 'none';


    sliderImages.forEach(img => {
        images.push({
            src: img.getAttribute('src'),
            alt: img.getAttribute('alt')
        });
    });

    sliderImages.forEach(img => {
        img.addEventListener('click', async() => {
            const clickedSrc = img.getAttribute('src');
            currentIndex = images.findIndex(img => img.src === clickedSrc);

            if(currentIndex !== -1) {
                pictureDiv.innerHTML = '';
                const addImg = document.createElement('img');
                addImg.setAttribute('src', images[currentIndex].src);
                addImg.setAttribute('alt', images[currentIndex].alt);
                pictureDiv.appendChild(addImg);
                popup.style.display = 'block';
            }

        });
    });


    prevBtn.addEventListener('click', async() => {
        if(currentIndex !==  -1) {
            currentIndex =  ((currentIndex - 1) % images.length + images.length) % images.length;
            pictureDiv.innerHTML = '';
            const addImg = document.createElement('img');
            addImg.setAttribute('src', images[currentIndex].src);
            addImg.setAttribute('alt', images[currentIndex].alt);
            pictureDiv.appendChild(addImg);
            popup.style.display = 'block';
        } 
    });
    
    follBtn.addEventListener('click', async() => {
        if(currentIndex !== -1) {
            currentIndex = (currentIndex + 1) % images.length;
            pictureDiv.innerHTML = '';
            const addImg = document.createElement('img');
            addImg.setAttribute('src', images[currentIndex].src);
            addImg.setAttribute('alt', images[currentIndex].alt);
            pictureDiv.appendChild(addImg);
            popup.style.display = 'block'; 
        }
    });

    closeBtn.addEventListener('click', async() => {  
        pictureDiv.innerHTML= '';
        popup.style.display = 'none';
        currentIndex = -1;      
    });
});