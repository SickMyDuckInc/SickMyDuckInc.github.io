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
var TRANSPARENT_COLOR = "white";
/***
 * rows: (int) filas del tablero
 * cols: (int) columnas del tablero
 * canvas: (objecto) objeto tipo myCanvas que gestiona la interfaz
 * numEnemies: (int) número total de tipos de enemigos del que dispone el jugador
 * maxEnemies: (array int) lista con el número de enemigos de cada tipo que el jugador puede utilizar
 */
function levelManager(rows, cols, canvas, numEnemies, maxEnemies){
    this.numRows = rows;
    this.numCols = cols;
    this.canvas = canvas;    
    this.numEnemies = numEnemies;
    this.maxEnemies = maxEnemies

    
    this.selectedEnemy = -1;
    this.enemiesColors = [GRAY_COLOR, RED_COLOR, BLUE_COLOR, RED_COLOR, BLUE_COLOR, GRAY_COLOR, RED_COLOR]; //esto cambiará a sprites

    this.matrix = [];

    for(var i = 0; i<this.numRows; i++){
        this.matrix[i] = new Array(this.numCols);
        for(var j = 0; j<this.numCols; j++){
            this.matrix[i][j]= -1;
        }
    }

    console.log(this.matrix);

    this.canvas.start();
    this.canvas.addEnemies(this.numEnemies, this.maxEnemies);
    this.canvas.resizeEnemies(this.numEnemies);

    this.intervalHeight = this.canvas.getHeight() / this.numRows;
    this.intervalWidth = this.canvas.getWidth() / this.numCols;

    this.drawHeight = this.canvas.getDrawHeight() / this.numRows;
    this.drawWidth = this.canvas.getDrawWidth() / this.numCols;


    console.log("Created levelManager with " + rows + " rows and " + cols + " cols");
}

levelManager.prototype.drawMap = function(){
    //this.canvas.clear();
    this.intervalHeight = this.canvas.getHeight() / this.numRows;
    this.intervalWidth = this.canvas.getWidth() / this.numCols;

    this.drawHeight = this.canvas.getDrawHeight() /this.numRows;
    this.drawWidth = this.canvas.getDrawWidth() / this.numCols;

    this.canvas.setColor(GRAY_COLOR);

    for(var i = 1; i<this.numRows; i++){
        this.canvas.drawLine(0, i*this.drawHeight, this.canvas.getDrawWidth(), i*this.drawHeight);
    }

    for(var j = 1; j<this.numCols; j++){
        this.canvas.drawLine(j*this.drawWidth, 0, j*this.drawWidth, this.canvas.getDrawHeight());
    }

    this.canvas.resizeEnemies(this.numEnemies);

}


levelManager.prototype.manageCanvasClick = function(posX, posY){

    var canvasPos = this.canvas.getPos(posX, posY);

    var casillaY = Math.floor(canvasPos.x / this.intervalWidth);
    var casillaX = Math.floor(canvasPos.y / this.intervalHeight);

    var casilla = {x:casillaX, y:casillaY};

    var actualOccuping = this.matrix[casillaX][casillaY];

    if(this.selectedEnemy != -1){
        //Si la celda no está ocupada por un enemigo del mismo tipo
        if(actualOccuping != this.selectedEnemy){
            console.log("Cambiando el enemigo " + actualOccuping + " por " + this.selectedEnemy);
            this.matrix[casillaX][casillaY] = this.selectedEnemy;
            if(this.maxEnemies[this.selectedEnemy]>0){
                this.maxEnemies[this.selectedEnemy]--;
                this.canvas.changeEnemyCount(this.selectedEnemy, this.maxEnemies[this.selectedEnemy]);
            }
            this.canvas.setFillColor(this.enemiesColors[this.selectedEnemy]);
            this.canvas.drawSquare(casillaY * this.drawHeight, casillaX * this.drawWidth, this.drawWidth, this.drawHeight);
            console.log(this.matrix);

            if(actualOccuping != -1){
                this.maxEnemies[actualOccuping]++;
                this.canvas.changeEnemyCount(actualOccuping, this.maxEnemies[actualOccuping]);
                this.selectedEnemy = actualOccuping;

                console.log("Seleccionado enemigo: " + actualOccuping);
            }
            else{
                this.selectedEnemy = -1;
            }
        }
        else{
            console.log("Celda ocupada por un enemigo del mismo tipo");
        }
    }
    else{
        console.log("No hay enemigos seleccionados");
        if(actualOccuping != -1){
            console.log("Cambiando a transparente");
            this.matrix[casillaX][casillaY] = -1;
            this.maxEnemies[actualOccuping]++;
            this.canvas.setFillColor(TRANSPARENT_COLOR);
            this.canvas.drawSquare(casillaY * this.drawHeight, casillaX * this.drawWidth, this.drawWidth, this.drawHeight);
            this.canvas.changeEnemyCount(actualOccuping, this.maxEnemies[actualOccuping]);
        }
    }
}

levelManager.prototype.manageEnemyClick = function(enemyId){
    if(this.maxEnemies[enemyId]>0){
        if(this.selectedEnemy != enemyId){
            this.selectedEnemy = enemyId;
            console.log("Seleccionado el enemigo: " + enemyId);
            this.canvas.hideBar();
        }
        else{
            this.selectedEnemy = -1;
            console.log("Deseleccionado el enemigo: " + enemyId);
        }
    }
    else{
        console.log("No quedan enemigos de este tipo");
    }
}