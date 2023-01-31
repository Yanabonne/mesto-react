import React from 'react';
import PopupWithForm from './PopupWithForm.js';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function EditProfilePopup({isOpen, onClose, onUpdateUser}) {
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const currentUser = React.useContext(CurrentUserContext);

    function handleNameChange(e) {
        setName(e.target.value);
    };

    function handleDescriptionChange(e) {
        setDescription(e.target.value);
    };

    function handleSubmit(e) {
        e.preventDefault();

        onUpdateUser({
            name,
            about: description,
        });
    };

    React.useEffect(() => {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }, [currentUser, isOpen]); 

    return (
        <PopupWithForm title="Редактировать профиль" name="profile" buttonText="Сохранить" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} >
        <input
            type="text"
            className="form__text"
            id="popup-name"
            name="name"
            required
            minLength="2"
            maxLength="40"
            value={name || ''}
            placeholder="Имя"
            onChange={handleNameChange}
            />
            <span className="form__input-error popup-name-error"></span>
            <input
            type="text"
            className="form__text"
            id="popup-description"
            name="description"
            required
            minLength="2"
            maxLength="200"
            value={description || ''}
            placeholder="О себе"
            onChange={handleDescriptionChange}
            />
            <span className="form__input-error popup-description-error"></span>
        </PopupWithForm>
    );
}

export default EditProfilePopup;