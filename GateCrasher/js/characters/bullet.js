function bullet(direction, type, col, rows, vel, canvas){
    this.direction = direction;
    this.type = type;
    this.col = col;
    this.rows = rows;
    this.vel = vel;
    this.canvas = canvas;
    this.bulletSprite = new sprite(this.canvas.getContext(), this.enemiesSprites[this.selectedEnemy] +"_stand.png", 1, 1, col * 1, rows * 1);
    console.log("Sprites: " + this.spawnedSprites + ", matrix: " + this.spawnedSpritesMatrix);
}

bullet.prototype.executeMovement = function(time){
    var posx = gridnode[i].y;
    var posy = gridnode[y].x;

    this.Move(posx,posy);
}
