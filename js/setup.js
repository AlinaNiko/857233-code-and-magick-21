"use strict";

const WIZARD_NAMES = [`Иван`, `Хуан Себастьян`, `Мария`, `Кристоф`, `Виктор`, `Юлия`, `Люпита`, `Вашингтон`];
const WIZARD_SURNAMES = [`да Марья`, `Верон`, `Мирабелла`, `Вальц`, `Онопко`, `Топольницкая`, `Нионго`, `Ирвинг`];
const WIZARD_COAT_COLORS = [`rgb(101, 137, 164)`, `rgb(241, 43, 107)`, `rgb(146, 100, 161)`, `rgb(56, 159, 117)`, `rgb(215, 210, 55)`, `rgb(0, 0, 0)`];
const WIZARD_EYES_COLORS = [`black`, `red`, `blue`, `yellow`, `green`];
const WIZARD_NUMBER = 4;
const wizardArray = [];

const wizardContainer = document.querySelector(`.setup-similar-list`);
const wizardTemplate = document.querySelector(`#similar-wizard-template`).content;
const wizardItem = wizardTemplate.querySelector(`.setup-similar-item`);

const setupBlock = document.querySelector(`.setup`);
const setupSimilarBlock = setupBlock.querySelector(`.setup-similar`);
setupBlock.classList.remove(`hidden`);
setupSimilarBlock.classList.remove(`hidden`);

const randomInteger = function (min, max) {
  const randomNumber = min + Math.random() * (max + 1 - min);
  return Math.floor(randomNumber);
};

const randomArrayItem = function (array) {
  const randomItem = array[randomInteger(0, array.length - 1)];
  return randomItem;
};

const fillWizardArray = function (array) {
  for (let i = 0; i < WIZARD_NUMBER; i++) {
    const randomWizardFullName = randomArrayItem(WIZARD_NAMES) + ` ` + randomArrayItem(WIZARD_SURNAMES);
    const randomWizardCoatColor = randomArrayItem(WIZARD_COAT_COLORS);
    const randomWizardEyesColor = randomArrayItem(WIZARD_EYES_COLORS);
    const object = {
      name: randomWizardFullName,
      coatColor: randomWizardCoatColor,
      eyeColor: randomWizardEyesColor
    };

    array.push(object);
  }
};

const createWizardElement = function (object) {
  const wizardElement = wizardItem.cloneNode(true);
  const nameElement = wizardElement.querySelector(`.setup-similar-label`);
  const coatElement = wizardElement.querySelector(`.wizard-coat`);
  const eyesElement = wizardElement.querySelector(`.wizard-eyes`);

  nameElement.textContent = object.name;
  coatElement.style.fill = object.coatColor;
  eyesElement.style.fill = object.eyeColor;

  return wizardElement;
};

const renderWizard = function (array) {
  fillWizardArray(array);

  for (let i = 0; i < array.length; i++) {
    const arrayItem = array[i];
    const readyWizardElement = createWizardElement(arrayItem);
    wizardContainer.appendChild(readyWizardElement);
  }
};

renderWizard(wizardArray);
