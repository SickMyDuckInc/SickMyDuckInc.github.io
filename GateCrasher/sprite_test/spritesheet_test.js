var canvas = document.getElementById("spriteCanvas");
var ctx = canvas.getContext("2d");

var updateRate = 15;
var temp = setInterval(update, 1000 / updateRate);

var player = new sprite(ctx, "enemy01_stand.png");
player.addAnimation("walk", "enemy01_walk.png", 4, 200, 200);
player.scaleSprite(0.5);
player.setSpeed(10);

var directionPos = { x : 0, y : 0 };

var lookingRight = false;
var testingMovement = true;
var isWalking = false;

function drawGrid() {
    for(var i = 100; i < 600; i += 100) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, 600); 
        ctx.stroke();   
        ctx.beginPath();  
        ctx.moveTo(0, i);
        ctx.lineTo(600, i);  
        ctx.stroke();
    }
}

function update() {
    ctx.clearRect(0,0, 600, 600);
    drawGrid(); 
    if(player.x > directionPos.x) {
        if(!isWalking) {
            isWalking = true;
            player.playAnimation("walk");
        }
        
        if (lookingRight) {
            lookingRight = false;
            player.flip();
        }
        player.moveInDirection("LEFT");
    } else if(player.x < directionPos.x) {
        if(!isWalking) {
            isWalking = true;
            player.playAnimation("walk");
        }        
        if (!lookingRight) {
            lookingRight = true;
            player.flip();
        }
        player.moveInDirection("RIGHT");
    }  
    else {
        if(!testingMovement) {
            player.stopAnimation();
            isWalking = false;
        } 
        if(player.y > directionPos.y) {
            player.moveInDirection("UP");
        } else if(player.y < directionPos.y) {
            player.moveInDirection("DOWN");
        } 
        else {
            testingMovement = true;
        }
    }
    player.draw();
}

function getCursorPosition(canvas, event) {
    var rect = canvas.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;    
    return [x, y];
}

canvas.addEventListener('mousedown', function(evt) {
    var mousePos = getCursorPosition(canvas, evt);
    directionPos.x = mousePos[0] - (mousePos[0] % 100);
    directionPos.y = mousePos[1] - (mousePos[1] % 100);
    testingMovement = false;
}, false);


function flipPlayer() {
    lookingRight = !lookingRight;
    player.flip();
}
function playAnimation() {
    isWalking = true;
    player.playAnimation("walk");
}
function stopAnimation() {
    isWalking = false;
    player.stopAnimation();
}
var slider = document.getElementById("scale");
slider.oninput = function() {
    player.scaleSprite(this.value / 10);
} 