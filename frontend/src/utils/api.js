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
    return fetch(`${this._baseUrl}/users/me`, {headers: this._headers}).then(
      this._checkResponse
    );
  }
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {headers: this._headers}).then(
      this._checkResponse
    );
  }
  editProfileInfo(userUpdate) {
    //PATCH https://around.nomoreparties.co/v1/groupId/users/me
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: userUpdate.username,
        about: userUpdate.about,
      }),
    }).then(this._checkResponse);
  }
  editProfilePicture({avatar}) {
    //PATCH https://around.nomoreparties.co/v1/groupId/users/me/avatar
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar,
      }),
    }).then(this._checkResponse);
  }
  addNewCard({name, link}) {
    //POST https://around.nomoreparties.co/v1/groupId/cards
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
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
      headers: this._headers,
    }).then(this._checkResponse);
  }
  addLike(cardId) {
    //PUT https://around.nomoreparties.co/v1/groupId/cards/likes/cardId
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: this._headers,
    }).then(this._checkResponse);
  }
  removeLike(cardId) {
    //DELETE https://around.nomoreparties.co/v1/groupId/cards/likes/cardId
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    }).then(this._checkResponse);
  }
  changeLikeCardStatus(cardId, isLiked) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: isLiked ? 'PUT' : 'DELETE',
      headers: this._headers,
    }).then(this._checkResponse);
  }
}
const api = new Api({
  baseUrl: 'https://around.nomoreparties.co/v1/group-12',
  headers: {
    authorization: '66d060c3-a92b-49d0-add5-d7e29bf411c9',
    'Content-Type': 'application/json',
  },
});
export default api;
