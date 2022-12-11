$(".header__language-link").on("click", function (e) {
  $(".header__language-link").not($(this)).removeClass("_active");
  $(this).addClass("_active");
});

$(".header__menu-burger").on("click", function () {
  $(this).toggleClass("_active");
  $(".header__menu").toggleClass("_active");
  $("body").toggleClass("_active");
  $(".wrapper").toggleClass("_active");

  if (!$(".header__menu").children(".header__phone").length > 0) {
    $(".header__phone").appendTo(".header__menu").addClass("_in-menu");
  } else {
    $(".header__phone").appendTo(".header__inner").removeClass("_in-menu");
  }
});

$(".tab").on("click", function (e) {
  e.preventDefault();
  $(this).siblings().removeClass("_active");
  $(this).addClass("_active");
  $(this).parent().nextAll().siblings().removeClass("_active");
  $($(this).attr("href")).addClass("_active");
  if ($(this).attr("href") == "#monday") {
    $(this).parent().nextAll(".monday").addClass("_active");
  }
  if ($(this).attr("href") == "#tuesday") {
    $(this).parent().nextAll(".tuesday").addClass("_active");
  }
  if ($(this).attr("href") == "#wednesday") {
    $(this).parent().nextAll(".wednesday").addClass("_active");
  }
  if ($(this).attr("href") == "#thursday") {
    $(this).parent().nextAll(".thursday").addClass("_active");
  }
  if ($(this).attr("href") == "#friday") {
    $(this).parent().nextAll(".friday").addClass("_active");
  }
  if ($(this).attr("href") == "#saturday") {
    $(this).parent().nextAll(".saturday").addClass("_active");
  }
  if ($(this).attr("href") == "#sunday") {
    $(this).parent().nextAll(".sunday").addClass("_active");
  }
});

$(".questions__item-text").hide();

$(".questions__menu-item").on("click", function () {
  $(".questions__menu-item").not($(this)).removeClass("_active").find(".questions__item-text").slideUp();
  $(this).toggleClass("_active");
  $(this).find(".questions__item-text").slideToggle();
});

$(window).on("resize", function () {
  if ($(window).width() > 768) {
    $(".header__menu-burger").removeClass("_active");
    $(".header__menu").removeClass("_active");
    $(".header__phone").appendTo(".header__inner").removeClass("_in-menu");
    $(".wrapper").removeClass("_active");
    $("body").removeClass("_active");
  }
});

$(".pagination__link").on("click", function (e) {
  e.preventDefault();
  $(this).parent().parent().find(".pagination__link").not($(this)).removeClass("_active");

  $(this).addClass("_active");
});

$(".dropdown-btn").on("click", function (e) {
  e.preventDefault();
  if ($(this).hasClass("_active")) {
    $(this).removeClass("_active");
    $(this).parent().removeClass("_active");
    $(this).next().removeClass("_active");
  } else {
    $(this).addClass("_active");
    $(".dropdown-btn").not($(this)).removeClass("_active");
    $(this).parent().addClass("_active");
    $(".dropdown-btn").not($(this)).parent().removeClass("_active");
    $(this).next().addClass("_active");
    $(".dropdown-btn").not($(this)).next().removeClass("_active");
  }
});

$(".dropdown-item").on("click", function () {
  if ($(this).parent().prev().children().html() == "") {
    $(this).parent().prev().children().append($(this).html());
  } else {
    $(this).parent().prev().children().empty();
    $(this).parent().prev().children().append($(this).html());
  }
  $(this).parent().next().val($(this).attr("data-value"));
  $(this).parent().parent().find("label").css("display", "none");

  if ($(this).hasClass("form__nutrition-programs-dropdown-item")) {
    $("#specialprogram-error").css("display", "none");
  }
  if ($(this).hasClass("form__special-programs-dropdown-item")) {
    $("#nutritionprogram-error").css("display", "none");
  }
  $(this).parent().removeClass("_active");
  $(this).parent().prev().removeClass("_active");
  $(this).parent().parent().removeClass("_active");
});
let totalSum = 0;
let totalPrice = 0;
let quantity = 0;
let productHTML = "";
function renderProduct(id, title, amount) {
  return (productHTML = `<div data-id='${id}'><span class="resume__title">${title}</span> - <span>${amount}</span> шт.</div>`);
}

$(".enumerator").on("click", function () {
  let amount = parseInt($(this).closest(".product__item").find(".catalog__number").html());
  const title = $(this).closest(".product__item").find(".product__title").html();
  const id = parseInt($(this).closest(".product__item").attr("data-id"));
  const sum = parseInt($(this).closest(".product__item").find(".catalog__price").children().eq(1).html());
  $(this).closest(".product__item").addClass("_active");

  if ($(this).hasClass("minus") && amount > 0) {
    amount--;
    quantity--;
    totalPrice = sum * amount;
    totalSum -= sum;
    renderProduct(id, title, amount);
    $(this).closest(".product__item").find(".catalog__number").html(amount);
    $(this).closest(".product__item").find(".catalog__price").children().eq(0).html(totalPrice);
    $(".product-form__resume").find(`div[data-id='${id}']`).remove();
    $(".product-form__resume").append(productHTML);
  }
  if ($(this).hasClass("plus")) {
    amount++;
    quantity++;
    totalPrice = sum * amount;
    totalSum += sum;
    renderProduct(id, title, amount);
    $(this).closest(".product__item").find(".catalog__number").html(amount);
    $(this).closest(".product__item").find(".catalog__price").children().eq(0).html(totalPrice);
    $(".product-form__resume").find(`div[data-id='${id}']`).remove();
    $(".product-form__resume").append(productHTML);
  }
  if (amount == 0) {
    $(this).closest(".product__item").removeClass("_active");
    $(".product-form__resume").find(`div[data-id='${id}']`).remove();
  }

  $(".product__amount").html(quantity);
  $(".product__totalPrice").html(totalSum);
});

$(".product__button").on("click", function (e) {
  e.preventDefault();
  if (parseInt($(".product__amount").html()) > 0) {
    $(".product__error").addClass("_none");
    $.fancybox.open({
      src: "#product-order-modal",
      touch: false,
    });
  } else {
    $(".product__error").removeClass("_none");
  }
});
