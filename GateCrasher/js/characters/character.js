/*
Esta es la clase de los personajes principales. 
Debe contener todas las funciones tanto de animación como de acción y movimiento.
Todas las diferencias entre los tipos de personaje principal deben estar definidas como variables 
(por ejemplo, el sprite que llevan), y recibirlas por medio del constructor.
 */

 //velocidades 5 y 8
//canvas size 400*600

function character(inicio, end, rows, cols){
    this.init = inicio;
    this.end = end;
    this.currentTile = inicio;

    this.matrix = [];
    //tipe GridNode {x = fila, y = columna, weight}
    this.path;
    
    var canvas_cols = cols;
    var canvas_rows = rows;

    for(var i = 0; i<canvas_rows; i++){
        this.matrix[i] = new Array(canvas_cols);
        for(var j = 0; j<canvas_cols; j++){
            this.matrix[i][j]= -1;
        }
    }

    for(var i = 0; i<canvas_rows; i++){
        for(var j = 0; j<canvas_cols; j++){
            if(i == canvas_rows-1){
                this.matrix[i][j] = 1;
            }
            else if(j == canvas_cols-1 || canvas_cols-2 == j){
                this.matrix[i][j] = 1;
            }
            else if(j == 0 || i == 0){
                this.matrix[i][j] = 1;
            }
            else{
                this.matrix[i][j] = 0;
            }
        }
    }
 
    console.log("Created character");
    console.log(this.matrix);
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
    for(var i = 0; i<this.path.length;i++){
        gridnode = this.path[i];
        console.log("gridnode x = " + gridnode.x + " y = " + gridnode.y + " weight = " + gridnode.weight);
    }
    //console.log(result);
}