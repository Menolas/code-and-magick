'use strict';

(function () {
  var userDialog = document.querySelector('.setup');
  // var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  // var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var WIZARD_COUNT = 4;
  var NAME_INPUT_MIN_VALUE = 2;

  // Валидация ввода имени персонажа.

  var userNameInput = userDialog.querySelector('.setup-user-name');

  userNameInput.addEventListener('invalid', function () {
    if (userNameInput.validity.tooShort) {
      userNameInput.setCustomValidity('Имя должно состоять минимум из 2-х символов');
    } else if (userNameInput.validity.tooLong) {
      userNameInput.setCustomValidity('Имя не должно превышать 25-ти символов');
    } else if (userNameInput.validity.valueMissing) {
      userNameInput.setCustomValidity('Обязательное поле');
    }
  });

  userNameInput.addEventListener('input', function (evt) {
    var target = evt.target;
    if (target.value.length < NAME_INPUT_MIN_VALUE) {
      target.setCustomValidity('Имя должно состоять минимум из 2-х символов');
    } else {
      target.setCustomValidity('');
    }
  });

  var similarListElement = document.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;
  /*
  var generateWizards = function () {
    var wizards = [];
    for (var i = 0; i <= WIZARD_COUNT; i++) {
      var wizard = {
        name: window.util.getRandomItem(WIZARD_NAMES) + ' ' + window.util.getRandomItem(WIZARD_SURNAMES),
        coatColor: window.colorize.getRandomColor(window.colorize.COAT_COLORS),
        eyesColor: window.colorize.getRandomColor(window.colorize.EYES_COLORS)
      };
      wizards.push(wizard);
    }
    return wizards;
  };

  var wizards = generateWizards();
  */

  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);
    var wizardCoat = wizardElement.querySelector('.wizard-coat');
    var wizardEyes = wizardElement.querySelector('.wizard-eyes');

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardCoat.style.fill = wizard.coatColor;
    wizardEyes.style.fill = wizard.eyesColor;

    return wizardElement;
  };
  var successHandler = function (wizards) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < WIZARD_COUNT; i++) {
      fragment.appendChild(renderWizard(wizards[i]));
    }
    similarListElement.appendChild(fragment);
    userDialog.querySelector('.setup-similar').classList.remove('hidden');
  };
  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.load.loadWizards(successHandler, errorHandler);

  var form = userDialog.querySelector('.setup-wizard-form');

  form.addEventListener('submit', function (evt) {
    window.upload(new FormData(form), function (response) {
      userDialog.classList.add('hidden');
    });
    evt.preventDefault();
  });

  // Изменение цвета мантии, цвета глаз, цвета фаерболов персонажа по нажатию.

  var player = document.querySelector('.setup-wizard');
  player.querySelector('.wizard-coat').addEventListener('click', function (evt) {
    var target = evt.target;
    window.colorize.getColorize(target, window.colorize.COAT_COLORS);
  });

  player.querySelector('.wizard-eyes').addEventListener('click', function (evt) {
    var target = evt.target;
    window.colorize.getColorize(target, window.colorize.EYES_COLORS);
  });

  var fireBall = userDialog.querySelector('.setup-fireball-wrap');

  fireBall.addEventListener('click', function () {
    window.colorize.getColorize(fireBall, window.colorize.FIREBALL_COLORS);
  });
  // в движении:

  var shopElement = document.querySelector('.setup-artifacts-shop');
  var draggedItem = null;
  var artifactsElement = document.querySelector('.setup-artifacts');

  shopElement.addEventListener('dragstart', function (evt) {
    if (evt.target.tagName.toLowerCase() === 'img') {
      var imgClone = document.createElement('img');
      imgClone.src = evt.target.src;
      imgClone.alt = evt.target.alt;
      imgClone.width = evt.target.width;
      imgClone.height = evt.target.height;
      draggedItem = imgClone;
      evt.dataTransfer.setData('text/plain', imgClone.alt);
      artifactsElement.outline = '2px dashed red';
    }
  });

  artifactsElement.addEventListener('dragover', function (evt) {
    evt.preventDefault();
    return false;
  });

  artifactsElement.addEventListener('dragstart', function (evt) {
    if (evt.target.tagName.toLowerCase() === 'img') {
      draggedItem = evt.target;
      evt.dataTransfer.setData('text/plain', evt.target.alt);
    }
  });

  artifactsElement.addEventListener('drop', function (evt) {
    evt.target.style.backgroundColor = '';
    artifactsElement.outline = 'none';
    evt.target.appendChild(draggedItem);
    evt.preventDefault();
  });

  artifactsElement.addEventListener('dragenter', function (evt) {
    evt.target.style.backgroundColor = 'yellow';
    evt.preventDefault();
  });

  artifactsElement.addEventListener('dragleave', function (evt) {
    evt.target.style.backgroundColor = '';
    evt.preventDefault();
  });
  window.setup = {
    userDialog: userDialog,
    userNameInput: userNameInput
  };
})();
