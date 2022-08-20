export default class FormValidator {
  constructor(formElement, settings) {
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
    this._formElement = formElement;
  }
  _showInputError(element, errorMessage) {
    const errorElement = this._formElement.querySelector(
      `.${element.id}-input-error`
    );
    element.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }
  _hideInputError(element) {
    const errorElement = this._formElement.querySelector(
      `.${element.id}-input-error`
    );
    element.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  }

  _hasInvalidInput() {
    //this._inputList.some((element) => !element.validity.valid);
    return [...this._inputList].some((element) => !element.validity.valid);
  }

  _toggleInputError(element) {
    if (!element.validity.valid) {
      this._showInputError(element, element.validationMessage);
    } else {
      this._hideInputError(element);
    }
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.disabled = true;
    } else {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.disabled = false;
    }
  }

  _setEventListeners() {
    this._inputList = [
      ...this._formElement.querySelectorAll(this._inputSelector),
    ];
    this._buttonElement = this._formElement.querySelector(
      this._submitButtonSelector
    );
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._toggleInputError(inputElement);
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    console.log(this._formElement);
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }
  resetValidation() {
    this._inputList.forEach((element) => {
      this._hideInputError(element);
    });

    this._toggleButtonState();
  }
}
