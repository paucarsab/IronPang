class Bullet {
    constructor(ctx, playerPosX, playerPosY) {
        this.ctx = ctx;

        this.width = 40;
        this.height = 600;

        this.image = new Image();
        this.image.src = "./images/weapons.png";

        this.posX = playerPosX + 20;
        this.posY = playerPosY - 399;

        this.image.frames = 70;
        this.image.framesIndex = 0;
    }

    draw(framesCounter) {
        this.ctx.drawImage(
            this.image,
            this.image.framesIndex * Math.floor(this.image.width / this.image.frames),
            0,
            Math.floor(this.image.width / this.image.frames),
            this.image.height,
            this.posX,
            20,
            this.width,
            this.height
        );
        this.animated(framesCounter)
    }

    animated(framesCounter) {
        if (framesCounter % 3 == 0) {
            this.image.framesIndex++;
        }
        if (this.image.framesIndex > this.image.frames - 1) {
            this.image.framesIndex = 0;
        }
    }
    
}