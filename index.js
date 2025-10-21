document.addEventListener("DOMContentLoaded", () => {
  const slider = document.querySelector(".hero-slider");
  const sliderWrapper = document.querySelector(".hero-slider__wrapper");
  const slides = document.querySelectorAll(".hero-slider__slide");
  const prevButton = document.querySelector(".hero-slider__arrow--prev");
  const nextButton = document.querySelector(".hero-slider__arrow--next");
  const progressBar = document.querySelector(".hero-slider__progress-bar");

  if (!sliderWrapper) return; // Защита от ошибок, если слайдера нет на странице

  let currentIndex = 0;
  const totalSlides = slides.length;
  let autoplayInterval = null;
  const autoplayDelay = 5000; // 5 секунд

  // --- Функция обновления слайдера (без изменений) ---
  function updateSlider() {
    const offset = -currentIndex * 100;
    sliderWrapper.style.transform = `translateX(${offset}%)`;
    const progressWidth = ((currentIndex + 1) / totalSlides) * 100;
    progressBar.style.width = `${progressWidth}%`;
    prevButton.disabled = currentIndex === 0;
    nextButton.disabled = currentIndex === totalSlides - 1;
  }

  // --- Функции для автоплея ---
  function startAutoplay() {
    stopAutoplay(); // Сначала останавливаем, чтобы избежать дублирования
    autoplayInterval = setInterval(() => {
      if (currentIndex < totalSlides - 1) {
        currentIndex++;
      } else {
        currentIndex = 0; // Возвращаемся к первому слайду
      }
      updateSlider();
    }, autoplayDelay);
  }

  function stopAutoplay() {
    clearInterval(autoplayInterval);
  }

  // --- Функции для переключения ---
  function nextSlide() {
    if (currentIndex < totalSlides - 1) {
      currentIndex++;
      updateSlider();
    }
  }

  function prevSlide() {
    if (currentIndex > 0) {
      currentIndex--;
      updateSlider();
    }
  }

  // --- Логика для свайпа ---
  let touchStartX = 0;
  let touchEndX = 0;

  slider.addEventListener("touchstart", (e) => {
    touchStartX = e.touches[0].clientX;
    stopAutoplay(); // Останавливаем автоплей при касании
  });

  slider.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].clientX;
    handleSwipe();
    startAutoplay(); // Возобновляем автоплей после свайпа
  });

  function handleSwipe() {
    // Свайп влево (переключение на следующий слайд)
    if (touchStartX - touchEndX > 50) {
      // 50px - минимальная длина свайпа
      nextSlide();
    }
    // Свайп вправо (переключение на предыдущий слайд)
    if (touchEndX - touchStartX > 50) {
      prevSlide();
    }
  }

  // --- Навешиваем обработчики событий ---
  nextButton.addEventListener("click", () => {
    stopAutoplay();
    nextSlide();
    startAutoplay();
  });

  prevButton.addEventListener("click", () => {
    stopAutoplay();
    prevSlide();
    startAutoplay();
  });

  // --- Инициализация ---
  updateSlider();
  startAutoplay();
});

