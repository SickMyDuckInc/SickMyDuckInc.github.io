ProEvolutionQuidditch.endingState = function(game) {

}

ProEvolutionQuidditch.endingState.prototype = {

    
    backScreen: function(){
        this.state.start('menuState');
    },

    preload: function() {
        
    },

    create: function() {
        game.add.sprite(0, 0, 'background2');
        game.add.sprite(100, 100, 'griffindor');
        game.add.sprite(330, 25, 'trophy');
        var harry = game.add.sprite(750, 100, 'harry');
        harry.scale.x *= -1;
        var winner =  game.add.sprite(230, 320, 'winner');
        winner.scale.setTo(0.8, 0.8);
        var ret = game.add.sprite(240, 440, 'return');
        ret.scale.setTo(0.3, 0.3);

        ret.inputEnabled = true;
        ret.events.onInputDown.add(this.backScreen, this);

    },

    update: function() {

    }
}

