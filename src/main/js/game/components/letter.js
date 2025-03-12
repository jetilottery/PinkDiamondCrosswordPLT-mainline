define(function() {
  return function letter(text, anim) {
    function hideAnim() {
      anim.visible = false;
    }
    
    function reveal(val) {
      return new Promise((resolve) => {
        text.text = val;

        // bring to front
        anim.parent.parent.setChildIndex(anim.parent, anim.parent.parent.children.length - 1);
        
        anim.onComplete = () => {
          hideAnim();
          resolve();
        };
        anim.gotoAndPlay(0);
      });
    }
    
    function reset() {
      anim.visible = true;
      anim.gotoAndStop(0);
    }
    
    anim.loop = false;

    return {
      reveal,
      reset,
    };
  };
});
