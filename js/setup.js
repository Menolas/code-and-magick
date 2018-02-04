'use strict';

var userDialog = document.querySelector('.setup');
var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var WIZARD_COUNT = 4;
// var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

var getRandomInt = function (array) {
  return Math.floor(Math.random() * (array.length - 0)) + 0;
};

userDialog.classList.remove('hidden');
document.querySelector('.setup-similar').classList.remove('hidden');

var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;

var generateWizards = function () {
  var wizards = [];
  for (var i = 0; i <= WIZARD_COUNT; i++) {
    var wizard = {
      name: WIZARD_NAMES[getRandomInt(WIZARD_NAMES)] + ' ' + WIZARD_SURNAMES[getRandomInt(WIZARD_SURNAMES)],
      coatColor: COAT_COLORS[getRandomInt(COAT_COLORS)],
      eyesColor: EYES_COLORS[getRandomInt(EYES_COLORS)]
    };
    wizards.push(wizard);
  }
  return wizards;
};

var wizards = generateWizards();

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var renderSimilarWizards = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(renderWizard(wizards[i]));
  }

  similarListElement.appendChild(fragment);
};

renderSimilarWizards();

userDialog.querySelector('.setup-similar').classList.remove('hidden');
