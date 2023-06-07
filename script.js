const profileEditButton = document.querySelector('.profile-info__edit-button');
const userProfilePopup = document.querySelector('.popup_type_user-profile');
const profileName = document.querySelector('.profile-info__title');
const profileJob = document.querySelector('.profile-info__subtitle');
const profileEditNameInput = userProfilePopup.querySelector('.popup__text-input_data_name');
const profileEditJobInput = userProfilePopup.querySelector('.popup__text-input_data_profession');
const addPlacePopup = document.querySelector('.popup_type_add-place');
const addPlaceButton = document.querySelector('.profile__add-button');
const cardCatalog = document.querySelector('.places');
const likeButton = cardCatalog.querySelectorAll('.card__like-button');
const trashButton = cardCatalog.querySelectorAll('.card__trash-button');
const cardImagePopup = document.querySelector('.popup_type_card-image');
const cardTemplate = document.querySelector('#card-template').content;
const popupImageCaption = cardImagePopup.querySelector('.popup__image-caption');
const cardImageForPopup = cardImagePopup.querySelector('.popup__card-image');
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

function createCard(object) {
  const newCard = cardTemplate.querySelector('.card').cloneNode(true);
  const newCardImage = newCard.querySelector('.card__image');
  newCardImage.src = object.link;
    newCardImage.alt = object.name;
    newCardImage.addEventListener('click', function (evt) {
      openPopup(cardImagePopup);
      cardImageForPopup.src = evt.target.src;
      const parentCard = evt.target.closest('.card');
      const imageCaption = parentCard.querySelector('.card__title');
      popupImageCaption.textContent = imageCaption.textContent;
      cardImageForPopup.alt = imageCaption.textContent;
    })
    newCard.querySelector('.card__title').textContent = object.name;
    newCard.querySelector('.card__like-button').addEventListener('click', function (evt) {
      evt.target.classList.toggle('card__like-button_active');
    });
    newCard.querySelector('.card__trash-button').addEventListener('click', function (evt) {
      evt.target.closest('.card').remove();
    });
  return newCard;
};

function renderCard(object) {
    cardCatalog.prepend(createCard(object));
};

initialCards.forEach(function (item) {
  renderCard(item);
});

function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');
};

function closePopup(popupElement) {
  popupElement.classList.remove('popup_opened');
};

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = profileEditNameInput.value;
  profileJob.textContent = profileEditJobInput.value;
  closePopup(userProfilePopup);
};

function newCardSubmit(evt) {
  evt.preventDefault();
  const placeName = addPlacePopup.querySelector('.popup__text-input_data_place-name');
  const placeLink = addPlacePopup.querySelector('.popup__text-input_data_place-link');
  const object = {
    name: placeName.value,
    link: placeLink.value
  };
  renderCard(object);
  placeLink.value = '';
  placeName.value = '';
  closePopup(addPlacePopup);
};

profileEditButton.addEventListener('click', function () {
  openPopup(userProfilePopup);
  profileEditNameInput.value = profileName.textContent;
  profileEditJobInput.value = profileJob.textContent;
});

addPlaceButton.addEventListener('click', function () {
  openPopup(addPlacePopup);
});

document.querySelectorAll('.popup__close-icon').forEach(button => {
  const buttonsPopup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(buttonsPopup));
});

userProfilePopup.addEventListener('submit', handleFormSubmit);
addPlacePopup.addEventListener('submit', newCardSubmit);




