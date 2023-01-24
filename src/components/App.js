import React from 'react';

import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  };
  function handleEditProfileClick() {
      setIsEditProfilePopupOpen(true);
  };
  function handleAddPlaceClick() {
      setIsAddPlacePopupOpen(true);
  };

  function closeAllPopups() {
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }

  return (
    <div className="page">
      <Header />
      <Main onEditAvatar={handleEditAvatarClick} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onCardClick={handleCardClick} />
      <Footer />
      <PopupWithForm title="Редактировать профиль" name="profile" buttonText="Сохранить" isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} >
        <input
              type="text"
              className="form__text"
              id="popup-name"
              name="name"
              required
              minlength="2"
              maxlength="40"
              value="Жак-Ив Кусто"
              placeholder="Имя"
            />
            <span className="form__input-error popup-name-error"></span>
            <input
              type="text"
              className="form__text"
              id="popup-description"
              name="description"
              required
              minlength="2"
              maxlength="200"
              value="Исследователь океана"
              placeholder="О себе"
            />
            <span className="form__input-error popup-description-error"></span>
      </PopupWithForm>
      <PopupWithForm title="Новое место" name="mesto" buttonText="Создать" isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} >
        <input
              type="text"
              className="form__text"
              id="popup-mesto-name"
              name="mesto"
              placeholder="Название"
              required
              minlength="2"
              maxlength="30"
            />
            <span className="form__input-error popup-mesto-name-error"></span>
            <input
              type="url"
              className="form__text"
              id="popup-link"
              name="link"
              placeholder="Ссылка на картинку"
              required
            />
            <span className="form__input-error popup-link-error"></span>
      </PopupWithForm>
      <PopupWithForm title="Обновить аватар" name="profile-image" buttonText="Сохранить" isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} >
        <input
              type="text"
              className="form__text"
              id="popup-mesto-name"
              name="mesto"
              placeholder="Название"
              required
              minlength="2"
              maxlength="30"
            />
            <span className="form__input-error popup-mesto-name-error"></span>
            <input
              type="url"
              className="form__text"
              id="popup-link"
              name="link"
              placeholder="Ссылка на картинку"
              required
            />
            <span className="form__input-error popup-link-error"></span>
      </PopupWithForm>
      <PopupWithForm title="Вы уверены?" name="delete" buttonText="Да" ></PopupWithForm>
      <ImagePopup card={selectedCard} onClose={closeAllPopups} isOpen={isImagePopupOpen} />
    </div>
  );
}

export default App;