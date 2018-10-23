var ProEvolutionQuidditch = {}

ProEvolutionQuidditch.bootState = function(game) {
    
}

ProEvolutionQuidditch.bootState.prototype = {

    preload: function() {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.load.image('loading1', 'assets/images/text/loading1.png');
        game.load.image('background1', 'assets/images/background/background.png');
    },

    create: function() {
        this.state.start('preloadState');
    },

    update: function() {

    }
}