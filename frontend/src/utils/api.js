class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error ${res.status}`);
  }
  getAllData() {
    return Promise.all([this.getUserData(), this.getInitialCards()]);
  }
  getUserData() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then(this._checkResponse);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then(this._checkResponse);
  }
  editProfileInfo({username, about}) {
    //PATCH https://around.nomoreparties.co/v1/groupId/users/me
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        ...this._headers,
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },

      body: JSON.stringify({
        name: username,
        about: about,
      }),
    }).then(this._checkResponse);
  }
  editProfilePicture({avatar}) {
    //PATCH https://around.nomoreparties.co/v1/groupId/users/me/avatar

    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',

      headers: {
        ...this._headers,
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
      body: JSON.stringify({avatar: avatar}),
    }).then(this._checkResponse);
  }
  addNewCard({name, link}) {
    //POST https://around.nomoreparties.co/v1/groupId/cards
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: {
        ...this._headers,
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
      body: JSON.stringify({
        name,
        link,
      }),
    }).then(this._checkResponse);
  }
  deleteCard(cardId) {
    //DELETE https://around.nomoreparties.co/v1/groupId/cards/cardId
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        ...this._headers,
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
    }).then(this._checkResponse);
  }
  addLike(cardId) {
    console.log('add like');
    //PUT https://around.nomoreparties.co/v1/groupId/cards/likes/cardId
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        ...this._headers,
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
    }).then(this._checkResponse);
  }
  removeLike(cardId) {
    console.log('remove like');
    //DELETE https://around.nomoreparties.co/v1/groupId/cards/likes/cardId
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers,
    }).then(this._checkResponse);
  }
  changeLikeCardStatus(cardId, isLiked) {
    console.log('change like, isLiked', isLiked);
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: isLiked ? 'PUT' : 'DELETE',
      headers: {
        ...this._headers,
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
    }).then(this._checkResponse);
  }
}
const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

const api = new Api({
  baseUrl: BASE_URL,
  headers: {
    authorization: `Bearer ${localStorage.getItem('jwt')}`,
    'Content-Type': 'application/json',
  },
});
export default api;
