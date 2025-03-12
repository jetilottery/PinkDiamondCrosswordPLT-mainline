define(require => {
  const SKBeInstant = require('skbJet/component/SKBeInstant/SKBeInstant');
  const msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');
  const displayList = require('skbJet/componentManchester/standardIW/displayList');
  const words = require('game/state/words');
  const prizeData = require('skbJet/componentManchester/standardIW/prizeData');
  const meterData = require('skbJet/componentManchester/standardIW/meterData');
  const audio = require('skbJet/componentManchester/standardIW/audio');
  const Timeline = require('com/gsap/TimelineLite');
  require('com/gsap/TweenLite');

  const Tween = window.TweenLite;

  const keys = ['m3', 'm4', 'm5', 'm6', 'm7', 'm8', 'm9', 'm10'];
  let fields;
  let highlights;
  let glows;
  let completeCallback;
  let completeTimeout;

  const tl = new Timeline({ paused: true });

  function reset() {
    keys.forEach(key => {
      highlights[key].visible = false;
      glows[key].visible = false;
    });
    tl.pause(0);
    completeCallback = undefined;
    completeTimeout = undefined;
  }

  function init() {
    fields = {
      m10: displayList.prizeValue8,
      m9: displayList.prizeValue7,
      m8: displayList.prizeValue6,
      m7: displayList.prizeValue5,
      m6: displayList.prizeValue4,
      m5: displayList.prizeValue3,
      m4: displayList.prizeValue2,
      m3: displayList.prizeValue1,
    };

    highlights = {
      m10: displayList.prizeBoxHighlight8,
      m9: displayList.prizeBoxHighlight7,
      m8: displayList.prizeBoxHighlight6,
      m7: displayList.prizeBoxHighlight5,
      m6: displayList.prizeBoxHighlight4,
      m5: displayList.prizeBoxHighlight3,
      m4: displayList.prizeBoxHighlight2,
      m3: displayList.prizeBoxHighlight1,
    };

    glows = {
      m10: displayList.prizeBoxGlow8,
      m9: displayList.prizeBoxGlow7,
      m8: displayList.prizeBoxGlow6,
      m7: displayList.prizeBoxGlow5,
      m6: displayList.prizeBoxGlow4,
      m5: displayList.prizeBoxGlow3,
      m4: displayList.prizeBoxGlow2,
      m3: displayList.prizeBoxGlow1,
    };

    // Hide all the prize box highlights by defualt
    reset();

    updatePrizes(prizeData.prizeTable);

    keys.forEach((key, i) => {
      // Fade in the highlight
      tl.fromTo(
        highlights[key],
        0.5,
        { alpha: 0 },
        {
          alpha: 1,
          onStart: () => {
            audio.play(key);
            highlights[key].visible = true;
          },
        },
        i * 0.5
      );
      // Flash and fade out the glow at the same time
      tl.fromTo(
        glows[key],
        0.5,
        { alpha: 1 },
        { alpha: 0, onStart: () => (glows[key].visible = true) },
        i * 0.5
      );
      // Add a label. This is the point in the timeline to stop at to show this prize
      tl.addLabel(key);
      // Fade out the highlight as the next one fades in
      tl.to(
        highlights[key],
        0.5,
        { alpha: 0, onComplete: () => (highlights[key].visible = false) },
        (i + 1) * 0.5
      );
    });

    function updatePrizes(data) {
      keys.forEach(
        key => (fields[key].text = SKBeInstant.formatCurrency(data[key]).formattedAmount)
      );
    }
    msgBus.subscribe('PrizeData.PrizeTable', updatePrizes);
  }

  // Listen for completed words
  msgBus.subscribe('Game.wordComplete', () => {
    if (words.matched >= 3) {
      const target = tl.getLabelTime(keys[words.matched - 3]);
      const current = tl.time();
      const duration = target - current;

      Tween.to(tl, duration, {
        time: target,
        ease: window.Linear.easeNone,
        onComplete() {
          tl.pause();
          meterData.win = prizeData.prizeTable[keys[words.matched - 3]];
          if (completeCallback) {
            completeCallback();
          }
        },
      });
    }
  });

  function awaitComplete(callback) {
    if (meterData.win === meterData.totalWin) {
      return new Promise(resolve => {
        resolve();
        callback();
      });
    }
    return new Promise(resolve => {
      completeTimeout = setTimeout(function(){
        resolve();
        callback();
      },5000);
      completeCallback = function(){
        resolve();
        callback();
        clearTimeout(completeTimeout);
      };
    });
  }

  return {
    init,
    reset,
    awaitComplete,
  };
});
