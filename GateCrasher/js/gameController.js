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

        var button_str = '<button id="play_button"><img class="play_button_img" src="res/menus/button_play.png"/></button>';
        this.selector.append(button_str);
    },
    resizeEnemies : function(numEnemies){
        var totalHeight = $("#enemy_selector").outerHeight();
        var height = totalHeight / (numEnemies+1);
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
    getDrawHeightDivided : function(){
        return this.drawHeight;
    },
    getDrawWidthDivided : function(){
        return this.drawWidth;
    },
    setDrawWidth : function(w){
        this.drawWidth = w;
    },
    setDrawHeight : function(h){
        this.drawHeight = h;
    },
    drawLine : function(fromX, fromY, toX, toY){
        this.contexts[2].moveTo(fromX, fromY);
        this.contexts[2].lineTo(toX, toY);
        this.contexts[2].stroke();
    },
    clearLines : function(){
        this.contexts[2].clearRect(0, 0, this.canvas.width, this.canvas.height);
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
    },
    removeSelected : function(){
       // $("#responsive_menu img").attr("src","res/goodies/empty.png");
        $(".single_enemy").removeClass("selected");
    },
    addSelected : function(enemy_index){        
        $(".single_enemy").removeClass("selected");
        var img = $("#enemy_" + enemy_index).find("img").attr('src');
        $("#enemy_" + enemy_index).addClass("selected");
        $("#responsive_menu img").attr("src",img);       
    }
}

var anim_multipliers = {
    "turret":{
        idle : 3,
        attack : 1,
        hurt : 2
    },
    "enemy01":{
        idle : 2,
        walk : 1,
        attack: 1,
        hurt : 2
    },
    "angel":{
        idle: 1,
        hurt : 2,
        die: 1
    },
    "trap":{
        idle: 1,
        hurt : 2,
        attack: 1,
        closed : 1
    },
    "trumpet":{
        idle: 1,
        attack: 1,
        hurt : 2,
        die : 1
    },
    "tank":{
        idle: 1,
        attack: 1,
        hurt : 2,
        die : 1
    }
}

var anim_frames = {
    "turret":{
        idle : 4,
        attack : 4,
        hurt : 1,
    },
    "enemy01":{
        idle : 4,
        walk : 4,
        attack : 4,
        hurt : 1
    },
    "trap":{
        idle: 1,
        attack: 5,
        closed : 1
    },
    "trumpet":{
        idle: 5,
        attack: 5,
        hurt : 1,
        die : 5
    },
    "tank":{
        idle: 5,
        attack: 5,
        hurt : 1,
        die: 5
    },
    "angel":{
        idle: 5,
        attack: 5,
        hurt : 1,
        die : 5
    },
}

var lManager;
var lCharacter;


