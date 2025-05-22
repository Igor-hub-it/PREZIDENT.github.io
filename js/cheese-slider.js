document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.cheese-grid');
    const prevButton = document.querySelector('.cheese-slider-arrow.prev');
    const nextButton = document.querySelector('.cheese-slider-arrow.next');
    const cards = document.querySelectorAll('.cheese-card');
    
    let currentPosition = 0;
    const cardWidth = cards[0].offsetWidth;
    const cardsPerView = 5;
    const totalCards = cards.length;
    
    function updateSliderPosition() {
        let k = 1;
        if (window.innerWidth > 1700) {
            k = 1;
        } else if (window.innerWidth > 1500) {
            k = 1.25;
        } else if (window.innerWidth > 1400) {
            k = 1.3;
        }

        slider.style.transform = `translateX(-${currentPosition * cardWidth * k}px)`;
        
        // Обновляем состояние кнопок
        prevButton.style.opacity = currentPosition === 0 ? '0.3' : '1';
        nextButton.style.opacity = currentPosition >= totalCards - cardsPerView ? '0.3' : '1';
    }
    
    prevButton.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (currentPosition > 0) {
            currentPosition--;
            updateSliderPosition();
        }
    });
    
    nextButton.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (currentPosition < totalCards - cardsPerView) {
            currentPosition++;
            updateSliderPosition();
        }
    });
    
    // Инициализация состояния кнопок
    updateSliderPosition();
    
    // Обработка изменения размера окна
    window.addEventListener('resize', () => {
        const newCardWidth = cards[0].offsetWidth;
        if (newCardWidth !== cardWidth) {
            currentPosition = 0;
            updateSliderPosition();
        }
    });
}); 