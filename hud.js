class Hud {
    constructor(ctx, canvasWidth, canvasHeight) {
        this.ctx = ctx;
        this.width = canvasWidth;
        this.height = canvasHeight;

        this.image = new Image();
        this.image.src = "./images/hud_general.png";

        this.posX = 0;
        this.posY = 0;
    }

    draw() {
        this.ctx.drawImage(this.image, this.posX, this.posY, this.width, this.height);
    }
}