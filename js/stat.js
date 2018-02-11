'use strict';

(function () {
  window.renderStatistics = function (ctx, names, times) {
    var CLOUD_COORDINATE_X = 100;
    var CLOUD_COORDINATE_Y = 10;
    var CLOUD_WIDTH = 420;
    var CLOUD_HEIGHT = 270;
    var SHADOW_COORDINATE = 10;
    var BAR_WIDTH = 40;
    var HISTOGRAM_HEIGHT = 150;
    var INDENT = 50;
    var INITIAL_X = 150;
    var INITIAL_Y = 85;
    var LINE_HEIGHT = 15;

    var renderCloud = function (x, y, color) {
      ctx.fillStyle = color;
      ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
    };

    var getMaxNumber = function (array) {
      var max = -1;
      for (var i = 0; i < array.length; i++) {
        if (array[i] > max) {
          max = array[i];
        }
      }

      return max;
    };

    var getRandomColor = function () {
      ctx.fillStyle = 'blue';
      ctx.globalAlpha = Math.random();
    };


    var max = getMaxNumber(times);
    var STEP = HISTOGRAM_HEIGHT / (max - 0);

    var drawColumn = function () {
      ctx.fillRect(INITIAL_X + (BAR_WIDTH + INDENT) * i, INITIAL_Y + 5 + (HISTOGRAM_HEIGHT - times[i] * STEP), BAR_WIDTH, times[i] * STEP);
    };
    renderCloud(CLOUD_COORDINATE_X + SHADOW_COORDINATE, CLOUD_COORDINATE_Y + SHADOW_COORDINATE, 'rgba(0, 0, 0, 0.7)');
    renderCloud(CLOUD_COORDINATE_X, CLOUD_COORDINATE_Y, 'white');
    ctx.fillStyle = '#000';
    ctx.font = '16px PT Mono';
    ctx.fillText('Ура вы победили!', INITIAL_X, 40);
    ctx.fillText('Список результатов: ', INITIAL_X, 60);

    for (var i = 0; i < times.length; i++) {
      ctx.globalAlpha = 1;
      ctx.fillText(Math.round(times[i]), INITIAL_X + (BAR_WIDTH + INDENT) * i, INITIAL_Y + (HISTOGRAM_HEIGHT - times[i] * STEP));
      if (names[i] === 'Вы') {
        ctx.fillStyle = 'red';
        ctx.globalAlpha = 1;
        drawColumn();
      } else {
        getRandomColor();
        drawColumn();
      }
      ctx.fillStyle = 'black';
      ctx.globalAlpha = 1;
      ctx.fillText(names[i], INITIAL_X + (BAR_WIDTH + INDENT) * i, INITIAL_Y + HISTOGRAM_HEIGHT + LINE_HEIGHT + 10);
    }
  };
})();
