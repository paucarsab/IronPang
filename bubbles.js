class Bubble {
    constructor(ctx, posX, posY) {
        this.ctx = ctx;
        this.width = 200;
        this.height = 200;

        this.image = new Image();
        this.image.src = "./images/bubbleH5.png";
        this.posX = posX;
        this.posY = posY;
        this.image.frames = 1;
        this.image.framesIndex = 0;
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
}
class BubbleC3 extends Bubble {
    constructor(ctx, posX, posY) {
        super(ctx, posX, posY)
        this.width = 125;
        this.height = 125;
        this.image.src = "./images/bubblec3.png"
    }
}
class BubbleJS extends Bubble {
    constructor(ctx, posX, posY) {
        super(ctx, posX, posY)
        this.width = 50;
        this.height = 50;
        this.image.src = "./images/bubbleJS.png"
    }
}