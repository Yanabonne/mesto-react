import React, {useEffect} from 'react';

import editPen from '../images/edit-pen.svg';
import plusButton from '../images/plus-button.svg';
import api from '../utils/api.js';
import Card from './Card.js';

function Main({onEditAvatar, onEditProfile, onAddPlace, onCardClick}) {
    const [userName, setUserName] = React.useState('');
    const [userDescription, setuserDescription] = React.useState('');
    const [userAvatar, setuserAvatar] = React.useState('');
    const [cards, setCards] = React.useState([]);

    api.getUserInfo()
    .then((userData) => {
        setUserName(userData.name);
        setuserDescription(userData.about);
        setuserAvatar(userData.avatar);
    })
    .catch((err) => console.log(err));

    useEffect (() => {
        api.getInitialCards()
    .then((initialCards) => {
        setCards(initialCards);
    })
    .catch((err) => console.log(err));
    }, [])

    return (
        <main className="content">
        <section className="profile">
          <div className="profile__info">
            <div className="profile__avatar">
              <img className="profile__picture" src={userAvatar} alt="Фотография профиля" />
              <button type="button" className="profile__edit-avatar" onClick={onEditAvatar}>
                <img
                  className="profile__pen-edit-avatar"
                  src={editPen}
                  alt="Иконка ручки"
                />
              </button>
            </div>
            <div className="profile__personal">
              <div className="profile__name-edit">
                <h1 className="profile__name">{userName}</h1>
                <button type="button" className="profile__edit">
                  <img
                    className="profile__pen"
                    src={editPen}
                    alt="Иконка ручки"
                    onClick={onEditProfile}
                  />
                </button>
              </div>
              <p className="profile__description">{userDescription}</p>
            </div>
          </div>
          <button type="button" className="profile__add-button">
            <img
              className="profile__plus"
              src={plusButton}
              alt="Иконка плюса"
              onClick={onAddPlace}
            />
          </button>
        </section>
        <section
          className="photo-grid"
          aria-label="Секция с фотографиями"
        >
            {cards.reverse().map(card => (
                <Card card={card} key={card._id} onCardClick={onCardClick} />
            ))}
        </section>
      </main>
    );
}
  
export default Main;