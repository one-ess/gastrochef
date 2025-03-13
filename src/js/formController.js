export const forms = document.querySelectorAll(".order__form, .online-order__form");

const formValidity = {
  name: false,
  phone: false,
};

const maskPhone = (e) => {
  let value = e.target.value.replace(/\D/g, "");
  value = value.replace(/^7/, "");
  if (value.length > 10) value = value.slice(0, 10);
  if (value.length > 6) {
    value = `+7 (${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6)}`;
  } else if (value.length > 3) {
    value = `+7 (${value.slice(0, 3)}) ${value.slice(3)}`;
  } else if (value.length > 0) {
    value = `+7 (${value.slice(0, 3)}`;
  } else {
    value = "+7 ";
  }
  e.target.value = value;
};

export const controlInputs = () => {
  const labels = document.querySelectorAll(".form__label_name, .form__label_phone");

  labels.forEach((label) => {
    const input = label.querySelector(".form__input");

    input.addEventListener("input", (e) => {
      const isNameInput = e.target.classList.contains("form__input_name");
      const isPhoneInput = e.target.classList.contains("form__input_phone");

      if (isPhoneInput) {
        maskPhone(e);
      }

      const isValid = (isNameInput && e.target.value.length >= 2) || (isPhoneInput && e.target.value.length === 17);

      if (isNameInput) {
        formValidity.name = isValid; // Обновляем состояние для имени
      }
      if (isPhoneInput) {
        formValidity.phone = isValid; // Обновляем состояние для телефона
      }

      if (isValid) {
        label.classList.remove("form__label_invalid");
        label.classList.add("form__label_valid");
      } else {
        label.classList.remove("form__label_valid");
        label.classList.add("form__label_invalid");
      }
    });
  });
};

export const getFormData = () => {
  forms.forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (formValidity.name && formValidity.phone) {
        const data = Object.fromEntries(new FormData(form));
        alert("Объект формы получен в консоль");
        console.log(data);
      } else {
        alert("Введите данные корректно");
      }
    });
  });
};
