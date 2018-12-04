/*
Esta es la clase de los enemigos y los objetos.
Debe contener todas las funciones tanto de animación como de acción.
Si en un turno puede realizar mas de una función (por ejemplo atacar o moverse, debe tener un array que se rellene desde 
    el levelManager con las acciones a realizar en orden, de cara a que cuando le llame el playManager sepa cual tiene que 
    realizar)
Todas las diferencias entre los tipos de enemigo deben estar definidas como variables 
(por ejemplo, el sprite que llevan), y recibirlas por medio del constructor.
 */

function enemy( rows, cols, sprite, indexEnemy, canvas,character){

    this.sprite = sprite;
    //tipe GridNode {x = fila, y = columna, weight}
    this.path = null;

    this.autoAttack = false;
    this.indexEnemy = indexEnemy;
        
    this.cols = cols;
    this.rows = rows;

    this.canvas = canvas;
    this.character = character;
    this.dir = "LEFT";

    switch(indexEnemy){
        case 0:
        //torreta
            this.sprite.addAnimation("attack", "res/goodies/turret_attack.png", anim_frames["turret"].attack, 200, 200);
            this.autoAttack = true;
            this.life = 50;
            this.shoot = true;
            this.spriteShoot = "bullet";
            this.shoots = []; 
            this.damage = 5;
            this.range = 15;
            this.countAttack = 0;
            this.count = 0;
            
            break;
        case 1:
        //angel de distancia
            this.sprite.addAnimation("attack", "res/goodies/turret_attack.png", anim_frames["turret"].attack, 4, 200, 200);
            this.autoAttack = false;
            this.life = 50;
            this.shoot = false;
            this.spriteShoot = "bullet";
            this.shoots = []; 
            this.damage = 60;
            this.range = 4;
            this.countAttack = 4;
            this.count = 0;
            break;
        case 2:
        //trampa
            this.sprite.addAnimation("attack","res/goodies/trap_attack.png",anim_frames["trap"].attack,200,200);
            this.autoAttack = false;
            this.life = 0;
            this.shoot = false;
            this.damage = 0;
            this.range = 0;
            this.stun = 2;
            this.countAttack = 100;
            this.count = 0;
            break;
        case 3:
        //angel melee
            this.sprite.addAnimation("attack","res/goodies/angel_idle.png",anim_frames["angel"].attack,200,200);
            this.autoAttack = false;
            this.life = 50;
            this.shoot = false;
            this.damage = 20;
            this.range = 1;
            this.countAttack = 0;
            this.count = 0;
            break;
        case 4:
        //tank
            this.sprite.addAnimation("attack","res/goodies/tank.png")

    }
}


enemy.prototype.fight = function(playMan){
    if(this.dir == "LEFT" && this.character.sprite.x > this.sprite.x){
        this.sprite.flip();
        this.dir = "RIGHT";
    }
    else if(this.dir == "RIGHT" && this.character.sprite.x < this.sprite.x){
        this.sprite.flip();
        this.dir = "LEFT";
    }
    if(this.count == 0 ){
    this.sprite.playAnimation("attack", false, "idle");
        if(this.shoot){
            playMan.addBullet(new bullet(this.dir,this.spriteShoot,this.cols,this.rows,1,this.canvas,this.character,this,this.spriteShoot)); 
        }
        this.count = this.countAttack;
    }
    else{
        this.count--;
    }
}

enemy.prototype.executeAction = function(playMan){
    this.fight(playMan);
}

enemy.prototype.takeDamage = function(dmg){
    this.sprite.setRedTint();
    this.life -= dmg;
    console.log("Life: " + this.life);
}

enemy.prototype.isDead = function(){
    return this.life<=0;
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