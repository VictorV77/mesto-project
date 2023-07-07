const showInputError = (formElement, inputElement, errorMessage, validationObject) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(validationObject.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(`${validationObject.errorClass}_active`);
};

const hideInputError = (formElement, inputElement, validationObject) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validationObject.inputErrorClass);
  errorElement.textContent = "";
  errorElement.classList.remove(`${validationObject.errorClass}_active`);
};

const checkInputValidity = (formElement, inputElement, validationObject) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  };

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, validationObject);
  } else {
    hideInputError(formElement, inputElement, validationObject);
  }
}

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

const toggleButtonState = (inputList, buttonElement, validationObject) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(validationObject.inactiveButtonClass);
    buttonElement.setAttribute('disabled', '');
  } else {
    buttonElement.classList.remove(validationObject.inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  };
};

const setEventListeners = (formElement, validationObject) => {
  const inputList = Array.from(formElement.querySelectorAll(validationObject.inputSelector));
  const buttonElement = formElement.querySelector(validationObject.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, validationObject);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, validationObject);
      toggleButtonState(inputList, buttonElement, validationObject);
    });
  });
};

export function enableValidation(validationObject) {
  const formList = Array.from(document.forms);
  formList.forEach((formElement) => {
    setEventListeners(formElement, validationObject);
  });
};


