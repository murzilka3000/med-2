document.addEventListener('DOMContentLoaded', () => {
  const sliderWrapper = document.querySelector('.hero-slider__wrapper');
  const slides = document.querySelectorAll('.hero-slider__slide');
  const prevButton = document.querySelector('.hero-slider__arrow--prev');
  const nextButton = document.querySelector('.hero-slider__arrow--next');
  const progressBar = document.querySelector('.hero-slider__progress-bar');

  let currentIndex = 0;
  const totalSlides = slides.length;

  function updateSlider() {
    const offset = -currentIndex * 100;
    sliderWrapper.style.transform = `translateX(${offset}%)`;

    const progressWidth = ((currentIndex + 1) / totalSlides) * 100;
    progressBar.style.width = `${progressWidth}%`;

    prevButton.disabled = currentIndex === 0;
    nextButton.disabled = currentIndex === totalSlides - 1;
  }

  nextButton.addEventListener('click', () => {
    if (currentIndex < totalSlides - 1) {
      currentIndex++;
      updateSlider();
    }
  });

  prevButton.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateSlider();
    }
  });

  updateSlider();
});