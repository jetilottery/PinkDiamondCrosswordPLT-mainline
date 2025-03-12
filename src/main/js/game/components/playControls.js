define(require => {
  const msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');
  const dList = require('skbJet/componentManchester/standardIW/displayList');
  const toggle = require('game/components/diamondToggle');
  const state = require('game/state/playControls');
  const audio = require('skbJet/componentManchester/standardIW/audio');
  const resources = require('skbJet/component/resourceLoader/resourceLib');

  let hintTimeline;
  let autoMarkTimeline;

  function init() {
    hintTimeline = toggle(
      dList.hintTrack,
      dList.hintSlider,
      dList.hintTrackActive,
      dList.hintSliderActive
    );
    autoMarkTimeline = toggle(
      dList.autoMarkTrack,
      dList.autoMarkSlider,
      dList.autoMarkTrackActive,
      dList.autoMarkSliderActive
    );

    // Update state with config values. autoMark will override hint.
    state.hint = resources.i18n.config && resources.i18n.config.hintsStartEnabled;
    state.autoMark = resources.i18n.config && resources.i18n.config.autoMarkStartEnabled;

    // Set toggle timelines to toggled state if they are enabled at init
    if (state.hint) {
      hintTimeline.progress(1);
    }
    if (state.autoMark) {
      hintTimeline.progress(1);
    }

    // Listen for clicks on the whole control and toggle state accordingly
    dList.autoMarkControl.on('press', () => {
      audio.play('click');
      state.toggleAutoMark();
    });
    dList.hintControl.on('press', () => {
      audio.play('click');
      state.toggleHint();
    });
  }

  // Play timelines forwards/backwards when state is toggled on/off
  msgBus.subscribe('Game.hint', v => (v ? hintTimeline.play() : hintTimeline.reverse()));
  msgBus.subscribe(
    'Game.autoMark',
    v => (v ? autoMarkTimeline.play() : autoMarkTimeline.reverse())
  );

  // Initiating autoPlay should also turn on autoMark
  msgBus.subscribe('Game.AutoPlayStart', () => (state.autoMark = true));

  return {
    init,
  };
});
