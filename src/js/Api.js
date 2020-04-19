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
        // .then(res => res.json())
        // .then((result) => {
        //   //Script.editProfileDataFromApi(result)
        //   console.log(result)
        //   //return result;
        // })
        // // .then((result) => {
        // //   Script.editProfileDataFromApi(result)
        // // })
  
  
        // // .then(function (result) {
        // //   console.log(result)
        // //   return result;
        // // })
          
        // .catch((err) => {
        //     console.log(err);
        // })
    }
  
    getInitialCards() {
      
      return fetch(`${this.baseUrl}/cards`, {
        headers: {
          authorization: this.authorization
        }
      })
        // .then(res => res.json())
        // .then((result) => {
        //   Script.cardsInPlacelist.render(result)})
        // .catch((err) => {
        //     console.log(err);
        // })
  
    }
  
    editUserProfile(userData) {
      //Script.renderLoadingProfileInfo(true);
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
        // .then(res => res.json())
        //   .then((result) => {
        //     console.log(result)})
        //   .catch((err) => {
        //       console.log(err);
        //   })
        //   .finally(() => {
        //     Script.renderLoadingProfileInfo(false)
        // })
    }
  
    postNewCard(cardData) {
      //Script.renderLoadingCard(true);
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
        // .then(res => res.json())
        //   .then((addedNewCard) => {
        //     console.log(addedNewCard)
        //     Script.cardsInPlacelist.addCard(addedNewCard)})
        //   .catch((err) => {
        //       console.log(err);
        //   })
        //   .finally(() => {
        //     Script.renderLoadingCard(false)
        // })
  
    }
  
    deleteCard(id /*cardElement*/) {
      return fetch(`${this.baseUrl}/cards/${id}`, {
        method: 'DELETE',
        headers: {
          authorization: this.authorization,
          'Content-Type': this.contentType
        }
      })
        // .then(res => { 
        //   if(res.ok) {
        //     res.json()
        //     Card.prototype.remove(cardElement)
        //     console.log(res);
        //   }
        // })
        //   // .then((result) => {
        //   //     console.log(result);
        //   // })
        //   .catch((err) => {
        //       console.log(err);
        //   })
    }
  
    setLike(cardInfo) {
      return fetch(`${this.baseUrl}/cards/like/${cardInfo.data._id}`, {
        method: 'PUT',
        headers: {
          authorization: this.authorization,
          'Content-Type': this.contentType
        }
      })
        // .then(res => res.json())
        //   .then((result) => {
        //       console.log(result);
        //       console.log(cardInfo.target.nextSibling.nextSibling)
        //       console.log(result.likes.length)
        //       cardInfo.target.nextSibling.nextSibling.textContent = result.likes.length;
        //   })
        //   .catch((err) => {
        //       console.log(err);
        //   })
    }
  
    removeLike(cardInfo) {
      return fetch(`${this.baseUrl}/cards/like/${cardInfo.data._id}`, {
        method: 'DELETE',
        headers: {
          authorization: this.authorization,
          'Content-Type': this.contentType
        }
      })
        // .then(res => res.json())
        //   .then((result) => {
        //       console.log(result);
        //       cardInfo.target.nextSibling.nextSibling.textContent = result.likes.length;
        //   })
        //   .catch((err) => {
        //       console.log(err);
        //   })
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
        // .then(res => res.json())
        //   .then((result) => {
        //     console.log(result);
        //   })
        //   .catch((err) => {
        //       console.log(err);
        //   })
    }
  }