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
                console.log("tocando")
            }
            this.isCollisionBullet()
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
        this.bubbles.forEach(b => b.draw())
        this.hud.draw()
        this.pizzas.forEach(p => p.draw())
    },
    moveAll() {
        this.player.animatedBack(this.framesCounter)
        this.bubbles.forEach(b => b.move())
        // this.bubbles.forEach(b => b.changeDirection())
    },
    reset() {
        this.background = new Background(this.ctx, this.canvas.width, this.canvas.height);
        this.player = new Player(this.ctx, this.width, this.height, this.keys, this.width / 2, this.height - 161);
        this.bubbles = [new Bubble(this.ctx, randomInt(100, this.canvas.width * 0.5), this.canvas.height * 0.1, this.width, this.height, 1)]
        this.pizza = [new Pizza(this.ctx, this.canvas.width * 0.5, this.canvas.height * 0.5)]
        this.hud = new Hud(this.ctx, this.canvas.width, this.canvas.height);
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
    lives() {
        if (this.lives < 0) {
            this.gameover()
        } else {
            this.lives--
        }
    },
    gameover() {
        clearInterval(this.interval);
    },
    isCollisionBullet() {
        this.isColliding = false;
        this.player.bullets.forEach((bullet, idx) => {
            this.bubbles.forEach((bubble, bubbleIndex) => {
                if (bullet.posX <= bubble.posX + bubble.width &&
                    bullet.posY <= bubble.posY + bubble.height &&
                    bullet.posX + bullet.width >= bubble.posX) {
                    console.log(bubbleIndex)
                    this.isColliding = true
                    this.player.bullets.splice(idx, 1);
                    if (bubbleIndex !== undefined) {

                        // type of ball check ==> .__proto__.constructor.name as in game.bubbles[0].__proto__.constructor.name ===> "BubbleC3"
                        if (game.bubbles.length > 0 && game.bubbles[bubbleIndex].__proto__.constructor.name === "Bubble") {
                            this.bubbles.splice(bubbleIndex, 1)[0]
                            setTimeout(() => {
                                this.bubbles.push(new BubbleC3(this.ctx, bubble.posX, this.canvas.height * 0.1, this.width, this.height, 1), new BubbleC3(this.ctx, bubble.posX + 100, this.canvas.height * 0.1, this.width, this.height, 1))
                                this.score += 100;
                                console.log(this.bubbles)

                            }, 100)
                            console.log("Bola H5 Borrada!")
                            console.log(bubbleIndex)
                        } else if (game.bubbles.length > 0 && game.bubbles[bubbleIndex].__proto__.constructor.name === "BubbleC3") {
                            this.bubbles.splice(bubbleIndex, 1)[0]
                            setTimeout(() => {
                                this.bubbles.push(new BubbleJS(this.ctx, bubble.posX, this.canvas.height * 0.1, this.width, this.height, 1), new BubbleJS(this.ctx, bubble.posX + 100, this.canvas.height * 0.1, this.width, this.height, 1))
                                this.score += 200;
                                console.log(bubbleIndex)

                            }, 100)
                            console.log("Bola C3 Borrada!")
                            console.log(this.bubbles)

                        } else if (game.bubbles.length > 0 && game.bubbles[bubbleIndex].__proto__.constructor.name === "BubbleJS") {
                            this.bubbles.splice(bubbleIndex, 1)[0]
                            this.score += 300;
                            console.log("Bola JS Borrada!")
                            console.log(bubbleIndex)

                        }
                    }

                }
            })
        })
    },

}




