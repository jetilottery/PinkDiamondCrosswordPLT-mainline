define(function(require) {
  const dList = require('skbJet/componentManchester/standardIW/displayList');
  const letter = require('game/components/letter');

  let letters;
  let nextLetter = 0;

  function init() {
    letters = [
      letter(dList.bonusLettersText1, dList.bonusLettersAnim1),
      letter(dList.bonusLettersText2, dList.bonusLettersAnim2),
      letter(dList.bonusLettersText3, dList.bonusLettersAnim3),
    ];
  }

  function reset() {
    letters.forEach(letter => letter.reset());
    nextLetter = 0;
  }

  function reveal(l) {
    if (l === '.') {
      return;
    }

    const letter = letters[nextLetter];

    // increment letter counter
    nextLetter += 1;
    
    return letter.reveal(l);
  }

  return {
    init,
    reset,
    reveal,
  };
});
