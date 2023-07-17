const { Promise } = require("core-js");

function getUserProfile() {
  return fetch('https://nomoreparties.co/v1/plus-cohort-26/users/me', {
    headers: {
      authorization: '9028b20a-a71b-4ce0-91dc-58985eb8302b'
    }
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Ошибка ${res.status}`);
      };
    })
}

function getCards() {
  return fetch('https://nomoreparties.co/v1/plus-cohort-26/cards', {
    headers: {
      authorization: '9028b20a-a71b-4ce0-91dc-58985eb8302b'
    }
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Ошибка ${res.status}`);
      };
    })
}

function editProfile(userInfo) {
  return fetch('https://nomoreparties.co/v1/plus-cohort-26/users/me', {
    method: 'PATCH',
    headers: {
      authorization: '9028b20a-a71b-4ce0-91dc-58985eb8302b',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userInfo)
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Ошибка ${res.status}`);
      };
    })
};

function postCard(cardInfo) {
  return fetch('https://nomoreparties.co/v1/plus-cohort-26/cards', {
    method: 'POST',
    headers: {
      authorization: '9028b20a-a71b-4ce0-91dc-58985eb8302b',
      'Content-type': 'application/json'
    },
    body: JSON.stringify(cardInfo)
  })
  .then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка ${res.status}`);
    };
  })
};

function deleteCardFromServer(cardId) {
  return fetch(`https://nomoreparties.co/v1/plus-cohort-26/cards/${cardId}`, {
    method: `DELETE`,
    headers: {
      authorization: '9028b20a-a71b-4ce0-91dc-58985eb8302b',
      'Content-type': 'application/json'
    },
  })
  .then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка ${res.status}`);
    }
  })
};

function giveLike(cardId) {
  return fetch(`https://nomoreparties.co/v1/plus-cohort-26/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: {
      authorization: '9028b20a-a71b-4ce0-91dc-58985eb8302b',
      'Content-type': 'application/json'
    },
  })
  .then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка ${res.status}`);
    }
  })
};

function deleteLike(cardId) {
  return fetch(`https://nomoreparties.co/v1/plus-cohort-26/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: '9028b20a-a71b-4ce0-91dc-58985eb8302b',
      'Content-type': 'application/json'
    },
  })
  .then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка ${res.status}`);
    }
  })
};

export{ getUserProfile, getCards, editProfile, postCard, deleteCardFromServer, giveLike, deleteLike };
