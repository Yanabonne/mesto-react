import closeButton from '../images/close.svg';

function ImagePopup({isOpen, onClose, card}) {
  return (
    <div id="popup_picture" className={`${isOpen ? "popup popup_picture popup_opened" : "popup popup_picture"}`}>
        <figure className="popup__figure">
          <button type="button" className="popup__close" onClick={onClose}>
            <img
              src={closeButton}
              className="popup__cross"
              alt="Крестик"
            />
          </button>
          <img src={card.link} alt="" className="popup__photo" />
          <figcaption className="popup__figcaption">{card.name}</figcaption>
        </figure>
      </div>
  );
}

export default ImagePopup;