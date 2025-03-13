export const accordionContainer = document.querySelector(".FAQ__list");

export const toggleAccordion = () => {
  const buttons = accordionContainer.querySelectorAll(".FAQ__button");

  buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const content = button.nextElementSibling;

      buttons.forEach((button) => {
        if (e.target !== button) {
          button.classList.remove("global-expandable-button_expanded");
          button.parentElement.classList.remove("global-expandable-item_expanded");
          button.nextElementSibling.classList.remove("FAQ__text_show");
          button.nextElementSibling.style.maxHeight = 0;
        }
      });

      if (content.classList.contains("FAQ__text_show")) {
        content.style.maxHeight = 0;
        content.classList.remove("FAQ__text_show");
      } else {
        content.style.maxHeight = content.scrollHeight + "px";
        content.classList.add("FAQ__text_show");
      }
      button.classList.toggle("global-expandable-button_expanded");
      button.parentElement.classList.toggle("global-expandable-item_expanded");
    });
  });
};
