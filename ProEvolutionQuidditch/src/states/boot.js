var ProEvolutionQuidditch = {}

ProEvolutionQuidditch.bootState = function(game) {
    
}

ProEvolutionQuidditch.bootState.prototype = {

    preload: function() {
        game.physics.startSystem(Phaser.Physics.ARCADE);
    },

    create: function() {
        this.state.start('preloadState');
    },

    update: function() {

    }
}