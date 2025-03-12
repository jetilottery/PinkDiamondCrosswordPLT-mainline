define(function(require) {
  const PIXI = require('com/pixijs/pixi');
  const Timeline = require('com/gsap/TimelineLite');
  require('com/gsap/easing/EasePack');
  require('com/pixijs/pixi-particles');

  const RPM = 60;
  const SPEED = 60 / RPM;

  const NUMBER_OF_SlOTS = 7;
  const ANGLE = (Math.PI * 2) / NUMBER_OF_SlOTS;
  const BASE_ROTATION = -0.025;

  const particleConf = {
    alpha: {
      start: 1,
      end: 0,
    },
    scale: {
      start: 0.2,
      end: 0.01,
      minimumScaleMultiplier: 1,
    },
    color: {
      start: '#ffe5fc',
      end: '#f253dd',
    },
    speed: {
      start: 50,
      end: 10,
      minimumSpeedMultiplier: 1,
    },
    acceleration: {
      x: 0,
      y: 0,
    },
    maxSpeed: 0,
    startRotation: {
      min: 0,
      max: 360,
    },
    noRotation: false,
    rotationSpeed: {
      min: 0,
      max: 0,
    },
    lifetime: {
      min: 1,
      max: 2,
    },
    blendMode: 'normal',
    frequency: 0.008,
    emitterLifetime: 0.4,
    maxParticles: 200,
    pos: {
      x: 0,
      y: 0,
    },
    addAtBack: false,
    spawnType: 'circle',
    spawnCircle: {
      x: 0,
      y: 0,
      r: 10,
    },
    autoUpdate: true,
  };

  return function bonusWheel(wheelSprite, diamondContainer, trailContainer) {
    const emitter = new PIXI.particles.Emitter(
      trailContainer,
      [PIXI.Texture.fromFrame('particle')],
      particleConf
    );
    emitter.emit = false;

    wheelSprite.rotation = BASE_ROTATION;
    diamondContainer.rotation = BASE_ROTATION;

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
        spinTL.to([wheelSprite, diamondContainer], easeInDuration, {
          rotation: `-=${easeInRotation}`,
          ease: ease,
          delay: delay,
          onComplete: () => resolve(),
        });
        spinTL.addLabel('spinning');
        spinTL.to([wheelSprite, diamondContainer], SPEED, {
          rotation: `-=${Math.PI * 2}`,
          ease: window.Linear.easeNone,
          onComplete: () => spinTL.play('spinning'),
          onUpdate() {
            trailContainer.toLocal(
              diamondContainer.children[0].position,
              diamondContainer,
              emitter.spawnPos
            );
            if (!emitter.emit && wheelSprite.rotation % (Math.PI * 2) < -5.75) {
              emitter.emit = true;
            }
          },
        });
      });
    }

    function resolve(result) {
      return new Promise(r => {
        // Stop the looping timeline
        spinTL.kill();

        const resolveTL = new Timeline();

        // Calculate how far to the next slot
        const startR = BASE_ROTATION - wheelSprite.rotation;
        const nextSlot = Math.ceil(startR / ANGLE);
        const diamondSlot = nextSlot + (NUMBER_OF_SlOTS - (nextSlot % NUMBER_OF_SlOTS));
        const deltaSlot = diamondSlot - nextSlot;
        const randomSlot = diamondSlot + (deltaSlot > 3 ? -1 : 1) * Math.ceil(Math.random() * 3);
        const nextR = (result === '.' ? randomSlot : diamondSlot) * ANGLE;
        const deltaR = nextR - startR;
        // And how long it will take to get there at linear speed
        const duration = (deltaR / (Math.PI * 2)) * SPEED;
        // Continue spinning to the next slot. This should appear seamless from the looping
        // timeline, but means the actual "resolve" part always happens over a consistant distance
        resolveTL.to([wheelSprite, diamondContainer], duration, {
          rotation: BASE_ROTATION - nextR,
          ease: window.Linear.easeNone,
        });

        // Quickly tween a little beyond the letter and then snap back
        resolveTL.to([wheelSprite, diamondContainer], 0.1, {
          rotation: BASE_ROTATION - nextR - ANGLE / 12,
          ease: window.Power3.easeOut,
        });
        resolveTL.to([wheelSprite, diamondContainer], 0.1, {
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
