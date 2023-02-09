export class FormValidator {
  constructor(settings, form) {
    this._settings = settings;
    this._form = form;
  }

  _showInputError = (_inputElement, _errorMessage) => {
    const _errorElement = this._form.querySelector(
      `.${_inputElement.id}-error`
    );
    _inputElement.classList.add(`${this._settings.inputErrorClass}`);
    _errorElement.textContent = _errorMessage;
  };

  _hideInputError = (_inputElement) => {
    const _errorElement = this._form.querySelector(
      `.${_inputElement.id}-error`
    );
    _inputElement.classList.remove(`${this._settings.inputErrorClass}`);
    _errorElement.textContent = "";
  };

  _checkInputValidity = (_inputElement) => {
    if (!_inputElement.validity.valid) {
      this._showInputError(_inputElement, _inputElement.validationMessage);
    } else {
      this._hideInputError(_inputElement);
    }
  };

  _setEventListeners = () => {
    this._inputList = Array.from(
      this._form.querySelectorAll(`${this._settings.inputSelector}`)
    );
    this._buttonElement = this._form.querySelector(
      `${this._settings.submitButtonSelector}`
    );
    this._toggleButtonState();
    this._inputList.forEach((_inputElement) => {
      _inputElement.addEventListener("input", () => {
        this._checkInputValidity(_inputElement);
        this._toggleButtonState();
      });
    });
  };

  enableValidation = () => {
    this._setEventListeners();
  };

  _hasInvalidInput() {
    return this._inputList.some((_inputElement) => {
      return !_inputElement.validity.valid;
    });
  }

  disableButton = () => {
    this._buttonElement.classList.add(this._settings.inactiveButtonClass);
    this._buttonElement.setAttribute("disabled", true);
  };

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this.disableButton();
    } else {
      this._buttonElement.classList.remove(this._settings.inactiveButtonClass);
      this._buttonElement.removeAttribute("disabled");
    }
  }
}