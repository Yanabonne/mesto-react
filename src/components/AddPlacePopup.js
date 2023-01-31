import React from 'react';
import PopupWithForm from './PopupWithForm.js';

function AddPlacePopup({isOpen, onClose, onAddPlace}) {
    const nameRef = React.useRef(); 
    const linkRef = React.useRef(); 

    function handleSubmit(e) {
        e.preventDefault();
        
        onAddPlace({
            name: nameRef.current.value,
            link: linkRef.current.value
        });
    }

    return (
        <PopupWithForm title="Новое место" name="mesto" buttonText="Создать" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} >
          <input
                type="text"
                className="form__text"
                id="popup-mesto-name"
                name="mesto"
                placeholder="Название"
                required
                minLength="2"
                maxLength="30"
                ref={nameRef}
              />
              <span className="form__input-error popup-mesto-name-error"></span>
              <input
                type="url"
                className="form__text"
                id="popup-link"
                name="link"
                placeholder="Ссылка на картинку"
                required
                ref={linkRef}
              />
              <span className="form__input-error popup-link-error"></span>
        </PopupWithForm>
    );
}

export default AddPlacePopup;