/*
Esta clase es la que por jQuery creará el tablero y definirá los eventos del click, etc.
Es la única clase que utilizará jQuery y funcionará como dispatcher. 
El resto de clases serán prototipos de javascript.
 */

function startGame() {
    myGamePiece = new component(30, 30, "red", 10, 120);
    myGamePiece.gravity = 0.05;
    myScore = new component("30px", "Consolas", "black", 280, 40, "text");
}
var context;

var myGameArea = {
    canvas : document.getElementById("myCanvas"),
    background : document.getElementById("backgroundCanvas"),
    lineCanvas : document.getElementById("lineCanvas"),
    selector: document.getElementById("enemy_selector"),
    start : function() {
        this.canvas = document.getElementById("myCanvas");
        this.selector = $("#enemy_selector");
        this.context = this.canvas.getContext("2d");
        this.contexts = Array();
        this.contexts[0] = this.canvas.getContext("2d");
        this.contexts[1] = this.background.getContext("2d");
        this.contexts[2] = this.lineCanvas.getContext("2d");
        this.frameNo = 0;
        this.context.fillStyle = RED_COLOR;
    },
    addEnemies : function(numEnemies, maxEnemyCount, enemiesSprites){
        for(var i = 0; i<numEnemies; i++){
            var str = '<div id="enemy_'+ i +'" data-enemy="'+ i +'" class="single_enemy">'+
                        '<div class="enemy_number">'+ maxEnemyCount[i]+'</div>'+
                        '<img src="'+ enemiesSprites[i] + '_stand.png" class="selector_img"/>' +
                    '</div>';
            this.selector.append(str);
        }

        var button_str = '<button id="play_button">Play</button>';
        this.selector.append(button_str);
    },
    resizeEnemies : function(numEnemies){
        var totalHeight = $("#enemy_selector").outerHeight();
        console.log(totalHeight);
        var height = totalHeight / (numEnemies+1);
        console.log("Altura individual: " + height);
        $(".single_enemy").outerHeight(height);
        $("#play_button").outerHeight(height-5);
    },
    changeEnemyCount : function(enemy_id, count){
        $("#enemy_" + enemy_id + " .enemy_number").text(count);
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    getWidth : function(){
        return this.canvas.scrollWidth;
    },
    getHeight : function(){
        return this.canvas.scrollHeight;
    },
    getDrawWidth : function(){
        return this.canvas.width;
    },
    getDrawHeight : function(){
        return this.canvas.height;
    },
    getContext : function(){
        return this.context;
    },
    drawLine : function(fromX, fromY, toX, toY){
        this.contexts[2].moveTo(fromX, fromY);
        this.contexts[2].lineTo(toX, toY);
        this.contexts[2].stroke();
    },
    drawSquare : function(fromX, fromY, width, height){
        this.context.fillRect(fromX, fromY, width, height);
        this.context.stroke();
    },
    drawTile : function(posX, posY, width, height, image){
        this.contexts[1].drawImage(image, posX, posY, width, height);
    },
    setColor : function(color){
        this.contexts[2].strokeStyle = color;
    },
    setFillColor : function(color){
        this.context.fillStyle = color;
    },
    getPos : function(posX, posY){
        var rect = this.canvas.getBoundingClientRect();
        var realX = posX - rect.left;
        var realY = posY - rect.top;
        var pos = {x:realX, y:realY};
        //console.log("posX: " + realX + " posY: " + realY);
        return pos;
    },
    hideBar : function(){
        $("#enemy_selector.responsive").addClass("hidden");
    }
}

var lManager;
var lCharacter;

function resize(){    
    $("#myCanvas").outerHeight($(window).height()-$("#myCanvas").offset().top- Math.abs($("#myCanvas").outerHeight(true) - $("#myCanvas").outerHeight() -10));
    var outerHeight = $("#myCanvas").outerHeight();
    var outerWidth = $("#myCanvas").outerWidth();
    $("#enemy_selector").outerHeight(outerHeight);

    $(".canvas_responsive").outerHeight(outerHeight);
    $("#canvas_container").outerWidth(outerWidth);

    var windowWidth = $(window).width();

    var totalWidth = 25 + outerWidth + $("#enemy_selector").outerWidth();

    if(windowWidth <= totalWidth){
        if(!$("#enemy_selector").hasClass("responsive")){
            var offset= $("#myCanvas").offset().top;
            console.log("He saltado");
            $("#enemy_selector").addClass("responsive").addClass("hidden");
            $(".responsive").css("top", offset);
            $("#responsive_menu").show();
        }
    }
    else{
        if($("#enemy_selector").hasClass("responsive")){
            $("#enemy_selector").removeClass("responsive").removeClass("hidden");
            $("#responsive_menu").hide();
        }
    }

    //lManager.drawMap();
    lManager.update();
}

var images = new Array();

function preload(){
    var remaining = arguments.length;
    var img;
    for(i = 0; i<arguments.length; i++){
        images[i] = new Image();
        images[i].onload = function(){
            --remaining;
            if(remaining<=0){
                startGame();
            }
        };

        images[i].src = preload.arguments[i];
    }
}

function startGame(){
    $.getJSON("res/levels/level2.json", function(data){
        lManager = new levelManager(myGameArea, images, data);

        var rows = lManager.numRows;
        var cols = lManager.numCols;
        var inicio = [0,0];
        var fin = [1, 5];

       
        var enemies =[  new enemy(0,0, new sprite(myGameArea.getContext(), "/res/enemies/enemy01_stand.png", 10, 10, 10, 10),0),
        new enemy(1,1, new sprite(myGameArea.getContext(), "/res/enemies/enemy01_stand.png", 10, 10, 10, 10),1),
        new enemy(2,2, new sprite(myGameArea.getContext(), "/res/enemies/enemy01_stand.png", 10, 10, 10, 10),2),
        new enemy(3,3, new sprite(myGameArea.getContext(), "/res/enemies/enemy01_stand.png", 10, 10, 10, 10),3)];
        enemies[3].sprite.addAnimation("walk",  "/res/enemies/enemy01_walk.png", 4, 200, 200);
        enemies[0].sprite.addAnimation("walk",  "/res/enemies/enemy01_walk.png", 4, 200, 200);
        enemies[1].sprite.addAnimation("walk",  "/res/enemies/enemy01_walk.png", 4, 200, 200);
        enemies[2].sprite.addAnimation("walk",  "/res/enemies/enemy01_walk.png", 4, 200, 200);
        enemies[0].sprite.playAnimation("walk");
        enemies[1].sprite.playAnimation("walk");
        enemies[2].sprite.playAnimation("walk");
        enemies[3].sprite.playAnimation("walk");
        lManager = new playManager(null,null,enemies,null,myGameArea);
        var ctx = myGameArea.getContext();
        
        //lCharacter = new character(inicio, fin, rows, cols);

        resize();

        //PRUEBA PARA CHARACTER
        //lCharacter.pathfinding();
    });
}

var fullscreen = false;
$(document).ready(function(){
    $(document).on("click", function(){
        if(fullscreen){
            var docelem = document.body;
            if (docelem.requestFullscreen) {
                docelem.requestFullscreen();
            }
            else if (docelem.mozRequestFullScreen) {
                docelem.mozRequestFullScreen();
            }
            else if (docelem.webkitRequestFullScreen) {
                docelem.webkitRequestFullScreen();
            }
            else if (docelem.msRequestFullscreen) {
                docelem.msRequestFullscreen();
            }
        } 
    });
    $("#responsive_menu").hide();

    preload(
        "res/background/snow_horizontal.png",
        "res/background/snow_vertical.png",
        "res/background/snow_corner1.png",
        "res/background/snow_corner2.png",
        "res/background/snow_corner3.png",
        "res/background/snow_corner4.png",
        "res/background/snow_intersection.png",
        "res/background/snow_end.png",
        "res/background/snow_empty.png",
        "res/background/snow_intersection2.png",
        "res/background/grass_corner1.png",
        "res/background/grass_empty.png",
        "res/background/grass_horizontal.png",
        "res/background/grass_vertical.png",
        "res/enemies/enemy01_stand.png",
        "res/enemies/enemy01_walk.png"
    );

    
    var numEnemies = 4;
    var maxEnemyNumber = new Array(numEnemies);
    for(var i = 0; i<numEnemies; i++){
        maxEnemyNumber[i] = 3;
    }

    $(window).on("resize", function(){                      
        resize();
    });

    $("#myCanvas").on('click', function(e){
        lManager.manageCanvasClick(e.clientX, e.clientY);
    });

    $("#backgroundCanvas").on('click', function(){
        console.log("background");
    });

    $(document).on('click', ".single_enemy", function(e){
        console.log("qie coño");
        lManager.manageEnemyClick($(this).data("enemy"));
    });

    $("#responsive_menu").on('click', function(){
        if($("#enemy_selector").hasClass("hidden")){
            $("#enemy_selector").removeClass("hidden");
        }
        else{
            $("#enemy_selector").addClass("hidden");
        }
    });

    $("#prueba").on("click", function(){
        setInterval(lManager.update, 1000/15);
    });

    $(document).on("click", "#play_button", function(){
        lManager.startGame();
    });

});

