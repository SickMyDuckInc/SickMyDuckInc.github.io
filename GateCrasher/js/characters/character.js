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
    this.currentTile = inicio;

    this.matrix = matrix;
    this.sprite = sprite;
    //tipe GridNode {x = fila, y = columna, weight}
    this.path = null;
    
    var canvas_cols = cols;
    var canvas_rows = rows;
 
    console.log("Created character");
    console.log(this.matrix);
}

character.prototype.executeMovement = function(time){
    var posx = gridnode[i].y;
    var posy = gridnode[y].x;

    this.Move(posx,posy);
}

character.prototype.walk()=  function(){

}

character.prototype.fight() = function(){

}

character.prototype.executeAction = function(){
    var posx = gridnode[i].y;
    var posy = gridnode[y].x;

    if(ThereIsEnemy(posx,posy)){
        this.fight();
    }
    else{
        this.walk();
    }
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