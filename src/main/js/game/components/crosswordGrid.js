define(require => {
  const Timeline = require('com/gsap/TimelineLite');
  const msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');
  const displayList = require('skbJet/componentManchester/standardIW/displayList');
  const letterCell = require('game/components/letterCell');
  const words = require('game/state/words');
  const audio = require('skbJet/componentManchester/standardIW/audio');
  require('game/state/playControls');

  let cells;

  function init() {
    // Init an empty 121 item array and fill it with letterCells
    cells = Array(121)
      .fill()
      .map((val, i) => {
        const cell = letterCell(i);
        displayList.cellBGs.addChild(cell.layers.bg);
        displayList.cellHints.addChild(cell.layers.hintFrame);
        displayList.cellMarkBGs.addChild(cell.layers.markBG);
        displayList.cellBonusBGs.addChild(cell.layers.bonusBG);
        displayList.cellAwardBGs.addChild(cell.layers.awardBG);
        displayList.cellLetters.addChild(cell.layers.letter);
        return cell;
      });
  }

  function transition(letters, duration) {
    const LETTER_OFFSET = duration / 10;

    const tl = new Timeline();

    cells.forEach((cell, i) => {
      const dx = Math.abs(5 - (i % 11));
      const dy = Math.abs(5 - Math.floor(i / 11));
      const position = dx * LETTER_OFFSET + dy * LETTER_OFFSET;
      tl.add(cell.transition(letters && letters[i], duration), position);
    });
  }

  function populate(letters) {
    words.find(letters);
    transition(letters, 1);
  }

  function match(revealedLetter, bonus) {
    if (!revealedLetter || revealedLetter === '.') {
      return;
    }
    // loop over all the cells and match the new latter against each
    cells.forEach(cell => cell.match(revealedLetter, bonus));
  }

  function process() {
    // loop over all the cells and process hints/autoMark
    cells.forEach(cell => cell.process());
  }

  function reset() {
    transition(undefined, 0.5);
  }

  function awaitComplete() {
    return Promise.all(cells.map(cell => cell.awaitComplete()));
  }

  // Listen for hint state change
  msgBus.subscribe('Game.hint', hintState => {
    cells.forEach(cell => cell.hint(hintState));
  });
  // Listen for auto mark state change
  msgBus.subscribe('Game.autoMark', autoMarkState => {
    if (autoMarkState) {
      cells.forEach(cell => cell.mark());
    }
  });

  // Listen for completed words
  msgBus.subscribe('Game.wordComplete', completedCells => {
    audio.play('wordMatch');
    completedCells.forEach(i => cells[i].award());
  });

  return {
    init,
    populate,
    match,
    process,
    reset,
    awaitComplete,
  };
});
