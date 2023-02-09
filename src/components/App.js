import React from 'react';

import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import ConfirmCardDeletePopup from './ConfirmCardDeletePopup.js';
import ImagePopup from './ImagePopup.js';
import {FormValidator} from '../utils/FormValidator.js';
import api from '../utils/api.js';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import {validationObject} from '../utils/constants.js';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState([]);
  const [cards, setCards] = React.useState([]);
  const [currentCard, setCurrentCard] = React.useState({});

  const formValidatorProfile = new FormValidator(
    validationObject,
    document.querySelector("#form-profile")
  );
  const formValidatorMesto = new FormValidator(
    validationObject, 
    document.querySelector("#form-mesto")
  );
  const formValidatorProfileImage = new FormValidator(
    validationObject,
    document.querySelector("#form-profile-image")
  );

  function handleEditAvatarClick() {
    formValidatorProfileImage.enableValidation();
    setIsEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    formValidatorProfile.enableValidation();
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    formValidatorMesto.enableValidation();
    setIsAddPlacePopupOpen(true);
  }
  function handleDeleteCardClick(card) {
    setIsConfirmationPopupOpen(true);
    setCurrentCard(card);
  }

  function closeAllPopups() {
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
    setIsConfirmationPopupOpen(false);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.setCardLikeStatus(card._id, isLiked).then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
    .catch((err) => {
      console.log(err);
    });
  }

  function handleCardDelete () {
    api
    .deleteCard(currentCard._id)
    .then(() => {
      setCards(prevCards => prevCards.filter(item => {return item._id !== currentCard._id}));
      closeAllPopups();
      setCurrentCard({});
    })
    .catch((err) => {
      console.log(err);
    });
  }

  function handleUpdateUser(data) {
    api
    .sendUserInfo(data)
    .then((res) => {
      setCurrentUser(res);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    })
  }

  function handleUpdateAvatar(url) {
    api
    .sendAvatarInfo(url)
    .then((res) => {
      setCurrentUser(res);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    })
  }

  function handleAddPlaceSubmit(data) {
    api
    .sendNewPostInfo({
      name: data.name,
      link: data.link
    })
    .then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    })
  }

  function handleClosePopup (evt) {
    if (evt.key === "Escape" || evt.target.classList.contains("popup")) {
      closeAllPopups();
    }
  }

  React.useEffect (() => {
    api.getInitialCards()
    .then((initialCards) => {
        setCards(initialCards);
    })
    .catch((err) => console.log(err));
  }, []);

  React.useEffect (() => {
    api.getUserInfo()
    .then((userData) => {
        setCurrentUser(userData);
    })
    .catch((err) => console.log(err));
  }, []);

  return (
    <div className="page" onKeyDown={handleClosePopup} onClick={handleClosePopup} >
      <CurrentUserContext.Provider value={currentUser}>
        <Header />
        <Main onEditAvatar={handleEditAvatarClick} onCardDelete={handleDeleteCardClick} onCardLike={handleCardLike} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onCardClick={handleCardClick} cards={cards} />
        <Footer />
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
        <ConfirmCardDeletePopup isOpen={isConfirmationPopupOpen} onClose={closeAllPopups} onDeleteCard={handleCardDelete} />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} isOpen={isImagePopupOpen} />
        {/* <ValidateForms /> */}
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;