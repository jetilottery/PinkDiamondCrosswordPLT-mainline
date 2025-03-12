define((require) => {
  const PIXI = require('com/pixijs/pixi');
  const displayList = require('skbJet/componentManchester/standardIW/displayList');
  require('com/pixijs/pixi-particles');

  const particleConf = {
    "alpha": {
      "start": 0,
      "end": 0.75
    },
    "scale": {
      "start": 0.5,
      "end": 0.001,
      "minimumScaleMultiplier": 0.5
    },
    "color": {
      "start": "#ffffff",
      "end": "#ede185"
    },
    "speed": {
      "start": 30,
      "end": 0,
      "minimumSpeedMultiplier": 1.5
    },
    "acceleration": {
      "x": 0,
      "y": 10
    },
    "maxSpeed": 0,
    "startRotation": {
      "min": 260,
      "max": 280
    },
    "noRotation": false,
    "rotationSpeed": {
      "min": 0,
      "max": 0
    },
    "lifetime": {
      "min": 6,
      "max": 8
    },
    "blendMode": "normal",
    "frequency": 0.07,
    "emitterLifetime": -1,
    "maxParticles": 200,
    "pos": {
      "x": 0,
      "y": 0
    },
    "addAtBack": false,
    "spawnType": "rect",
    "spawnRect": {
      "x": 0,
      "y": 0,
      "w": 1440,
      "h": 275
    },
    autoUpdate: true,
  };
  
  function init() {
    const emitter = new PIXI.particles.Emitter(
      displayList.backgroundParticles,
      [PIXI.Texture.fromFrame('particle'), PIXI.Texture.fromFrame('hardParticle')],
      particleConf
    );

    emitter.spawnRect.width = displayList.background.width;
  }

  return {
    init,
  };
});
