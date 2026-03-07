
const container = document.querySelector('.image-container');
const images = document.querySelectorAll('.image-container img');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const dotsContainer = document.querySelector('.dots');

let index = 0;
const totalImages = images.length;

// Create dots
for(let i = 0; i < totalImages; i++){
    const dot = document.createElement('span');
    if(i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => {
        index = i;
        updateSlider();
    });
    dotsContainer.appendChild(dot);
}

const dots = document.querySelectorAll('.dots span');

function updateSlider(){
    container.style.transform = `translateX(${-index * 100}%)`;

    dots.forEach(dot => dot.classList.remove('active'));
    dots[index].classList.add('active');
}

// Next
nextBtn.addEventListener('click', () => {
    index = (index + 1) % totalImages;
    updateSlider();
});

// Prev
prevBtn.addEventListener('click', () => {
    index = (index - 1 + totalImages) % totalImages;
    updateSlider();
});

// Auto Slide
setInterval(() => {
    index = (index + 1) % totalImages;
    updateSlider();
}, 4000);

