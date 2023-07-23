import { openPopup } from "./modal.js";
import { userId, renderCard } from "../index.js";
import { deleteCardFromServer, giveLike, deleteLike, getCards } from "./api.js";
import { closest } from "fastest-levenshtein";

const cardTemplate = document.querySelector('#card-template').content;
const cardImagePopup = document.querySelector('.popup_type_card-image');
const popupImageCaption = cardImagePopup.querySelector('.popup__image-caption');
const cardImageForPopup = cardImagePopup.querySelector('.popup__card-image');
const addPlaceForm = document.forms.addPlaceForm;

function createCard(object) {
  const newCard = cardTemplate.querySelector('.card').cloneNode(true);
  const newCardImage = newCard.querySelector('.card__image');
  const newCardTrashButton = newCard.querySelector('.card__trash-button');
  const cardLikeButton = newCard.querySelector('.card__like-button');
  const newCardTitle = newCard.querySelector('.card__title');
  const cardLikes = newCard.querySelector('.card__like-number');

  newCardImage.src = object.link;
  newCardImage.alt = object.name;
  newCardTitle.textContent = object.name;
  newCard.id = object._id;
  newCardImage.addEventListener('click', function (evt) {
    openPopup(cardImagePopup);
    cardImageForPopup.src = object.link;
    popupImageCaption.textContent = object.name;
    cardImageForPopup.alt = object.name;
  });
  newCardTrashButton.addEventListener('click', deleteCard);
  cardLikeButton.addEventListener('click', toggleCardLike);

  showDeleteButton(newCardTrashButton, object);
  showLikes(cardLikes, object);
  showMyLikes(cardLikeButton, object);

  return newCard;
};

function showDeleteButton(trashButton, object) {
  if (object.owner._id !== userId) {
    trashButton.classList.add('card__trash-button_inactive');
  }
}

function showLikes(cardLikes, object) {
  cardLikes.textContent = object.likes.length;
};

function showMyLikes(likeButton, object) {
  if (object.likes.some(item => item._id === userId)) {
    likeButton.classList.add('card__like-button_active');
  };
};

function deleteCard(evt) {
  const cardForDelete = evt.target.closest('.card');
  const idCardForDelete = cardForDelete.getAttribute('id');
  deleteCardFromServer(idCardForDelete)
  .then(() => {
    cardForDelete.remove();
  })
  .catch((err) => console.error(err))
}

function toggleCardLike(evt) {
  const cardForLike = evt.target.closest('.card');
  const cardIdForLike = cardForLike.getAttribute('id');
  const likeNumbers = cardForLike.querySelector('.card__like-number');
  if (evt.target.classList.contains('card__like-button_active')) {
    deleteLike(cardIdForLike)
    .then((object) => {
      evt.target.classList.remove('card__like-button_active');
      showLikes(likeNumbers, object);
    })
    .catch((err) => console.error(err))
  } else {
    giveLike(cardIdForLike)
    .then((object) => {
      evt.target.classList.add('card__like-button_active');
      showLikes(likeNumbers, object);
    })
    .catch((err) => console.error(err))
  }
}

export { createCard };
