import toggleMenu from "./js/toggleMenu";
import { dishesSwiperContainer, heroSwiperContainer, initDishesSwiper, initHeroSwiper } from "./js/swiperController";
import { initTabs, tabsContainer } from "./js/tabsController";
import { accordionContainer, toggleAccordion } from "./js/toggleAccordion";
import { controlInputs, forms, getFormData } from "./js/formController";
import { modalButtons, openModal, toggleSelect } from "./js/modalController";

import "./js/utils/dynamicAdapt";

const init = () => {
  toggleMenu();
  if (heroSwiperContainer) initHeroSwiper();
  if (tabsContainer) initTabs();
  if (dishesSwiperContainer) initDishesSwiper();
  if (accordionContainer) toggleAccordion();
  if (forms.length > 0) {
    controlInputs();
    getFormData();
  }
  if (modalButtons.length > 0) {
    openModal();
    toggleSelect();
  }
};

init();
