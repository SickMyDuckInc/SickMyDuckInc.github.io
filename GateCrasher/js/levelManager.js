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

function levelManager(rows, cols, canvas, numEnemies){
    this.numRows = rows;
    this.numCols = cols;
    this.canvas = canvas;    
    this.numEnemies = numEnemies;
    this.selectedEnemy = -1;

    this.matrix = [];

    for(var i = 0; i<this.numRows; i++){
        this.matrix[i] = new Array(this.numCols);
        for(var j = 0; j<this.numCols; j++){
            this.matrix[i][j]= -1;
        }
    }

    console.log(this.matrix);

    this.canvas.start();
    this.canvas.addEnemies(this.numEnemies);
    this.canvas.resizeEnemies(this.numEnemies);

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

    this.canvas.resizeEnemies(this.numEnemies);

}


levelManager.prototype.manageCanvasClick = function(posX, posY){
    if(this.selectedEnemy != -1){
        var canvasPos = this.canvas.getPos(posX, posY);

        var casillaY = Math.floor(canvasPos.x / this.intervalWidth);
        var casillaX = Math.floor(canvasPos.y / this.intervalHeight);

        var casilla = {x:casillaX, y:casillaY};

        console.log("X: " + casillaX + ", Y: " + casillaY);

        this.matrix[casillaX][casillaY] = this.selectedEnemy;
        console.log(this.matrix);

        this.selectedEnemy = -1;
    }
    else{
        console.log("No hay enemigos seleccionados");
    }
}

levelManager.prototype.manageEnemyClick = function(enemyId){
    if(this.selectedEnemy != enemyId){
        this.selectedEnemy = enemyId;
        console.log("Seleccionado el enemigo: " + enemyId);
    }
    else{
        this.selectedEnemy = -1;
        console.log("Deseleccionado el enemigo: " + enemyId);
    }
}