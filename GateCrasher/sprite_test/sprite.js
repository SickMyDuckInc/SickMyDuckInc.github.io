function sprite(context, spriteImage) {
    this.context = context;
    this.width;
    this.height;
    this.x = 0;
    this.y = 0;
    this.speed = 1;
    this.scaleX = 1;
    this.scaleY = 1;
    this.animations = {};
    this.isFlipped = false;

    this.image = new Image();
    this.image.src = spriteImage;
    this.width = this.image.width;
    this.height = this.image.height;
}

sprite.prototype.moveTo = function (x, y) {
    this.x = x;
    this.y = y;
}

sprite.prototype.setSpeed = function (speed) {
    this.speed = speed;
}

sprite.prototype.moveInDirection = function (dir) {
    switch (dir) {
        case "UP":
            this.y -= this.speed;
            if(this.y < 0) {
                this.y = 0;
            }
            break;
        case "DOWN":
            this.y += this.speed;
            if(this.y > this.context.height) {
                this.y = this.context.height;
            }
            break;
        case "LEFT":
            this.x -= this.speed;
            if(this.x < 0) {
                this.x = 0;
            }
            break;
        case "RIGHT":
            this.x += this.speed;
            if(this.x > this.context.width) {
                this.x = this.context.width;
            }
            break;
    }
}

sprite.prototype.draw = function () {
    if(this.currentAnimation != undefined) {
        this.currentAnimation.anim[this.animationFrame].draw(this.context, this.x, this.y, this.scaleX, this.scaleY, this.isFlipped);     
        this.animationFrame++;   
        if(this.animationFrame >= this.currentAnimation.length) {
            this.animationFrame = 0;
        }        
    }
    else {
        this.context.save();
        var flipWidth = 1;

        if (this.isFlipped) {
            this.context.scale(-1, 1);
            flipWidth = -1;
        }
        
        this.context.drawImage(this.image,flipWidth * this.x, this.y, flipWidth * this.width * this.scaleX, this.height * this.scaleY);
        this.context.restore();
    }
}

sprite.prototype.scaleSprite = function (scale) {
    this.scaleX = scale;
    this.scaleY = scale;
}

sprite.prototype.scaleSpriteXY = function (scaleX, scaleY) {
    this.scaleX = scaleX;
    this.scaleY = scaleY;
}

function frame(srcImage, x, y, width, height) {
    this.srcImage = srcImage;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.draw = function(context, x, y, scaleX, scaleY, isFlipped){
        context.save();
        var flipWidth = 1;
        if (isFlipped) {
            context.scale(-1, 1);
            flipWidth = -1;
        }
        
        context.drawImage(this.srcImage, this.x, this.y, this.width, this.height, flipWidth * x, y, flipWidth * this.width * scaleX, this.height * scaleY);
        context.restore();
        
    }
}

sprite.prototype.saveAnimation = function(image, animationName, framesNumber, width, height) {
    this.animations[animationName] = {};
    var animationSheet = {};
    var xIndex = 0;
    var yIndex = 0;
    for(var i = 0; i < framesNumber; i++) {
        if(xIndex * width >= image.width) {
            yIndex++;
            xIndex = 0;
        }
        animationSheet[i] = new frame(image, xIndex * width, yIndex * height, width, height);
        xIndex++;
    }
    this.animations[animationName] = {anim : animationSheet, length : framesNumber};
}

sprite.prototype.addAnimation = function (animationName, imageUri, framesNumber, width, height) {
    
    var imageSheet = new Image();
    imageSheet.src = imageUri;

    imageSheet.onload = this.saveAnimation(imageSheet, animationName, framesNumber, width, height);
}

sprite.prototype.playAnimation = function (animationName) {
    if(this.animations[animationName] != undefined) {
        this.animationFrame = 0;
        this.currentAnimation = this.animations[animationName];        
    }
    else {
        console.log("ERROR - The animation you're trying to play doesn't exist");
    }
}

sprite.prototype.stopAnimation = function () {
    this.currentAnimation = undefined;
}

sprite.prototype.flip = function () {
    this.isFlipped = !this.isFlipped;
}