import closeButton from '../images/close.svg';

function PopupWithForm({isOpen, name, onClose, title, children, buttonText, onSubmit}) {
  return (
      <div className={`${isOpen ? "popup popup_opened" : "popup"}`} id={`popup-${name}`}>
        <div className="popup__container">
          <button type="button" className="popup__close" onClick={onClose} >
            <img
              src={closeButton}
              className="popup__cross"
              alt="Крестик"
            />
          </button>
          <form className="form" id={`form-${name}`} name={`${name}`} onSubmit={onSubmit} >
            <h2 className="form__title form__title_delete">{`${title}`}</h2>
            {children}
            <button type="submit" className="form__submit">{`${buttonText}`}</button>
          </form>
        </div>
      </div>
  );
}

export default PopupWithForm;