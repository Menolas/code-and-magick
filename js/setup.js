'use strict';

(function () {
  var userDialog = document.querySelector('.setup');
  var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var WIZARD_COUNT = 4;
  var NAME_INPUT_MIN_VALUE = 2;
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  document.querySelector('.setup-similar').classList.remove('hidden');

  var similarListElement = document.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;

  var generateWizards = function () {
    var wizards = [];
    for (var i = 0; i <= WIZARD_COUNT; i++) {
      var wizard = {
        name: window.util.getRandomItem(WIZARD_NAMES) + ' ' + window.util.getRandomItem(WIZARD_SURNAMES),
        coatColor: window.util.getRandomItem(COAT_COLORS),
        eyesColor: window.util.getRandomItem(EYES_COLORS)
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

  // Открытие/закрытие окна настройки персонажа:

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

  var changeColor = function (subject, array) {
    subject.style.fill = window.util.getRandomItem(array);
  };

  player.querySelector('.wizard-coat').addEventListener('click', function (evt) {
    var target = evt.target;
    changeColor(target, COAT_COLORS);
  });

  player.querySelector('.wizard-eyes').addEventListener('click', function (evt) {
    var target = evt.target;
    changeColor(target, EYES_COLORS);
  });

  userDialog.querySelector('.setup-fireball-wrap').addEventListener('click', function () {
    userDialog.querySelector('.setup-fireball-wrap').style.background = window.util.getRandomItem(FIREBALL_COLORS);
  });
  window.setup = {
    userDialog: userDialog
  };
})();
