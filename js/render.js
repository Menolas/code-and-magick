'use strict';

(function () {
  var SIMILAR_WIZARDS_COUNT = 4;
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;
  var similarListElement = document.querySelector('.setup-similar-list');

  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);
    var wizardCoat = wizardElement.querySelector('.wizard-coat');
    var wizardEyes = wizardElement.querySelector('.wizard-eyes');

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardCoat.style.fill = wizard.colorCoat;
    wizardEyes.style.fill = wizard.colorEyes;

    return wizardElement;
  };

  var renderSimilarWizards = function (data) {
    var takeNumber = data.length > SIMILAR_WIZARDS_COUNT ? SIMILAR_WIZARDS_COUNT : data.length;
    similarListElement.innerHTML = '';
    for (var i = 0; i < takeNumber; i++) {
      similarListElement.appendChild(renderWizard(data[i]));
    }
    window.setup.userDialog.querySelector('.setup-similar').classList.remove('hidden');
  };
  window.render = {
    renderSimilarWizards: renderSimilarWizards
  };
})();
