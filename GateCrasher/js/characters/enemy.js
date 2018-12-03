/*
Esta es la clase de los enemigos y los objetos.
Debe contener todas las funciones tanto de animación como de acción.
Si en un turno puede realizar mas de una función (por ejemplo atacar o moverse, debe tener un array que se rellene desde 
    el levelManager con las acciones a realizar en orden, de cara a que cuando le llame el playManager sepa cual tiene que 
    realizar)
Todas las diferencias entre los tipos de enemigo deben estar definidas como variables 
(por ejemplo, el sprite que llevan), y recibirlas por medio del constructor.
 */

function enemy(rows, cols, sprite, indexEnemy){
    this.sprite = sprite;
    //tipe GridNode {x = fila, y = columna, weight}

    this.autoAttack = false;
    this.indexEnemy = indexEnemy;
        
    this.cols = cols;
    this.rows = rows;

    switch(indexEnemy){
        case 0:
            this.sprite.addAnimation("attack", "res/enemies/turret_attack.png", 4, 200, 200);
            this.autoAttack = true;
            this.life = 10;
            this.shoot = true;
            this.damage = 1;
            this.range = 2;
            break;
    }
}


enemy.prototype.fight = function(){
    this.sprite.playAnimation("attack");
    
    if(this.shoot){

    }
}

enemy.prototype.executeAction = function(){
    this.fight();
}

enemy.prototype.takeDamage = function(){
    this.life -= this.damage;
}

enemy.prototype.checkAttack = function(col, row){
    if(col == this.cols){
        var fila = this.row -row;
        //dirección arriba
        if(fila >0){
            this.direc = 1;
        }
        //dirección abajo
        else{
            this.direc = -1;
        }

        if(Math.abs(fila)<= this.range){
            return true;
        }
    }
    else if(row == this.rows){
        var fila = this.cols -col;
        //dirección derecha
        if(fila >0){
            this.direc = 2;
        }
        //dirección izquierda
        else{
            this.direc = -2;
        }

        if(Math.abs(fila)<= this.range){
            return true;
        }
    }
    else{
        return false;
    }
}