const randomInt = (min, max) =>
    Math.floor(Math.random() * (max - min + 1) + min);

const game = {
    canvas: undefined,
    ctx: undefined,
    width: undefined,
    height: undefined,
    FPS: 60,
    framesCounter: 0,
    score: 0,
    bubbles: [],
    lives: 3,
    keys: {
        LEFT: false,
        RIGHT: false,
        SHOOT: false
    },
    init() {
        this.canvas = document.getElementById("myCanvas");
        this.ctx = this.canvas.getContext("2d");
        this.setDimensions();
        scoreboard.init(this.ctx);
        this.start();
    },
    start() {
        this.reset();
        this.interval = setInterval(() => {
            this.clear();
            if (this.framesCounter > 5000) {
                this.framesCounter = 0;
            }
            this.framesCounter++;
            this.drawAll();
            this.moveAll();
            // if (this.isCollision()) {
            //     this.lives();
            // }
            this.score += .01;
            this.drawScore();
        }, 1000 / this.FPS)
    },
    setDimensions() {
        this.width = window.innerWidth * 0.8;
        this.height = window.innerHeight * 0.8;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
    },
    drawAll() {
        this.background.draw()
        this.player.bullets.forEach(bullet => bullet.draw(this.framesCounter))
        this.player.draw()
        this.bubbles.draw()
        this.hud.draw()
    },
    moveAll() {
        this.player.animatedBack(this.framesCounter)
    },
    reset() {
        this.background = new Background(this.ctx, this.canvas.width, this.canvas.height);
        this.player = new Player(this.ctx, this.width, this.height, this.keys, this.width / 2, this.height - 200);
        this.bubbles = new Bubble(this.ctx, randomInt(100, this.canvas.width * 0.5), this.canvas.height * 0.1);
        this.hud = new Hud(this.ctx, this.canvas.width, this.canvas.height);
        this.scoreboard = scoreboard;
    },
    clear() {
        this.ctx.clearRect(0, 0, this.width, this.height);
    },
    isCollision() {
        // this.bubbles.forEach(bublle =>
        //     let dx = this.bubble.posX - this.player.posX;
        // let dy = this.bubble.posY - this.player.posY;
        // let distance = Math.sqrt(dx * dx + dy * dy);

        // if (distance < 100 + 45) {
        //     console.log("colision!!!!")
        // })
        // var circle1 = { radius: 20, x: 5, y: 5 };
        // var circle2 = { radius: 12, x: 10, y: 5 };

        // var dx = circle1.x - circle2.x;
        // var dy = circle1.y - circle2.y;
        // var distance = Math.sqrt(dx * dx + dy * dy);

        // if (distance < circle1.radius + circle2.radius) {
        //     // collision detected!
        // }
    },
    drawScore() {
        this.scoreboard.update(this.score);
    },
    lives() {
        if (this.lives < 0) {
            this.gameover()
        } else {
            console.log("1 vida menos")
            this.lives--
        }
    },
    gameover() {
        clearInterval(this.interval);
    }
};