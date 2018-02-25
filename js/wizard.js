'use strict';

(function () {
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  var wizard = {
    onEyesChange: function (color) {},
    onCoatChange: function (color) {}
  };

  var getRandomColor = function (array) {
    return array[Math.floor(array.length * Math.random())];
  };

  var player = document.querySelector('.setup-wizard');
  var playerCoatElement = player.querySelector('.wizard-coat');

  playerCoatElement.addEventListener('click', function () {
    var newColor = getRandomColor(COAT_COLORS);
    playerCoatElement.style.fill = newColor;
    wizard.onCoatChange(newColor);
  });

  var playerEyesElement = player.querySelector('.wizard-eyes');

  playerEyesElement.addEventListener('click', function () {
    var newColor = getRandomColor(EYES_COLORS);
    playerEyesElement.style.fill = newColor;
    wizard.onEyesChange(newColor);
  });

  var fireBall = window.setup.userDialog.querySelector('.setup-fireball-wrap');

  fireBall.addEventListener('click', function () {
    var newColor = getRandomColor(FIREBALL_COLORS);
    fireBall.style.backgroundColor = newColor;
  });

  return window.wizard = wizard;
})();
