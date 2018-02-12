'use strict';

(function () {
  var userDialog = document.querySelector('.setup');
  var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var WIZARD_COUNT = 4;
  var NAME_INPUT_MIN_VALUE = 2;

  document.querySelector('.setup-similar').classList.remove('hidden');

  var similarListElement = document.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;

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

  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);
    var wizardCoat = wizardElement.querySelector('.wizard-coat');
    var wizardEyes = wizardElement.querySelector('.wizard-eyes');

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardCoat.style.fill = wizard.coatColor;
    wizardEyes.style.fill = wizard.eyesColor;

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
  window.setup = {
    userDialog: userDialog,
    userNameInput: userNameInput
  };
})();
