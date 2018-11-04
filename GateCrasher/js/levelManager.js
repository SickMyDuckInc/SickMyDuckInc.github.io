/*
Esta clase es la que genera los niveles a partir de matrices almacenadas en un json.
Tiene tres matrices:
- Sprites: determina que sprite se genera en qué casilla (es meramente estética).
- Pathfinding: Es la matriz que se utilizará para el pathfinding de los personajes (tiene las recompensas de cada casilla)
- Matriz de objetos: Determina en que puntos se pueden colocar los objetos. El jugador la irá rellenando
*/

var GRAY_COLOR = "#e6e6e6";
var RED_COLOR = "#ff0000";
var BLUE_COLOR = "#0000ff";

function levelManager(rows, cols, canvas){
    this.numRows = rows;
    this.numCols = cols;
    this.canvas = canvas;    

    this.canvas.start();

    this.intervalHeight = this.canvas.getHeight() / this.numRows;
    this.intervalWidth = this.canvas.getWidth() / this.numCols;


    console.log("Created levelManager with " + rows + " rows and " + cols + " cols");
}

levelManager.prototype.drawMap = function(){
    this.canvas.clear();
    this.intervalHeight = this.canvas.getHeight() / this.numRows;
    this.intervalWidth = this.canvas.getWidth() / this.numCols;

    var drawHeight = this.canvas.getDrawHeight() /this.numRows;
    var drawWidth = this.canvas.getDrawWidth() / this.numCols;

    this.canvas.setColor(GRAY_COLOR);

    for(var i = 1; i<this.numRows; i++){
        this.canvas.drawLine(0, i*drawHeight, this.canvas.getDrawWidth(), i*drawHeight);
    }

    for(var j = 1; j<this.numCols; j++){
        this.canvas.drawLine(j*drawWidth, 0, j*drawWidth, this.canvas.getDrawHeight());
    }

    //this.canvas.clear();
    console.log("Dibujando mapa");
}


levelManager.prototype.manageClick = function(posX, posY){
    var canvasPos = this.canvas.getPos(posX, posY);

    var casillaY = Math.floor(canvasPos.x / this.intervalWidth);
    var casillaX = Math.floor(canvasPos.y / this.intervalHeight);

    var casilla = {x:casillaX, y:casillaY};

    console.log("X: " + casillaX + ", Y: " + casillaY);

}