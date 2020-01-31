const randomInt = (min, max) =>
    Math.floor(Math.random() * (max - min + 1) + min);

const game = {
    canvas: undefined,
    ctx: undefined,
    width: undefined,
    height: undefined,
    FPS: 60,
    framesCounter: 0,
    score: 00000,
    bubbles: [],
    pizzas: [],
    lives: 3,
    collisionCounter: 0,
    isColliding: false,
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
        this.music = new Howl({
            src: ["./snd/stage.mp3"],
            autoplay: true,
            loop: true,
            volume: 0.5
        });
        this.bubbleSnd = new Howl({
            src: ["./snd/bubble-sound.mp3"],
            autoplay: false,
            loop: false,
            volume: 0.5
        });
        this.gameOverSnd = new Howl({
            src: ["./snd/gameover-sound.mp3"],
            autoplay: false,
            loop: false,
            volume: 0.5
        });
        this.victorySnd = new Howl({
            src: ["./snd/victory.mp3"],
            autoplay: false,
            loop: false,
            volume: 0.5
        });
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
            if (this.isCollisionPlayer()) {
                this.collisionCounter++;
                if (this.collisionCounter > 20) {
                    this.livesF();
                    this.collisionCounter = 0;
                }
            }
            this.isCollisionBullet()
            this.drawScore();
            this.victoryF()
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
        this.bubbles.forEach(b => b.draw())
        this.hud.draw()
        this.pizza.forEach(p => p.draw())
    },
    moveAll() {
        this.player.animatedBack(this.framesCounter)
        this.bubbles.forEach(b => b.move())
    },
    reset() {
        this.background = new Background(this.ctx, this.canvas.width, this.canvas.height);
        this.player = new Player(this.ctx, this.width, this.height, this.keys, this.width / 2, this.height - 161);
        this.bubbles = [new Bubble(this.ctx, randomInt(100, this.canvas.width * 0.5), this.canvas.height * 0.1, this.width, this.height, 1)]
        this.pizza = [new Pizza(this.ctx, 40, this.canvas.height - 75, "./images/pizza.png"), new Pizza(this.ctx, 110, this.canvas.height - 75, "./images/pizza.png"), new Pizza(this.ctx, 180, this.canvas.height - 75, "./images/pizza.png")]
        this.hud = new Hud(this.ctx, this.canvas.width, this.canvas.height);
        this.gameover = new GameOver(this.ctx, 200, 120, this.canvas.width / 2 - 100, this.canvas.height / 2 - 60);
        this.victory = new Victory(this.ctx, 400, 400, this.canvas.width / 2 - 200, this.canvas.height / 2 - 200);
        this.scoreboard = scoreboard;
    },
    clear() {
        this.ctx.clearRect(0, 0, this.width, this.height);
    },
    isCollisionPlayer() {
        return this.bubbles.some(bubble => {
            return (
                this.player.posX <= bubble.posX + bubble.width &&
                this.player.posY <= bubble.posY + bubble.height &&
                this.player.posX + this.player.width >= bubble.posX
            );
        });
    },
    drawScore() {
        this.scoreboard.update(this.score, this.width - 150, this.height - 20);
    },
    livesF() {
        if (this.lives >= 3) {
            this.pizza[2] = new Pizza(this.ctx, 180, this.canvas.height - 75, "./images/pizza_clear.png")
            this.lives--
        } else if (this.lives >= 2) {
            this.pizza[1] = new Pizza(this.ctx, 110, this.canvas.height - 75, "./images/pizza_clear.png")
            this.lives--
        } else if (this.lives >= 1) {
            this.pizza[0] = new Pizza(this.ctx, 40, this.canvas.height - 75, "./images/pizza_clear.png")
            this.lives--
        } else {
            this.gameOverSnd.play()
            this.music.stop()
            this.gameoverF()
        }
    },
    gameoverF() {
        this.gameover.draw()
        clearInterval(this.interval);

    },
    isCollisionBullet() {
        this.isColliding = false;
        this.player.bullets.forEach((bullet, idx) => {
            this.bubbles.forEach((bubble, bubbleIndex) => {
                if (bullet.posX <= bubble.posX + bubble.width &&
                    bullet.posY <= bubble.posY + bubble.height &&
                    bullet.posX + bullet.width >= bubble.posX) {
                    this.isColliding = true
                    this.player.bullets.splice(idx, 1);
                    if (bubbleIndex !== undefined) {
                        // type of ball check ==> .__proto__.constructor.name as in game.bubbles[0].__proto__.constructor.name ===> "BubbleC3"
                        if (game.bubbles.length > 0 && game.bubbles[bubbleIndex].__proto__.constructor.name === "Bubble") {
                            this.bubbles.splice(bubbleIndex, 1)[0]
                            setTimeout(() => {
                                this.bubbleSnd.play()
                                this.bubbles.push(new BubbleC3(this.ctx, bubble.posX, this.canvas.height * 0.1, this.width, this.height, 1), new BubbleC3(this.ctx, bubble.posX, this.canvas.height * 0.1, this.width, this.height, -1))
                                this.score += 100;
                            }, 100)
                        } else if (game.bubbles.length > 0 && game.bubbles[bubbleIndex].__proto__.constructor.name === "BubbleC3") {
                            this.bubbles.splice(bubbleIndex, 1)[0]
                            setTimeout(() => {
                                this.bubbleSnd.play()
                                this.bubbles.push(new BubbleJS(this.ctx, bubble.posX, this.canvas.height * 0.1, this.width, this.height, 1), new BubbleJS(this.ctx, bubble.posX, this.canvas.height * 0.1, this.width, this.height, -1))
                                this.score += 200;
                            }, 100)
                        } else if (game.bubbles.length > 0 && game.bubbles[bubbleIndex].__proto__.constructor.name === "BubbleJS") {
                            this.bubbles.splice(bubbleIndex, 1)[0]
                            this.bubbleSnd.play()
                            this.score += 300;
                        }
                    }
                }
            })
        })
    },
    victoryF() {
        if (this.score >= 1600) {
            this.victory.draw()
            this.victorySnd.play()
            this.music.stop()
            clearInterval(this.interval);
        }
    }
}




