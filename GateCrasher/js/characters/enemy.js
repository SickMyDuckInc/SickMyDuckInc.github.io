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
    this.distance = 0;
    this.canBeAttacked = true;
    this.draw = true;

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
            this.sprite.addAnimation("attack", "res/goodies/trumpet_attack.png", anim_frames["trumpet"].attack, 200, 200);
            this.sprite.addAnimation("die", "res/goodies/trumpet_dead.png", anim_frames["trumpet"].die, 500, 500);
            this.hasDeadAnimation = true;
            this.autoAttack = false;
            this.life = 50;
            this.shoot = true;
            this.spriteShoot = "ball";
            this.shoots = []; 
            this.damage = 60;
            this.range = 2;
            this.countAttack = 4;
            this.count = 0;
            break;
        case 2:
        //trampa
            this.sprite.addAnimation("attack","res/goodies/trap_attack.png",anim_frames["trap"].attack,200,200);
            this.sprite.addAnimation("closed","res/goodies/trap_closed.png",anim_frames["trap"].closed,200,200);
            //this.sprite.playAnimation("closed");
            this.autoAttack = false;
            this.life = 1000;
            this.shoot = false;
            this.damage = 0;
            this.range = 0;
            this.stun = 2;
            this.countAttack = 100;            
            this.canBeAttacked = false;
            this.count = 0;
            this.activated = false;
            this.fight = function(playMan){
                if(!this.activated){
                    this.activated = true;
                    console.log("Trampa activada");
                    playMan.setNext(this);
                }
                //playMan.characterCanMove = false;
                // setInterval(()=> playMan.moveAndStun(), 100);
            }
            this.executeClose = function(){
                this.sprite.playAnimation("attack", false, "closed");

            }

            this.release = function(){
                this.life = 0;
            }
            break;
        case 3:
        //angel melee
            this.sprite.addAnimation("attack","res/goodies/angel_attack.png",anim_frames["angel"].attack,200,200);
            this.sprite.addAnimation("die", "res/goodies/angel_dead.png", anim_frames["angel"].die, 500, 500);
            this.hasDeadAnimation = true;
            this.autoAttack = false;
            this.life = 50;
            this.shoot = false;
            this.damage = 20;
            this.range = 0;
            this.melee = true;
            this.countAttack = 0;
            this.count = 0;
            break;
        case 4:
        //tank
            this.sprite.addAnimation("attack","res/goodies/tank_attack.png",anim_frames["tank"].attack,200,200);
            this.sprite.addAnimation("die", "res/goodies/tank_dead.png", anim_frames["tank"].die, 500, 500);
            this.hasDeadAnimation = true;
            this.autoAttack = false;
            this.life = 100;
            this.shoot = false;
            this.damage = 5;
            this.range = 0;
            this.melee = true;
            this.countAttack = 0;
            this.count = 0;
            break;

    }
}


enemy.prototype.fight = function(playMan){
    console.log("Basic fight");
    
    if(this.count == 0 ){
    
        if(this.shoot){
            this.sprite.playAnimation("attack", false, "idle");
            playMan.addBullet(new bullet(this.dir,this.spriteShoot,this.cols,this.rows,1,this.canvas,this.character,this,this.spriteShoot)); 
        }
        else{
            this.sprite.playAnimation("attack", false, "idle", this.executeFightEnd, this);
        }
        this.count = this.countAttack;
    }
    else{
        this.count--;
    }
}

enemy.prototype.executeFightEnd = function(){    
    this.character.takeDamage(this.damage);
    //this.enemyTarget.sprite.setRedTint();
    console.log("executedEnd");
}
enemy.prototype.executeAction = function(playMan){
    this.fight(playMan);
}

enemy.prototype.takeDamage = function(dmg){
    this.life -= dmg;
    if(this.life<=0){
        if(!this.hasDeadAnimation){            
            this.sprite.setRedTint();
            this.draw = false;
        }
        else{
            this.sprite.playAnimation("die", false, "idle", this.kill, this);
        }
    }
    else{
        this.sprite.setRedTint();
    }
    console.log("Life: " + this.life);
}

enemy.prototype.kill = function(){
    this.draw = false;
}

enemy.prototype.isDead = function(){
    return this.life<=0;
}

enemy.prototype.checkAttack= function(col, row){
    
    if(col == this.rows){
        var fila = Math.abs(this.cols -row);
        //dirección arriba
        

        if(fila<= this.range){
            return true;
        }
    }
    
    return false;
    
}

enemy.prototype.Neighbour= function(Enemies){
    for(var item in Enemies){
        if(Enemies[item].cols == (this.cols -1)){
            this.leftNeighbour = Enemies[item];
        }
        if(Enemies[item].cols == (this.cols+1)){
            this.rightNeighbour = Enemies[item];
        }
    }
}

enemy.prototype.checkEnemyAttack = function(){
    if(this.dir == "LEFT" && this.leftNeighbour!= undefined && !this.leftNeighbour.isDead() &&this.leftNeighbour.canBeAttacked){
        this.sprite.playAnimation("attack", false, "idle");
        this.leftNeighbour.takeDamage(this.damage);
    }
    else if(this.dir == "RIGHT" && this.rightNeighbour!= undefined && !this.rightNeighbour.isDead()&&this.rightNeighbour.canBeAttacked){
        this.sprite.playAnimation("attack", false, "idle");
        this.rightNeighbour.takeDamage(this.damage);
    }
}

enemy.prototype.update = function(){
    if(this.dir == "LEFT" && this.character.sprite.x > this.sprite.x){
        this.sprite.flip();
        this.dir = "RIGHT";
    }
    else if(this.dir == "RIGHT" && this.character.sprite.x < this.sprite.x){
        this.sprite.flip();
        this.dir = "LEFT";
    }
}
