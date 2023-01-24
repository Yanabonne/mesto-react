export const validationObject = {
  inputSelector: ".form__text",
  submitButtonSelector: ".form__submit",
  inactiveButtonClass: "form__submit_inactive",
  inputErrorClass: "form__text_type_error",
};

export const penButton = document.querySelector(".profile__edit");
export const popupProfile = document.querySelector("#popup-profile");
export const popupName = popupProfile.querySelector("#popup-name");
export const popupDescription =
  popupProfile.querySelector("#popup-description");
export const popupFormProfile = popupProfile.querySelector(".form");

export const plusButton = document.querySelector(".profile__add-button");
export const popupMesto = document.querySelector("#popup-mesto");
export const popupMestoForm = popupMesto.querySelector(".form");

export const popupProfileImage = document.querySelector("#popup-profile-image");
export const penButtonProfileImage = document.querySelector(
  ".profile__edit-avatar"
);
