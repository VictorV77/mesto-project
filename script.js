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
const likeButton = cardCatalog.querySelectorAll('.card__like-button');
const trashButton = cardCatalog.querySelectorAll('.card__trash-button');
const cardImagePopup = document.querySelector('.popup_type_card-image');
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

profileEditNameInput.value = profileName.textContent;
profileEditJobInput.value = profileJob.textContent;

function showCardsFromArray() {
  initialCards.forEach(function (item) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardFromArray = cardTemplate.querySelector('.card').cloneNode(true);
    cardFromArray.querySelector('.card__image').src = item.link;
    cardFromArray.querySelector('.card__image').alt = item.name;
    cardFromArray.querySelector('.card__image').addEventListener('click', function (evt) {
      openPopup(cardImagePopup);
      cardImagePopup.querySelector('.popup__card-image').src = evt.target.src;
      const parentCard = evt.target.closest('.card');
      const imageCaption = parentCard.querySelector('.card__title');
      cardImagePopup.querySelector('.popup__image-caption').textContent = imageCaption.textContent;
      cardImagePopup.querySelector('.popup__card-image').alt = imageCaption.textContent;
    })
    cardFromArray.querySelector('.card__title').textContent = item.name;
    cardFromArray.querySelector('.card__like-button').addEventListener('click', function (evt) {
      evt.target.classList.toggle('card__like-button_active');
    });
    cardFromArray.querySelector('.card__trash-button').addEventListener('click', function (evt) {
      evt.target.closest('.card').remove();
    });
    cardCatalog.prepend(cardFromArray);
  });
};

showCardsFromArray();

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
  const cardTemplate = document.querySelector('#card-template').content;
  const newCard = cardTemplate.querySelector('.card').cloneNode(true);
  newCard.querySelector('.card__image').src = placeLink.value;
  newCard.querySelector('.card__image').alt = placeName.value;
  newCard.querySelector('.card__title').textContent = placeName.value;
  newCard.querySelector('.card__like-button').addEventListener('click', function (evt) {
    evt.target.classList.toggle('card__like-button_active');
  });
  newCard.querySelector('.card__trash-button').addEventListener('click', function (evt) {
    evt.target.closest('.card').remove();
  });
  cardCatalog.prepend(newCard);
  placeLink.value = ' ';
  placeName.value = ' ';
  closePopup(addPlacePopup);
};


profileEditButton.addEventListener('click', function () {
  openPopup(userProfilePopup);
});

profilePopupCloseButton.addEventListener('click', function () {
  closePopup(userProfilePopup);
});

addPlaceButton.addEventListener('click', function () {
  openPopup(addPlacePopup);
});

addPlacePopupCloseButton.addEventListener('click', function () {
  closePopup(addPlacePopup);
});

cardImagePopup.addEventListener('click', function () {
  closePopup(cardImagePopup);
});



userProfilePopup.addEventListener('submit', handleFormSubmit);
addPlacePopup.addEventListener('submit', newCardSubmit);




