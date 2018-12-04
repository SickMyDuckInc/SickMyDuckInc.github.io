function bullet(direction, type, col, rows, vel, canvas,character){
    this.direction = direction;
    this.type = type;
    this.col = col;
    this.rows = rows;
    this.vel = vel;
    this.canvas = canvas;
    this.collisioned = false;
    this.character = character;
    this.bulletSprite = new sprite(this.canvas.getContext(), "res/goodies/bullet.png", 100, 100,rows*canvas.getDrawWidth(),col*canvas.getDrawHeight());
    this.bulletSprite.addAnimation("move",  "res/goodies/bullet_anim.png", 2, 200, 200);
    this.bulletSprite.setSpeed(5);
    this.bulletSprite.playAnimation("move");

    this.updateInterval = setInterval(() => this.update(), 100);
}

bullet.prototype.update = function(){
        

    
    //this.bulletSprite.draw();
    

    //this.character.sprite.draw();
}
