import './pages/index.css';
import { enableValidation } from "./components/validate.js"
import { openPopup, closePopup } from "./components/modal.js";
import { createCard } from "./components/card.js"
import { getUserProfile, getCards, editProfile, postCard, changeAvatarOnServer } from "./components/api.js"

//Поменять выбор всех форм через document.forms
const profileEditButton = document.querySelector('.profile-info__edit-button');
const userProfilePopup = document.querySelector('.popup_type_user-profile');
const userProfileForm = document.forms.userProfileForm;
const changeAvatarForm = document.forms.changeAvatarForm;
const addPlaceForm = document.forms.addPlaceForm;
const profileName = document.querySelector('.profile-info__title');
const profileJob = document.querySelector('.profile-info__subtitle');
const profileEditNameInput = userProfileForm.name;
const profileEditJobInput = userProfileForm.profession;
const addPlacePopup = document.querySelector('.popup_type_add-place');
const addPlaceButton = document.querySelector('.profile__add-button');
const cardCatalog = document.querySelector('.places');
const placeName = addPlaceForm.elements.placeName;
const placeLink = addPlaceForm.elements.placePicture;
const profile = document.querySelector('.profile');
const profileAvatarPlace = profile.querySelector('.profile__avatar-place');
const changeAvatarPopup = document.querySelector('.popup_type_change-avatar');
const profileAvatar = document.querySelector('.profile__avatar');
const profileAvatarEditLinkInput = changeAvatarForm.elements.avatarLink;
const submitAvatar = changeAvatarForm.querySelector('.popup__submit-button');
const submitUserInfo = userProfileForm.querySelector('.popup__submit-button');
const submitNewCard = addPlaceForm.querySelector('.popup__submit-button');
export let userId;

function renderCard(object) {
  cardCatalog.prepend(createCard(object));
};

getCards()
  .then((cardsData) => {
    const reversedArr = cardsData.reverse();
    reversedArr.forEach((item) => {
      renderCard(item);
    })
  })
  .catch((err) => console.error(err))

getUserProfile()
  .then((userInfo) => {
    profileName.textContent = userInfo.name;
    profileJob.textContent = userInfo.about;
    profileAvatar.src = userInfo.avatar;
    userId = userInfo._id;
  })
  .catch((err) => console.error(err));

profileEditButton.addEventListener('click', function () {
  openPopup(userProfilePopup);
  profileEditNameInput.value = profileName.textContent;
  profileEditJobInput.value = profileJob.textContent;
});

addPlaceButton.addEventListener('click', function () {
  openPopup(addPlacePopup);
});

profileAvatarPlace.addEventListener('click', function () {
  profileAvatarEditLinkInput.value = profileAvatar.src;
  openPopup(changeAvatarPopup);
});

document.querySelectorAll('.popup').forEach((popup) => {
  popup.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-icon')) {
      closePopup(popup);
    }
  });
});

function handleUserProfileFormSubmit(evt) {
  evt.preventDefault();
  submitUserInfo.textContent = 'Сохранение...';
  profileName.textContent = profileEditNameInput.value;
  profileJob.textContent = profileEditJobInput.value;
  editProfile({ name: profileEditNameInput.value, about: profileEditJobInput.value })
    .then((userInfo) => {
      profileName.textContent = userInfo.name;
      profileJob.textContent = userInfo.about;
    })
    .catch((err) => console.log(err))
    .finally(() => {
      submitUserInfo.textContent = 'Сохранить';
    });
  closePopup(userProfilePopup);
};

function handleNewCardFormSubmit(evt) {
  evt.preventDefault();
  submitNewCard.textContent = 'Сохранение...';
  postCard({ name: placeName.value, link: placeLink.value })
    .then((object) => {
      renderCard(object);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      submitNewCard.textContent = 'Сохранить';
    });

  addPlaceForm.reset();
  closePopup(addPlacePopup);
  addPlaceForm.querySelector('.popup__submit-button').classList.add('popup__submit-button_disabled');
  addPlaceForm.querySelector('.popup__submit-button').setAttribute('disabled', '');
};

function handleChangeAvatarSubmit(evt) {
  evt.preventDefault();
  submitAvatar.textContent = 'Сохранение...';
  console.log(profileAvatarEditLinkInput.value);
  changeAvatarOnServer({ avatar: profileAvatarEditLinkInput.value })
    .then(() => {
      getUserProfile()
        .then((userInfo) => {
          profileAvatar.src = userInfo.avatar;
        })
        .catch((err) => {
          console.error(err)
        });
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      submitAvatar.textContent = 'Сохранить';
    });

  changeAvatarForm.reset();
  closePopup(changeAvatarPopup);
  changeAvatarForm.querySelector('.popup__submit-button').classList.add('popup__submit-button_disabled');
  changeAvatarForm.querySelector('.popup__submit-button').setAttribute('disabled', '');
}

changeAvatarForm.addEventListener('submit', handleChangeAvatarSubmit);
userProfileForm.addEventListener('submit', handleUserProfileFormSubmit);
addPlaceForm.addEventListener('submit', handleNewCardFormSubmit);

enableValidation({
  formSelector: '.popup__input-form',
  inputSelector: '.popup__text-input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__text-input_type_error',
  errorClass: 'popup__text-input-error'
});

export { profileName, profileJob, renderCard, profileEditNameInput, profileEditJobInput, userProfilePopup, addPlacePopup };








