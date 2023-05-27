const profileEditButton = document.querySelector('.profile-info__edit-button');
const profileEditPopup = document.querySelector('.edit-profile-popup');
const profilePopupCloseButton = profileEditPopup.querySelector('.popup__close-icon');
const profileName = document.querySelector('.profile-info__title');
const profileJob = document.querySelector('.profile-info__subtitle');
const profileEditNameInput = profileEditPopup.querySelector('.popup__text-input_data_name');
const profileEditJobInput = profileEditPopup.querySelector('.popup__text-input_data_profession');
const addPlacePopup = document.querySelector('.add-place-popup');
const addPlaceButton = document.querySelector('.profile__add-button');
const addPlacePopupCloseButton = addPlacePopup.querySelector('.popup__close-icon');

profileEditNameInput.value = profileName.textContent;
profileEditJobInput.value = profileJob.textContent;

function showEditProfilePopup() {
  profileEditPopup.classList.add('popup_opened');
}

function hideEditProfilePopup() {
  profileEditPopup.classList.remove('popup_opened');
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

profileEditButton.addEventListener('click', showEditProfilePopup);
addPlaceButton.addEventListener('click', showAddPlacePopup);
profilePopupCloseButton.addEventListener('click', hideEditProfilePopup);
addPlacePopupCloseButton.addEventListener('click', hideAddPlacePopup);
profileEditPopup.addEventListener('submit', handleFormSubmit);
