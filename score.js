const scoreboard = {
    ctx: undefined,
    init(ctx) {
        this.ctx = ctx;
        this.ctx.font = "normal 40px ComicKings";
    },
    update(score, posX, posY) {
        this.ctx.fillStyle = '#f3c000';
        this.ctx.fillText(Math.floor(score), posX, posY);
    }
};
