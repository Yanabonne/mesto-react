import React from 'react';

import likeButton from '../images/like-button.svg';
import likeButtonBlack from '../images/like-button_black.svg';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function Card({onCardClick, card, onCardLike, onCardDelete}) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some(i => i._id === currentUser._id);

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }
 
  return (
    <article className="photo-grid__item">
          {isOwn && <button type="button" className="photo-grid__trash-button" onClick={handleDeleteClick} />}
          <img className="photo-grid__picture" src={card.link} alt={card.name} onClick={handleClick} />
          <div className="photo-grid__info">
            <h2 className="photo-grid__title">{card.name}</h2>
            <div className="photo-grid__likes">
              <button type="button" className="photo-grid__button" onClick={handleLikeClick}>
                <img
                  className="photo-grid__like"
                  src={isLiked ? likeButtonBlack : likeButton}
                  alt="Кнопка-сердечко"
                />
              </button>
              <p className="photo-grid__likes-count">{card.likes.length}</p>
            </div>
          </div>
        </article>
  )
}

export default Card;