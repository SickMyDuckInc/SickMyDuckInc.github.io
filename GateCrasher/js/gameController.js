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
    start : function() {
        this.canvas = document.getElementById("myCanvas");
        this.context = this.canvas.getContext("2d");
        this.frameNo = 0;
    },
    clear : function() {
        console.log("Cleared canvas");
        this.context.clearRect(0, 0, this.canvas.scrollWidth, this.canvas.scrollHeight);
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
    drawLine : function(fromX, fromY, toX, toY){
        this.context.moveTo(fromX, fromY);
        this.context.lineTo(toX, toY);
        this.context.stroke();
    },
    setColor : function(color){
        this.context.strokeStyle = color;
    },
    getPos : function(posX, posY){
        var rect = this.canvas.getBoundingClientRect();
        var realX = posX - rect.left;
        var realY = posY - rect.top;
        var pos = {x:realX, y:realY};
        //console.log("posX: " + realX + " posY: " + realY);
        return pos;
    }
}

var lManager;


function resize(){    
    $("#myCanvas").outerHeight($(window).height()-$("#myCanvas").offset().top- Math.abs($("#myCanvas").outerHeight(true) - $("#myCanvas").outerHeight() -10));
    lManager.drawMap();
}
$(document).ready(function(){
    lManager = new levelManager(4, 6, myGameArea);
    resize();
    $(window).on("resize", function(){                      
        resize();
    });

    $("#myCanvas").on('click', function(e){
        lManager.manageClick(e.clientX, e.clientY);
    });
});