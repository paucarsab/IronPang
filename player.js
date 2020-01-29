class Player {
    constructor(ctx, gameW, gameH, keys, posX, posY) {
        this.ctx = ctx;
        this.gameWidth = gameW;
        this.gameHeight = gameH;

        this.width = 68;
        this.height = 82;

        this.image = new Image();
        this.image.src = "./images/player_back.png";

        this.posX = posX
        this.posY = posY
        this.posY0 = this.posY;

        this.image.frames = 2;
        this.image.framesIndex = 0;

        this.keys = keys;
        this.bullets = [];

        this.setListeners();
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
        this.clearBullet()
    }
    animatedBack(framesCounter) {
        if (framesCounter % 30 == 0) {
            this.image.framesIndex++;
        }
        if (this.image.framesIndex > this.image.frames - 1) {
            this.image.framesIndex = 0;
        }
    }
    setListeners() {
        document.addEventListener("keydown", e => {
            if (e.keyCode === 39) {
                this.keys.RIGHT = true;
                if (this.posX >= this.gameWidth - this.width) {
                    this.posX = this.gameWidth - this.width;
                } else {
                    this.posX += 20;
                }
                this.image.src = "./images/player_right.png";
                this.image.frames = 4;
            }

            if (e.keyCode === 37) {
                this.keys.LEFT = true;
                if (this.posX <= 0) {
                    this.posX = 0;
                } else {
                    this.posX -= 20;
                }
                this.image.src = "./images/player_left.png";
                this.image.frames = 4;
            }
            if (e.keyCode === 32) {
                this.keys.SHOOT = true
                this.shoot();
            }
        })
        document.addEventListener("keyup", e => {
            if (e.keyCode === 39) {
                this.keys.RIGHT = false;
                this.image.src = "./images/player_back.png";
                this.image.frames = 2;
            }
            if (e.keyCode === 37) {
                this.keys.RIGHT = false;
                this.image.src = "./images/player_back.png";
                this.image.frames = 2;
            }
            if (e.keyCode === 32) {
                this.keys.SHOOT = false
            }
        })
    }
    shoot() {
        if (this.bullets.length < 3) {
            this.bullets.push(new Bullet(this.ctx, this.posX, this.posY))
        }
    }
    clearBullet() {
        let finishedBulletIndex;
        this.bullets.forEach((bullet, idx) => {
            if (bullet.image.framesIndex > 68) {
                finishedBulletIndex = idx
            }
        })
        if (finishedBulletIndex !== undefined) this.bullets.splice(finishedBulletIndex, 1)
    }
}
