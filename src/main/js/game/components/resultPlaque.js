define(require => {
  const Timeline = require('com/gsap/TimelineLite');
  const Plaque = require('skbJet/componentManchester/standardIW/components/plaque');
  const dList = require('skbJet/componentManchester/standardIW/displayList');
  const SKBeInstant = require('skbJet/component/SKBeInstant/SKBeInstant');
  const meterData = require('skbJet/componentManchester/standardIW/meterData');

  let winPlaque;
  let losePlaque;
  const sweepTimeline = new Timeline({ paused: true, onComplete: () => sweepTimeline.play(0) });

  function showAndPlay(animation) {
    animation.visible = true;
    animation.gotoAndPlay(0);
  }

  function hideThis() {
    this.visible = false;
  }

  function init() {
    // Create win and lose plaques and add them to the plaque container
    winPlaque = new Plaque(dList.winPlaque);
    losePlaque = new Plaque(dList.losePlaque);
    dList.resultPlaqueContainer.addChild(winPlaque, losePlaque);

    // Connect the plaque close buttons
    dList.winPlaqueCloseButton.on('press', () => winPlaque.hide());
    dList.losePlaqueCloseButton.on('press', () => losePlaque.hide());

    // Apply the win plaque light sweep mask
    dList.plaqueLightSweepContainer.mask = dList.winPlaqueMask;

    // Add the light sweep tween to the timeline
    sweepTimeline.fromTo(dList.plaqueLightSweep, 2, {
      x: -dList.plaqueLightSweep.width,
    }, {
      x: dList.winPlaqueBG.width,
      ease: window.Power3.easeInOut,
    });

    // Hide all the sparkles and add callbacks to re-hide them on complete
    dList.winPlaqueSparkle1.visible = false;
    dList.winPlaqueSparkle1.onComplete = hideThis;
    dList.winPlaqueSparkle2.visible = false;
    dList.winPlaqueSparkle2.onComplete = hideThis;
    dList.winPlaqueSparkle3.visible = false;
    dList.winPlaqueSparkle3.onComplete = hideThis;
    dList.winPlaqueSparkle4.visible = false;
    dList.winPlaqueSparkle4.onComplete = hideThis;

    // Play each of the sparkle animations in the timeline
    sweepTimeline.call(() => showAndPlay(dList.winPlaqueSparkle1), null, null, 0);
    sweepTimeline.call(() => showAndPlay(dList.winPlaqueSparkle2), null, null, 0.66);
    sweepTimeline.call(() => showAndPlay(dList.winPlaqueSparkle3), null, null, 0.33);
    sweepTimeline.call(() => showAndPlay(dList.winPlaqueSparkle4), null, null, 1);
  }

  function showWin() {
    dList.winPlaqueValue.text = SKBeInstant.formatCurrency(meterData.totalWin).formattedAmount;
    winPlaque.show();
    sweepTimeline.gotoAndPlay(0);
  }

  function showLose() {
    losePlaque.show();
  }

  function reset() {
    // Hide both the plaques
    winPlaque.hide(0);
    losePlaque.hide(0);

    sweepTimeline.gotoAndStop(0);
    // Reset the win value just in case
    dList.winPlaqueValue.text = '';
  }

  return {
    init,
    showWin,
    showLose,
    reset,
  };
});
