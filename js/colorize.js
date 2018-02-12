'use strict';

(function () {
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  var getRandomColor = function (array) {
    return array[Math.floor(array.length * Math.random())];
  };

  window.colorize = {
    COAT_COLORS: COAT_COLORS,
    EYES_COLORS: EYES_COLORS,
    FIREBALL_COLORS: FIREBALL_COLORS,
    getRandomColor: getRandomColor,
    getColorize: function (element, array) {
      element.addEventListener('click', function () {
        var color = getRandomColor(array);
        if (element.tagName.toLowerCase() === 'div') {
          element.style.backgroundColor = color;
        }
        element.style.fill = color;
      });
    }
  };
})();
