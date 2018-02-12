'use strict';

(function () {
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = window.setup.userDialog.querySelector('.setup-close');
  var submit = window.setup.userDialog.querySelector('.setup-submit');

  var onPopupEscPress = function (evt) {
    if (document.activeElement !== window.setup.userNameInput) {
      window.util.isEscEvent(evt, closePopup);
    }
  };

  var openPopup = function () {
    window.setup.userDialog.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
  };

  var closePopup = function () {
    window.setup.userDialog.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
  };

  setupOpen.addEventListener('click', function () {
    openPopup();
  });

  setupOpen.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, openPopup());
  });

  setupClose.addEventListener('click', function () {
    closePopup();
  });

  setupClose.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, closePopup());
  });
  submit.addEventListener('click', function () {
    closePopup();
  });

  submit.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, closePopup());
  });
})();
