import Swiper from "swiper";
import { Navigation, Pagination, EffectFade, Autoplay } from "swiper/modules";

export const heroSwiperContainer = document.querySelector(".hero__swiper-container");
export const dishesSwiperContainer = document.querySelector(".dishes__swiper-container");

export const initHeroSwiper = () => {
  const prevBtn = heroSwiperContainer.querySelector(".hero__nav-button_prev");
  const nextBtn = heroSwiperContainer.querySelector(".hero__nav-button_next");

  return new Swiper(heroSwiperContainer, {
    modules: [Navigation, Pagination, EffectFade, Autoplay],
    slidesPerView: 1,
    speed: 500,
    effect: "fade",
    autoplay: true,
    autoplay: {
      delay: 6000,
      disableOnInteraction: false,
    },
    fadeEffect: {
      crossFade: true,
    },
    navigation: {
      prevEl: prevBtn,
      nextEl: nextBtn,
    },
    pagination: {
      el: ".hero__dots",
      clickable: true,
      bulletClass: "hero__dot",
      renderBullet: function (_, className) {
        return `<li class="${className}">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <rect x="1" y="1" width="8" height="8" rx="4" stroke="#64D370" stroke-width="2"/>
                 </svg>
                </li>`;
      },
    },
  });
};

export const initDishesSwiper = () => {
  return new Swiper(dishesSwiperContainer, {
    speed: 500,
    loop: true,
    loopAdditionalSlides: 1,
    autoplay: true,

    spaceBetween: 30,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    breakpoints: {
      1325: {
        slidesPerView: 5,
      },
      767: {
        slidesPerView: 4,
        centeredSlides: true,
      },
      600: {
        slidesPerView: 2.4,
        centeredSlides: true,
      },
      300: {
        slidesPerView: 1.7,
        centeredSlides: true,
        spaceBetween: 20,
      },
    },
  });
};
