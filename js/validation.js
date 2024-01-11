// Obtener todos los forms de la página
const forms = document.querySelectorAll("form[data-form]");

if (forms.length > 0) {
  for (let form of forms) {
    // Obtener todos los campos que tienen el atributo data-validate
    const inputs = form.querySelectorAll("[data-validate]");

    // Evento Submit
    //form.addEventListener("submit", submitForm.bind(form, inputs));
    form.addEventListener("submit", (e) => submitForm(inputs, e));

    inputs.forEach((input) => {
      // Evento input
      input.addEventListener("input", inputChange);
    });
  }
}

function inputChange() {
  const input = this;
  validateInput(input);
}

function validateInput(input) {
  const value = input.value;
  const errorEl = input
    .closest("[data-formgroup]")
    .querySelector("[data-formerror]");

  let error = null;

  // Ver si el campo tiene el atributo data-required y si está vacío (solo si no es radio o checkbox)
  if (
    (input.type !== "radio" || input.type !== "checkbox") &&
    input.dataset.required !== undefined &&
    value === ""
  ) {
    error = input.dataset.requiredMessage
      ? input.dataset.requiredMessage
      : "Complete este campo por favor";
    input.classList.add("error");
  }

  // Para el caso de radios
  if (input.type === "radio") {
    const radios = input
      .closest("[data-formgroup]")
      .querySelectorAll('input[type="radio"]');
    let isChecked = false;
    let errorMsg = "";
    // Ver si algún radio button está chequeado
    radios.forEach((radio) => {
      if (radio.checked) {
        isChecked = true;
      }
      if (radio.dataset.errorMessage) {
        errorMsg = input.dataset.errorMessage;
      }
    });
    if (!isChecked) {
      error = errorMsg !== "" ? errorMsg : "Seleccione una opción por favor";
    }
  }

  // Ver la longitud mínima
  if (
    !error &&
    input.dataset.minlength !== undefined &&
    value.length < +input.dataset.minlength
  ) {
    error = input.dataset.minlengthMessage
      ? input.dataset.minlengthMessage
      : `Por favor, escriba ${input.dataset.minlength} caracteres como mínimo`;
    input.classList.add("error");
  }

  // Ver la longitud máxima
  if (
    !error &&
    input.dataset.maxlength !== undefined &&
    value.length > +input.dataset.maxlength
  ) {
    error = input.dataset.maxlengthMessage
      ? input.dataset.maxlengthMessage
      : `Por favor, escriba ${input.dataset.maxlength} caracteres como máximo`;
    input.classList.add("error");
  }

  //Validar numéricos
  if (
    !error &&
    (input.dataset.numeric !== undefined ||
      input.dataset.positive !== undefined ||
      input.dataset.minvalue !== undefined ||
      input.dataset.maxvalue !== undefined) &&
    isNaN(value)
  ) {
    error = "El valor no es un número válido";
    input.classList.add("error");
  } else if (
    !error &&
    input.dataset.positive !== undefined &&
    Number(value) <= 0
  ) {
    error = "El valor debe ser mayor a cero";
    input.classList.add("error");
  } else if (
    !error &&
    input.dataset.minvalue !== undefined &&
    Number(value) < +input.dataset.minvalue
  ) {
    error = `El valor debe ser mayor a ${input.dataset.minvalue}`;
    input.classList.add("error");
  } else if (
    !error &&
    input.dataset.maxvalue !== undefined &&
    Number(value) > +input.dataset.maxvalue
  ) {
    error = `El valor debe ser menor a ${input.dataset.maxvalue}`;
    input.classList.add("error");
  }

  //Validar rango de valores
  // Ver si el campo tiene el atributo data-range*
  if (
    input.dataset.rangefrom !== undefined ||
    input.dataset.rangeto !== undefined
  ) {
    // Obtener los inputs indicados por el atributo data-rangefrom y data-rangeto
    const inputFrom = input
      .closest("[data-form]")
      .querySelector(`[name="${input.dataset.rangefrom}"]`);

    const inputFromError = inputFrom
      .closest("[data-formgroup]")
      .querySelector("[data-formerror]");

    const inputTo = input
      .closest("[data-form]")
      .querySelector(`[name="${input.dataset.rangeto}"]`);

    const inputToError = inputTo
      .closest("[data-formgroup]")
      .querySelector("[data-formerror]");

    //Si alguno de los campos tiene valor, validar el rango
    if (inputFrom.value !== "" || inputTo.value !== "") {
      // Si los valores forman un rango válido, quitar el error
      if (Number(inputFrom.value) <= Number(inputTo.value)) {
        inputFrom.classList.remove("error");
        inputFromError.style.display = "none";
        inputTo.classList.remove("error");
        inputToError.style.display = "none";
      } else {
        /*inputFrom.classList.add("error");
        inputFromError.style.display = "block";
        inputTo.classList.add("error");
        inputToError.style.display = "block";*/

        error = inputFrom.dataset.rangeerrormessage || "El valor es incorrecto";
      }
    }
  }

  // Validar mail
  if (!error && input.dataset.email !== undefined && !validateEmail(value)) {
    error = input.dataset.emailerrormessage
      ? input.dataset.emailerrormessage
      : "Dirección de email incorrecta";
    input.classList.add("error");
  }

  // Para los input tipo file, validar maxfilesize
  if (
    !error &&
    input.type === "file" &&
    input.dataset.maxfilesize !== undefined &&
    input.files[0].size > +input.dataset.maxfilesize
  ) {
    error = input.dataset.maxfilesizeMessage
      ? input.dataset.maxfilesizeMessage
      : "El archivo es muy grande. Por favor elija uno más pequeño";
    input.classList.add("error");
  }
  // Para los input tipo file, validar tipos de archivo
  if (
    !error &&
    input.type === "file" &&
    input.dataset.allowedTypes !== undefined &&
    !input.dataset.allowedTypes.includes(input.files[0].type.split("/")[1])
  ) {
    error = input.dataset.allowedTypesMessage
      ? input.dataset.allowedTypesMessage
      : "Tipo de archivo inválido.";
    input.classList.add("error");
  }

  // Si no hubo error, eliminar clase y mensaje
  if (!error) {
    input.classList.remove("error");
    errorEl.innerText = "";
    errorEl.style.display = "none";
  } else {
    // Mostrar el error
    errorEl.innerText = error;
    errorEl.style.display = "block";
  }
  return error;
}

function submitForm(inputs, e) {
  e.preventDefault();
  const errors = [];

  inputs.forEach((input) => {
    const error = validateInput(input);
    if (error) {
      errors.push(error);
    }
  });

  if (errors.length == 0) {
    if (e.target.dataset.submitmessage !== undefined) {
      window.alert(e.target.dataset.submitmessage);
      if (typeof procesar === "function") {
        procesar();
      }
    }
    return true;
  }

  return false;
}

// Validate email
function validateEmail(email) {
  var re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
