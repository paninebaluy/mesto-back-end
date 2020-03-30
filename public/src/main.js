import Api from './scripts/api.js';
import Card from './scripts/card.js';
import CardList from './scripts/cardlist.js';
import FormValidator from './scripts/formvalidator.js';
import Popup from './scripts/popup.js';
import { Form } from './scripts/popup.js';
import UserInfo from './scripts/userinfo.js';
import './pages/style.css';

'use strict';

// variables
const serverUrl = NODE_ENV === 'development' ? 'http://praktikum.tk/' : 'https://praktikum.tk/';

const authData = {
  serverUrl,
  cohortId: 'cohort7',
  authToken: 'a23141ad-1fbc-473a-91ed-36b5b30ff7c4',
};
const myData = {
  myId: '9b0b2df41acea5a47a376ee6',
};

const openEditFormButton = document.querySelector('.profile__edit-button');
const openPlaceFormButton = document.querySelector('.user-info__button');

// functions
const userInfo = (userData) => new UserInfo(userData);
const newCard = (cardData, functions, userData) => new Card(cardData, functions, userData);
const formValidator = (form) => new FormValidator(form);
const popup = (popupData) => new Popup(popupData);
const functions = {
  userInfo,
  formValidator,
  popup,
  newCard,
};

// initializing class instances

const mestoApi = new Api(authData);
const cardList = new CardList({ template: document.getElementById('card-sample'), container: document.querySelector('.places-list'), api: mestoApi }, functions, myData);
const editPopup = new Form({ element: document.getElementById('edit'), validator: formValidator(document.forms.editinfo), list: cardList, api: mestoApi }, functions);
const placePopup = new Form({ element: document.getElementById('newplace'), validator: formValidator(document.forms.new), list: cardList, api: mestoApi }, functions);
const currentUserInfo = userInfo({form: document.forms.editinfo, api: mestoApi });


// event listeners

openEditFormButton.addEventListener('click', () => {
  editPopup.open();
});
openPlaceFormButton.addEventListener('click', () => {
  placePopup.open();
});


// function calls
currentUserInfo.loadUserInfo();
cardList.render();
