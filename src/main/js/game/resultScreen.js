define(function(require) {
  const gameFlow = require('skbJet/componentManchester/standardIW/gameFlow');
  const meterData = require('skbJet/componentManchester/standardIW/meterData');
  const resultPlaque = require('game/components/resultPlaque');
  const audio = require('skbJet/componentManchester/standardIW/audio');

  function resultScreen() {
    if (meterData.totalWin > 0) {
      resultPlaque.showWin();
      audio.play('winTerminator');
    } else {
      resultPlaque.showLose();
      audio.play('loseTerminator');
    }
  }

  gameFlow.handle(resultScreen, 'RESULT_SCREEN');
});
