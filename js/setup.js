"use strict";

const WIZARD_NAMES = [`Иван`, `Хуан Себастьян`, `Мария`, `Кристоф`, `Виктор`, `Юлия`, `Люпита`, `Вашингтон`];
const WIZARD_SURNAMES = [`да Марья`, `Верон`, `Мирабелла`, `Вальц`, `Онопко`, `Топольницкая`, `Нионго`, `Ирвинг`];
const WIZARD_COAT_COLORS = [`rgb(101, 137, 164)`, `rgb(241, 43, 107)`, `rgb(146, 100, 161)`, `rgb(56, 159, 117)`, `rgb(215, 210, 55)`, `rgb(0, 0, 0)`];
const WIZARD_EYES_COLORS = [`black`, `red`, `blue`, `yellow`, `green`];
const WIZARD_NUMBER = 4;

const wizardContainer = document.querySelector(`.setup-similar-list`);
const wizardTemplate = document.querySelector(`#similar-wizard-template`).content;
const wizardItem = wizardTemplate.querySelector(`.setup-similar-item`);

const setupBlock = document.querySelector(`.setup`);
const setupSimilarBlock = setupBlock.querySelector(`.setup-similar`);
setupBlock.classList.remove(`hidden`);
setupSimilarBlock.classList.remove(`hidden`);

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
