const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-26',
  headers: {
    authorization: '9028b20a-a71b-4ce0-91dc-58985eb8302b',
    'Content-type': 'application/json'
  }
}

function getResponseData(res) {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Ошибка ${res.status}`);
  };
}

function getUserProfile() {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
    .then(getResponseData)
}

function getCards() {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
    .then(getResponseData)
}

function editProfile(userInfo) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify(userInfo)
  })
    .then(getResponseData)
};

function postCard(cardInfo) {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify(cardInfo)
  })
  .then(getResponseData)
};

function deleteCardFromServer(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: `DELETE`,
    headers: config.headers,
  })
  .then(getResponseData)
};

function giveLike(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers,
  })
  .then(getResponseData)
};

function deleteLike(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  })
  .then(getResponseData)
};

function changeAvatarOnServer(avatar) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify(avatar)
  })
    .then(getResponseData)
};

export{ getUserProfile, getCards, editProfile, postCard, deleteCardFromServer, giveLike, deleteLike, changeAvatarOnServer };
