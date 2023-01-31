import React from 'react';

import editPen from '../images/edit-pen.svg';
import plusButton from '../images/plus-button.svg';
import Card from './Card.js';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function Main({onEditAvatar, onEditProfile, onAddPlace, onCardClick, cards, onCardLike, onCardDelete}) {
    const currentUser = React.useContext(CurrentUserContext);

    return (
        <main className="content">
        <section className="profile">
          <div className="profile__info">
            <div className="profile__avatar">
              <img className="profile__picture" src={currentUser.avatar} alt="Фотография профиля" />
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
                <h1 className="profile__name">{currentUser.name}</h1>
                <button type="button" className="profile__edit">
                  <img
                    className="profile__pen"
                    src={editPen}
                    alt="Иконка ручки"
                    onClick={onEditProfile}
                  />
                </button>
              </div>
              <p className="profile__description">{currentUser.about}</p>
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
                <Card card={card} key={card._id} onCardDelete={onCardDelete} onCardClick={onCardClick} onCardLike={onCardLike} />
            ))}
        </section>
      </main>
    );
}
  
export default Main;