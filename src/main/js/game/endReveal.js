define(function(require) {
  const gameFlow = require('skbJet/componentManchester/standardIW/gameFlow');
  const crosswordGrid = require('game/components/crosswordGrid');
  const prizeTable = require('game/components/prizeTable');


  async function endReveal() {
    await crosswordGrid.awaitComplete();
    await prizeTable.awaitComplete(function(){
      gameFlow.next('REVEAL_COMPLETE');
    });
  }

  gameFlow.handle(endReveal, 'END_REVEAL');
});
