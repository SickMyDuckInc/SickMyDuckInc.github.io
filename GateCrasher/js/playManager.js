/*
Esta clase es la que genera la reproducción de la partida en la segunda fase.
Recibe una matriz que genera el level manager que indica para cada casilla que recorre el personaje, que acciones realizan 
el propio personaje y cada enemigo, de forma que estos no tengan que estar comprobando cuando atacar.
*/

/*
El constructor de la clase playmanager
@parameters:
matrixMovement: Matriz de nxm que contiene que personaje se mueve a donde
listAction: Matriz de mxn que dice que personaje realiza una accion en un instante t
listCharacters: lista de todos los personajes del mapa
*/
 
var TIME_SQUARE =  1;

function playManager(matrixMovement,listAction, listCharacters, myGameArea, col, rows){
    this.matrixMovement = matrixMovement;
    this.listAction = listAction;
    this.listCharacters = listCharacters;
    this.canvas = myGameArea;
    this.col = col;
    this.rows = rows;

    this.spaceX = this.canvas.getWidth() / this.numCols;
    this.spaceY = this.canvas.getHeight() / this.numRows;
    this.velX = sizeSquareX / TIME_SQUARE;
    this.velY = sizeSquareY / TIME_SQUARE;
}

playManager.prototype.executeAction = function(time){
    for(var i; i<this.listAction.length; i++){
        this.listAction[i][time].action();
    }
}

playManager.prototype.executeMovement = function(time){
    for (var i = 0; i<this.matrixMovement.length;i++){
        this.matrixMovement[i][time].character.move(this.matrixMovement[i][time].x,this.matrixMovement[i][time].y,this.velX,this.velY);
    }
}

playManager.prototype.resize = function(){
    this.spaceX = this.canvas.getWidth() / this.numCols;
    this.spaceY = this.canvas.getHeight() / this.numRows;
    this.velX = sizeSquareX / TIME_SQUARE;
    this.velY = sizeSquareY / TIME_SQUARE;
}

playerManager.prototype.startDraw = function(){
    setInterval(executeMovement, 1/30);
    nextStage(executeAction,TIME_SQUARE);
}
