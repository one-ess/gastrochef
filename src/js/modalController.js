export const modalButtons = document.querySelectorAll(".form__button");

export const toggleSelect = () => {
  const selects = document.querySelectorAll(".custom-select");
  selects.forEach((select) => {
    const currentButton = select.querySelector(".custom-select__button");
    const buttons = document.querySelectorAll(".custom-select__button");

    const currentlist = select.querySelector(".custom-select__list");
    const lists = document.querySelectorAll(".custom-select__list");

    const items = select.querySelectorAll(".custom-select__item");
    const input = select.querySelector(".custom-select__input");

    currentButton.addEventListener("click", () => {
      lists.forEach((list) => {
        if (list !== currentlist) {
          list.classList.remove("custom-select__list_active");
        }
      });
      buttons.forEach((button) => {
        if (button !== currentButton) {
          button.classList.remove("global-expandable-button_expanded");
        }
      });
      currentlist.classList.toggle("custom-select__list_active");
      currentButton.classList.toggle("global-expandable-button_expanded");
    });

    items.forEach((item) => {
      item.addEventListener("click", () => {
        currentButton.firstElementChild.textContent = item.textContent;
        input.value = item.dataset.option;
        currentlist.classList.remove("custom-select__list_active");
        currentButton.classList.remove("global-expandable-button_expanded");
      });
    });
  });
};

export const openModal = () => {
  let scrollPosition = 0;
  modalButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const modal = document.querySelector(".online-order");
      const modalButtonSubmit = modal.querySelector(".online-order__button");
      if (e.target.dataset.modal === modal.dataset.modal) {
        modalButtonSubmit.disabled = false;
        scrollPosition = window.scrollY;
        modal.classList.add("online-order_active");
        document.body.style.cssText = `
        overflow:hidden;
        padding-right: ${window.innerWidth - document.body.offsetWidth}px; 
        width: 100vw;
        height: 100vh;
        position: fixed;
        top: -${scrollPosition}px;
        left: 0;
        `;
        document.documentElement.style.scrollBehavior = "unset";
      }
      modal.addEventListener("click", function (e) {
        if ((e.target.classList.contains("online-order") && e.target.classList.contains("online-order_active")) || e.target.classList.contains("online-order__button-close")) {
          e.target.closest(".online-order").classList.remove("online-order_active");
          modalButtonSubmit.disabled = true;
          document.body.style.cssText = "";
          window.scroll({ top: scrollPosition });
          document.documentElement.style.scrollBehavior = "";
        }
      });
    });
  });
};
