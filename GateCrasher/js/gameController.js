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
    selector: document.getElementById("enemy_selector"),
    start : function() {
        this.canvas = document.getElementById("myCanvas");
        this.selector = $("#enemy_selector");
        this.context = this.canvas.getContext("2d");
        this.frameNo = 0;
        this.context.fillStyle = RED_COLOR;
    },
    addEnemies : function(numEnemies, maxEnemyCount, enemiesSprites){
        for(var i = 0; i<numEnemies; i++){
            var str = '<div id="enemy_'+ i +'" data-enemy="'+ i +'" class="single_enemy">'+
                        '<div class="enemy_number">'+ maxEnemyCount[i]+'</div>'+
                        '<img src="'+ enemiesSprites[i] +'" class="selector_img"/>' +
                    '</div>';
            this.selector.append(str);
        }

        var button_str = '<button class="play_button">Play</button>';
        this.selector.append(button_str);
    },
    resizeEnemies : function(numEnemies){
        var totalHeight = $("#enemy_selector").outerHeight();
        console.log(totalHeight);
        var height = totalHeight / (numEnemies+1);
        console.log("Altura individual: " + height);
        $(".single_enemy").outerHeight(height);
        $(".play_button").outerHeight(height-5);
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
        this.context.moveTo(fromX, fromY);
        this.context.lineTo(toX, toY);
        this.context.stroke();
    },
    drawSquare : function(fromX, fromY, width, height){
        this.context.fillRect(fromX, fromY, width, height);
        this.context.stroke();
    },
    drawTile : function(posX, posY, width, height, image){
        this.context.drawImage(image, posX, posY, width, height);
    },
    setColor : function(color){
        this.context.strokeStyle = color;
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

    lManager.drawMap();
    lManager.update();
}

var images = new Array();
function preload(){
    for(i = 0; i<arguments.length; i++){
        images[i] = new Image();
        images[i].src = preload.arguments[i];
    }
}

$(document).ready(function(){
    $("#responsive_menu").hide();

    preload(
        "../res/background/grass_corner1.png",
        "../res/background/grass_empty.png",
        "../res/background/grass_horizontal.png",
        "../res/background/grass_vertical.png"
    );

    
    var numEnemies = 4;
    var maxEnemyNumber = new Array(numEnemies);
    for(var i = 0; i<numEnemies; i++){
        maxEnemyNumber[i] = 3;
    } 

    $.getJSON("../res/levels/level1.json", function(data){
        lManager = new levelManager(4, 6, myGameArea, numEnemies, maxEnemyNumber, images, data);

        var rows = lManager.numRows;
        var cols = lManager.numCols;
        var inicio = [0,0];
        var fin = [1, 5];

        var ctx = myGameArea.getContext();
        
        lCharacter = new character(inicio, fin, rows, cols);

        resize();

        //PRUEBA PARA CHARACTER
        lCharacter.pathfinding();
        //

        $(window).on("resize", function(){                      
            resize();
        });

        $("#myCanvas").on('click', function(e){
            lManager.manageCanvasClick(e.clientX, e.clientY);
        });

        $(".single_enemy").on('click', function(e){
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
    
    });
});


var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var updateRate = 15;
