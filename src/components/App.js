import React from 'react';

import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import ImagePopup from './ImagePopup.js';
import api from '../utils/api.js';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState([]);
  const [cards, setCards] = React.useState([]);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
      setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
      setIsAddPlacePopupOpen(true);
  }

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

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.setCardLikeStatus(card._id, isLiked).then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    });
  }

  function handleCardDelete (card) {
    api
    .deleteCard(card._id)
    .then(() => {
      setCards(cards.filter(item => {return item._id !== card._id}))
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
  });

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header />
        <Main onEditAvatar={handleEditAvatarClick} onCardDelete={handleCardDelete} onCardLike={handleCardLike} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onCardClick={handleCardClick} cards={cards} />
        <Footer />
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
        <PopupWithForm title="Вы уверены?" name="delete" buttonText="Да" ></PopupWithForm>
        <ImagePopup card={selectedCard} onClose={closeAllPopups} isOpen={isImagePopupOpen} />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;