document.addEventListener("DOMContentLoaded", function () {
  const allTabsSliderBlocks = document.querySelectorAll(".tabs-slider");

  allTabsSliderBlocks.forEach((block) => {
    const tabButtons = block.querySelectorAll(".tabs-slider__tab-button");
    const tabPanels = block.querySelectorAll(".tabs-slider__panel");

    // --- Этот блок остается без изменений ---
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
    // --- Конец блока без изменений ---

    const swiperInstances = [];
    tabPanels.forEach((panel) => {
      const swiperEl = panel.querySelector(".swiper");
      if (swiperEl) {
        const swiper = new Swiper(swiperEl, {
          slidesPerView: 3,
          spaceBetween: 30,
          navigation: {
            // --- ИЗМЕНЕНИЯ ЗДЕСЬ ---
            // Ищем кнопки не внутри swiperEl, а внутри panel
            nextEl: panel.querySelector(".swiper-button-next"),
            prevEl: panel.querySelector(".swiper-button-prev"),
            // --- КОНЕЦ ИЗМЕНЕНИЙ ---
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

document.addEventListener("DOMContentLoaded", () => {
  const dropdownItems = document.querySelectorAll(".nav-menu__item");

  dropdownItems.forEach((item) => {
    const link = item.querySelector(".nav-menu__link--dropdown");
    const dropdown = item.querySelector(".nav-menu__dropdown");

    if (!link || !dropdown) {
      return;
    }

    item.addEventListener("mouseenter", () => {
      item.classList.add("--dropdown-active");
      link.setAttribute("aria-expanded", "true");
    });

    item.addEventListener("mouseleave", () => {
      item.classList.remove("--dropdown-active");
      link.setAttribute("aria-expanded", "false");
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const allVideoPlayers = document.querySelectorAll(".video-player");

  allVideoPlayers.forEach((player) => {
    const video = player.querySelector(".video-player__video");
    const playButton = player.querySelector(".video-player__play-btn");

    const togglePlay = () => {
      if (video.paused || video.ended) {
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.catch((error) => {
            console.error("Ошибка воспроизведения видео:", error);
          });
        }
      } else {
        video.pause();
      }
    };

    playButton.addEventListener("click", (e) => {
      e.stopPropagation(); // Останавливаем "всплытие" клика, чтобы не сработал клик по оверлею
      togglePlay();
    });

    // Клик по самому видео также ставит на паузу
    video.addEventListener("click", (e) => {
      e.preventDefault();
      togglePlay();
    });

    video.addEventListener("play", () => {
      player.classList.add("--is-playing");
      playButton.setAttribute("aria-label", "Поставить на паузу");
    });

    video.addEventListener("pause", () => {
      player.classList.remove("--is-playing");
      playButton.setAttribute("aria-label", "Воспроизвести видео");
    });

    video.addEventListener("ended", () => {
      player.classList.remove("--is-playing");
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const dropdownWrapper = document.querySelector(".js-filter-dropdown-wrapper");

  if (!dropdownWrapper) {
    return;
  }

  const openButton = dropdownWrapper.querySelector(".js-open-filters");
  const dropdown = dropdownWrapper.querySelector(".filter-dropdown");

  // Функция для закрытия, чтобы не дублировать код
  const closeDropdown = () => {
    dropdown.classList.remove("--is-open");
    openButton.classList.remove("btn--filter-active"); // Убираем активный класс с кнопки
  };

  openButton.addEventListener("click", (event) => {
    event.stopPropagation();
    dropdown.classList.toggle("--is-open");
    openButton.classList.toggle("btn--filter-active"); // Переключаем активный класс на кнопке
  });

  document.addEventListener("click", (event) => {
    if (
      dropdown.classList.contains("--is-open") &&
      !dropdownWrapper.contains(event.target)
    ) {
      closeDropdown();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && dropdown.classList.contains("--is-open")) {
      closeDropdown();
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const allToggles = document.querySelectorAll(".js-nav-toggle");

  allToggles.forEach((toggle) => {
    toggle.addEventListener("click", (event) => {
      event.preventDefault();

      const parentItem = toggle.closest(".footer-nav__item--has-submenu");

      if (parentItem) {
        parentItem.classList.toggle("--is-open");

        const isOpen = parentItem.classList.contains("--is-open");
        toggle.setAttribute("aria-expanded", isOpen);
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const allAccordionItems = document.querySelectorAll(
    ".js-mobile-accordion-item"
  );

  allAccordionItems.forEach((item) => {
    const toggle = item.querySelector(".js-mobile-accordion-toggle");
    if (toggle) {
      toggle.addEventListener("click", () => {
        item.classList.toggle("--is-open");
        const isOpen = item.classList.contains("--is-open");
        toggle.setAttribute("aria-expanded", isOpen);
      });
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const burgerButton = document.getElementById("burger-menu-button");
  const mobileMenu = document.getElementById("mobile-menu");

  // Открытие/закрытие главного меню
  burgerButton.addEventListener("click", function () {
    document.body.classList.toggle("menu-open");
  });

  // Обработка навигации внутри меню
  mobileMenu.addEventListener("click", function (event) {
    // Проверяем, что клик был по ссылке с атрибутом data-target
    const targetLink = event.target.closest("a[data-target]");
    if (targetLink) {
      event.preventDefault();
      const targetPanelId = targetLink.dataset.target;
      const targetPanel = document.getElementById(targetPanelId);

      if (targetPanel) {
        // Находим текущую активную панель и скрываем ее
        const currentActivePanel = mobileMenu.querySelector(
          ".mobile-menu__panel.is-active"
        );
        if (currentActivePanel) {
          currentActivePanel.classList.remove("is-active");
        }
        // Показываем целевую панель
        targetPanel.classList.add("is-active");
      }
    }

    // Обработка клика по кнопке "Назад"
    const backButton = event.target.closest(
      ".mobile-menu__back-button[data-target]"
    );
    if (backButton) {
      const targetPanelId = backButton.dataset.target;
      const targetPanel = document.getElementById(targetPanelId);

      if (targetPanel) {
        // Находим текущую активную панель (которая сейчас видима) и скрываем ее
        const currentActivePanel = backButton.closest(".mobile-menu__panel");
        if (currentActivePanel) {
          currentActivePanel.classList.remove("is-active");
        }
        // Показываем целевую (предыдущую) панель
        targetPanel.classList.add("is-active");
      }
    }
  });
});

// new

const preimSwiper = new Swiper(".swiper-preim", {
  loop: true,

  slidesPerView: 1,
  spaceBetween: 10,

  navigation: {
    nextEl: ".our-preim__nav-button--next",
    prevEl: ".our-preim__nav-button--prev",
  },

  breakpoints: {
    768: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
  },
});

const saleSwiper = new Swiper(".swiper-sale", {
  loop: true,

  slidesPerView: 3,
  spaceBetween: 10,

  navigation: {
    nextEl: ".our-preim__nav-button--next",
    prevEl: ".our-preim__nav-button--prev",
  },

  breakpoints: {
    1384: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    891: {
      slidesPerView: 2,
      spaceBetween: 30,
    },
    0: {
      slidesPerView: 1,
      spaceBetween: 30,
    },
  },
});

// new

document.addEventListener("DOMContentLoaded", function () {
  // Используем Map для хранения данных и созданных экземпляров Popper
  const tooltipData = new Map();

  // 1. Предварительная подготовка: находим элементы и вычисляем смещения
  document.querySelectorAll(".tooltip-wrapper").forEach((wrapper, index) => {
    const button = wrapper.querySelector(".usl-hero__button-2");
    const tooltip = wrapper.querySelector(".tooltip");
    const arrowElement = wrapper.querySelector("[data-popper-arrow]");
    const iconInButton = button.querySelector(".usl-hero__icon");

    if (!button || !tooltip || !iconInButton) return;

    // Генерируем уникальный ID
    const uniqueButtonId = `tooltip-trigger-${index}`;
    button.id = uniqueButtonId;

    // Вычисляем смещение ОДИН РАЗ при загрузке
    const buttonRect = button.getBoundingClientRect();
    const iconRect = iconInButton.getBoundingClientRect();
    const skiddingValue =
      iconRect.left +
      iconRect.width / 2 -
      (buttonRect.left + buttonRect.width / 2);

    // Сохраняем все необходимые данные, но НЕ создаем Popper
    tooltipData.set(uniqueButtonId, {
      instance: null, // Экземпляр будет создан позже
      button: button,
      tooltip: tooltip,
      arrowElement: arrowElement,
      originalParent: wrapper,
      skidding: skiddingValue,
    });
  });

  // 2. Обработка кликов через делегирование
  document.body.addEventListener("click", function (event) {
    const clickedButton = event.target.closest(".usl-hero__button-2");

    // Сначала закрываем все открытые тултипы
    let closingTooltipData = null;
    tooltipData.forEach((data, buttonId) => {
      if (data.tooltip.classList.contains("is-visible")) {
        closingTooltipData = data;
        if (!clickedButton || buttonId !== clickedButton.id) {
          data.tooltip.classList.remove("is-visible");
        }
      }
    });

    // Возвращаем закрытый тултип на место
    if (
      closingTooltipData &&
      !closingTooltipData.tooltip.classList.contains("is-visible")
    ) {
      closingTooltipData.originalParent.appendChild(closingTooltipData.tooltip);
    }

    // Если клик был по кнопке, обрабатываем открытие/закрытие
    if (clickedButton) {
      const data = tooltipData.get(clickedButton.id);
      if (!data) return;

      const wasVisible = data.tooltip.classList.contains("is-visible");

      data.tooltip.classList.toggle("is-visible");

      if (!wasVisible) {
        // --- ВОТ КЛЮЧЕВОЕ ИЗМЕНЕНИЕ ---
        // Если это первый клик, создаем экземпляр Popper
        if (!data.instance) {
          data.instance = Popper.createPopper(data.button, data.tooltip, {
            placement: "bottom",
            modifiers: [
              { name: "offset", options: { offset: [data.skidding, 12] } },
              { name: "preventOverflow", options: { padding: 10 } },
              { name: "flip", options: { fallbackPlacements: ["top"] } },
              { name: "arrow", options: { element: data.arrowElement } },
            ],
          });
        }

        // Телепортируем и обновляем
        document.body.appendChild(data.tooltip);
        data.instance.update();
      } else {
        // Возвращаем на место при закрытии
        data.originalParent.appendChild(data.tooltip);
      }
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  // Находим основной контейнер дропдауна
  const dropdown = document.querySelector(".custom-dropdown");

  // Если дропдаун не найден на странице, прекращаем выполнение скрипта
  if (!dropdown) {
    return;
  }

  // Находим остальные элементы внутри дропдауна
  const selected = dropdown.querySelector(".dropdown-selected");
  const menu = dropdown.querySelector(".dropdown-menu");
  const options = dropdown.querySelectorAll(".dropdown-menu li");

  // Проверяем наличие ключевых элементов перед добавлением обработчиков
  if (selected && menu && options.length > 0) {
    const selectedSpan = selected.querySelector("span");

    // Открытие/закрытие списка по клику
    selected.addEventListener("click", () => {
      dropdown.classList.toggle("open");
    });

    // Обработка выбора опции
    options.forEach((option) => {
      option.addEventListener("click", () => {
        // Обновляем текст в "выбранном" поле, если span существует
        if (selectedSpan) {
          selectedSpan.innerText = option.innerText;
        }

        // Убираем активный класс у всех и добавляем к выбранному
        options.forEach((opt) => opt.classList.remove("active"));
        option.classList.add("active");

        // Закрываем дропдаун
        dropdown.classList.remove("open");
      });
    });
  }

  // Закрытие дропдауна при клике вне его области
  document.addEventListener("click", function (e) {
    // Проверяем, был ли клик вне области существующего дропдауна
    if (!dropdown.contains(e.target)) {
      dropdown.classList.remove("open");
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const accordionItems = document.querySelectorAll(".price__item");

  accordionItems.forEach((item) => {
    const header = item.querySelector(".price__header");

    header.addEventListener("click", function () {
      const isActive = item.classList.contains("is-active");

      accordionItems.forEach((otherItem) => {
        otherItem.classList.remove("is-active");
        otherItem
          .querySelector(".price__header")
          .setAttribute("aria-expanded", "false");
      });

      if (!isActive) {
        item.classList.add("is-active");
        this.setAttribute("aria-expanded", "true");
      }
    });
  });
});

const worksSlider = new Swiper(".swiper-works-slider", {
  direction: "vertical",
  loop: true,
  slidesPerView: 2,
  slidesPerGroup: 2,
  spaceBetween: 20,

  navigation: {
    nextEl: ".our-work__nav-button--next",
    prevEl: ".our-work__nav-button--prev",
  },

  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },

  breakpoints: {
    768: {
      direction: "horizontal",
      slidesPerView: 2,
      slidesPerGroup: 2,
      spaceBetween: 30,
    },
  },
});

document.addEventListener("DOMContentLoaded", () => {
  const accordionHeaders = document.querySelectorAll(
    ".usl-qua__accordion-header"
  );

  accordionHeaders.forEach((clickedHeader) => {
    clickedHeader.addEventListener("click", () => {
      const clickedItem = clickedHeader.parentElement;

      accordionHeaders.forEach((header) => {
        const item = header.parentElement;
        if (item !== clickedItem) {
          item.classList.remove("usl-qua__accordion-item--active");
        }
      });

      clickedItem.classList.toggle("usl-qua__accordion-item--active");
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const partnersContainer = document.querySelector(".partners-cont");

  if (partnersContainer) {
    const partnerSlides = partnersContainer.querySelectorAll(
      ".swiper-wrapper > a"
    );

    partnerSlides.forEach((slide) => {
      slide.classList.add("swiper-slide");
    });

    const partnersSwiper = new Swiper(partnersContainer, {
      loop: true,
      spaceBetween: 30,
      slidesPerView: 4,
      // breakpoints: {
      //     640: {
      //         slidesPerView: 3,
      //         spaceBetween: 20
      //     },
      //     768: {
      //         slidesPerView: 4,
      //         spaceBetween: 30
      //     },
      //     1024: {
      //         slidesPerView: 5, // Для больших экранов
      //         spaceBetween: 40
      //     }
      // },
      // Добавим автопрокрутку, это хорошо смотрится на слайдерах с логотипами
      navigation: {
        nextEl: ".our-par__nav-button--next",
        prevEl: ".our-par__nav-button--prev",
      },
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const worksSlider2 = new Swiper(".swiper-photo", {
    loop: true,
    slidesPerView: 3,
    slidesPerGroup: 2,
    spaceBetween: 20,
    navigation: {
      nextEl: ".our-work__nav-button--next-2",
      prevEl: ".our-work__nav-button--prev-2",
    },
    breakpoints: {
      1133: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
      770: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      0: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
    },
  });

  const lightbox = GLightbox({
    selector: ".gallery-item",
    loop: true,
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const tabsContainer = document.querySelector(".single-doc-tabs");

  if (tabsContainer) {
    const tabs = tabsContainer.querySelectorAll(".single-doc-tabs__tab");
    const panels = tabsContainer.querySelectorAll(".single-doc-tabs__panel");

    // Находим ВСЕ кнопки "Развернуть" с помощью querySelectorAll
    const expandButtons = tabsContainer.querySelectorAll(
      ".single-doc-tabs__expand-button"
    );

    // Логика переключения табов (остается без изменений)
    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        const targetPanelId = tab.dataset.tab;

        tabs.forEach((t) => t.classList.remove("single-doc-tabs__tab--active"));
        tab.classList.add("single-doc-tabs__tab--active");

        panels.forEach((panel) => {
          if (panel.dataset.panel === targetPanelId) {
            panel.classList.add("single-doc-tabs__panel--active");
          } else {
            panel.classList.remove("single-doc-tabs__panel--active");
          }
        });
      });
    });

    // Перебираем каждую найденную кнопку и вешаем на нее обработчик
    expandButtons.forEach((button) => {
      button.addEventListener("click", () => {
        // 'button' - это конкретная кнопка, на которую кликнули
        const panel = button.closest(".single-doc-tabs__panel");

        if (panel) {
          panel.classList.toggle("single-doc-tabs__panel--expanded");

          if (panel.classList.contains("single-doc-tabs__panel--expanded")) {
            button.textContent = "Свернуть";
          } else {
            button.textContent = "Развернуть";
          }
        }
      });
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const worksSlider3 = new Swiper(".swiper-sertificate", {
    loop: true,
    slidesPerView: 4,
    slidesPerGroup: 1,
    spaceBetween: 20,
    navigation: {
      nextEl: ".our-preim__nav-button--next-22",
      prevEl: ".our-preim__nav-button--prev-22",
    },
    breakpoints: {
      1153: {
        slidesPerView: 4,
        spaceBetween: 20,
      },
      930: {
        slidesPerView: 3,
        spaceBetween: 10,
      },
      655: {
        slidesPerView: 2,
        spaceBetween: 10,
      },
      0: {
        slidesPerView: 1,
        spaceBetween: 10,
      },
    },
  });

  const lightbox = GLightbox({
    selector: ".sertificate-link",
    loop: true,
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const worksSlider4 = new Swiper(".swiper-do-posle", {
    loop: true,
    slidesPerView: 1,
    slidesPerGroup: 1,
    spaceBetween: 20,
    navigation: {
      nextEl: ".our-preim__nav-button--next",
      prevEl: ".our-preim__nav-button--prev",
    },
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const worksSlider4 = new Swiper(".swiper-doc-12", {
    loop: true,
    slidesPerView: 1,
    slidesPerGroup: 1,
    spaceBetween: 20,
    navigation: {
      nextEl: ".our-preim__nav-button--next-2",
      prevEl: ".our-preim__nav-button--prev-2",
    },
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const tabsContainer = document.querySelector(".single-doc-tabs__wrapper");
  if (!tabsContainer) return;

  const mobileHeader = tabsContainer.querySelector(
    ".single-doc-tabs__mobile-header"
  );
  const mobileList = tabsContainer.querySelector(
    ".single-doc-tabs__mobile-list"
  );
  const mobileTabs = mobileList.querySelectorAll(".single-doc-tabs__tab");
  const desktopTabs = tabsContainer.querySelectorAll(
    ".single-doc-tabs__nav .single-doc-tabs__tab"
  );
  const allPanels = tabsContainer.querySelectorAll(".single-doc-tabs__panel");

  mobileHeader.addEventListener("click", () => {
    mobileHeader.classList.toggle("is-open");
    mobileList.classList.toggle("is-open");
  });

  mobileTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const targetPanelId = tab.dataset.tab;

      mobileHeader.innerHTML =
        tab.innerHTML +
        '<svg class="single-doc-tabs__mobile-arrow" width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1.5L6 6.5L11 1.5" stroke="#212529" stroke-width="2"/></svg>';

      mobileHeader.classList.remove("is-open");
      mobileList.classList.remove("is-open");

      allPanels.forEach((panel) => {
        panel.classList.toggle(
          "single-doc-tabs__panel--active",
          panel.dataset.panel === targetPanelId
        );
      });

      desktopTabs.forEach((dTab) => {
        dTab.classList.toggle(
          "single-doc-tabs__tab--active",
          dTab.dataset.tab === targetPanelId
        );
      });
    });
  });

  document.addEventListener("click", (e) => {
    if (!tabsContainer.contains(e.target)) {
      mobileHeader.classList.remove("is-open");
      mobileList.classList.remove("is-open");
    }
  });
});
