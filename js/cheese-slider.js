document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.cheese-grid');
    const prevButton = document.querySelector('.cheese-slider-arrow.prev');
    const nextButton = document.querySelector('.cheese-slider-arrow.next');
    const cards = document.querySelectorAll('.cheese-card');
    
    let currentPosition = 0;
    const cardWidth = cards[0].offsetWidth;
    let cardsPerView = 5; // По умолчанию показываем 5 карточек
    
    function updateCardsPerView() {
        if (window.innerWidth > 2200) {
            cardsPerView = 5;
        } else if (window.innerWidth > 1500) {
            cardsPerView = 4;
        } else if (window.innerWidth <= 1200) {
            cardsPerView = 1;
            // Скрываем стрелки на мобильных устройствах
            prevButton.style.display = 'none';
            nextButton.style.display = 'none';
        } else {
            cardsPerView = 3;
            // Показываем стрелки на десктопе
            prevButton.style.display = 'block';
            nextButton.style.display = 'block';
        }
    }
    
    function updateSliderPosition() {
        const totalCards = cards.length;
        const maxPosition = totalCards - cardsPerView;
        
        // Обновляем видимость карточек
        cards.forEach((card, index) => {
            if (index >= currentPosition && index < currentPosition + cardsPerView) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
        
        // Обновляем состояние кнопок
        prevButton.style.opacity = currentPosition === 0 ? '0.3' : '1';
        nextButton.style.opacity = currentPosition >= maxPosition ? '0.3' : '1';
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
        const maxPosition = cards.length - cardsPerView;
        if (currentPosition < maxPosition) {
            currentPosition++;
            updateSliderPosition();
        }
    });
    
    // Инициализация
    updateCardsPerView();
    updateSliderPosition();
    
    // Обработка изменения размера окна
    window.addEventListener('resize', () => {
        updateCardsPerView();
        updateSliderPosition();
    });
}); 