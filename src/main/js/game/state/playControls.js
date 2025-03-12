define((require) => {
  const msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');

  const _state = {
    autoMark: false,
    hint: true,
  };

  const state = {
    get autoMark() {
      return _state.autoMark;
    },
    set autoMark(v) {
      _state.autoMark = !!v;
      msgBus.publish('Game.autoMark', _state.autoMark);
      // If hint is enabled, enabling autoMark will disable it
      if (v && _state.hint) {
        state.hint = false;
      }
    },

    get hint() {
      return _state.hint;
    },
    set hint(v) {
      _state.hint = !!v;
      msgBus.publish('Game.hint', _state.hint);
      // If autoMark is enabled, enabling hint will disable it
      if (v && _state.autoMark) {
        state.autoMark = false;
      }
    },

    toggleAutoMark() {
      state.autoMark = !_state.autoMark;
    },
    toggleHint() {
      state.hint = !_state.hint;
    },
  };

  return state;
});
