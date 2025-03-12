define(function(require) {
  const gameFlow = require('skbJet/componentManchester/standardIW/gameFlow');
  const spinner = require('game/components/spinner');
  const yourLetters = require('game/components/yourLetters');
  const bonusLetters = require('game/components/bonusLetters');
  const crosswordGrid = require('game/components/crosswordGrid');
  const prizeTable = require('game/components/prizeTable');
  const resultPlaque = require('game/components/resultPlaque');
  const audio = require('skbJet/componentManchester/standardIW/audio');
  const meterData = require('skbJet/componentManchester/standardIW/meterData');
  const msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');
  const SKBeInstant = require('skbJet/component/SKBeInstant/SKBeInstant');

  function gameReset(moveToMoney) {
    yourLetters.reset();
    bonusLetters.reset();
    crosswordGrid.reset();
    prizeTable.reset();
    resultPlaque.reset();

    if (!moveToMoney){
      // Start the wheels spinning again during the buy screen
      spinner.start();

      // Restart background music
      audio.play('music', true);
    
      gameFlow.next();
    }
    else{
      meterData.win = SKBeInstant.config.defaultWinsValue;
    }
  }

  msgBus.subscribe('jLotteryGame.playerWantsToMoveToMoneyGame', function(){
    gameReset(true);
  });

  gameFlow.handle(gameReset, 'GAME_RESET');
});
