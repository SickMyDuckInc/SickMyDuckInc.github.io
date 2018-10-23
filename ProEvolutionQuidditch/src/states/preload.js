ProEvolutionQuidditch.preloadState = function(game) {
    
}

ProEvolutionQuidditch.preloadState.prototype = {

    init: function() {
        game.load.image('loading1', 'assets/images/text/loading1.png');
        
    },
   

    preload: function() {
        var s = game.add.image(80, 0, 'loading1');
        //text
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

        //background
        game.load.image('background1', 'assets/images/background/background.png');
        game.load.image('background2', 'assets/images/background/background2.png');
        game.load.image('stadium1', 'assets/images/background/stadium1.png');
        game.load.image('stadium2', 'assets/images/background/stadium2.png');
        game.load.image('stadium3', 'assets/images/background/stadium3.png');
        game.load.image('stadium4', 'assets/images/background/stadium4.png');

        //characters
        game.load.image('draco', 'assets/images/draco.png');
        game.load.image('griffindor', 'assets/images/griffindor.png');
        game.load.image('slytherin', 'assets/images/slytherin.png');
        game.load.image('harry', 'assets/images/harry.png');
        game.load.image('referee', 'assets/images/referee.png');
        game.load.image('trophy', 'assets/images/trophy.png');
        game.load.image('snitch', 'assets/images/snitch.png');


    },

    create: function() {
        

       
    },

    update: function() {
       
    }
}