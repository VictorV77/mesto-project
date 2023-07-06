import { openPopup, closePopup } from "./modal.js";
import { profileName, profileJob, renderCard, profileEditNameInput, profileEditJobInput, userProfilePopup, addPlacePopup } from "../index.js";

const cardTemplate = document.querySelector('#card-template').content;
const cardImagePopup = document.querySelector('.popup_type_card-image');
const popupImageCaption = cardImagePopup.querySelector('.popup__image-caption');
const cardImageForPopup = cardImagePopup.querySelector('.popup__card-image');
const addPlaceForm = document.forms.addPlaceForm;

function createCard(object) {
    const newCard = cardTemplate.querySelector('.card').cloneNode(true);
    const newCardImage = newCard.querySelector('.card__image');
    newCardImage.src = object.link;
    newCardImage.alt = object.name;
    newCardImage.addEventListener('click', function (evt) {
        openPopup(cardImagePopup);
        cardImageForPopup.src = object.link;
        popupImageCaption.textContent = object.name;
        cardImageForPopup.alt = object.name;
    });
    newCard.querySelector('.card__title').textContent = object.name;
    newCard.querySelector('.card__like-button').addEventListener('click', function (evt) {
        evt.target.classList.toggle('card__like-button_active');
    });
    newCard.querySelector('.card__trash-button').addEventListener('click', function (evt) {
        evt.target.closest('.card').remove();
    });
    return newCard;
};

export { createCard }

