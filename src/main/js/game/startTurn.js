define(function(require) {
  const msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');
  const gameFlow = require('skbJet/componentManchester/standardIW/gameFlow');
  const displayList = require('skbJet/componentManchester/standardIW/displayList');
  const spinner = require('game/components/spinner');
  const audio = require('skbJet/componentManchester/standardIW/audio');
  const autoPlay = require('skbJet/componentManchester/standardIW/autoPlay');

  async function startTurn() {
    // Pause before starting the next spin
    await new Promise(resolve => setTimeout(resolve, 1000));

    // start the spinner spinning if it isn't already
    await spinner.start();

    function continueToNextState() {
      // Remove listeners/subscribers as we don't want to trigger next state again
      displayList.stopButton.off('press', onStopButton);
      msgBus.unsubscribe('Game.AutoPlayStart', continueToNextState);
      displayList.stopButton.enabled = false;
      // Continue to the next state
      gameFlow.next('REVEAL_TURN');
    }
    
    // If autoplay was turned on since the last turn continue immediately
    if (autoPlay.enabled) {
      continueToNextState();
      // No need to enable the stop button or add listeners
      return;
    }

    function onStopButton() {
      audio.play('stopButton');
      continueToNextState();
    }

    // Otherwise wait for the stop button to be pressed
    spinner.enable();
    displayList.stopButton.on('press', onStopButton);
    
    // Or wait for autoplay to be turned on which also triggers the next state
    msgBus.subscribe('Game.AutoPlayStart', continueToNextState);
  }

  gameFlow.handle(startTurn, 'START_TURN');
});
