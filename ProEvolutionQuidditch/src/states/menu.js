ProEvolutionQuidditch.menuState = function(game) {

}
var keypress;
ProEvolutionQuidditch.menuState.prototype = {
    

    preload: function() {
        
    },

    create: function() {
        game.add.sprite(0, 0, 'background1');
        var title = game.add.sprite(30, 100, 'title');
        title.scale.setTo(0.5 , 0.5);

        var harry = game.add.sprite(80,250,'harry');
        harry.scale.setTo(0.7 , 0.7);

        game.add.sprite(340,220,'griffindor');

        var draco = game.add.sprite(730,250,'draco');
        draco.scale.setTo(0.7 , 0.7);
        //draco.anchor.setTo(.5,.5);
        draco.scale.x *= -1;

        var snitch = game.add.sprite(330,50,'snitch');
        snitch.scale.setTo(1.2,1.2);

        var start = game.add.sprite(150,450,'start');

        keypress = game.input.keyboard.addKey(Phaser.Keyboard.S);
        keypress.onDown.add(this.intro, this);
        
    },

    update: function() {

    },
    intro: function() {
            this.state.start('introState');
    }
    
}

