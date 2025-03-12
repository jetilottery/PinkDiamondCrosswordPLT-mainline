define(function(require) {
  const dList = require('skbJet/componentManchester/standardIW/displayList');
  const letter = require('game/components/letter');

  let letters;
  let nextLetter = 0;

  function init() {
    letters = [
      letter(dList.yourLettersText1, dList.yourLettersAnim1),
      letter(dList.yourLettersText2, dList.yourLettersAnim2),
      letter(dList.yourLettersText3, dList.yourLettersAnim3),
      letter(dList.yourLettersText4, dList.yourLettersAnim4),
      letter(dList.yourLettersText5, dList.yourLettersAnim5),
      letter(dList.yourLettersText6, dList.yourLettersAnim6),
      letter(dList.yourLettersText7, dList.yourLettersAnim7),
      letter(dList.yourLettersText8, dList.yourLettersAnim8),
      letter(dList.yourLettersText9, dList.yourLettersAnim9),
      letter(dList.yourLettersText10, dList.yourLettersAnim10),
      letter(dList.yourLettersText11, dList.yourLettersAnim11),
      letter(dList.yourLettersText12, dList.yourLettersAnim12),
      letter(dList.yourLettersText13, dList.yourLettersAnim13),
      letter(dList.yourLettersText14, dList.yourLettersAnim14),
      letter(dList.yourLettersText15, dList.yourLettersAnim15),
      letter(dList.yourLettersText16, dList.yourLettersAnim16),
      letter(dList.yourLettersText17, dList.yourLettersAnim17),
      letter(dList.yourLettersText18, dList.yourLettersAnim18),
    ];
  }

  function reset() {
    letters.forEach(letter => letter.reset());
    nextLetter = 0;
  }

  function reveal(l) {
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
