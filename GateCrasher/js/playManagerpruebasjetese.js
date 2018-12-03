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
myGameArea: Tablero del juego
col: Número de columnas
row: número de filas
*/

//Parámetro que determina el tiempo que tarda un personaje en avanzar a la siguiente casilla del mapa
var TIME_SQUARE =  1;

function playManager(actions, levelManager, allEnemies, character, canvas){

    this.actions = actions;
    this.levelManager = levelManager;
    this.allEnemies = allEnemies;
    this.character = character;
    this.canvas = canvas;


    this.updateInterval = setInterval(() => this.update(), 100);

}

playManager.prototype.update = function(){
    this.canvas.clear();    

    for(var element in this.allEnemies){
        this.allEnemies[element].sprite.draw();
    }

    //this.character.sprite.draw();
}


//Constructior de la clase, 
// function playManager(matrixMovement,listAction, listCharacters, myGameArea, col, rows){
//     this.matrixMovement = matrixMovement;
//     this.listAction = listAction;
//     this.listCharacters = listCharacters;
//     this.canvas = myGameArea;
//     this.col = col;
//     this.rows = rows;

//     //Calculamos el espacio de canvas que ocupa cada "rectangulo" del mapa
//     this.spaceX = this.canvas.getWidth() / this.numCols;
//     this.spaceY = this.canvas.getHeight() / this.numRows;
//     //Calculamos la velocidad en la que los personajes van a pasar de una casilla a la siguiente
//     this.velX = sizeSquareX / TIME_SQUARE;
//     this.velY = sizeSquareY / TIME_SQUARE;
// }

// //Función que recorre la lista de acciones a realizar(personajes.action()) en un tiempo t
// playManager.prototype.executeAction = function(time){
//     for(var i; i<this.listAction.length; i++){
//         this.listAction[i][time].action();
//     }
// }

// //Función que mueve a los personaje de una casilla a la siguiente en un tiempo t
// playManager.prototype.executeMovement = function(time){
//     for (var i = 0; i<this.matrixMovement.length;i++){
//         this.matrixMovement[i][time].character.move(this.matrixMovement[i][time].x,this.matrixMovement[i][time].y,this.velX,this.velY);
//     }
// }

// //resize del canvas
// playManager.prototype.resize = function(){
//     this.spaceX = this.canvas.getWidth() / this.numCols;
//     this.spaceY = this.canvas.getHeight() / this.numRows;
//     this.velX = sizeSquareX / TIME_SQUARE;
//     this.velY = sizeSquareY / TIME_SQUARE;
// }

// //Función que ejecuta las acciones y el movimiento de los personajes
// playerManager.prototype.startDraw = function(){
//     setInterval(executeMovement, 1/30);
//     nextStage(executeAction,TIME_SQUARE);
// }
