export class Api {
    constructor(config) {
      this.baseUrl = config.baseUrl;
      this.headers = config.headers;
      this.authorization = config.authorization;
      this.contentType = config.contentType;
    }
  
    getUserProfileInfo() {
      return fetch(`${this.baseUrl}/users/me`, {
        headers: {
          authorization: this.authorization
        }
      })
    }
  
    getInitialCards() {
      
      return fetch(`${this.baseUrl}/cards`, {
        headers: {
          authorization: this.authorization
        }
      })
    }
  
    editUserProfile(userData) {
      return fetch(`${this.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: {
          authorization: this.authorization,
          'Content-Type': this.contentType
        },
        body: JSON.stringify({
          name: userData.name,
          about: userData.job
        })
      })
    }
  
    postNewCard(cardData) {
      return fetch(`${this.baseUrl}/cards`, {
        method: 'POST',
        headers: {
          authorization: this.authorization,
          'Content-Type': this.contentType
        },
        body: JSON.stringify({
          name: cardData.name,
          link: cardData.link
        })
      })
    }
  
    deleteCard(id) {
      return fetch(`${this.baseUrl}/cards/${id}`, {
        method: 'DELETE',
        headers: {
          authorization: this.authorization,
          'Content-Type': this.contentType
        }
      })
    }
  
    setLike(cardInfo) {
      return fetch(`${this.baseUrl}/cards/like/${cardInfo.data._id}`, {
        method: 'PUT',
        headers: {
          authorization: this.authorization,
          'Content-Type': this.contentType
        }
      })
    }
  
    removeLike(cardInfo) {
      return fetch(`${this.baseUrl}/cards/like/${cardInfo.data._id}`, {
        method: 'DELETE',
        headers: {
          authorization: this.authorization,
          'Content-Type': this.contentType
        }
      })
    }
  
    setUserPhoto(linkAvatar) {
      return fetch(`${this.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: {
          authorization: this.authorization,
          'Content-Type': this.contentType
        },
        body: JSON.stringify({
         avatar: linkAvatar,
        })
      })
    }
  }