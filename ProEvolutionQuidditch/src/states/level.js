ProEvolutionQuidditch.levelState = function(game) {

}

var sprite;
var backgorund;
var goldenSnitch;
var upKey;
var downKey;
var leftKey;
var rightKey;

var speed = 2;
var snitchSpeed = 3;
var lookingLeft = false;

var snitchPosition;
var snitchDirection;
var offsetMovement = 200;

ProEvolutionQuidditch.levelState.prototype = {

    preload: function() {
        
    },    

    create: function() {
        backgorund = game.add.sprite(0, 0, "stadium1");
        sprite = game.add.sprite(120, game.world.height / 2, "harry");
        sprite.scale.setTo(0.4, 0.4);

        var randomPos = createNewPos();
        goldenSnitch = game.add.sprite(randomPos[0], randomPos[1], "snitch");
        goldenSnitch.scale.setTo(0.4, 0.4);

        snitchPosition = createRandomMovement();
        snitchDirection = calculateSnitchDirection();

        //  Teclas de movimiento
        upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
        downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
        leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    },

    update: function() {
        if (upKey.isDown && sprite.y > 0)
        {
            sprite.y -= speed;
        }
        else if (downKey.isDown && sprite.y < game.world.height)
        {
            sprite.y += speed;
        }

        if (leftKey.isDown && sprite.x > 0)
        {
            sprite.x -= speed;
            if(!lookingLeft) {
                sprite.scale.x *= -1;
                lookingLeft = true;
            }
        }
        else if (rightKey.isDown && sprite.x < game.world.width)
        {
            sprite.x += speed;
            if(lookingLeft) {
                sprite.scale.x *= -1;
                lookingLeft = false;
            }
        }
        
        if(distance() < 3) {
            snitchPosition = createRandomMovement();
            snitchDirection = calculateSnitchDirection();
        }
        else {
            goldenSnitch.x += snitchDirection[0] * snitchSpeed;
            goldenSnitch.y += snitchDirection[1] * snitchSpeed;
        }
    }
}

function createNewPos()  {
    return [game.rnd.realInRange(0, game.world.width), game.rnd.realInRange(0, game.world.height)];
}

function createRandomMovement() {
    var returnx= -1;
    var returny = -1;
    while(returnx > game.world.width  || returnx < 0 || returny > game.world.height || returny < 0) {
        randomValueX = game.rnd.realInRange(-offsetMovement, offsetMovement);
        randomValueY = game.rnd.realInRange(-offsetMovement, offsetMovement);
        returnx = goldenSnitch.x + randomValueX;
        returny = goldenSnitch.y + randomValueY
    }
    return [returnx, returny];
}

function calculateSnitchDirection() {
    var vectorx = snitchPosition[0] - goldenSnitch.x;
    var vectory = snitchPosition[1] - goldenSnitch.y;
    var length = Math.sqrt(vectorx * vectorx + vectory * vectory);
    return [vectorx / length, vectory / length];
}

function distance() {
    var vectorx = Math.abs(snitchPosition[0] - goldenSnitch.x);
    var vectory = Math.abs(snitchPosition[1] - goldenSnitch.y );
    return Math.sqrt(vectorx * vectorx + vectory * vectory);
}