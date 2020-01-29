class Bubble {
    constructor(ctx, posX, posY, gameW, gameH, dSpeedX) {
        this.ctx = ctx;
        this.width = 200;
        this.height = 200;
        this.gameW = gameW;
        this.gameH = gameH;

        this.image = new Image();
        this.image.src = "./images/bubbleH5.png";
        this.posX = posX;
        this.posY = posY;
        this.image.frames = 1;
        this.image.framesIndex = 0;

        this.dSpeedX = dSpeedX
        this.velX = 2;
        this.velY = .2;
        this.gravity = .2;

    }
    draw() {
        this.ctx.drawImage(
            this.image,
            this.image.framesIndex * Math.floor(this.image.width / this.image.frames),
            0,
            Math.floor(this.image.width / this.image.frames),
            this.image.height,
            this.posX,
            this.posY,
            this.width,
            this.height
        );
    }
    move() {
        this.posX += this.velX;
        this.posY += this.velY;

        this.velY += this.gravity;

        if (this.posY >= this.gameH - this.height - 50) {
            this.velY *= -1;
        }
        if (this.posX >= (this.gameW - this.width)) {
            this.velX = -(this.velX) - 0.01;
            this.velY = -(this.velY) - 0.01;
        }
        if (this.posX <= 0) {
            this.velX = -(this.velX) - 0.01;
            this.velY = -(this.velY) - 0.01;
        }
        if (this.posY <= 0) {
            this.posY = 0;
            this.velY = -(this.velY);
        }
    }
    // isCollisionBubbles() {
    //     return this.bubbles.some(bubble => {
    //         return (
    //             this.bubble.posX <= bubble.posX + bubble.width &&
    //             this.bubble.posY <= bubble.posY + bubble.height &&
    //             this.bubble.posX + this.bubble.width >= bubble.posX
    //         );
    //     })
    // }
    // changeDirection() {
    //     if (this.isCollisionBubbles === true) {
    //         this.velX = -(this.velX);
    //         this.velY = -(this.velY)
    //         console.log("bola tocandose!")
    //     }
    // }
}
class BubbleC3 extends Bubble {
    constructor(ctx, posX, posY, gameW, gameH) {
        super(ctx, posX, posY, gameW, gameH)
        this.width = 125;
        this.height = 125;
        this.image.src = "./images/bubblec3.png"
    }
}
class BubbleJS extends Bubble {
    constructor(ctx, posX, posY, gameW, gameH) {
        super(ctx, posX, posY, gameW, gameH)
        this.width = 50;
        this.height = 50;
        this.image.src = "./images/bubbleJS.png"
    }
}