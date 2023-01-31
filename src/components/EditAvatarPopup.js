import React from 'react';
import PopupWithForm from './PopupWithForm.js';

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {
    const avatarRef = React.useRef(); 

    function handleSubmit(e) {
        e.preventDefault();
      
        onUpdateAvatar(avatarRef.current.value);
    } 

    return (
        <PopupWithForm title="Обновить аватар" name="profile-image" buttonText="Сохранить" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} >
          <input
                type="url"
                className="form__text"
                id="popup-profile-link"
                name="link"
                placeholder="Ссылка на картинку"
                required
                ref={avatarRef}
          />
          <span className="form__input-error popup-profile-link-error"></span>
        </PopupWithForm>
    );
}

export default EditAvatarPopup;