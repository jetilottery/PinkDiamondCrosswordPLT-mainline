define(require => {
  const msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');

  let state = {
    words: [],
    cells: {},
    markedCells: {},
    matched: 0,
  };

  function addWord(letterArray, start, direction) {
    let word = letterArray[start];
    const cells = [start];

    function completeWord(i, increment, limit) {
      const nextCell = i + increment;
      const nextLetter = letterArray[nextCell];
      if (nextLetter && nextLetter !== '-' && nextCell < limit) {
        word = word + nextLetter;
        cells.push(nextCell);
        completeWord(nextCell, increment, limit);
      }
    }

    if (direction === 'DOWN') {
      completeWord(start, 11, 121);
    } else {
      completeWord(start, 1, (Math.floor(start / 11) + 1) * 11);
    }

    state.words.push(word);
    state.cells[word] = cells;
    state.markedCells[word] = [...cells];
  }

  function find(letterArray) {
    state.words = [];
    state.cells = {};
    state.markedCells = {};
    state.matched = 0;

    letterArray.forEach((letter, i, a) => {
      if (letter === '-') return;

      const col = i % 11;
      const row = Math.floor(i / 11);

      // If no letter preceded this one in the row and there is a letter in the following column
      // then we're at the start of a new word across
      if ((col === 0 || a[i - 1] === '-') && col < 10 && a[i + 1] !== '-') {
        addWord(a, i, 'ACROSS');
      }

      // If no letter preceded this one in the column and there is a letter in the following row
      // then we're at the start of a new word down
      if ((row === 0 || a[i - 11] === '-') && row < 10 && a[i + 11] !== '-') {
        addWord(a, i, 'DOWN');
      }
    });
  }

  function markCell(cell) {
    // Check each word in turn
    state.words.forEach(word => {
      // If the marked cell is part of the word
      const cellInWord = state.markedCells[word].indexOf(cell);
      if (cellInWord > -1) {
        // Mark the cell as marked off in the word
        state.markedCells[word][cellInWord] = true;
        // Check if any cells in the word have not been marked as true
        if (!state.markedCells[word].some(marked => marked !== true)) {
          // If they're all marked, the word is complete
          state.matched += 1;
          // publish the word's cells to subscribers
          msgBus.publish('Game.wordComplete', state.cells[word]);
        }
      }
    });
  }

  return {
    find,
    markCell,
    get matched() {
      return state.matched;
    }
  };
});
