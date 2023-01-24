import closeButton from '../images/close.svg';

function PopupWithForm(props) {
  return (
      <div className={`${props.isOpen ? "popup popup_opened" : "popup"}`} id={`popup-${props.name}`}>
        <div className="popup__container">
          <button type="button" className="popup__close" onClick={props.onClose} >
            <img
              src={closeButton}
              className="popup__cross"
              alt="Крестик"
            />
          </button>
          <form className="form" id="form-delete" name={`${props.name}`}>
            <h2 className="form__title form__title_delete">{`${props.title}`}</h2>
            {props.children};
            <button type="button" className="form__submit">{`${props.buttonText}`}</button>
          </form>
        </div>
      </div>
  );
}

export default PopupWithForm;