class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;

    this.getUserInfo = this.getUserInfo.bind(this);
    this.getInitialCards = this.getInitialCards.bind(this);
    this.deleteCard = this.deleteCard.bind(this);
    this.setCardLikeStatus = this.setCardLikeStatus.bind(this);
    this.sendAvatarInfo = this.sendAvatarInfo.bind(this);
    this._getResponseData = this._getResponseData.bind(this);
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then((res) => this._getResponseData(res));
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then((res) => this._getResponseData(res));
  }

  sendUserInfo(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
      method: "PATCH",
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then((res) => this._getResponseData(res));
  }

  sendNewPostInfo(data) {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
      method: "POST",
      body: JSON.stringify(data),
    }).then((res) => this._getResponseData(res));
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      headers: this._headers,
      method: "DELETE",
    }).then((res) => this._getResponseData(res));
  }

  setCardLikeStatus(cardId, isAlreadyLiked) {
    if (isAlreadyLiked) {
      return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        headers: this._headers,
        method: "DELETE",
      }).then((res) => this._getResponseData(res));
    } else {
      return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        headers: this._headers,
        method: "PUT",
      }).then((res) => this._getResponseData(res));
    }
  }

  sendAvatarInfo(url) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      headers: this._headers,
      method: "PATCH",
      body: JSON.stringify({
        avatar: url,
      }),
    }).then((res) => this._getResponseData(res));
  }
};

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-54",
  headers: {
    authorization: "cd0a4e61-8d40-4238-b4eb-aa04c869218e",
    "Content-Type": "application/json",
  },
});

export default api;
