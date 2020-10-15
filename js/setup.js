"use strict";

const WIZARD_NAMES = [`Иван`, `Хуан Себастьян`, `Мария`, `Кристоф`, `Виктор`, `Юлия`, `Люпита`, `Вашингтон`];
const WIZARD_SURNAMES = [`да Марья`, `Верон`, `Мирабелла`, `Вальц`, `Онопко`, `Топольницкая`, `Нионго`, `Ирвинг`];
const WIZARD_COAT_COLORS = [`rgb(101, 137, 164)`, `rgb(241, 43, 107)`, `rgb(146, 100, 161)`, `rgb(56, 159, 117)`, `rgb(215, 210, 55)`, `rgb(0, 0, 0)`];
const WIZARD_EYES_COLORS = [`black`, `red`, `blue`, `yellow`, `green`];
const WIZARD_FIREBALL_COLORS = [`#ee4830`, `#30a8ee`, `#5ce6c0`, `#e848d5`, `#e6e848`];
const WIZARD_NUMBER = 4;

const wizardContainer = document.querySelector(`.setup-similar-list`);
const wizardTemplate = document.querySelector(`#similar-wizard-template`).content;
const wizardItem = wizardTemplate.querySelector(`.setup-similar-item`);

const getRandomInteger = function (min, max) {
  const randomNumber = min + Math.random() * (max + 1 - min);
  return Math.floor(randomNumber);
};

const getRandomArrayItem = function (array) {
  const randomItem = array[getRandomInteger(0, array.length - 1)];
  return randomItem;
};

const generateWizards = function () {
  const wizardArray = [];
  for (let i = 0; i < WIZARD_NUMBER; i++) {
    const randomWizardFullName = getRandomArrayItem(WIZARD_NAMES) + ` ` + getRandomArrayItem(WIZARD_SURNAMES);
    const randomWizardCoatColor = getRandomArrayItem(WIZARD_COAT_COLORS);
    const randomWizardEyesColor = getRandomArrayItem(WIZARD_EYES_COLORS);
    const object = {
      name: randomWizardFullName,
      coatColor: randomWizardCoatColor,
      eyeColor: randomWizardEyesColor
    };
    wizardArray.push(object);
  }
  return wizardArray;
};

const createWizard = function (object) {
  const wizard = wizardItem.cloneNode(true);
  const name = wizard.querySelector(`.setup-similar-label`);
  const coat = wizard.querySelector(`.wizard-coat`);
  const eyes = wizard.querySelector(`.wizard-eyes`);

  name.textContent = object.name;
  coat.style.fill = object.coatColor;
  eyes.style.fill = object.eyeColor;

  return wizard;
};

const renderWizards = function (array) {
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < array.length; i++) {
    const arrayItem = array[i];
    const readyWizard = createWizard(arrayItem);
    fragment.appendChild(readyWizard);
  }

  wizardContainer.appendChild(fragment);
};

const wizards = generateWizards();
renderWizards(wizards);


const setupBlock = document.querySelector(`.setup`);
const setupSimilarBlock = setupBlock.querySelector(`.setup-similar`);
setupSimilarBlock.classList.remove(`hidden`);

const setupOpenButton = document.querySelector(`.setup-open`);
const setupCloseButton = setupBlock.querySelector(`.setup-close`);
const setupUserName = setupBlock.querySelector(`.setup-user-name`);

const onPopupEscPress = function (evt) {
  if (evt.key === `Escape` && setupUserName !== document.activeElement) {
    evt.preventDefault();
    closePopup();
  }
};

const openPopup = function () {
  setupBlock.classList.remove(`hidden`);
  document.addEventListener(`keydown`, onPopupEscPress);
};

const closePopup = function () {
  setupBlock.classList.add(`hidden`);
  document.removeEventListener(`keydown`, onPopupEscPress);
};

setupOpenButton.addEventListener(`click`, function () {
  openPopup();
});

setupCloseButton.addEventListener(`click`, function (evt) {
  evt.preventDefault();
  closePopup();
});

setupUserName.addEventListener(`input`, function () {
  const valueLength = setupUserName.value.length;

  if (valueLength < setupUserName.getAttribute(`minlength`)) {
    setupUserName.setCustomValidity(`Нужно ввести еще ${setupUserName.getAttribute(`minlength`) - valueLength} симв.`);
  } else {
    setupUserName.setCustomValidity(``);
  }

  setupUserName.reportValidity();
});

const wizardCoat = setupBlock.querySelector(`.setup-wizard .wizard-coat`);
const wizardEyes = setupBlock.querySelector(`.setup-wizard .wizard-eyes`);
const wizardFireball = setupBlock.querySelector(`.setup-fireball-wrap`);

const inputCoatColor = setupBlock.querySelector(`[name="coat-color"]`);
const inputEyesColor = setupBlock.querySelector(`[name="eyes-color"]`);
const inputFireballColor = setupBlock.querySelector(`[name="fireball-color"]`);


wizardCoat.addEventListener(`click`, function () {
  const coatRandomColor = getRandomArrayItem(WIZARD_COAT_COLORS);
  wizardCoat.style.fill = coatRandomColor;
  inputCoatColor.value = coatRandomColor;
});

wizardEyes.addEventListener(`click`, function () {
  const eyesRandomColor = getRandomArrayItem(WIZARD_EYES_COLORS);
  wizardEyes.style.fill = eyesRandomColor;
  inputEyesColor.value = eyesRandomColor;
});

wizardFireball.addEventListener(`click`, function () {
  const fireballRandomColor = getRandomArrayItem(WIZARD_FIREBALL_COLORS);
  wizardFireball.style.backgroundColor = fireballRandomColor;
  inputFireballColor.value = fireballRandomColor;
});

