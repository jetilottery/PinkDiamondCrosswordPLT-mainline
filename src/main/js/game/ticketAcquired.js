define((require) => {
  const scenarioData = require('skbJet/componentManchester/standardIW/scenarioData');
  const gameFlow = require('skbJet/componentManchester/standardIW/gameFlow');
  const crosswordGrid = require('game/components/crosswordGrid');
  const audio = require('skbJet/componentManchester/standardIW/audio');

  function ticketAcquired() {
    crosswordGrid.populate(scenarioData.scenario.cells);

    if (!audio.isPlaying('music')) {
      audio.play('music', true);
    }

    gameFlow.next('START_TURN');
  }

  gameFlow.handle(ticketAcquired, 'TICKET_ACQUIRED');
});
