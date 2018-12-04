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
var PLAY_SPEED =  10;
var BULLET_SPEED = 5;

function playManager(actions, levelManager, allEnemies, character, canvas){

    this.actions = actions;
    this.levelManager = levelManager;
    this.allEnemies = allEnemies;
    this.character = character;
    this.canvas = canvas;
    this.actualAction = 0;
    this.allBullets = Array();
    this.characterCanMove = true;
    this.characterStunned = false;
    this.targetEnemy;


    this.updateInterval = setInterval(() => this.update(), 100);
    this.moveInterval;

    this.calculateNext(actions[this.actualAction]);

}

playManager.prototype.update = function(){
    this.canvas.clear();    

    if(!this.character.isDead()){
        this.character.sprite.draw();
    }
    else{
        console.log("HE MUERTO");
    }

    for(var element in this.allEnemies){
        if(!this.allEnemies[element].isDead()){
            this.allEnemies[element].sprite.draw();
        }
    }

    
    for(var element in this.allBullets){
        if(this.allBullets[element].collisioned){
            this.allBullets.splice(element, 1);
        }
        else{
            this.allBullets[element].bulletSprite.draw();
            this.allBullets[element].bulletSprite.moveInDirection(this.allBullets[element].direction);
            this.allBullets[element].checkCollision(this.allEnemies);
        }
    }
}

playManager.prototype.calculateNext = function(turnActions){
    for(i = 0; i<turnActions.length; i++){
        var thisAction = turnActions[i];
        if(thisAction.character == this.character){
            switch(thisAction.action){
                case 'attack':
                this.characterCanMove = true;
                    if(thisAction.data.enemy.isDead()){
                        this.characterCanMove = true;
                    }
                    else if(!this.characterStunned){           
                        this.targetEnemy = thisAction.data.enemy;
                        this.playerAttack();
                        console.log("ataco");
                        this.characterCanMove = false;
                    }

                    break;
                case 'walk':                
                    var posX = thisAction.data.target[0] * this.levelManager.drawWidth;
                    var posY = thisAction.data.target[1] * this.levelManager.drawHeight;
                    thisAction.character.setNextTile({x : posY, y : posX});  
                    if(!this.characterStunned){                        
                        clearInterval(this.moveInterval);   
                    }     
                    if(this.characterCanMove && !this.characterStunned){    
                        if(this.characterStunned){ 
                            clearInterval(this.moveInterval);
                        }
                        thisAction.character.calculateWalk(true);                  
                        this.moveInterval = setInterval(() => this.moveUpdate(), 100);
                        console.log("Character walking to: " + thisAction.data.target + ", position: " + posX + ", " + posY);
                    }
                    else{                        
                        thisAction.character.calculateWalk(false);
                        console.log("Cant move");
                    }
                    break;
                default:
                    break;
            }
        }
        else{
           switch(thisAction.action){
                case 'attack':
                if(!thisAction.character.isDead()){
                    thisAction.character.executeAction(this);
                }
                break;
            case 'checkEnemyAttack':
                thisAction.character.checkEnemyAttack();
                break;
           } 
        }
    }
}

playManager.prototype.setNext = function(trap){
    //this.actualAction++;
    clearInterval(this.moveInterval);
    this.characterCanMove = false;
    this.characterStunned = true;
    this.calculateNext(this.actions[this.actualAction]);
    this.moveInterval = setInterval(() => this.moveAndStun(trap), 100);
}

playManager.prototype.moveUpdate = function(){
    if(this.character.walk()){
        this.actualAction++;
        if(this.actualAction>= this.actions.length){
            console.log("HE GANADO");
        }
        else{
            this.calculateNext(this.actions[this.actualAction]);
        }
    }
}

playManager.prototype.moveAndStun = function(trap){
    if(this.character.walk()){
        this.character.characterCanMove = false;
        clearInterval(this.moveInterval);
        this.actualAction++;
        trap.executeClose();
        setTimeout(()=> this.releaseTrap(trap), 100*PLAY_SPEED);
        this.moveInterval = setInterval(() => this.calculateNext(this.actions[this.actualAction]), 100 * PLAY_SPEED);
    }
}

playManager.prototype.releaseTrap = function(trap){

}

playManager.prototype.addBullet = function(bullet){
    this.allBullets.push(bullet);
}

playManager.prototype.playerAttack = function(){    
    this.character.fight(this.targetEnemy);
    var mult = 0;
    if(this.targetEnemy.isDead()){
        this.characterCanMove = true;
        //this.calculateNext(this.actions[this.actualAction]);
    }
    else{
        mult = PLAY_SPEED;
    }
    
    setTimeout(()=> this.calculateNext(this.actions[this.actualAction]), 100*mult);
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
