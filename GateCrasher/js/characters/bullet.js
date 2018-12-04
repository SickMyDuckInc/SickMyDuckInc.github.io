function bullet(direction, type, col, rows, vel, canvas,character, parent){
    this.direction = direction;
    this.type = type;
    this.col = col;
    this.rows = rows;
    this.vel = vel;
    this.canvas = canvas;
    this.collisioned = false;
    this.parent =parent;
    this.character = character;
    this.bulletSprite = new sprite(this.canvas.getContext(), "res/goodies/bullet.png", this.canvas.getDrawHeightDivided(), this.canvas.getDrawWidthDivided(),col*this.canvas.getDrawHeightDivided(),rows*this.canvas.getDrawWidthDivided());
    this.bulletSprite.addAnimation("move",  "res/goodies/bullet_anim.png", 2, 200, 200);
    this.bulletSprite.setSpeed(5);

    this.bulletSprite.playAnimation("move");

    //this.updateInterval = setInterval(() => this.update(), 100);
}

bullet.prototype.checkCollision = function(allEnemies){
        
    if(this.bulletSprite.y < 10 || this.bulletSprite.x < 10 || this.bulletSprite.y >=this.canvas.getDrawHeight()-10 || this.bulletSprite.x>= this.canvas.getDrawWidth()-10){
        this.collisioned = true;
    }
    for(var element in allEnemies){
        if( allEnemies[element].cols != this.parent.cols || allEnemies[element].rows != this.parent.rows ){
            if( this.bulletSprite.y < allEnemies[element].rows*this.canvas.getDrawWidthDivided()+50&&
            this.bulletSprite.y > allEnemies[element].rows*this.canvas.getDrawWidthDivided()-50 && 
            this.bulletSprite.x < allEnemies[element].cols*this.canvas.getDrawHeightDivided()+50 &&  
            this.bulletSprite.x > allEnemies[element].cols*this.canvas.getDrawHeightDivided()-50){
                this.collisioned = true;
                allEnemies[element].takeDamage(this.parent.damage);
            }
        }
    }


    if( this.bulletSprite.y < this.character.sprite.y+50&&
    this.bulletSprite.y > this.character.sprite.y-50 && 
    this.bulletSprite.x < this.character.sprite.x+50 &&  
    this.bulletSprite.x > this.character.sprite.x-50){
        this.collisioned = true;
        this.character.takeDamage(this.parent.damage);
    }
    
    //this.canvas.getDrawHeight()-this.canvas.getDrawHeightDivided() 
    //this.canvas.getDrawWidth()-this.canvas.getDrawWidthDivided()
    
    //this.bulletSprite.draw();
    

    //this.character.sprite.draw();
}
