define({
  _BASE_APP: {
    children: [
      'background',
      'logo',
      'spinner',
      'prizeTable',
      'lettersPanel',
      'playControls',
      'gridCells',
      'resultPlaqueContainer',
    ],
  },

  background: {
    type: 'sprite',
    children: ['backgroundParticles'],
    landscape: {
      texture: 'background_landscape',
    },
    portrait: {
      texture: 'background_portrait',
    },
  },
  backgroundParticles: {
    type: 'container',
    landscape: { y: 425 },
    portrait: { y: 725 },
  },

  logo: {
    type: 'sprite',
    texture: 'logo_game',
    anchor: 0.5,
    portrait: {
      scale: 0.75,
      x: 405,
      y: 60,
    },
    landscape: {
      scale: 1,
      x: 720,
      y: 60,
    },
  },

  /*
   * WHEEL
   */
  spinner: {
    type: 'container',
    landscape: { x: 1260, y: 560 },
    portrait: { x: 640, y: 760 },
    children: ['wheel_3', 'wheel_2', 'wheel_1', 'wheelFront', 'pinkWheel', 'goldFrame', 'trailContainer',
    'diamondContainer', 'wheelFrame'],
  },
  wheelFront: {
    type: 'sprite',
    texture: 'Spinner_top',
    anchor: 0.5,
  },
  wheel_3: {
    type: 'sprite',
    texture: 'bg_circle3',
    anchor: 0.5,
  },
  wheel_2: {
    type: 'sprite',
    texture: 'bg_circle2',
    anchor: 0.5,
  },
  wheel_1: {
    type: 'sprite',
    texture: 'bg_circle1',
    anchor: 0.5,
  },
  pinkWheel: {
    type: 'sprite',
    texture: 'inner_pink_circle',
    anchor: 0.5,
  },
  trailContainer: {
    type: 'container',
  },
  diamondContainer: {
    type: 'container',
    children: ['pinkDiamond'],
  },
  pinkDiamond: {
    type: 'sprite',
    texture: 'diamond',
    anchor: 0.5,
    x: -78,
    y: -17,
  },
  goldFrame: {
    type: 'sprite',
    texture: 'inner_frame',
    anchor: 0.5,
  },
  wheelFrame: {
    type: 'sprite',
    texture: 'stop_btn_selector',
    x: -234,
    y: -92,
    children: ['stopButton', 'stopButtonIdle'],
  },
  stopButton: {
    type: 'button',
    x: 232,
    y: 90,
    textures: {
      enabled: 'stopButtonEnabled',
      disabled: 'stopButtonDisabled',
      over: 'stopButtonOver',
      pressed: 'stopButtonPressed',
    },
  },
  stopButtonIdle: {
    type: 'animatedSprite',
    x: 175,
    y: 15,
    textures: 'spinnerIdle',
    animationSpeed: 0.5,
  },

  /*
   * PRIZE TABLE
   */
  prizeTable: {
    type: 'rectangle',
    fillAlpha: 0.5,
    children: ['prizeTableTitle', 'prizeTablePrizes'],
    landscape: { x: 10, y: 90, width: 398, height: 400 },
    portrait: { x: 0, y: 85, width: 250, height: 595 },
  },
  prizeTableTitle: {
    type: 'text',
    string: 'prizeTable',
    style: 'sectionTitle',
    anchor: 0.5,
    landscape: { x: 200, y: 20 },
    portrait: { x: 125, y: 20 },
  },
  prizeTablePrizes: {
    y: 40,
    children: [
      'prizeBox8',
      'prizeBox7',
      'prizeBox6',
      'prizeBox5',
      'prizeBox4',
      'prizeBox3',
      'prizeBox2',
      'prizeBox1',
    ],
    landscape: { x: 5 },
    portrait: { x: 15 },
  },
  prizeBox8: {
    type: 'rectangle',
    fill: 0x2d2d2d,
    radius: 5,
    children: ['prizeBoxHighlight8', 'prizeLabel8', 'prizeBoxGlow8', 'prizeValue8'],
    portrait: { y: 0, width: 220, height: 65 },
    landscape: { y: 0, width: 388, height: 40 },
  },
  prizeBoxHighlight8: {
    type: 'rectangle',
    fill: 0x84004d,
    lineColor: 0xfaf994,
    lineWidth: 3,
    radius: 5,
    portrait: { width: 220, height: 65 },
    landscape: { width: 388, height: 40 },
  },
  prizeBoxGlow8: {
    type: 'rectangle',
    fill: 0xffffff,
    radius: 5,
    portrait: { width: 220, height: 65 },
    landscape: { width: 388, height: 40 },
  },
  prizeLabel8: {
    type: 'text',
    string: 'prizeLabel8',
    style: 'prizeTable',
    landscape: { x: 10, y: 9, anchor: { x: 0 } },
    portrait: { x: 110, y: 5, anchor: { x: 0.5 } },
  },
  prizeValue8: {
    type: 'text',
    style: 'prizeTable',
    landscape: { x: 378, y: 9, anchor: { x: 1 } },
    portrait: { x: 110, y: 34, anchor: { x: 0.5 } },
  },
  prizeBox7: {
    type: 'rectangle',
    fill: 0x2d2d2d,
    radius: 5,
    children: ['prizeBoxHighlight7', 'prizeLabel7', 'prizeBoxGlow7', 'prizeValue7'],
    portrait: { y: 68, width: 220, height: 65 },
    landscape: { y: 45, width: 388, height: 40 },
  },
  prizeBoxHighlight7: {
    type: 'rectangle',
    fill: 0x84004d,
    lineColor: 0xfaf994,
    lineWidth: 3,
    radius: 5,
    portrait: { width: 220, height: 65 },
    landscape: { width: 388, height: 40 },
  },
  prizeBoxGlow7: {
    type: 'rectangle',
    fill: 0xffffff,
    radius: 5,
    portrait: { width: 220, height: 65 },
    landscape: { width: 388, height: 40 },
  },
  prizeLabel7: {
    type: 'text',
    string: 'prizeLabel7',
    style: 'prizeTable',
    landscape: { x: 10, y: 9, anchor: { x: 0 } },
    portrait: { x: 110, y: 5, anchor: { x: 0.5 } },
  },
  prizeValue7: {
    type: 'text',
    style: 'prizeTable',
    landscape: { x: 378, y: 9, anchor: { x: 1 } },
    portrait: { x: 110, y: 34, anchor: { x: 0.5 } },
  },
  prizeBox6: {
    type: 'rectangle',
    fill: 0x2d2d2d,
    radius: 5,
    children: ['prizeBoxHighlight6', 'prizeLabel6', 'prizeBoxGlow6', 'prizeValue6'],
    portrait: { y: 136, width: 220, height: 65 },
    landscape: { y: 90, width: 388, height: 40 },
  },
  prizeBoxHighlight6: {
    type: 'rectangle',
    fill: 0x84004d,
    lineColor: 0xfaf994,
    lineWidth: 3,
    radius: 5,
    portrait: { width: 220, height: 65 },
    landscape: { width: 388, height: 40 },
  },
  prizeBoxGlow6: {
    type: 'rectangle',
    fill: 0xffffff,
    radius: 5,
    portrait: { width: 220, height: 65 },
    landscape: { width: 388, height: 40 },
  },
  prizeLabel6: {
    type: 'text',
    string: 'prizeLabel6',
    style: 'prizeTable',
    landscape: { x: 10, y: 9, anchor: { x: 0 } },
    portrait: { x: 110, y: 5, anchor: { x: 0.5 } },
  },
  prizeValue6: {
    type: 'text',
    style: 'prizeTable',
    landscape: { x: 378, y: 9, anchor: { x: 1 } },
    portrait: { x: 110, y: 34, anchor: { x: 0.5 } },
  },
  prizeBox5: {
    type: 'rectangle',
    fill: 0x2d2d2d,
    radius: 5,
    children: ['prizeBoxHighlight5', 'prizeLabel5', 'prizeBoxGlow5', 'prizeValue5'],
    portrait: { y: 204, width: 220, height: 65 },
    landscape: { y: 135, width: 388, height: 40 },
  },
  prizeBoxHighlight5: {
    type: 'rectangle',
    fill: 0x84004d,
    lineColor: 0xfaf994,
    lineWidth: 3,
    radius: 5,
    portrait: { width: 220, height: 65 },
    landscape: { width: 388, height: 40 },
  },
  prizeBoxGlow5: {
    type: 'rectangle',
    fill: 0xffffff,
    radius: 5,
    portrait: { width: 220, height: 65 },
    landscape: { width: 388, height: 40 },
  },
  prizeLabel5: {
    type: 'text',
    string: 'prizeLabel5',
    style: 'prizeTable',
    landscape: { x: 10, y: 9, anchor: { x: 0 } },
    portrait: { x: 110, y: 5, anchor: { x: 0.5 } },
  },
  prizeValue5: {
    type: 'text',
    style: 'prizeTable',
    landscape: { x: 378, y: 9, anchor: { x: 1 } },
    portrait: { x: 110, y: 34, anchor: { x: 0.5 } },
  },
  prizeBox4: {
    type: 'rectangle',
    fill: 0x2d2d2d,
    radius: 5,
    children: ['prizeBoxHighlight4', 'prizeLabel4', 'prizeBoxGlow4', 'prizeValue4'],
    portrait: { y: 272, width: 220, height: 65 },
    landscape: { y: 180, width: 388, height: 40 },
  },
  prizeBoxHighlight4: {
    type: 'rectangle',
    fill: 0x84004d,
    lineColor: 0xfaf994,
    lineWidth: 3,
    radius: 5,
    portrait: { width: 220, height: 65 },
    landscape: { width: 388, height: 40 },
  },
  prizeBoxGlow4: {
    type: 'rectangle',
    fill: 0xffffff,
    radius: 5,
    portrait: { width: 220, height: 65 },
    landscape: { width: 388, height: 40 },
  },
  prizeLabel4: {
    type: 'text',
    string: 'prizeLabel4',
    style: 'prizeTable',
    landscape: { x: 10, y: 9, anchor: { x: 0 } },
    portrait: { x: 110, y: 5, anchor: { x: 0.5 } },
  },
  prizeValue4: {
    type: 'text',
    style: 'prizeTable',
    landscape: { x: 378, y: 9, anchor: { x: 1 } },
    portrait: { x: 110, y: 34, anchor: { x: 0.5 } },
  },
  prizeBox3: {
    type: 'rectangle',
    fill: 0x2d2d2d,
    radius: 5,
    children: ['prizeBoxHighlight3', 'prizeLabel3', 'prizeBoxGlow3', 'prizeValue3'],
    portrait: { y: 340, width: 220, height: 65 },
    landscape: { y: 225, width: 388, height: 40 },
  },
  prizeBoxHighlight3: {
    type: 'rectangle',
    fill: 0x84004d,
    lineColor: 0xfaf994,
    lineWidth: 3,
    radius: 5,
    portrait: { width: 220, height: 65 },
    landscape: { width: 388, height: 40 },
  },
  prizeBoxGlow3: {
    type: 'rectangle',
    fill: 0xffffff,
    radius: 5,
    portrait: { width: 220, height: 65 },
    landscape: { width: 388, height: 40 },
  },
  prizeLabel3: {
    type: 'text',
    string: 'prizeLabel3',
    style: 'prizeTable',
    landscape: { x: 10, y: 9, anchor: { x: 0 } },
    portrait: { x: 110, y: 5, anchor: { x: 0.5 } },
  },
  prizeValue3: {
    type: 'text',
    style: 'prizeTable',
    landscape: { x: 378, y: 9, anchor: { x: 1 } },
    portrait: { x: 110, y: 34, anchor: { x: 0.5 } },
  },
  prizeBox2: {
    type: 'rectangle',
    fill: 0x2d2d2d,
    radius: 5,
    children: ['prizeBoxHighlight2', 'prizeLabel2', 'prizeBoxGlow2', 'prizeValue2'],
    portrait: { y: 408, width: 220, height: 65 },
    landscape: { y: 270, width: 388, height: 40 },
  },
  prizeBoxHighlight2: {
    type: 'rectangle',
    fill: 0x84004d,
    lineColor: 0xfaf994,
    lineWidth: 3,
    radius: 5,
    portrait: { width: 220, height: 65 },
    landscape: { width: 388, height: 40 },
  },
  prizeBoxGlow2: {
    type: 'rectangle',
    fill: 0xffffff,
    radius: 5,
    portrait: { width: 220, height: 65 },
    landscape: { width: 388, height: 40 },
  },
  prizeLabel2: {
    type: 'text',
    string: 'prizeLabel2',
    style: 'prizeTable',
    landscape: { x: 10, y: 9, anchor: { x: 0 } },
    portrait: { x: 110, y: 5, anchor: { x: 0.5 } },
  },
  prizeValue2: {
    type: 'text',
    style: 'prizeTable',
    landscape: { x: 378, y: 9, anchor: { x: 1 } },
    portrait: { x: 110, y: 34, anchor: { x: 0.5 } },
  },
  prizeBox1: {
    type: 'rectangle',
    fill: 0x2d2d2d,
    radius: 5,
    children: ['prizeBoxHighlight1', 'prizeLabel1', 'prizeBoxGlow1', 'prizeValue1'],
    portrait: { y: 476, width: 220, height: 65 },
    landscape: { y: 315, width: 388, height: 40 },
  },
  prizeBoxHighlight1: {
    type: 'rectangle',
    fill: 0x84004d,
    lineColor: 0xfaf994,
    lineWidth: 3,
    radius: 5,
    portrait: { width: 220, height: 65 },
    landscape: { width: 388, height: 40 },
  },
  prizeBoxGlow1: {
    type: 'rectangle',
    fill: 0xffffff,
    radius: 5,
    portrait: { width: 220, height: 65 },
    landscape: { width: 388, height: 40 },
  },
  prizeLabel1: {
    type: 'text',
    string: 'prizeLabel1',
    style: 'prizeTable',
    landscape: { x: 10, y: 9, anchor: { x: 0 } },
    portrait: { x: 110, y: 5, anchor: { x: 0.5 } },
  },
  prizeValue1: {
    type: 'text',
    style: 'prizeTable',
    landscape: { x: 378, y: 9, anchor: { x: 1 } },
    portrait: { x: 110, y: 34, anchor: { x: 0.5 } },
  },


  /*
   * GRID
   */
  gridCells: {
    type: 'container',
    landscape: { x: 480, y: 120 },
    portrait: { x: 280, y: 115 },
    children: ['cellBGs', 'cellMarkBGs', 'cellBonusBGs', 'cellAwardBGs', 'cellLetters', 'cellHints']
  },
  cellBGs: {
    type: 'container',
  },
  cellHints: {
    type: 'container',
  },
  cellMarkBGs: {
    type: 'container',
  },
  cellBonusBGs: {
    type: 'container',
  },
  cellAwardBGs: {
    type: 'container',
  },
  cellLetters: {
    type: 'container',
  },


  /*
   * LETTERS
   */
  lettersPanel: {
    type: 'rectangle',
    fillAlpha: 0.5,
    width: 385,
    height: 348,
    children: ['yourLettersTitle', 'bonusLettersTitle', 'yourLetters', 'bonusLetters'],
    landscape: { x: 1045, y: 90 },
    portrait: { x: 0, y: 680 },
  },
  yourLettersTitle: {
    type: 'text',
    string: 'yourLetters',
    style: 'sectionTitle',
    x: 200,
    y: 20,
    anchor: 0.5,
  },
  yourLetters: {
    type: 'container',
    x: 9,
    y: 40,
    children: [
      'yourLetters1',
      'yourLetters2',
      'yourLetters3',
      'yourLetters4',
      'yourLetters5',
      'yourLetters6',
      'yourLetters7',
      'yourLetters8',
      'yourLetters9',
      'yourLetters10',
      'yourLetters11',
      'yourLetters12',
      'yourLetters13',
      'yourLetters14',
      'yourLetters15',
      'yourLetters16',
      'yourLetters17',
      'yourLetters18',
    ],
  },

  yourLetters1: {
    type: 'rectangle',
    width: 56,
    height: 56,
    x: 0,
    y: 0,
    radius: 5,
    fill: 0xea768e,
    lineColor: 0x484848,
    lineWidth: 2,
    children: ['yourLettersText1', 'yourLettersAnim1']
  },
  yourLettersText1: {
    type: 'text',
    x: 28,
    y: 28,
    style: 'yourLetter',
    anchor: 0.5,
  },
  yourLettersAnim1: {
    type: 'animatedSprite',
    textures: 'letterReveal',
    animationSpeed: 0.5,
    anchor: 0.5,
    x: 28,
    y: 20,
  },
  
  yourLetters2: {
    type: 'rectangle',
    width: 56,
    height: 56,
    x: 62,
    y: 0,
    radius: 5,
    fill: 0xea768e,
    lineColor: 0x484848,
    lineWidth: 2,
    children: ['yourLettersText2', 'yourLettersAnim2']
  },
  yourLettersText2: {
    type: 'text',
    x: 28,
    y: 28,
    style: 'yourLetter',
    anchor: 0.5,
  },
  yourLettersAnim2: {
    type: 'animatedSprite',
    textures: 'letterReveal',
    animationSpeed: 0.5,
    anchor: 0.5,
    x: 28,
    y: 20,
  },
  
  yourLetters3: {
    type: 'rectangle',
    width: 56,
    height: 56,
    x: 124,
    y: 0,
    radius: 5,
    fill: 0xea768e,
    lineColor: 0x484848,
    lineWidth: 2,
    children: ['yourLettersText3', 'yourLettersAnim3']
  },
  yourLettersText3: {
    type: 'text',
    x: 28,
    y: 28,
    style: 'yourLetter',
    anchor: 0.5,
  },
  yourLettersAnim3: {
    type: 'animatedSprite',
    textures: 'letterReveal',
    animationSpeed: 0.5,
    anchor: 0.5,
    x: 28,
    y: 20,
  },
  
  yourLetters4: {
    type: 'rectangle',
    width: 56,
    height: 56,
    x: 186,
    y: 0,
    radius: 5,
    fill: 0xea768e,
    lineColor: 0x484848,
    lineWidth: 2,
    children: ['yourLettersText4', 'yourLettersAnim4']
  },
  yourLettersText4: {
    type: 'text',
    x: 28,
    y: 28,
    style: 'yourLetter',
    anchor: 0.5,
  },
  yourLettersAnim4: {
    type: 'animatedSprite',
    textures: 'letterReveal',
    animationSpeed: 0.5,
    anchor: 0.5,
    x: 28,
    y: 20,
  },
  
  yourLetters5: {
    type: 'rectangle',
    width: 56,
    height: 56,
    x: 248,
    y: 0,
    radius: 5,
    fill: 0xea768e,
    lineColor: 0x484848,
    lineWidth: 2,
    children: ['yourLettersText5', 'yourLettersAnim5']
  },
  yourLettersText5: {
    type: 'text',
    x: 28,
    y: 28,
    style: 'yourLetter',
    anchor: 0.5,
  },
  yourLettersAnim5: {
    type: 'animatedSprite',
    textures: 'letterReveal',
    animationSpeed: 0.5,
    anchor: 0.5,
    x: 28,
    y: 20,
  },
  
  yourLetters6: {
    type: 'rectangle',
    width: 56,
    height: 56,
    x: 310,
    y: 0,
    radius: 5,
    fill: 0xea768e,
    lineColor: 0x484848,
    lineWidth: 2,
    children: ['yourLettersText6', 'yourLettersAnim6']
  },
  yourLettersText6: {
    type: 'text',
    x: 28,
    y: 28,
    style: 'yourLetter',
    anchor: 0.5,
  },
  yourLettersAnim6: {
    type: 'animatedSprite',
    textures: 'letterReveal',
    animationSpeed: 0.5,
    anchor: 0.5,
    x: 28,
    y: 20,
  },

  yourLetters7: {
    type: 'rectangle',
    width: 56,
    height: 56,
    x: 0,
    y: 60,
    radius: 5,
    fill: 0xea768e,
    lineColor: 0x484848,
    lineWidth: 2,
    children: ['yourLettersText7', 'yourLettersAnim7']
  },
  yourLettersText7: {
    type: 'text',
    x: 28,
    y: 28,
    style: 'yourLetter',
    anchor: 0.5,
  },
  yourLettersAnim7: {
    type: 'animatedSprite',
    textures: 'letterReveal',
    animationSpeed: 0.5,
    anchor: 0.5,
    x: 28,
    y: 20,
  },
  
  yourLetters8: {
    type: 'rectangle',
    width: 56,
    height: 56,
    x: 62,
    y: 60,
    radius: 5,
    fill: 0xea768e,
    lineColor: 0x484848,
    lineWidth: 2,
    children: ['yourLettersText8', 'yourLettersAnim8']
  },
  yourLettersText8: {
    type: 'text',
    x: 28,
    y: 28,
    style: 'yourLetter',
    anchor: 0.5,
  },
  yourLettersAnim8: {
    type: 'animatedSprite',
    textures: 'letterReveal',
    animationSpeed: 0.5,
    anchor: 0.5,
    x: 28,
    y: 20,
  },
  
  yourLetters9: {
    type: 'rectangle',
    width: 56,
    height: 56,
    x: 124,
    y: 60,
    radius: 5,
    fill: 0xea768e,
    lineColor: 0x484848,
    lineWidth: 2,
    children: ['yourLettersText9', 'yourLettersAnim9']
  },
  yourLettersText9: {
    type: 'text',
    x: 28,
    y: 28,
    style: 'yourLetter',
    anchor: 0.5,
  },
  yourLettersAnim9: {
    type: 'animatedSprite',
    textures: 'letterReveal',
    animationSpeed: 0.5,
    anchor: 0.5,
    x: 28,
    y: 20,
  },
  
  yourLetters10: {
    type: 'rectangle',
    width: 56,
    height: 56,
    x: 186,
    y: 60,
    radius: 5,
    fill: 0xea768e,
    lineColor: 0x484848,
    lineWidth: 2,
    children: ['yourLettersText10', 'yourLettersAnim10']
  },
  yourLettersText10: {
    type: 'text',
    x: 28,
    y: 28,
    style: 'yourLetter',
    anchor: 0.5,
  },
  yourLettersAnim10: {
    type: 'animatedSprite',
    textures: 'letterReveal',
    animationSpeed: 0.5,
    anchor: 0.5,
    x: 28,
    y: 20,
  },
  
  yourLetters11: {
    type: 'rectangle',
    width: 56,
    height: 56,
    x: 248,
    y: 60,
    radius: 5,
    fill: 0xea768e,
    lineColor: 0x484848,
    lineWidth: 2,
    children: ['yourLettersText11', 'yourLettersAnim11']
  },
  yourLettersText11: {
    type: 'text',
    x: 28,
    y: 28,
    style: 'yourLetter',
    anchor: 0.5,
  },
  yourLettersAnim11: {
    type: 'animatedSprite',
    textures: 'letterReveal',
    animationSpeed: 0.5,
    anchor: 0.5,
    x: 28,
    y: 20,
  },
  
  yourLetters12: {
    type: 'rectangle',
    width: 56,
    height: 56,
    x: 310,
    y: 60,
    radius: 5,
    fill: 0xea768e,
    lineColor: 0x484848,
    lineWidth: 2,
    children: ['yourLettersText12', 'yourLettersAnim12']
  },
  yourLettersText12: {
    type: 'text',
    x: 28,
    y: 28,
    style: 'yourLetter',
    anchor: 0.5,
  },
  yourLettersAnim12: {
    type: 'animatedSprite',
    textures: 'letterReveal',
    animationSpeed: 0.5,
    anchor: 0.5,
    x: 28,
    y: 20,
  },

  yourLetters13: {
    type: 'rectangle',
    width: 56,
    height: 56,
    x: 0,
    y: 120,
    radius: 5,
    fill: 0xea768e,
    lineColor: 0x484848,
    lineWidth: 2,
    children: ['yourLettersText13', 'yourLettersAnim13']
  },
  yourLettersText13: {
    type: 'text',
    x: 28,
    y: 28,
    style: 'yourLetter',
    anchor: 0.5,
  },
  yourLettersAnim13: {
    type: 'animatedSprite',
    textures: 'letterReveal',
    animationSpeed: 0.5,
    anchor: 0.5,
    x: 28,
    y: 20,
  },
  
  yourLetters14: {
    type: 'rectangle',
    width: 56,
    height: 56,
    x: 62,
    y: 120,
    radius: 5,
    fill: 0xea768e,
    lineColor: 0x484848,
    lineWidth: 2,
    children: ['yourLettersText14', 'yourLettersAnim14']
  },
  yourLettersText14: {
    type: 'text',
    x: 28,
    y: 28,
    style: 'yourLetter',
    anchor: 0.5,
  },
  yourLettersAnim14: {
    type: 'animatedSprite',
    textures: 'letterReveal',
    animationSpeed: 0.5,
    anchor: 0.5,
    x: 28,
    y: 20,
  },
  
  yourLetters15: {
    type: 'rectangle',
    width: 56,
    height: 56,
    x: 124,
    y: 120,
    radius: 5,
    fill: 0xea768e,
    lineColor: 0x484848,
    lineWidth: 2,
    children: ['yourLettersText15', 'yourLettersAnim15']
  },
  yourLettersText15: {
    type: 'text',
    x: 28,
    y: 28,
    style: 'yourLetter',
    anchor: 0.5,
  },
  yourLettersAnim15: {
    type: 'animatedSprite',
    textures: 'letterReveal',
    animationSpeed: 0.5,
    anchor: 0.5,
    x: 28,
    y: 20,
  },
  
  yourLetters16: {
    type: 'rectangle',
    width: 56,
    height: 56,
    x: 186,
    y: 120,
    radius: 5,
    fill: 0xea768e,
    lineColor: 0x484848,
    lineWidth: 2,
    children: ['yourLettersText16', 'yourLettersAnim16']
  },
  yourLettersText16: {
    type: 'text',
    x: 28,
    y: 28,
    style: 'yourLetter',
    anchor: 0.5,
  },
  yourLettersAnim16: {
    type: 'animatedSprite',
    textures: 'letterReveal',
    animationSpeed: 0.5,
    anchor: 0.5,
    x: 28,
    y: 20,
  },
  
  yourLetters17: {
    type: 'rectangle',
    width: 56,
    height: 56,
    x: 248,
    y: 120,
    radius: 5,
    fill: 0xea768e,
    lineColor: 0x484848,
    lineWidth: 2,
    children: ['yourLettersText17', 'yourLettersAnim17']
  },
  yourLettersText17: {
    type: 'text',
    x: 28,
    y: 28,
    style: 'yourLetter',
    anchor: 0.5,
  },
  yourLettersAnim17: {
    type: 'animatedSprite',
    textures: 'letterReveal',
    animationSpeed: 0.5,
    anchor: 0.5,
    x: 28,
    y: 20,
  },
  
  yourLetters18: {
    type: 'rectangle',
    width: 56,
    height: 56,
    x: 310,
    y: 120,
    radius: 5,
    fill: 0xea768e,
    lineColor: 0x484848,
    lineWidth: 2,
    children: ['yourLettersText18', 'yourLettersAnim18']
  },
  yourLettersText18: {
    type: 'text',
    x: 28,
    y: 28,
    style: 'yourLetter',
    anchor: 0.5,
  },
  yourLettersAnim18: {
    type: 'animatedSprite',
    textures: 'letterReveal',
    animationSpeed: 0.5,
    anchor: 0.5,
    x: 28,
    y: 20,
  },


  bonusLettersTitle: {
    type: 'text',
    x: 200,
    y: 250,
    string: 'bonusLetters',
    style: 'sectionTitle',
    anchor: 0.5,
  },

  bonusLetters: {
    type: 'container',
    x: 88,
    y: 275,
    children: [
      'bonusLetters1',
      'bonusLetters2',
      'bonusLetters3',
    ],
  },

  bonusLetters1: {
    type: 'rectangle',
    width: 58,
    height: 58,
    radius: 10,
    fill: 0xe81f6d,
    children: ['bonusLettersFrame1', 'bonusLettersText1', 'bonusLettersAnim1'],
  },
  bonusLettersFrame1: {
    type: 'sprite',
    texture: 'bonus-diamond-frame',
    x: -2,
    y: -2,
  },
  bonusLettersText1: {
    type: 'text',
    x: 28,
    y: 28,
    style: 'yourLetter',
    anchor: 0.5,
  },
  bonusLettersAnim1: {
    type: 'animatedSprite',
    textures: 'diamondShatter',
    animationSpeed: 0.5,
    anchor: 0.5,
    x: 31,
    y: 20,
  },

  bonusLetters2: {
    type: 'rectangle',
    x: 75,
    width: 58,
    height: 58,
    radius: 10,
    fill: 0xe81f6d,
    children: ['bonusLettersFrame2', 'bonusLettersText2', 'bonusLettersAnim2'],
  },
  bonusLettersFrame2: {
    type: 'sprite',
    texture: 'bonus-diamond-frame',
    x: -2,
    y: -2,
  },
  bonusLettersText2: {
    type: 'text',
    x: 28,
    y: 28,
    style: 'yourLetter',
    anchor: 0.5,
  },
  bonusLettersAnim2: {
    type: 'animatedSprite',
    textures: 'diamondShatter',
    animationSpeed: 0.5,
    anchor: 0.5,
    x: 31,
    y: 20,
  },

  bonusLetters3: {
    type: 'rectangle',
    x: 150,
    width: 58,
    height: 58,
    radius: 10,
    fill: 0xe81f6d,
    children: ['bonusLettersFrame3', 'bonusLettersText3', 'bonusLettersAnim3'],
  },
  bonusLettersFrame3: {
    type: 'sprite',
    texture: 'bonus-diamond-frame',
    x: -2,
    y: -2,
  },
  bonusLettersText3: {
    type: 'text',
    x: 28,
    y: 28,
    style: 'yourLetter',
    anchor: 0.5,
  },
  bonusLettersAnim3: {
    type: 'animatedSprite',
    textures: 'diamondShatter',
    animationSpeed: 0.5,
    anchor: 0.5,
    x: 31,
    y: 20,
  },


  /*
   * PLAY CONTROLS
   */
  playControls: {
    type: 'rectangle',
    fillAlpha: 0.5,
    width: 398,
    height: 144,
    children: ['hintControl', 'autoMarkControl'],
    landscape: { x: 10, y: 496 },
    portrait: { x: 400, y: 875 },
  },
  autoMarkControl: {
    type: 'button',
    x: 199,
    y: 110,
    textures: {
      enabled: 'playControl',
      pressed: 'playControl',
      disabled: 'playControl',
    },
    children: ['autoMarkTrack', 'autoMarkLabel'],
  },
  autoMarkLabel: {
    type: 'text',
    x: -180,
    y: -15,
    string: 'autoMark',
    style: 'playControl',
  },
  autoMarkTrack: {
    type: 'sprite',
    texture: 'diamond_slider_bg_grey',
    x: 69,
    y: -3,
    anchor: { y: 0.5 },
    children: ['autoMarkTrackActive', 'autoMarkSlider']
  },
  autoMarkTrackActive: {
    type: 'sprite',
    texture: 'diamond_slider_bg_pink',
    anchor: { y: 0.5 },
  },
  autoMarkSlider: {
    type: 'sprite',
    texture: 'diamond_slider_grey',
    anchor: 0.5,
    children: ['autoMarkSliderActive']
  },
  autoMarkSliderActive: {
    type: 'sprite',
    texture: 'diamond_slider_pink',
    anchor: 0.5,
  },
  hintControl: {
    type: 'button',
    x: 199,
    y: 40,
    textures: {
      enabled: 'playControl',
      pressed: 'playControl',
      disabled: 'playControl',
    },
    children: ['hintTrack', 'hintLabel'],
  },
  hintLabel: {
    type: 'text',
    x: -180,
    y: -15,
    string: 'hints',
    style: 'playControl',
  },
  hintTrack: {
    type: 'sprite',
    texture: 'diamond_slider_bg_grey',
    x: 69,
    y: -3,
    anchor: { y: 0.5 },
    children: ['hintTrackActive', 'hintSlider']
  },
  hintTrackActive: {
    type: 'sprite',
    texture: 'diamond_slider_bg_pink',
    anchor: { y: 0.5 },
  },
  hintSlider: {
    type: 'sprite',
    texture: 'diamond_slider_grey',
    anchor: 0.5,
    children: ['hintSliderActive']
  },
  hintSliderActive: {
    type: 'sprite',
    texture: 'diamond_slider_pink',
    anchor: 0.5,
  },

  /*
   * Result Plaque
   */
  resultPlaqueContainer: {
    type: 'container',
    landscape: { x: 8, y: 20 },
    portrait: { x: 6, y: 80 },
    children: ['winPlaque', 'losePlaque'],
  },

  winPlaque: {
    type: 'container',
    children: [
      'winPlaqueBG',
      'winPlaqueCongratulations',
      'winPlaqueMessage',
      'winPlaqueValue',
      'winPlaqueCloseButton',
    ],
  },
  winPlaqueBG: {
    type: 'sprite',
    landscape: { texture: 'plaque_landscape' },
    portrait: { texture: 'plaque_portrait' },
    children: ['winPlaqueGlitter', 'winPlaqueDiamonds', 'winPlaqueSparkle1', 'winPlaqueSparkle2', 'winPlaqueSparkle3', 'winPlaqueSparkle4', 'plaqueLightSweepContainer'],
  },
  plaqueLightSweepContainer: {
    type: 'container',
    children: ['winPlaqueMask', 'plaqueLightSweep'],
  },
  winPlaqueMask: {
    type: 'rectangle',
    radius: 10,
    portrait: { x: 10, y: 10, width: 777, height: 920 },
    landscape: { x: 12, y: 12, width: 1402, height: 610 },
  },
  plaqueLightSweep: {
    type: 'sprite',
    texture: 'sweep',
    landscape: {
      scale: { y: 1.125 }
    },
    portrait: {
      scale: { y: 1.7 },
    },
  },
  winPlaqueGlitter: {
    type: 'sprite',
    landscape: {
      texture: 'plaqueGlitter_landscape',
      y: 50,
    },
    portrait: {
      texture: 'plaqueGlitter_portrait',
      y: 0
    },
  },
  winPlaqueSparkle1: {
    type: 'animatedSprite',
    textures: 'sparkleIdle',
    loop: false,
    animationSpeed: 0.5,
    landscape: { x: 150, y: 440, scale: { x: -1 }},
    portrait: { x: 10, y: 800, scale: { x: 1 }},
  },
  winPlaqueSparkle2: {
    type: 'animatedSprite',
    textures: 'sparkleIdle',
    loop: false,
    animationSpeed: 0.5,
    landscape: { x: 390, y: 490},
    portrait: { x: 200, y: 730},
  },
  winPlaqueSparkle3: {
    type: 'animatedSprite',
    textures: 'sparkleIdle',
    loop: false,
    animationSpeed: 0.5,
    landscape: { x: 860, y: 590, scale: { y: -1 }},
    portrait: { x: 500, y: 890, scale: { y: -1 }},
  },
  winPlaqueSparkle4: {
    type: 'animatedSprite',
    textures: 'sparkleIdle',
    loop: false,
    animationSpeed: 0.5,
    landscape: { x: 1260, y: 480},
    portrait: { x: 650, y: 740},
  },
  winPlaqueDiamonds: {
    type: 'sprite',
    landscape: { texture: 'plaqueDiamonds_landscape' },
    portrait: { texture: 'plaqueDiamonds_portrait' },
  },
  winPlaqueCongratulations: {
    type: 'text',
    string: 'message_congratulations',
    style: 'plaqueMessage',
    landscape: { x: 712, y: 120 },
    portrait: { x: 399, y: 210 },
    anchor: { x: 0.5 }
  },
  winPlaqueMessage: {
    type: 'text',
    string: 'message_win',
    style: 'plaqueMessage',
    fontSize: 50,
    landscape: { x: 712, y: 210 },
    portrait: { x: 399, y: 300 },
    anchor: { x: 0.5 }
  },
  winPlaqueValue: {
    type: 'text',
    string: 'message_congratulations',
    style: 'plaqueValue',
    landscape: { x: 712, y: 300 },
    portrait: { x: 399, y: 400 },
    anchor: { x: 0.5 }
  },
  winPlaqueCloseButton: {
    type: 'button',
    landscape: { x: 712, y: 557 },
    portrait: { x: 399, y: 871 },
    string: 'button_close',
    style: {
      enabled: 'mainButtonEnabled',
      over: 'mainButtonOver',
      pressed: 'mainButtonPressed',
    },
    textures: {
      enabled: 'closeButtonEnabled',
      pressed: 'closeButtonPressed',
    },
  },

  losePlaque: {
    type: 'container',
    children: ['losePlaqueBG', 'losePlaqueMessage', 'losePlaqueCloseButton'],
  },
  losePlaqueBG: {
    type: 'sprite',
    landscape: { texture: 'plaque_landscape' },
    portrait: { texture: 'plaque_portrait' },
    children: ['losePlaqueGlitter'],
  },
  losePlaqueGlitter: {
    type: 'sprite',
    landscape: {
      texture: 'plaqueGlitter_landscape',
    },
    portrait: {
      texture: 'plaqueGlitter_portrait',
    },
  },
  losePlaqueMessage: {
    type: 'text',
    string: 'message_nonWin',
    style: 'plaqueMessage',
    landscape: { x: 712, y: 280 },
    portrait: { x: 399, y: 400 },
    anchor: 0.5,
  },
  losePlaqueCloseButton: {
    type: 'button',
    landscape: { x: 712, y: 557 },
    portrait: { x: 399, y: 871 },
    string: 'button_close',
    style: {
      enabled: 'mainButtonEnabled',
      over: 'mainButtonOver',
      pressed: 'mainButtonPressed',
    },
    textures: {
      enabled: 'closeButtonEnabled',
      pressed: 'closeButtonPressed',
    },
  },

  /*
   * How To Play
   */
  howToPlayPage1: {
    type: 'text',
    string: 'howToPlayContent',
    style: 'howToPlayText',
    fontSize: 30,
    wordWrap: true,
    anchor: 0.5,
    align: 'center',
    landscape: { x: 720, y: 380, wordWrapWidth: 1200 },
    portrait: { x: 405, y: 500, wordWrapWidth: 600 },
  },
  howToPlayPages: {
    type: 'container',
    children: ['howToPlayPage1'],
  },

  /*
   * UI Overrides
   */
  footerBG: {
    type: 'rectangle',
    fill: 0x000000,
    alpha: 0.9,
    landscape: { width: 1440, height: 56 },
    portrait: { width: 810, height: 100 },
  },

  ticketSelectBarBG: {
    type: 'rectangle',
    alpha: 0.9,
    landscape: { x: -460, y: -91, width: 920, height: 182, radius: 20, },
    portrait: { x: -405, y: -96, width: 810, height: 192, radius: 0, },
  },
  ticketCostIndicators: {
    type: 'container',
    portrait: { y: 54 },
    landscape: { y: 54 },
  },


  errorContainer: {
    type: 'container',
    children: [
      'errorBackground',
      'errorMessage',
      'errorExit',
      'timeoutExit',
      'timeoutContinue'
    ],
    landscape: { x: 0, y: 20 },
    portrait: { x: 0, y: 80 },
  },
  errorBackground: {
    type: 'sprite',
    anchor: { x: 0.5 },
    landscape: {
      x: 720,
      y: 0,
      texture: 'plaque_landscape',
    },
    portrait: {
      x: 405,
      y: 0,
      texture: 'plaque_portrait',
    },
  },
  errorMessage: {
    type: 'text',
    style: 'errorMessage',
    anchor: 0.5,
    wordWrap: true,
    landscape: { x: 720, y: 275, wordWrapWidth: 1200 },
    portrait: { x: 405, y: 435, wordWrapWidth: 700 },
  },
  errorExit: {
    type: 'button',
    string: 'button_exit',
    landscape: { x: 720, y: 560 },
    portrait: { x: 405, y: 870 },
    style: {
      enabled: 'buttonText',
      over: 'buttonTextOver',
      pressed: 'buttonTextPressed',
    },
    textures: {
      enabled: 'timeOutButtonEnabled',
      over: 'timeOutButtonOver',
      pressed: 'timeOutButtonPressed',
    },
  },
  timeoutExit: {
    type: 'button',
    landscape: { x: 600, y: 560 },
    portrait: { x: 285, y: 870 },
    style: {
      enabled: 'buttonText',
      over: 'buttonTextOver',
      pressed: 'buttonTextPressed',
    },
    textures: {
      enabled: 'timeOutButtonEnabled',
      over: 'timeOutButtonOver',
      pressed: 'timeOutButtonPressed',
    },
  },
  timeoutContinue: {
    type: 'button',
    landscape: { x: 840, y: 560 },
    portrait: { x: 525, y: 870 },
    style: {
      enabled: 'buttonText',
      over: 'buttonTextOver',
      pressed: 'buttonTextPressed',
    },
    textures: {
      enabled: 'timeOutButtonEnabled',
      over: 'timeOutButtonOver',
      pressed: 'timeOutButtonPressed',
    },
  },


  howToPlayContainer: {
    type: 'container',
    children: [
      'howToPlayBackground',
      'howToPlayPages',
      'howToPlayTitle',
      'versionText',
      'audioButtonContainer',
      'howToPlayClose',
    ],
    landscape: { y: -78 },
    portrait: { y: -18 },
  },
  howToPlayBackground: {
    type: 'sprite',
    children: ['howToPlayGlitter'],
    anchor: { x: 0.5 },
    y: 98,
    landscape: {
      x: 720,
      texture: 'plaque_landscape',
    },
    portrait: {
      x: 405,
      texture: 'plaque_portrait',
    },
  },
  howToPlayGlitter: {
    type: 'sprite',
    anchor: { x: 0.5 },
    landscape: {
      texture: 'plaqueGlitter_landscape',
    },
    portrait: {
      texture: 'plaqueGlitter_portrait',
    },
  },

  howToPlayClose: {
    type: 'button',
    string: 'button_close',
    landscape: { x: 720, y: 655 },
    portrait: { x: 405, y: 969 },
    textures: {
      enabled: 'tutorialOKButtonEnabled',
      over: 'tutorialOKButtonOver',
      pressed: 'tutorialOKButtonPressed',
    },
    style: {
      enabled: 'tutorialOKButtonEnabled',
      over: 'tutorialOKButtonOver',
      pressed: 'tutorialOKButtonPressed',
    },
  },
  audioButtonContainer: {
    type: 'container',
    landscape: { x: 79, y: 655 },
    portrait: { x: 75, y: 969 },
  },





  homeButton: {
    type: 'button',
    landscape: { x: 55, y: 50 },
    portrait: { x: 55, y: 50 },
    textures: {
      enabled: 'homeButtonEnabled',
      over: 'homeButtonOver',
      pressed: 'homeButtonPressed',
    },
  },

});
