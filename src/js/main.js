import "./libs/jquery.fancybox.js";
import "./libs/dynamicAdapt.js";
import "./libs/jquery.maskedinput.js";
import "./libs/jquery.validate.min.js";
import "./libs/additional-methods.js";
import "./_sliders.js";
import "./_handler-events.js";

$(".phone").mask("+7 (999) 999 99 99");

$(".phone").on("change", function () {
  if ($(this).val().length == 18) {
    $(this).next().css("display", "none");
  } else {
    $(this).next().css("display", "block");
  }
});

$("#order-form").validate({
  rules: {
    name: {
      required: true,
      minlength: 2,
    },
    email: {
      required: true,
      email: true,
    },
    phone: {
      required: true,
    },
    datetime: {
      required: true,
    },
    payments: {
      required: true,
    },
    cutlery: {
      required: true,
    },
    contacts: {
      required: true,
    },
    street: {
      required: true,
    },
    coop: {
      required: true,
    },
    nutritionprogram: {
      require_from_group: [1, ".programs"],
    },
    specialprogram: {
      require_from_group: [1, ".programs"],
    },
  },
  submitHandler: function () {
    alert("Спасибо, форма успешно отправлена!");
    form.submit();
  },
});
$("#phone-form").validate({
  rules: {
    name: {
      required: true,
      minlength: 2,
    },
    phone: {
      required: true,
    },
    coop: {
      required: true,
    },
  },
  submitHandler: function () {
    alert("Спасибо, форма успешно отправлена!");
    form.submit();
  },
});
$("#ordernquestions-form").validate({
  rules: {
    name: {
      required: true,
      minlength: 2,
    },
    phone: {
      required: true,
    },
    coop: {
      required: true,
    },
  },
  submitHandler: function () {
    alert("Спасибо, форма успешно отправлена!");
    form.submit();
  },
});
$("#product-form").validate({
  rules: {
    name: {
      required: true,
      minlength: 2,
    },
    phone: {
      required: true,
    },
    coop: {
      required: true,
    },
    datetime: {
      required: true,
    },
    payments: {
      required: true,
    },
    contacts: {
      required: true,
    },
    street: {
      required: true,
    },
  },
  submitHandler: function () {
    alert("Спасибо, форма успешно отправлена!");
    form.submit();
  },
});
