document.addEventListener('DOMContentLoaded', () => {
    const popupDiv = document.getElementById('popup');
    const pictureDiv = document.getElementById('picture');
    const prevBtn = document.querySelector('button.prev');
    const follBtn = document.getElementById('foll');
    const closeBtn = document.getElementById('close');
    const sliderImages = document.querySelectorAll('img');

    let images = [];
    let currentIndex = -1;

    popupDiv.style.display = 'none';

    sliderImages.forEach(img => {
        images.push({
            alt: img.getAttribute('alt'),
            src: img.getAttribute('src')
        });
    });

    sliderImages.forEach(img =>{
        img.addEventListener('dblclick', async() => {
            if(currentIndex === -1) {
                const clickedSrc = img.getAttribute('src');
                currentIndex = images.findIndex(img => img.src === clickedSrc);

                if(currentIndex !== -1) {
                    pictureDiv.innerHTML = '';
                    const addImg = document.createElement('img');
                    addImg.setAttribute('src', images[currentIndex].src);
                    addImg.setAttribute('alt', images[currentIndex].alt);
                    pictureDiv.appendChild(addImg);
                    popupDiv.style.display = 'block';
                }
            }
        });
    });

    prevBtn.addEventListener('click', async() => {
        if(currentIndex !== -1) {
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
        currentIndex = -1;
        popupDiv.style.display = 'none';
    });
});