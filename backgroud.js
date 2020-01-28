class Background {
    constructor(ctx, canvasWidth, canvasHeight) {
        this.ctx = ctx;
        this.width = canvasWidth
        this.height = canvasHeight

        this.image = new Image();
        this.image.src = "./images/bg.jpg";

        this.posX = 2;
        this.posY = 2;
    }

    draw() {
        this.ctx.drawImage(this.image, this.posX, this.posY, this.width, this.height);
    }
}