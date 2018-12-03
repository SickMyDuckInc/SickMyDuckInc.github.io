/*
Esta es la clase de los enemigos y los objetos.
Debe contener todas las funciones tanto de animación como de acción.
Si en un turno puede realizar mas de una función (por ejemplo atacar o moverse, debe tener un array que se rellene desde 
    el levelManager con las acciones a realizar en orden, de cara a que cuando le llame el playManager sepa cual tiene que 
    realizar)
Todas las diferencias entre los tipos de enemigo deben estar definidas como variables 
(por ejemplo, el sprite que llevan), y recibirlas por medio del constructor.
 */

function enemy( rows, cols, sprite, indexEnemy, canvas){

    this.sprite = sprite;
    //tipe GridNode {x = fila, y = columna, weight}
    this.path = null;

    this.autoAttack = false;
    this.indexEnemy = indexEnemy;
        
    this.cols = cols;
    this.rows = rows;

    this.canvas = canvas;

    switch(indexEnemy){
        case 0:
        //torreta
            this.sprite.addAnimation("attack", "res/goodies/turret_attack.png", 4, 200, 200);
            this.autoAttack = true;
            this.life = 10;
            this.shoot = true;
            this.spriteShoot = "bullet";
            this.shoots = []; 
            this.damage = 1;
            this.range = 10;
            break;
        case 1:
        //melee
            this.sprite.addAnimation("attack", "res/goodies/turret_idle.png", 4, 200, 200);
            this.autoAttack = false;
            this.life = 10;
            this.shoot = false;
            this.damage = 3;
            this.range = 1;
            break;
        case 2:
        //trampa
            this.sprite.addAnimation("attack","res/goodies/turret_idle.png",4,200,200);
            this.autoAttack = false;
            this.life = 0;
            this.shoot = false;
            this.damage = 0;
            this.range = 0;
            this.stun = 2;
            break;
        case 3:
        //otro
            this.sprite.addAnimation("attack","res/goodies/turret_idle.png");
            this.autoAttack = false;
            this.life = 10;
            this.shoot = false;
            this.damage = 2;
            this.range = 2;
            break;

    }
}


enemy.prototype.fight = function(bullets){
    this.sprite.playAnimation("attack");
    
    if(this.shoot){
        bullets.push(new bullet(this.direc,this.spriteShoot,this.cols,this.rows,1,this.canvas)); 
    }
}

enemy.prototype.executeAction = function(){
    this.fight();
}

enemy.prototype.takeDamage = function(dmg){
    this.life -= dmg;
}

enemy.prototype.checkAttack= function(col, row){
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