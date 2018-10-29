ProEvolutionQuidditch.introState = function(game) {

}

ProEvolutionQuidditch.introState.prototype = {

    preload: function() {
        game.add.image(0,0,'background2');

        //var TmpImg = game.cache.getImage('referee');
        //game.add.sprite(game.world.centerX - TmpImg.width/2.0,game.world.centerY - TmpImg.height/2.0,'referee');
        game.add.sprite(game.world.centerX/1.5,game.world.centerY/5, 'referee');
        myimage = game.add.sprite(game.world.centerX/5,game.world.centerY+120, 'clean');
        myimage.scale.setTo(0.43,0.25);
        //game.add.sprite(game.world.centerX,game.world.centerY/5, 'clean');
    },

    create: function() {
        setTimeout(function(){
            console.log("LLego al siguiente estado");
             game.state.start('levelState');
             }, 3000);
    },

    update: function() {

    }
}