const profileEditButton = document.querySelector('.profile-info__edit-button');
const userProfilePopup = document.querySelector('.popup_type_user-profile');
const profileName = document.querySelector('.profile-info__title');
const profileJob = document.querySelector('.profile-info__subtitle');
const profileEditNameInput = userProfilePopup.querySelector('.popup__text-input_data_name');
const profileEditJobInput = userProfilePopup.querySelector('.popup__text-input_data_profession');
const addPlaceForm = document.forms.addPlaceForm;
const addPlacePopup = document.querySelector('.popup_type_add-place');
const addPlaceButton = document.querySelector('.profile__add-button');
const cardCatalog = document.querySelector('.places');
const cardImagePopup = document.querySelector('.popup_type_card-image');
const cardTemplate = document.querySelector('#card-template').content;
const popupImageCaption = cardImagePopup.querySelector('.popup__image-caption');
const cardImageForPopup = cardImagePopup.querySelector('.popup__card-image');
const placeName = addPlaceForm.elements.placeName;
const placeLink = addPlaceForm.elements.placePicture;

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

function renderCard(object) {
  cardCatalog.prepend(createCard(object));
};

initialCards.forEach(function (item) {
  renderCard(item);
});

function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');
  document.addEventListener('keydown', isEscape);
};

function closePopup(popupElement) {
  popupElement.classList.remove('popup_opened');
  document.removeEventListener('keydown', isEscape);
};

function handleUserProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = profileEditNameInput.value;
  profileJob.textContent = profileEditJobInput.value;
  closePopup(userProfilePopup);
};

function handleNewCardFormSubmit(evt) {
  evt.preventDefault();
  const object = {};
  object.name = placeName.value;
  object.link = placeLink.value;
  renderCard(object);
  addPlaceForm.reset();
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

function isEscape(evt) {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  }
};

document.querySelectorAll('.popup').forEach((popup) => {
  popup.addEventListener('click', function(evt) {
    if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-icon')) {
    closePopup(popup);
    }
  });
});

userProfilePopup.addEventListener('submit', handleUserProfileFormSubmit);
addPlacePopup.addEventListener('submit', handleNewCardFormSubmit);




