import React from 'react';
import PopupWithForm from './PopupWithForm.js';

function ConfirmCardDeletePopup({isOpen, onClose, onDeleteCard}) {
    function handleSubmit(e) {
        e.preventDefault();

        onDeleteCard();
    };

    return (
        <PopupWithForm title="Вы уверены?" name="delete" buttonText="Да" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} >
        </PopupWithForm>
    );
}

export default ConfirmCardDeletePopup;