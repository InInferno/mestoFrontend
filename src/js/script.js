import "../pages/index.css";
import {config} from './config.js';
import {Api} from './Api.js';
import {Card} from './Card.js';
import {CardList} from './CardList.js';
import {FormValidator} from './FormValidator.js';
import {Popup} from './Popup.js';
import {UserInfo} from './UserInfo.js';
import {initialCards} from './initialCards.js';

export const Script = (function () {
  const obj = {};

  const popupAddNewCard = document.querySelector('.popup-add');
  const inputCardName = document.querySelector('#cardName');
  const inputCardLink = document.querySelector('#cardUrl');
  const inputUserName = document.querySelector('#userName');
  const inputUserOccupation = document.querySelector('#userOccupation');
  const placesList = document.querySelector('.places-list');
  const editButton = document.querySelector('.user-info__edit-button');
  const addButton = document.querySelector('.user-info__button');
  const userName = document.querySelector('.user-info__name'); 
  const userJob = document.querySelector('.user-info__job');
  const popUpFormEdit = document.querySelector('.popup__form-edit');
  const popUpEdit = document.querySelector('.popup-edit');
  const popUpContent = document.querySelector('.popup__content');
  const popUp = document.querySelector('.popup');
  const popUpInput = document.querySelector('.popup__input');
  const popUpForm = document.querySelector('.popup__form');
  const popUpPhoto = document.querySelector('.popup-photo');
  const popUpContentPhoto = document.querySelector('.popup__content-image');
  const validationMessages = {
    validationValueMissing: 'Это обязательное поле',
    validationLenghtErr: 'Должно быть от 2 до 30 символов',
    validationNotUrl: 'Здесь должна быть ссылка'
  };
  obj.validationMessages = validationMessages;



  const userInfoPhoto = document.querySelector('.user-info__photo');
  const userPhotoPopup = document.querySelector('.popup-user-photo');
  const popupUserPhoto = new Popup(userPhotoPopup);
  userInfoPhoto.addEventListener('click', openUserPhotoEditPopup);

  function openUserPhotoEditPopup() {
    popupUserPhoto.open();
  }

  const inputUserAvatar = document.querySelector('#inputUserAvatar');
  const popUpFormAvatar = document.querySelector('.popup__form-avatar');
  
  function editUserAvatar(event) {
    event.preventDefault();

    let linkAvatar = inputUserAvatar.value;
    api.setUserPhoto(linkAvatar)
      .then(res => res.json())
      .catch((err) => {
        console.log(err);
      })
    userPhotoPopup.classList.remove('popup_is-opened');
    userInfoPhoto.style.backgroundImage = `url(${linkAvatar})`
    popUpFormAvatar.reset();
  }
  obj.editUserAvatar = editUserAvatar;
  userPhotoPopup.addEventListener('submit', editUserAvatar);

  const createCard = (cardData) => new Card(cardData, openPopupContentPhoto);
  const cardsInPlacelist = new CardList(placesList, createCard);
  obj.cardsInPlacelist = cardsInPlacelist;
  const popupAdd = new Popup(popupAddNewCard);
  const popupEdition = new Popup(popUpEdit);
  const photoPopup = new Popup(popUpPhoto);
  const userInfoProfile = new UserInfo(userName, userJob, userInfoPhoto);
  const openingAddCardForm = new FormValidator(popUp);
  const openingEditProfileForm = new FormValidator(popUpFormEdit);
  const openingPopUpFormAvatar = new FormValidator(popUpFormAvatar);
  

  function openProfileEditPopup() {
    popUpFormEdit.userName.value = userName.textContent;
    popUpFormEdit.userOccupation.value = userJob.textContent;
    popupEdition.open();
  }

  function editProfileData(event) {
    event.preventDefault();

    const userData = {};
    userData.name = inputUserName.value;
    userData.job = inputUserOccupation.value;
    api.editUserProfile(userData)
      .then(res => res.json())
      .then((result) => {
        Script.renderLoadingProfileInfo(true)
      })
      .catch((err) => {
      console.log(err);
      })
      .finally(() => {
      Script.renderLoadingProfileInfo(false)
      })
    userName.textContent = inputUserName.value;
    userJob.textContent = inputUserOccupation.value;
    popUpEdit.classList.remove('popup_is-opened');
    popUpForm.reset();
  }
  obj.editProfileData = editProfileData;

  function editProfileDataFromApi(apiUserInfo) {
    const userData = {};
    userData.name = apiUserInfo.name;
    userData.job = apiUserInfo.about;
    userData.avatar = apiUserInfo.avatar;
    userInfoProfile.setUserInfo(userData);
    userInfoProfile.updateUserInfo();
  }
  obj.editProfileDataFromApi = editProfileDataFromApi;
 

  function openPopupContentPhoto(event, link) {
    if (event.toElement.classList.contains('place-card__image')) {
      popUpContentPhoto.setAttribute('src', link);
      photoPopup.open();
    }
  }


  
  const buttonTypeSave = document.querySelector('.popup__button_type_save');
  function renderLoadingProfileInfo(isLoading) {
    if (isLoading) {
      buttonTypeSave.textContent = 'Загрузка...'
    } else {
      buttonTypeSave.textContent = 'Сохранить'
      buttonTypeSave.classList.remove('button_active')
    }
  }
  obj.renderLoadingProfileInfo = renderLoadingProfileInfo;

  const buttonTypeSaveCard = document.querySelector('.popup__button');
  function renderLoadingCard(isLoading) {
    if (isLoading) {
      buttonTypeSaveCard.textContent = 'Загрузка...'
    } else {
      buttonTypeSaveCard.textContent = '+'
      buttonTypeSaveCard.classList.remove('button_active')
    }
  }
  obj.renderLoadingCard = renderLoadingCard;

  function cardDataTransform(event) {
    event.preventDefault();
    const cardData = {};
    cardData.name = inputCardName.value;
    cardData.link = inputCardLink.value;
    api.postNewCard(cardData)
      .then(res => res.json())
      .then((addedNewCard) => {
        Script.renderLoadingCard(true);
        Script.cardsInPlacelist.addCard(addedNewCard)})
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
      Script.renderLoadingCard(false)
      })
    popupAddNewCard.classList.remove('popup_is-opened');
    popUpForm.reset();
  }

  function eventDefinition(cardInfo) {
    const eventTarget = cardInfo.target;
    const id = cardInfo.data._id;
    const element = cardInfo.element;
    if (eventTarget.classList.contains('place-card__like-icon')) {
      if (eventTarget.classList.contains('place-card__like-icon_liked')) {
        eventTarget.classList.remove('place-card__like-icon_liked')
        api.removeLike(cardInfo)
          .then(res => res.json())
          .then((result) => {
            cardInfo.target.nextSibling.nextSibling.textContent = result.likes.length;
          })
          .catch((err) => {
            console.log(err);
          })
      } else {
        eventTarget.classList.add('place-card__like-icon_liked')
        api.setLike(cardInfo)
          .then(res => res.json())
          .then((result) => {
            cardInfo.target.nextSibling.nextSibling.textContent = result.likes.length;
          })
          .catch((err) => {
            console.log(err);
          })
      }
    } else if (eventTarget.classList.contains('place-card__delete-icon')) {
        const areYouSure = confirm('Вы уверены, что хотите удалить данный пост?')
        if (areYouSure) {
          api.deleteCard(id, element)
            .then(res => { 
              if(res.ok) {
                res.json()
                Card.prototype.remove(element)
              }
            })
            .catch((err) => {
                console.log(err);
            })
        }
      }
  }
  obj.eventDefinition = eventDefinition;

  popupAddNewCard.addEventListener('submit', cardDataTransform);
  popUpEdit.addEventListener('submit', editProfileData);
  addButton.addEventListener('click', popupAdd.open);
  editButton.addEventListener('click', openProfileEditPopup);

  return obj;

})();


const api = new Api(JSON.parse(config));

const dataUserFromApi = api.getUserProfileInfo();
dataUserFromApi
  .then((res) => {
    return res.json();    
  })
  .then((result) => {
    Script.editProfileDataFromApi(result)
  })
  .catch((err) => {
    console.log(err);
  })

const getInitialCardsFromApi = api.getInitialCards();
getInitialCardsFromApi
  .then(res => res.json())
  .then((result) => {
    Script.cardsInPlacelist.render(result)
  })
  .catch((err) => {
    console.log(err);
  })

  
