define(function (require) {
    require('polyfill');
    const app = require('skbJet/componentManchester/standardIW/app');
    const msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');
    const layout = require('skbJet/componentManchester/standardIW/layout');
    const gameFlow = require('skbJet/componentManchester/standardIW/gameFlow');
    const config = require('skbJet/componentManchester/standardIW/gameConfig');
    const scenarioData = require('skbJet/componentManchester/standardIW/scenarioData');
    const textStyles = require('skbJet/componentManchester/standardIW/textStyles');
    const gameSize = require('skbJet/componentManchester/standardIW/gameSize');
    const audio = require('skbJet/componentManchester/standardIW/audio');
    const documents = require('skbJet/componentManchester/standardIW/documents');
    const SKBeInstant = require("skbJet/component/SKBeInstant/SKBeInstant");

    const scenarioTransform = require('game/scenarioTransform');
    const prizetableTransform = require('game/prizetableTransform');
    const prizestructureTransform = require('game/prizestructureTransform');

    const gameLayout = require('game/display/layout');
    const gameConfig = require('game/display/config');
    const gameAudioMap = require('game/display/audioMap');
    const gameTextStyles = require('game/display/textStyles');
    const dimensions = require('game/display/dimensions');

    let buttonBar = require('skbJet/componentManchester/standardIW/ui/buttonBar/template');
    let autoPlayButton = require('skbJet/componentManchester/standardIW/ui/autoPlayButton/template');
    let howToPlay = require('skbJet/componentManchester/standardIW/ui/howToPlay/template');
    let errorPlaque = require('skbJet/componentManchester/standardIW/ui/errorPlaque/template');
    let ticketSelectBar = require('skbJet/componentManchester/standardIW/ui/ticketSelectBar/template');
    let footer = require('skbJet/componentManchester/standardIW/ui/footer/template');
    let networkActivity = require('skbJet/componentManchester/standardIW/ui/networkActivity/template');

    const background = require('game/components/background');
    const prizeTable = require('game/components/prizeTable');
    const spinner = require('game/components/spinner');
    const yourLetters = require('game/components/yourLetters');
    const bonusLetters = require('game/components/bonusLetters');
    const crosswordGrid = require('game/components/crosswordGrid');
    const playControls = require('game/components/playControls');
    const resultPlaque = require('game/components/resultPlaque');

    require('game/ticketAcquired');
    require('game/startTurn');
    require('game/revealTurn');
    require('game/endReveal');
    require('game/resultScreen');
    require('game/gameReset');
    require('game/error');

    layout.register(gameLayout);
    audio.register(gameAudioMap);
    config.register(gameConfig);
    textStyles.register(gameTextStyles);

    gameSize.set(dimensions);


    function gameInit() {
        // Register a transform function that can be used to turn the scenario string into useable data
        scenarioData.registerTransform(scenarioTransform);

        // Register a transform function that can be used to turn prizetable data for paytable display
        if (SKBeInstant.isWLA()){
			documents.registerPrizestructureTransform(prizestructureTransform);
		}
		else{
			documents.registerPrizetableTransform(prizetableTransform);
		}	

        // Init StandardIW UI templates
        howToPlay = howToPlay();
        errorPlaque = errorPlaque();
        buttonBar = buttonBar();
        autoPlayButton = autoPlayButton();
        ticketSelectBar = ticketSelectBar();
        footer = footer();
        networkActivity = networkActivity();

        // Init game components
        background.init();
        prizeTable.init();
        spinner.init();
        yourLetters.init();
        bonusLetters.init();
        crosswordGrid.init();
        playControls.init();
        resultPlaque.init();

        // Add everything to the stage
        app.stage.addChild(
            layout.container,
            buttonBar,
            autoPlayButton,
            ticketSelectBar,
            footer,
            howToPlay,
            errorPlaque,
            networkActivity
        );

        //audio.play('music', true);

        gameFlow.next();
    }

    gameFlow.handle(gameInit, 'GAME_INIT');

    // PDIWI-178 - IMO - PD KY Pink Diamond Crossword
    // We need to nuke the pixi texture cache on exit, exit and reloading without refreshing is overloading
    // the GPU on some devices
    // TO BE ADDED INTO STANDARDIW AT EARLIEST OPPORTUNITY
    msgBus.subscribe('jLotteryGame.playerWantsToExit', () => {
        // Stop all tickers
        if (window.PIXI !== undefined && window.com.greensock !== undefined){
            window.com.greensock.core.Animation.ticker.sleep();
            window.PIXI.ticker.shared.stop();
        }        
        
        // Nuke the texture cache
        for (let key in window.PIXI.utils.BaseTextureCache) {
            window.PIXI.utils.BaseTextureCache[key].destroy(true);
        }

        // And kill the renderer, otherwise it'll be looking for stuff we've already deleted when we reload
        app.renderer.destroy(true);
        app.renderer = null;

        // Kill the audio context
        if (window.Howler){
            window.Howler.ctx.close();
        }
    });
});
