var MeatballRain = {}

MeatballRain.levelState = function(game) {

}

var background;
var player;
var platforms;
var hamburgers;
var marcador;

var upKey;
var downKey;
var leftKey;
var rightKey;

var speed = 2;
var jump = 8;
var lookingLeft = false;

MeatballRain.levelState.prototype = {


    preload: function() {
        game.load.image('background', 'assets/background.png');
        game.load.image('hamburger', 'assets/hamburger.png');
        game.load.image('platform', 'assets/plataforma.png');
        game.load.spritesheet('personaje', 'assets/personaje.png', 184,325, 8);

        game.load.audio('numkey', 'assets/audio/numkey.wav');
        game.load.audio('shampoo', 'assets/audio/shampoo.mp3');

    },
    
    create: function() {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.physics.arcade.gravity.y = 800;
    
        background = game.add.sprite(0,0,'background');
        platforms = game.add.physicsGroup();       

        bgMusic = game.add.audio('shampoo');
        fxSound = game.add.audio('numkey');
        bgMusic.play();

        p1 = platforms.create(0, 550, 'platform');
        p1.scale.setTo(2,2);
        platforms.create(400, 300, 'platform');
        platforms.create(600, 150, 'platform');
        platforms.create(-200, 420, 'platform');
        
        platforms.setAll('body.allowGravity',false);
        platforms.setAll('body.immovable', true);

        player = game.add.sprite(300, 450, 'personaje');
        player.animations.add('walk');
        player.scale.setTo(0.3, 0.3);
        game.physics.enable(player, Phaser.Physics.ARCADE);
        player.body.collideWorldBounds = true;

        hamburgers = game.add.physicsGroup();

        for(var i = 0; i < 5; i++) {
            h = hamburgers.create(50 + i*140, 10, 'hamburger');
            h.scale.setTo(0.05,0.05);
        }
        hamburgers.setAll('body.collideWorldBounds', true);
        hamburgers.setAll('body.bounce.y', 0.5);

        marcador = game.add.text(150, 50, 'Marcador: 0');
        marcador.anchor.set(0.5);

        marcador.font = 'Arial Black';
        marcador.fontSize = 30;
        marcador.fontWeight = 'bold';
        marcador.fill = '#ec008c';

        upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
        downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
        leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        
    },
    
    update: function() {

        game.physics.arcade.collide(player, platforms);
        game.physics.arcade.collide(hamburgers, platforms);
        game.physics.arcade.collide(player, hamburgers);       

        updateMovement();
        game.physics.arcade.overlap(player, hamburgers, calculateCollisions, null, this);
        
    }
}

function updateMovement() {
    if (upKey.isDown)
    {            
        player.y -= jump;
    }

    if (leftKey.isDown)
    {
        player.x -= speed;
        if(!lookingLeft) {
            player.animations.play('walk', 8, true);
            player.scale.x *= -1;
            lookingLeft = true;
        }
    }
    else if (rightKey.isDown)
    {
        player.x += speed;
        if(lookingLeft) {
            player.animations.play('walk', 8, true);
            player.scale.x *= -1;
            lookingLeft = false;
        }
    }
    else{
        player.animations.stop(null, true);
    }
}

function calculateCollisions(p, ham) {
    Console.log("hello bitch");
    hamburgers.remove(ham);
    ham.kill();
}