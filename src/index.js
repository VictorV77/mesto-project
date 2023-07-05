import './pages/index.css';
import { enableValidation } from "./components/validate.js"
import { openPopup, closePopup } from "./components/modal.js";
import { createCard, handleUserProfileFormSubmit, handleNewCardFormSubmit, } from "./components/card.js"

//Поменять выбор всех форм через document.forms
const profileEditButton = document.querySelector('.profile-info__edit-button');
const userProfilePopup = document.querySelector('.popup_type_user-profile');
const userProfileForm = document.forms.userProfileForm;
const profileName = document.querySelector('.profile-info__title');
const profileJob = document.querySelector('.profile-info__subtitle');
const profileEditNameInput = userProfileForm.name;
const profileEditJobInput = userProfileForm.profession;
const addPlacePopup = document.querySelector('.popup_type_add-place');
const addPlaceButton = document.querySelector('.profile__add-button');
const cardCatalog = document.querySelector('.places');

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];


function renderCard(object) {
  cardCatalog.prepend(createCard(object));
};

initialCards.forEach(function (item) {
  renderCard(item);
});

profileEditButton.addEventListener('click', function () {
  openPopup(userProfilePopup);
  profileEditNameInput.value = profileName.textContent;
  profileEditJobInput.value = profileJob.textContent;
});

addPlaceButton.addEventListener('click', function () {
  openPopup(addPlacePopup);
});

document.querySelectorAll('.popup').forEach((popup) => {
  popup.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-icon')) {
      closePopup(popup);
    }
  });
});

userProfilePopup.addEventListener('submit', handleUserProfileFormSubmit);
addPlacePopup.addEventListener('submit', handleNewCardFormSubmit);

enableValidation();

export { profileName, profileJob, renderCard, profileEditNameInput, profileEditJobInput, userProfilePopup, addPlacePopup };








