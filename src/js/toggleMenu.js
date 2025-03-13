const toggleMenu = () => {
  const menu = document.querySelector(".header__menu-wrapper");
  const menuBurgers = document.querySelectorAll(".menu-burger");

  menuBurgers.forEach((menuBurger) => {
    menuBurger.addEventListener("click", (e) => {
      if (e.target.classList.contains("menu-burger_close")) {
        menu.classList.remove("header__menu-wrapper_active");
      } else {
        menu.classList.toggle("header__menu-wrapper_active");
      }
    });
  });
};

export default toggleMenu;
