document.addEventListener('DOMContentLoaded', function() {
  const track = document.querySelector('.reasons-carousel-track');
  const cards = document.querySelectorAll('.reason-card');
  const nextBtn = document.querySelector('.next-btn');
  const prevBtn = document.querySelector('.prev-btn');

  if (!track || cards.length === 0) return;

  let currentIndex = 0;

  function getCardsPerView() {
    if (window.innerWidth <= 650) return 1;
    if (window.innerWidth <= 1024) return 2;
    return 3;
  }

  function updateCarousel() {
    const cardsPerView = getCardsPerView();
    const maxIndex = cards.length - cardsPerView;
    
    // Bounds check
    if (currentIndex > maxIndex) currentIndex = maxIndex;
    if (currentIndex < 0) currentIndex = 0;

    // Calculate shift distance based on card width + gap (1.5rem = 24px)
    const cardWidth = cards[0].getBoundingClientRect().width;
    const gap = 24;
    const shiftAmount = currentIndex * (cardWidth + gap);

    track.style.transform = `translateX(-${shiftAmount}px)`;
  }

  nextBtn.addEventListener('click', () => {
    const cardsPerView = getCardsPerView();
    const maxIndex = cards.length - cardsPerView;
    if (currentIndex < maxIndex) {
      currentIndex++;
      updateCarousel();
    }
  });

  prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateCarousel();
    }
  });

  window.addEventListener('resize', updateCarousel);
});
