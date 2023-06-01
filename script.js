const profileEditButton = document.querySelector('.profile-info__edit-button');
const userProfilePopup = document.querySelector('.popup_type_user-profile');
const profilePopupCloseButton = userProfilePopup.querySelector('.popup__close-icon');
const profileName = document.querySelector('.profile-info__title');
const profileJob = document.querySelector('.profile-info__subtitle');
const profileEditNameInput = userProfilePopup.querySelector('.popup__text-input_data_name');
const profileEditJobInput = userProfilePopup.querySelector('.popup__text-input_data_profession');
const addPlacePopup = document.querySelector('.popup_type_add-place');
const addPlaceButton = document.querySelector('.profile__add-button');
const addPlacePopupCloseButton = addPlacePopup.querySelector('.popup__close-icon');
const cardCatalog = document.querySelector('.places');

profileEditNameInput.value = profileName.textContent;
profileEditJobInput.value = profileJob.textContent;

function showEditProfilePopup() {
  userProfilePopup.classList.add('popup_opened');
}

function hideEditProfilePopup() {
  userProfilePopup.classList.remove('popup_opened');
}

function showAddPlacePopup() {
  addPlacePopup.classList.add('popup_opened');
}

function hideAddPlacePopup() {
  addPlacePopup.classList.remove('popup_opened');
}

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = profileEditNameInput.value;
  profileJob.textContent = profileEditJobInput.value;
  hideEditProfilePopup();
}

function newCardSubmit(evt) {
  evt.preventDefault();
  const placeName = addPlacePopup.querySelector('.popup__text-input_data_place-name');
  const placeLink = addPlacePopup.querySelector('.popup__text-input_data_place-link');
  const cardTemplate = document.querySelector('#card-template').content;
  const newCard = cardTemplate.querySelector('.card').cloneNode(true);
  newCard.querySelector('.card__image').src = placeLink.value;
  newCard.querySelector('.card__image').alt = placeName.value;
  newCard.querySelector('.card__title').textContent = placeName.value;
  cardCatalog.prepend(newCard);
  placeLink.value = ' ';
  placeName.value = ' ';
  hideAddPlacePopup();
}

profileEditButton.addEventListener('click', showEditProfilePopup);
addPlaceButton.addEventListener('click', showAddPlacePopup);
profilePopupCloseButton.addEventListener('click', hideEditProfilePopup);
addPlacePopupCloseButton.addEventListener('click', hideAddPlacePopup);
userProfilePopup.addEventListener('submit', handleFormSubmit);
addPlacePopup.addEventListener('submit', newCardSubmit);
