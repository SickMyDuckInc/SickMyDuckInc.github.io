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
var NON_WALKABLE = -2;
var EMPTY_CELL = -1;
/***
 * rows: (int) filas del tablero
 * cols: (int) columnas del tablero
 * canvas: (objecto) objeto tipo myCanvas que gestiona la interfaz
 * numEnemies: (int) número total de tipos de enemigos del que dispone el jugador
 * maxEnemies: (array int) lista con el número de enemigos de cada tipo que el jugador puede utilizar
 */
function levelManager(rows, cols, canvas, numEnemies, maxEnemies, allImages, level){
    this.numRows = level.rows;
    this.numCols = level.cols;
    this.canvas = canvas;    
    this.numEnemies = numEnemies;
    this.maxEnemies = maxEnemies;
    this.allImages = allImages;
    this.firstUpdate = false;

    
    this.selectedEnemy = -1;

    this.spawnedSprites = {};

    //HAY QUE RECIBIRLO POR JSON
    this.enemiesSprites = [numEnemies];
    for(var i = 0; i<this.numEnemies; i++){
        this.enemiesSprites[i] = "res/enemies/enemy01_stand.png";
    }

    //Almacena el enemigo que hay en cada casilla del mapa
    this.matrix = level.walkable;

    //Almacena el id del array de spawnedSprites que hay en una casilla (para poder borrarlos)
    this.spawnedSpritesMatrix = [];

    this.tileMatrix = level.tileset;

    for(var i = 0; i<this.numRows; i++){
        //this.matrix[i] = new Array(this.numCols);
        this.spawnedSpritesMatrix[i] = new Array(this.numCols);
        //this.tileMatrix[i] = new Array(this.numCols);
        for(var j = 0; j<this.numCols; j++){
            //this.matrix[i][j]= -1;
            this.spawnedSpritesMatrix[i][j] = -1;
            //this.tileMatrix[i][j] = 2;
        }
    }

    console.log(this.matrix);

    this.canvas.start();
    this.canvas.addEnemies(this.numEnemies, this.maxEnemies, this.enemiesSprites);
    this.canvas.resizeEnemies(this.numEnemies);

    this.intervalHeight = this.canvas.getHeight() / this.numRows;
    this.intervalWidth = this.canvas.getWidth() / this.numCols;

    this.drawHeight = this.canvas.getDrawHeight() / this.numRows;
    this.drawWidth = this.canvas.getDrawWidth() / this.numCols;

    this.player = new sprite(ctx, "res/enemies/enemy01_stand.png", this.drawHeight, this.drawWidth, 0, 0);
    this.player.addAnimation("walk", "res/enemies/enemy01_walk.png", 4, 200, 200);

    this.canvas.drawTile(0, 0, this.drawWidth, this.drawHeight, this.allImages[0]);
    
    setInterval( () => this.update(), 100);

    console.log("Created levelManager with " + rows + " rows and " + cols + " cols");
}

levelManager.prototype.drawMap = function(){
    //this.canvas.clear();
    this.intervalHeight = this.canvas.getHeight() / this.numRows;
    this.intervalWidth = this.canvas.getWidth() / this.numCols;

    this.drawHeight = this.canvas.getDrawHeight() /this.numRows;
    this.drawWidth = this.canvas.getDrawWidth() / this.numCols;    

    this.canvas.resizeEnemies(this.numEnemies);

}

levelManager.prototype.drawBasic = function(){    
    this.canvas.setColor(GRAY_COLOR);

    for(var i = 1; i<this.numRows; i++){
        this.canvas.drawLine(0, i*this.drawHeight, this.canvas.getDrawWidth(), i*this.drawHeight);
    }

    for(var j = 1; j<this.numCols; j++){
        this.canvas.drawLine(j*this.drawWidth, 0, j*this.drawWidth, this.canvas.getDrawHeight());
    }
}

levelManager.prototype.update = function(){
    if(!this.firstUpdate){
        this.firstUpdate = true;
        this.canvas.clear();
        //this.canvas.drawTile(0, 0, this.drawWidth, this.drawHeight, this.allImages[2]);
        this.paintTile();
        this.drawBasic();
    

        for(var element in this.spawnedSprites){
            this.spawnedSprites[element].draw();
        }
    }  

    if(Object.keys(this.spawnedSprites).length==0){
        this.firstUpdate = true;
    }
    else{
        this.firstUpdate = false;
    }  
}

levelManager.prototype.paintTile = function(){
    for(i = 0; i<this.numRows; i++){
        for(j = 0; j<this.numCols; j++){
            var posX = i * this.drawWidth;
            var posY = j * this.drawHeight;
            var index = this.tileMatrix[i][j];
            var im = this.allImages[index];
            
            this.canvas.drawTile(posY, posX, this.drawWidth, this.drawHeight, im);
        }
    }
}


levelManager.prototype.manageCanvasClick = function(posX, posY){

    var canvasPos = this.canvas.getPos(posX, posY);

    var casillaY = Math.floor(canvasPos.x / this.intervalWidth);
    var casillaX = Math.floor(canvasPos.y / this.intervalHeight);

    var casilla = {x:casillaX, y:casillaY};

    var actualOccuping = this.matrix[casillaX][casillaY];

    if(this.selectedEnemy != -1){
        //Si la celda no está ocupada por un enemigo del mismo tipo
        if(actualOccuping != this.selectedEnemy && actualOccuping != NON_WALKABLE){
            console.log("Cambiando el enemigo " + actualOccuping + " por " + this.selectedEnemy);
            this.matrix[casillaX][casillaY] = this.selectedEnemy;
            if(this.maxEnemies[this.selectedEnemy]>0){
                this.maxEnemies[this.selectedEnemy]--;
                this.canvas.changeEnemyCount(this.selectedEnemy, this.maxEnemies[this.selectedEnemy]);
            }
            this.spawnSprite(casillaX, casillaY);
            console.log(this.matrix);

            if(actualOccuping != EMPTY_CELL){
                this.maxEnemies[actualOccuping]++;
                this.canvas.changeEnemyCount(actualOccuping, this.maxEnemies[actualOccuping]);
                this.selectedEnemy = actualOccuping;

                console.log("Seleccionado enemigo: " + actualOccuping);
            }
            else{
                this.selectedEnemy = -1;
            }
        }
        else if(actualOccuping == NON_WALKABLE){
            console.log("En esta celda no se pueden colocar objetos");
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
            var index = this.spawnedSpritesMatrix[casillaX][casillaY];
            console.log(index);
            delete this.spawnedSprites["x:" + casillaX + "y:" + casillaY];
            console.log(this.spawnedSprites);
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

levelManager.prototype.spawnSprite = function(casillaX, casillaY){

    var player2 = new sprite(ctx, "res/enemies/enemy01_stand.png", this.drawHeight, this.drawWidth, casillaY * this.drawHeight, casillaX * this.drawWidth);
    player2.addAnimation("walk", "res/enemies/enemy01_walk.png", 4, 200, 200);
    player2.playAnimation("walk");
    this.spawnedSprites["x:" + casillaX + "y:" + casillaY] = player2;
    console.log("Sprites: " + this.spawnedSprites + ", matrix: " + this.spawnedSpritesMatrix);
}