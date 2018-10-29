ProEvolutionQuidditch.introState = function(game) {

}

ProEvolutionQuidditch.introState.prototype = {

    preload: function() {
        game.add.image(0,0,'background2');

        game.add.sprite(game.world.centerX/1.5,game.world.centerY/5, 'referee');
        myimage = game.add.sprite(game.world.centerX/5,game.world.centerY+120, 'clean');
        myimage.scale.setTo(0.43,0.25);

        keypress = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        keypress.onDown.add(this.level, this);
    },

    create: function() {

    },

    update: function() {

    },

    level: function(){
        this.state.start('levelState');
    }
}