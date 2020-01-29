class Pizza {
    constructor(ctx, posX, posY) {
        this.ctx = ctx;
        this.width = 100;
        this.height = 100;

        this.image = new Image();
        this.image.src = "./images/pizza.png";
        this.image.onload;

        this.posX = posX;
        this.posY = posY;
        this.image.frames = 1;
        this.image.framesIndex = 0;
    } draw() {
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