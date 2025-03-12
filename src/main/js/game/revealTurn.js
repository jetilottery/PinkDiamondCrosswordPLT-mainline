define(function(require) {
  const gameFlow = require('skbJet/componentManchester/standardIW/gameFlow');
  const audio = require('skbJet/componentManchester/standardIW/audio');
  const spinner = require('game/components/spinner');
  const crosswordGrid = require('game/components/crosswordGrid');
  const yourLetters = require('game/components/yourLetters');
  const bonusLetters = require('game/components/bonusLetters');
  const scenarioData = require('skbJet/componentManchester/standardIW/scenarioData');

  async function revealTurn() {
    // start the spinner spinning if it isn't already (ie. we're in autoplay)
    await spinner.start(true);

    const wheelSounds = ['wheel1', 'wheel2', 'wheel3'];

    for (let i = 0; i < 3; i++) {
      await spinner.resolve(i, scenarioData.turn[i]);
      audio.play(wheelSounds[i]);
      audio.play('yourLetter');
      await yourLetters.reveal(scenarioData.turn[i]);
      crosswordGrid.match(scenarioData.turn[i], false);
    }

    const bonusLetter = scenarioData.turn[3];

    await spinner.resolve(3, bonusLetter);
    audio.play('wheel4');
    if (bonusLetter !== '.') {
      audio.play('pinkDiamond');
      audio.play('bonusLetter');
      await bonusLetters.reveal(bonusLetter);
      crosswordGrid.match(bonusLetter, true);
    }

    // Once all wheels are resolved we'll update the grid with hints or autoMarks
    crosswordGrid.process();

    // Pause after spin before continuing
    await new Promise(resolve => setTimeout(resolve, 500));

    gameFlow.next('END_TURN');
  }

  gameFlow.handle(revealTurn, 'REVEAL_TURN');
});
