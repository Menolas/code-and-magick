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

  var dialogHandle = window.setup.userDialog.querySelector('.upload');

  dialogHandle.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      window.setup.userDialog.style.top = (window.setup.userDialog.offsetTop - shift.y) + 'px';
      window.setup.userDialog.style.left = (window.setup.userDialog.offsetLeft - shift.x) + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function () {
          evt.preventDefault();
          dialogHandle.removeEventListener('click', onClickPreventDefault);
        };
        dialogHandle.addEventListener('click', onClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
