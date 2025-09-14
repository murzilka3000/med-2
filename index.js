document.addEventListener("DOMContentLoaded", () => {
  const sliderWrapper = document.querySelector(".hero-slider__wrapper");
  const slides = document.querySelectorAll(".hero-slider__slide");
  const prevButton = document.querySelector(".hero-slider__arrow--prev");
  const nextButton = document.querySelector(".hero-slider__arrow--next");
  const progressBar = document.querySelector(".hero-slider__progress-bar");

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

  nextButton.addEventListener("click", () => {
    if (currentIndex < totalSlides - 1) {
      currentIndex++;
      updateSlider();
    }
  });

  prevButton.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateSlider();
    }
  });

  updateSlider();
});

document.addEventListener("DOMContentLoaded", function () {
  const allTabsSliderBlocks = document.querySelectorAll(".tabs-slider");

  allTabsSliderBlocks.forEach((block) => {
    const tabButtons = block.querySelectorAll(".tabs-slider__tab-button");
    const tabPanels = block.querySelectorAll(".tabs-slider__panel");

    tabButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const targetId = button.dataset.tabTarget;
        const targetPanel = block.querySelector(targetId);

        tabButtons.forEach((btn) =>
          btn.classList.remove("tabs-slider__tab-button--active")
        );
        tabPanels.forEach((panel) =>
          panel.classList.remove("tabs-slider__panel--active")
        );

        button.classList.add("tabs-slider__tab-button--active");
        if (targetPanel) {
          targetPanel.classList.add("tabs-slider__panel--active");
        }
      });
    });

    const swiperInstances = [];
    tabPanels.forEach((panel) => {
      const swiperEl = panel.querySelector(".swiper");
      if (swiperEl) {
        const swiper = new Swiper(swiperEl, {
          slidesPerView: 3,
          spaceBetween: 30,
          navigation: {
            nextEl: swiperEl.querySelector(".swiper-button-next"),
            prevEl: swiperEl.querySelector(".swiper-button-prev"),
          },
          breakpoints: {
            320: { slidesPerView: 1, spaceBetween: 15 },
            768: { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 3, spaceBetween: 30 },
          },
        });
        swiperInstances.push(swiper);
      }
    });
  });
});
