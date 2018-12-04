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
function levelManager(canvas, allImages, level){
    this.numRows = level.rows;
    this.numCols = level.cols;
    this.canvas = canvas;    
    this.numEnemies = level.numEnemies;
    this.maxEnemies = new Array(this.numEnemies);
    this.enemiesTypes = new Array(this.numEnemies);
    this.allImages = allImages;
    this.firstUpdate = false;
    this.doUpdate = true;

    
    this.selectedEnemy = -1;

    this.spawnedSprites = {};
    this.spawnedHeroes = Array();

    this.enemiesSprites = [this.numEnemies];
    for(var i = 0; i<this.numEnemies; i++){
        this.enemiesSprites[i] = "res/goodies/"+ level.enemies[i].sprite;
        this.maxEnemies[i] = level.enemies[i].maxNumber;
        this.enemiesTypes[i] = level.enemies[i].type;
    }

    this.characters = level.characters;

    //Almacena el enemigo que hay en cada casilla del mapa
    this.matrix = level.walkable;
    this.walkable = [];

    //Almacena el id del array de spawnedSprites que hay en una casilla (para poder borrarlos)
    this.spawnedSpritesMatrix = [];

    this.tileMatrix = level.tileset;

    for(var i = 0; i<this.numRows; i++){
        this.spawnedSpritesMatrix[i] = new Array(this.numCols);
        this.walkable[i] = new Array(this.numCols);
        for(var j = 0; j<this.numCols; j++){
            this.spawnedSpritesMatrix[i][j] = -1;
            this.walkable[i][j] = this.matrix[i][j] + 2;
        }
    }


    console.log("Enemies Matrix: ");
    console.log(this.matrix);
    console.log("Walkable Matrix: ");
    console.log(this.walkable);

    this.canvas.start();
    this.canvas.addEnemies(this.numEnemies, this.maxEnemies, this.enemiesSprites);
    this.canvas.resizeEnemies(this.numEnemies);

    this.intervalHeight = this.canvas.getHeight() / this.numRows;
    this.intervalWidth = this.canvas.getWidth() / this.numCols;

    this.drawHeight = this.canvas.getDrawHeight() / this.numRows;
    this.drawWidth = this.canvas.getDrawWidth() / this.numCols;

    this.canvas.setDrawWidth(this.drawWidth);
    this.canvas.setDrawHeight(this.drawHeight);


    this.canvas.drawTile(0, 0, this.drawWidth, this.drawHeight, this.allImages[0]);
    
    this.updateInterval = setInterval( () => this.update(), 100);

    console.log("Created levelManager with " + this.numRows + " rows and " + this.numCols + " cols");
}

