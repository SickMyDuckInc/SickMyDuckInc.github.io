ProEvolutionQuidditch.preloadState = function(game) {
    
}

ProEvolutionQuidditch.preloadState.prototype = {

    init: function() {
        
        
    },
   

    preload: function() {
        
        //  Show loading text and background
        game.add.sprite(0, 0, 'background1');
        game.add.sprite(160, 240, 'loading1');

        //  Text
        game.load.image('loading2', 'assets/images/text/loading2.png');
        game.load.image('clean','assets/images/text/cleangame.png');
        game.load.image('player1','assets/images/text/player1.png');
        game.load.image('player2', 'assets/images/text/player2.png');
        game.load.image('press1', 'assets/images/text/press1.png');
        game.load.image('press2', 'assets/images/text/press2.png');
        game.load.image('return', 'assets/images/text/return.png');
        game.load.image('start', 'assets/images/text/start.png');
        game.load.image('title', 'assets/images/text/title.png');
        game.load.image('vs', 'assets/images/text/vs.png');
        game.load.image('winner', 'assets/images/text/winner.png');

        //  Background        
        game.load.image('background2', 'assets/images/background/background2.png');
        game.load.image('stadium1', 'assets/images/background/stadium1.png');
        game.load.image('stadium2', 'assets/images/background/stadium2.png');
        game.load.image('stadium3', 'assets/images/background/stadium3.png');
        game.load.image('stadium4', 'assets/images/background/stadium4.png');

        //  Characters
        game.load.image('draco', 'assets/images/draco.png');
        game.load.image('griffindor', 'assets/images/griffindor.png');
        game.load.image('slytherin', 'assets/images/slytherin.png');
        game.load.image('harry', 'assets/images/harry.png');
        game.load.image('referee', 'assets/images/referee.png');
        game.load.image('trophy', 'assets/images/trophy.png');
        game.load.image('snitch', 'assets/images/snitch.png');

        //  Audio
        game.load.audio('audio1', 'assets/audio/audio1.ogg');
        game.load.audio('audio2', 'assets/audio/audio2.ogg');
        game.load.audio('powerUp', 'assets/audio/powerUp.ogg');
        game.load.audio('youWin', 'assets/audio/youWin.ogg');

        //  Music
        game.load.audio('creepy','assets/music/bensound-creepy.mp3');
        game.load.audio('epic','assets/music/bensound-epic.mp3');
        game.load.audio('happyrock','assets/music/bensound-happyrock.mp3');

    },

    create: function() {
        
        this.state.start('endingState');
       
    },

    update: function() {
       
    },
}