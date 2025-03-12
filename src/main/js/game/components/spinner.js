define(function(require) {
  const PIXI = require('com/pixijs/pixi');
  const displayList = require('skbJet/componentManchester/standardIW/displayList');
  const audio = require('skbJet/componentManchester/standardIW/audio');
  const wheel = require('game/components/wheel');
  const bonusWheel = require('game/components/bonusWheel');

  const START_STAGGER = 0.25;
  const IDLE_INTERVAL = 3;

  let wheels;
  let startPromise;
  let idleTimeout;

  function init() {
    // init wheels from outside to inside (bonus)
    wheels = [
      wheel(displayList.wheel_3, 202),
      wheel(displayList.wheel_2, 158),
      wheel(displayList.wheel_1, 116),
      bonusWheel(displayList.pinkWheel, displayList.diamondContainer, displayList.trailContainer),
    ];
    

    // Stop button is disabled by default
    displayList.stopButton.enabled = false;

    // Set the stop button's hit area to a circle, roughtly the size of the inner wheel rim
    displayList.stopButton.hitArea = new PIXI.Circle(0, 0, 55);

    // Idle animation
    displayList.stopButtonIdle.visible = false;
    displayList.stopButtonIdle.loop = false;
    displayList.stopButtonIdle.onComplete = () => {
      displayList.stopButtonIdle.visible = false;
    };


    //start();
  }

  function start(quick) {
    if (!startPromise) {
      startPromise = Promise.all(wheels.map((wheel, i) => wheel.start(i * START_STAGGER, quick)));
      audio.play('wheelStart');
    }
    return startPromise;
  }

  function idleAnim() {
    displayList.stopButtonIdle.visible = true;
    displayList.stopButtonIdle.gotoAndPlay(0);
    idleTimeout = setTimeout(idleAnim, IDLE_INTERVAL * 1000);
  }

  function enable() {
    displayList.stopButton.enabled = true;
    idleAnim();
  }

  function resolve(wheel, letter) {
    if (idleTimeout) {
      clearTimeout(idleTimeout);
    }

    startPromise = undefined;
    return wheels[wheel].resolve(letter);
  }

  return {
    init,
    start,
    enable,
    resolve,
  };
});
