import React from 'react';

import likeButton from '../images/like-button.svg';

function Card({onCardClick, card}) {
    function handleClick() {
        onCardClick(card);
      }  

  return (
    <article className="photo-grid__item">
          <button type="button" className="photo-grid__trash-button"></button>
          <img className="photo-grid__picture" src={card.link} alt={card.name} onClick={handleClick} />
          <div className="photo-grid__info">
            <h2 className="photo-grid__title">{card.name}</h2>
            <div className="photo-grid__likes">
              <button type="button" className="photo-grid__button">
                <img
                  className="photo-grid__like"
                  src={likeButton}
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