levelManager.prototype.drawMap = function(){
    this.intervalHeight = this.canvas.getHeight() / this.numRows;
    this.intervalWidth = this.canvas.getWidth() / this.numCols;

    this.drawHeight = this.canvas.getDrawHeight() /this.numRows;
    this.drawWidth = this.canvas.getDrawWidth() / this.numCols;  
    
    this.canvas.setDrawWidth(this.drawWidth);
    this.canvas.setDrawHeight(this.drawHeight);

    this.canvas.resizeEnemies(this.numEnemies);
    this.paintTile();
    this.drawBasic();
    this.spawnHeroes();

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

        for(var element in this.spawnedSprites){
            this.spawnedSprites[element].sprite.draw();
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

    console.log("Click en la casilla: " + casillaX + ", " + casillaY);

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
        if(actualOccuping > -1){
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

    var player = new sprite(this.canvas.getContext(), this.enemiesSprites[this.selectedEnemy] +"_stand.png", this.drawHeight, this.drawWidth, casillaY * this.drawHeight, casillaX * this.drawWidth);
    var lastIndexOf = this.enemiesSprites[this.selectedEnemy].lastIndexOf("/");
    var substr = this.enemiesSprites[this.selectedEnemy].substr(lastIndexOf + 1);
    player.addAnimation("idle",  this.enemiesSprites[this.selectedEnemy] +"_idle.png", anim_frames[substr].idle, 200, 200, anim_multipliers[substr].idle);
    player.playAnimation("idle");
    var spriteToSpawn = {
        sprite : player,
        type : this.enemiesTypes[this.selectedEnemy],
        isEnemy : true,
        posX : casillaX,
        posY : casillaY
    }
    this.spawnedSprites["x:" + casillaX + "y:" + casillaY] = spriteToSpawn;
    console.log("Sprites: " + this.spawnedSprites + ", matrix: ");
    console.log(this.matrix);
}

levelManager.prototype.spawnHeroes = function(){
    for(i = 0; i<this.characters.length; i++){
        var pos = this.characters[i].initialPos;
        var player = new sprite(this.canvas.getContext(), "res/enemies/" +this.characters[i].sprite +"_stand.png", this.drawHeight, this.drawWidth, pos[1] * this.drawHeight, pos[0] * this.drawWidth);
        player.addAnimation("idle", "res/enemies/" + this.characters[i].sprite +"_idle.png", anim_frames[this.characters[i].sprite].idle, 200, 200, anim_multipliers[this.characters[i].sprite].idle);
        player.addAnimation("walk", "res/enemies/" + this.characters[i].sprite +"_walk.png", anim_frames[this.characters[i].sprite].walk, 200, 200,  anim_multipliers[this.characters[i].sprite].walk);
        player.addAnimation("attack", "res/enemies/" + this.characters[i].sprite +"_attack.png", anim_frames[this.characters[i].sprite].attack, 200, 200,  anim_multipliers[this.characters[i].sprite].attack);
        player.addAnimation("hurt", "res/enemies/" + this.characters[i].sprite +"_red.png", anim_frames[this.characters[i].sprite].hurt, 200, 200,  anim_multipliers[this.characters[i].sprite].hurt);
        player.playAnimation("idle");
        player.flip();
        var spriteToAdd = {
            sprite : player,
            isEnemy: false
        }
        this.spawnedSprites["x:" + pos[0] + "y:" + pos[1]] = spriteToAdd;
        this.spawnedHeroes[i] = player;
        this.matrix[pos[0]][pos[1]] = NON_WALKABLE;
    }
}

levelManager.prototype.startGame = function(){
    console.log("Empezando juego");
    var paths = new Array();
    for(i = 0; i<this.characters.length; i++){
        console.log("Calculando pathfinding del heroe " + i);        
        var myCharacter = new character(this.characters[i].initialPos, this.characters[i].goal, this.numRows, this.numCols, this.walkable, this.spawnedHeroes[i]);
        paths[i] = {};
        paths[i].path = myCharacter.pathfinding();
        paths[i].character = myCharacter;
        console.log(paths[i].path);
    }

    var turnos = Array();
    var actions = Array();
    var pathToUse = paths[0].path;
    var characterToUse = paths[0].character;

    var allEnemies = new Array();
    for(var en in this.spawnedSprites){
        if(this.spawnedSprites[en].isEnemy){
            var enemyLevel = this.spawnedSprites[en];
            var enemyToAdd = new enemy(enemyLevel.posX, enemyLevel.posY, enemyLevel.sprite, enemyLevel.type, this.canvas, characterToUse);
            allEnemies.push(enemyToAdd);
        }
    }

    for(var en in allEnemies){
        allEnemies[en].Neighbour(allEnemies);
    }

    var this_action;
    for(i = 0; i<pathToUse.length; i++){
        actions = Array();
        var characterCanMove = true; 
        for(var actualEnemyIndex in allEnemies){
            var actualEnemy = allEnemies[actualEnemyIndex];

            if(actualEnemy.canBeAttacked && (pathToUse[i][0] == actualEnemy.rows) && (pathToUse[i][1] == actualEnemy.cols)){
                console.log("Adyacente en " + pathToUse[i][0] + ", " + pathToUse[i][1]);
                this_action = {
                    action : "attack",
                    character : characterToUse,
                    data:{
                        enemy : actualEnemy
                    }
                }
                actions.push(this_action);
            }

            if( i == -2){
                var checkPathX = characterToUse.init[0];
                var checkPathY = characterToUse.init[1];
            }
            else{
                var checkPathX = pathToUse[i][0];
                var checkPathY = pathToUse[i][1];
            }

            if(actualEnemy.autoAttack){
                console.log("Added autoattack");
                this_action = {
                    action : "attack",
                    character : actualEnemy,
                    data:{
                        //meter aqui variables que se necesiten para la funcion attack
                    }
                }
                actions.push(this_action);
            }
            else if(actualEnemy.checkAttack(checkPathX, checkPathY)){
                this_action = {
                    action : "attack",
                    character : actualEnemy,
                    data:{
                        //meter aqui variables que se necesiten para la funcion attack
                    }
                }
                actions.push(this_action);
            }

            if(actualEnemy.melee){
                this_action = {
                    action : "checkEnemyAttack",
                    character : actualEnemy
                }
                actions.push(this_action);
            }
        }
        //Si hay alguna trampa
        if(characterCanMove){     
            this_action = {
                action : "walk",
                character : characterToUse,
                data : {
                    target : pathToUse[i]
                }
            };
            actions.push(this_action);
        }
        turnos.push(actions);
    }

    this.spawnedSprites = Array();
    //this.canvas.clear();
    clearInterval(this.updateInterval);

    this.canvas.clearLines();
    this.canvas.hideBar();
    var pM = new playManager(turnos, this, allEnemies, characterToUse, this.canvas);

}