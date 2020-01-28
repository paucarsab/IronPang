const scoreboard = {
    ctx: undefined,

    init(ctx) {
        this.ctx = ctx;
        this.ctx.font = "60px sans-serif";
    },

    update(score) {
        this.ctx.fillStyle = '#f3c000';
        this.ctx.fillText(Math.floor(score), 50, 50);
    }
};
