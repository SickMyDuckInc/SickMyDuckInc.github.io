/*
Esta es la clase de los personajes principales. 
Debe contener todas las funciones tanto de animación como de acción y movimiento.
Todas las diferencias entre los tipos de personaje principal deben estar definidas como variables 
(por ejemplo, el sprite que llevan), y recibirlas por medio del constructor.
 */

 //velocidades 5 y 8
//canvas size 400*600

function character(inicio, end, rows, cols, matrix, sprite){
    this.init = inicio;
    this.end = end;
    this.currentTile = {x :sprite.x, y : sprite.y};
    this.nextTile;
    this.interval = 10;
    this.isFlipped = false;

    this.matrix = matrix;
    this.sprite = sprite;
    //tipe GridNode {x = fila, y = columna, weight}
    this.path = null;
    this.life = 100;
    this.damage = 20;
    
    this.cols = cols;
    this.rows = rows;
 
    console.log("Created character");
    console.log(this.matrix);
}

character.prototype.executeMovement = function(time){
    var posx = gridnode[i].y;
    var posy = gridnode[y].x;

    this.Move(posx,posy);
}

character.prototype.getActualPos = function(){
    return currentTile;
}

character.prototype.getNextPos = function(){
    return nextTile;
}

character.prototype.setNextTile = function(pos){
    this.nextTile = pos;
}

character.prototype.calculateWalk = function(playAnim = true){
    if(playAnim){
        this.sprite.playAnimation("walk");
    }
    this.diffX = this.nextTile.x - this.currentTile.x;
    this.diffY = this.nextTile.y - this.currentTile.y;
    if(this.diffX != 0){
        this.diffX = this.diffX / this.interval;
        if(this.diffX<0 && !this.isFlipped){
            this.isFlipped = true;
            this.sprite.flip();
        }
        else if(this.diffX>0 && this.isFlipped){
            this.isFlipped = false;
            this.sprite.flip();
        }
    }
    if(this.diffY != 0){
        this.diffY = this.diffY / this.interval;
    }

}

character.prototype.walk =  function(){
    var ret = false;
    if(this.nextTile.x != this.sprite.x || this.nextTile.y != this.sprite.y){
        var moveX = this.sprite.x + this.diffX;
        var moveY = this.sprite.y + this.diffY;
        this.sprite.moveTo(moveX, moveY);
    }
    else{
        this.currentTile = this.nextTile;
        ret = true;
    }
    return ret;
}

character.prototype.fight = function(enemyTarget){
    this.sprite.playAnimation("attack", false, "idle", this.executeFightEnd, this);
    if(!this.isFlipped){
        var moveX = this.currentTile.x + 10;
    }
    else{
        var moveX = this.currentTile.x - 10;
    }
    var moveY = this.currentTile.y;
    this.sprite.moveTo(moveX, moveY);
    this.enemyTarget = enemyTarget;
}

character.prototype.executeFightEnd = function(){    
    this.enemyTarget.takeDamage(this.damage);
    this.enemyTarget.sprite.setRedTint();
    console.log("executedEnd");
}

character.prototype.pathfinding = function(){

    console.log("Created pathfinding");

    var graph = new Graph(this.matrix);

    var start = graph.grid[this.init[0]][this.init[1]];
    var end = graph.grid[this.end[0]][this.end[1]];

    //devuelve una matriz con fila = x / columna = y cuidado con el orden
    this.path = astar.search(graph, start, end);

    console.log("Resultado ---------------------------------------- ");
    var gridnode;
    var processedPath = new Array();
    for(var i = 0; i<this.path.length;i++){
        gridnode = this.path[i];
        processedPath[i] = [gridnode.x, gridnode.y];
        //console.log("gridnode x = " + gridnode.x + " y = " + gridnode.y + " weight = " + gridnode.weight);
    }
    return processedPath;
}