function resize(){
    var aspect_ratio = 400/600;
    if($(window).width() >800){
        console.log("hola");
        var title_height = $("#title").outerHeight();
        var window_width = $(window).width() - 200;
        var window_height = $(window).height() - title_height - 10;
        var relative_height = aspect_ratio * window_width;
        if(relative_height<window_height){
            $(".canvas_responsive").outerWidth($(window).width()-200);
            $("#canvas_container").outerWidth($(window).width()-200);
            $("#enemy_selector").outerHeight(relative_height);
            $(".canvas_responsive").outerHeight(relative_height);
            $("#canvas_container").outerHeight(relative_height);
        }
        else{
            var relative_width = window_height / aspect_ratio;           
            $(".canvas_responsive").outerWidth(relative_width);
            $("#canvas_container").outerWidth(relative_width);
            $(".canvas_responsive").outerHeight(window_height);
            $("#canvas_container").outerHeight(window_height);            
            $("#enemy_selector").outerHeight(window_height);
        }
        
        var enemy_width = relative_height/5;
        $("#enemy_selector").outerWidth(enemy_width);
        $("#enemy_selector").removeClass("responsive").removeClass("hidden");
        $("#responsive_menu").hide();
    }
    else{
        console.log("adios");
        var window_width = $(window).width() - 10;        
        var title_height = $("#title").outerHeight();
        window_height = $(window).height() -title_height - 15;
        var relative_height = window_width * aspect_ratio;
        if(relative_height<window_height){
            $(".canvas_responsive").outerWidth(window_width);
            $("#canvas_container").outerWidth(window_width);
            $(".canvas_responsive").outerHeight(relative_height);
            $("#canvas_containter").outerHeight(relative_height);            
            $("#enemy_selector").outerHeight(relative_height);
        }
        else{
            console.log("entro al else");
            var relative_width = window_height / aspect_ratio;            
            $(".canvas_responsive").outerWidth(relative_width);
            $("#canvas_container").outerWidth(relative_width);
            $(".canvas_responsive").outerHeight(window_height);
            $("#canvas_container").outerHeight(window_height);            
            $("#enemy_selector").outerHeight(window_height);
        }
        var offset= $("#myCanvas").offset().top;
        console.log("He saltado");
        $("#enemy_selector").addClass("responsive").addClass("hidden");
        $("#enemy_selector").outerHeight($(".canvas_responsive").outerHeight());
        $(".responsive").css("top", offset);
        $("#responsive_menu").show();
    }


    lManager.drawMap();
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
    var level = getUrlParameter("level");
    console.log("Selected level: " + level);
    $.getJSON("res/levels/level"+level+".json", function(data){
        lManager = new levelManager(myGameArea, images, data);

        var rows = lManager.numRows;
        var cols = lManager.numCols;
        var inicio = [0,0];
        var fin = [1, 5];

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
        //Pasillos
        "res/background/heaven_horizontal.png", // 0
        "res/background/heaven_vertical.png", // 1
        "res/background/heaven_corner1.png", // 2
        "res/background/heaven_corner2.png", // 3
        "res/background/heaven_corner3.png", // 4
        "res/background/heaven_corner4.png", // 5
        "res/background/heaven_intersectiondown.png", // 6
        "res/background/snow_end.png", // 7
        "res/background/cloud_blank.png", // 8
        "res/background/heaven_intersectionder.png", // 9
        "res/background/heaven_intersectionizq.png", // 10
        "res/background/heaven_intersectionup.png", // 11
        //Nubes
        "res/background/cloud_puzzle1.png", // 12
        "res/background/cloud_puzzle2.png", // 13
        "res/background/cloud_puzzle3.png", // 14
        "res/background/cloud_puzzle4.png", // 15
        "res/background/cloud_double.png", // 16
        "res/background/cloud_big1.png", // 17
        "res/background/cloud_big2.png", // 18
        "res/background/cloud_big3.png", // 19
        "res/background/cloud_big4.png", // 20
        "res/background/cloud_big5.png", // 21
        "res/background/cloud_big6.png", // 22
        "res/background/heaven_intersection.png", // 23
        //Bordes
        "res/background/tiles/m00.png", // 24
        "res/background/tiles/m01.png", // 25
        "res/background/tiles/m02.png", // 26
        "res/background/tiles/m10.png", // 27
        "res/background/tiles/m11.png", // 28
        "res/background/tiles/m12.png", // 29
        "res/background/tiles/m20.png", // 30
        "res/background/tiles/m21.png", // 31
        "res/background/tiles/m22.png", // 32
        //Nubes de dentro
        "res/background/tiles/intern1.png", // 33
        "res/background/tiles/intern2.png", // 34
        "res/background/tiles/intern3.png", // 35
        "res/background/tiles/intern4.png", // 36
        "res/background/tiles/intern5.png", // 37
        //Finales de los caminos
        "res/background/heaven_endleft.png", // 38
        "res/background/heaven_endup.png", // 39
        "res/background/heaven_enddown.png", // 40
        "res/background/heaven_endright.png", // 41
        
        //Sprites de enemigos y aliados
        "res/enemies/enemy01_stand.png",
        "res/enemies/enemy01_idle.png",
        "res/enemies/enemy01_attack.png",
        "res/enemies/enemy01_walk.png",
        "res/enemies/enemy01_red.png",
        "res/goodies/enemy01_stand.png",
        "res/goodies/enemy01_idle.png",
        "res/goodies/turret_idle.png",
        "res/goodies/turret_stand.png",
        "res/goodies/turret_attack.png",
        "res/goodies/turret_red.png",
        "res/goodies/trumpet_stand.png",
        "res/goodies/trumpet_idle.png",
        "res/goodies/trumpet_attack.png",
        "res/goodies/trumpet_red.png",
        "res/goodies/trumpet_dead.png",
        "res/goodies/tank_stand.png",
        "res/goodies/tank_idle.png",
        "res/goodies/tank_attack.png",
        "res/goodies/tank_dead.png",
        "res/goodies/angel_stand.png",
        "res/goodies/angel_idle.png",
        "res/goodies/angel_attack.png",
        "res/goodies/angel_stand.png",
        "res/goodies/angel_dead.png",
        "res/goodies/bullet.png",
        "res/goodies/bullet_anim.png",
        "res/goodies/ball.png",
        "res/goodies/ball_anim.png",
        "res/goodies/trap_stand.png",
        "res/goodies/trap_closed.png",
        "res/goodies/trap_idle.png",
        "res/goodies/trap_attack.png",
        "res/goodies/empty.png"

    );

    
    var numEnemies = 4;
    var maxEnemyNumber = new Array(numEnemies);
    for(var i = 0; i<numEnemies; i++){
        maxEnemyNumber[i] = 3;
    }

    $(window).on("resize", function(){                      
        resize();
    });

    $( window ).on( "orientationchange", function( event ) {
        console.log("Tilted");
        resize();
    });

    $("#myCanvas").on('click', function(e){
        lManager.manageCanvasClick(e.clientX, e.clientY);
    });

    $("#backgroundCanvas").on('click', function(){
    });

    $(document).on('click', ".single_enemy", function(e){
        lManager.manageEnemyClick($(this).data("enemy"));
    });

    $("#responsive_menu, #play_button").on('click', function(){
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
        $("#enemy_selector").remove();
        $("#responsive_menu").remove();
        lManager.startGame();
    });
    $("#back_arrow").on("click", function(){
        window.location.replace("levelselector.html");
    })

});

var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
};

