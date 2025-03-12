define(require => {
  const PIXI = require('com/pixijs/pixi');
  const Timeline = require('com/gsap/TimelineLite');
  const textStyles = require('game/display/textStyles');
  const playControls = require('game/state/playControls');
  const scenarioData = require('skbJet/componentManchester/standardIW/scenarioData');
  const words = require('game/state/words');
  const audio = require('skbJet/componentManchester/standardIW/audio');

  require('com/gsap/plugins/PixiPlugin');
  require('com/gsap/easing/EasePack');
  require('com/gsap/TweenLite');

  const Tween = window.TweenLite;

  const DEFAULT = 0;
  const MATCHED = 1;
  const MARKED = 2;
  const AWARDED = 3;

  const WIDTH = 48;
  const HEIGHT = 48;

  function drawRect(fill, fillAlpha, stroke = 0, strokeWidth = 0) {
    const rect = new PIXI.Graphics();
    rect.beginFill(fill, fillAlpha);
    rect.lineStyle(strokeWidth, stroke);
    rect.drawRect(WIDTH / -2, HEIGHT / -2, WIDTH, HEIGHT);
    rect.endFill();
    return rect;
  }

  return function letterCell(i) {
    let state = DEFAULT;
    let isBonusLetter = false;
    let isRevealLetter = false;
    let markCallback;

    const cx = i % 11;
    const cy = Math.floor(i / 11);

    // Position cell in an 11x11 grid
    const position = new PIXI.Point();
    position.x = WIDTH * cx;
    position.y = HEIGHT * cy;

    // BG
    const bg = drawRect(0x393939, 0.8, 0x484848, 1);
    const markBG = drawRect(0xea768e, 1, 0x484848, 1);
    const bonusBG = drawRect(0xe81f6d, 1, 0x484848, 1);
    const awardBG = drawRect(0x84004d, 1, 0xfaf994, 3);
    const flashBG = drawRect(0xffffff, 1);
    markBG.visible = false;
    bonusBG.visible = false;
    awardBG.visible = false;
    flashBG.alpha = 0;

    // Image overlay
    const t = PIXI.utils.TextureCache.bigDiamond;
    // duplicate the texture and create a new sprite
    const bgImage = new PIXI.Texture(t.baseTexture, t.frame.clone());
    const bgSprite = new PIXI.Sprite(bgImage);
    // bgSprite.alpha = 0.5;
    bgSprite.anchor.set(0.5);
    // crop the cloned texture to the area covered by this cell
    const segW = bgImage.width / 11;
    const segH = bgImage.height / 11;
    bgImage.frame.width = segW;
    bgImage.frame.x += segW * cx;
    bgImage.frame.height = segH;
    bgImage.frame.y += segH * cy;
    bgImage._updateUvs();
    // scale the sprite to fill the cell and add it to the background
    bgSprite.width = WIDTH;
    bgSprite.height = HEIGHT;
    bg.addChild(bgSprite);

    // Letter
    const letter = new PIXI.Text('', textStyles.gridLetter);
    letter.anchor.set(0.5);

    // Hint frame
    const hintFrame = PIXI.Sprite.fromFrame('hint_rectangle');
    hintFrame.anchor.set(0.5);
    hintFrame.alpha = 0;
    hintFrame.visible = false;
    const hintTl = new Timeline();
    hintTl.to(hintFrame, 0.5, { alpha: 1, ease: window.Sine.easeInOut });
    hintTl.to(hintFrame, 0.5, {
      alpha: 0,
      ease: window.Sine.easeInOut,
      onComplete: () => hintTl.play(0),
    });

    // Position everything at the same point. We can't use a single container because each layer
    // needs to be grouped with layers from other cells. So for example the hint frames from all
    // cells sit in front of the background layers of all cells.
    bg.position = markBG.position = bonusBG.position = awardBG.position = letter.position = hintFrame.position = position;

    awardBG.addChild(flashBG);

    /**
     * @function setLetter
     * @description updates the cell's displayed letter, or hides the cell for blank "-" values
     */
    function setLetter(val) {
      // Letter not set, reset to default state
      if (!val) {
        reset();
        return;
      }

      // Blank letter, hide the cell
      if (val === '-') {
        letter.text = '';
        letter.visible = false;
        bg.visible = false;
        return;
      }

      isRevealLetter = scenarioData.scenario.letters.includes(val);

      // Actual letter value, update the text field
      letter.text = val;
      // hide the bg image section
      bgSprite.visible = false;
    }

    /**
     * @function transition
     * @description animates the cell out, updates the letter, then animates it back in
     */
    function transition(val, duration) {
      const tl = new Timeline();
      const layers = [bg, markBG, bonusBG, awardBG, letter];

      tl.to(layers, duration / 2, {
        pixi: { scale: 0.5 },
        alpha: 0,
        onComplete: () => setLetter(val),
      });

      tl.to(layers, duration / 2, {
        pixi: { scale: 1 },
        alpha: 1,
      });

      return tl;
    }

    function reset() {
      letter.text = '';
      letter.style = textStyles.gridLetter;
      letter.visible = true;
      bgSprite.visible = true;
      hintFrame.visible = false;
      isBonusLetter = false;
      isRevealLetter = false;
      markCallback = false;
      state = DEFAULT;

      bg.visible = true;
      markBG.visible = false;
      bonusBG.visible = false;
      awardBG.visible = false;
    }

    function hint(toggle) {
      hintFrame.visible = toggle && state === MATCHED;
    }

    function mark() {
      if (state === MATCHED) {
        state = MARKED;
        bg.interactive = false;
        hintFrame.visible = false;

        // markBG.alpha = 0;
        if (isBonusLetter) {
          bonusBG.visible = true;
          Tween.fromTo(bonusBG, 0.25, { alpha: 0 }, { alpha: 1 });
        } else {
          markBG.visible = true;
          Tween.fromTo(markBG, 0.25, { alpha: 0 }, { alpha: 1 });
        }

        words.markCell(i);
        if (markCallback) {
          markCallback();
        }
      }
    }

    function match(val, isBonus) {
      if (state === DEFAULT && letter.text === val) {
        bg.interactive = true;
        bg.buttonMode = true;
        state = MATCHED;
        isBonusLetter = isBonus;
      }
    }

    function process() {
      if (state === MATCHED) {
        if (playControls.autoMark) {
          // If autoMark is enabled then mark the cell immediately
          mark();
        } else if (playControls.hint) {
          // Or if hint is enabled then show the hint (they can't both be active)
          hint(true);
        }
      }
    }

    function award() {
      if (state === MARKED) {
        state = AWARDED;
        // Hide both the marked backgrounds
        markBG.visible = false;
        bonusBG.visible = false;
        // Show the awarded bckground, with the flash on top
        awardBG.visible = true;
        flashBG.visible = true;
        flashBG.alpha = 1;
        // Fade out the flash
        Tween.to(flashBG, 0.5, { alpha: 0 });
      }
    }

    function awaitComplete() {
      if (isRevealLetter && state < MARKED) {
        return new Promise(resolve => {
          markCallback = resolve;
        });
      }
      return Promise.resolve();
    }

    bg.on('pointertap', (ev) => {
      // For mouse interaction ignore anything other than the primary mouse button
      if (ev.data.pointerType === 'mouse' && ev.data.button !== 0) {
        return;
      }

      audio.play('letterMark');
      mark();
    });

    return {
      layers: {
        bg,
        hintFrame,
        markBG,
        bonusBG,
        awardBG,
        letter,
      },
      transition,
      reset,
      hint,
      mark,
      match,
      process,
      award,
      awaitComplete,
    };
  };
});
