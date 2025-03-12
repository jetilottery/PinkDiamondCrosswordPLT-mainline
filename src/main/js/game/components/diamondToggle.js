define(require => {
  const Timeline = require('com/gsap/TimelineLite');

  return function toggle(track, slider, ...activeItems) {
    const tl = new Timeline({ paused: true });

    tl.fromTo(
      activeItems,
      0.25,
      { alpha: 0 },
      {
        alpha: 1,
      },
      0
    );

    tl.fromTo(
      slider,
      0.25,
      {
        x: slider.width / 2,
        rotation: 0,
      },
      {
        x: track.width - slider.width / 2,
        rotation: Math.PI,
        ease: window.Linear.easeNone
      },
      0
    );

    return tl;
  };
});
