define(function(require) {
  const PIXI = require('com/pixijs/pixi');
  const textStyles = require('skbJet/componentManchester/standardIW/textStyles');
  const Timeline = require('com/gsap/TimelineLite');
  require('com/gsap/easing/EasePack');

  const RPM = 45;
  const SPEED = 60 / RPM;

  // Generate an array of all posssible letters a-z
  const ALPHABET = [...'QWERTYUIOPASDFGHJKLZXCVBNM'];

  const NUMBER_OF_LETTERS = 15;
  const ANGLE = (Math.PI * 2) / NUMBER_OF_LETTERS;
  const BASE_ROTATION = 0.13;

  return function wheel(sprite, radius) {
    function createLetter(letter, i) {
      const text = new PIXI.Text(letter, textStyles.wheelLetter);
      text.pivot.x = radius;
      text.anchor.set(0.5);
      text.rotation = ANGLE * i;
      return text;
    }

    // Randomize the alphabet, pick some letters and create the text objects
    const letters = ALPHABET.sort(() => Math.random() - 0.5)
      .slice(0, NUMBER_OF_LETTERS)
      .map(createLetter);

    // Add all the letter text objects as children of the wheel sprite
    sprite.addChild.apply(sprite, letters);

    // Start at a slight rotation so the letters line up with the slot segment
    sprite.rotation = BASE_ROTATION;

    let spinTL;

    function start(delay, quick) {
      return new Promise(resolve => {
        spinTL = new Timeline();
        const easeInTurns = 0.2;
        const easeInRotation = Math.PI * 2 * easeInTurns;
        let easeInDuration = SPEED * easeInTurns;
        let ease = window.Linear.easeNone;
        if (!quick) {
          easeInDuration = easeInDuration * (0.138 / 0.034);
          ease = window.Back.easeIn.config(1);
        }
        spinTL.to(sprite, easeInDuration, {
          rotation: `-=${easeInRotation}`,
          ease: ease,
          delay: delay,
          onComplete: () => resolve(),
        });
        spinTL.addLabel('spinning');
        spinTL.to(sprite, SPEED, {
          rotation: `-=${Math.PI * 2}`,
          ease: window.Linear.easeNone,
          onComplete: () => spinTL.play('spinning'),
        });
      });
    }

    function resolve(letter) {
      return new Promise(r => {
        // Stop the looping timeline
        spinTL.kill();

        const resolveTL = new Timeline();

        // Calculate how far to the next letter
        const startR = BASE_ROTATION - sprite.rotation;
        const nextLetter = Math.ceil(startR / ANGLE) + 1;
        const nextR = nextLetter * ANGLE;

        // Set the letter segment we're going to land on to the correct letter
        letters[nextLetter % NUMBER_OF_LETTERS].text = letter;

        // Jump to that letter
        sprite.rotation = BASE_ROTATION - nextR;

        // Quickly tween a little beyond the letter and then snap back
        resolveTL.to(sprite, 0.1, {
          rotation: BASE_ROTATION - nextR - ANGLE / 6,
          ease: window.Power3.easeOut,
        });
        resolveTL.to(sprite, 0.1, {
          rotation: BASE_ROTATION - nextR,
          ease: window.Power3.easeOut,
          onComplete: () => r(),
        });
      });
    }

    return {
      start,
      resolve,
    };
  };
});
