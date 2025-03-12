define(() => {
  return function scenarioTransform(scenarioString) {
    const pieces = scenarioString.split('|');

    const cells = [...pieces[0]];

    const turns = pieces.slice(1).map(turnString => [...turnString]);

    const letters = turns.flat().filter(letter => letter !== '.');

    return {
      cells,
      turns,
      letters,
    };
  };
});
