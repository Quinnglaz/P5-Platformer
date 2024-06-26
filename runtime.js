
var x = 20;
var y = 20;
var xvel = 0;
var yvel = 20;
var oldTime = 0;
var player1;
var player2;
var projectiles = [];
var platforms = [
    {x: 0, y: 550, w: 1000, h: 150},
    {x: 100, y: 480, w: 60, h: 20},
    {x: 180, y: 410, w: 60, h: 20},
    {x: 0, y: 0, w: 20, h: 1000},
    {x: 745, y: 0, w: 65, h: 1000},
    {x: 600, y: 480, w: 60 ,h: 20},
    {x: 520, y: 410, w: 60, h: 20},
    {x: 310, y: 350, w: 150, h: 20},
    {x: 310, y: 480, w: 150, h: 20},
    {x: 75, y: 500, w: 20, h: 60},
    {x: 660, y: 500, w: 20, h: 60},
    {x: 600, y: 480, w: 60, h: 20},
    {x: 355, y: 400, w: 60, h: 50},
    {x: 50, y: 290, w: 100, h: 20},
    {x: 600, y: 290, w: 100, h: 20},
    {x: 355, y: 400, w: 60, h: 50},
];
var test = [8, 20];

function setup() {
    createCanvas(800, 800);
    player1 = new player(20, 20, 20, 20, {up: UP_ARROW, down: DOWN_ARROW, left: LEFT_ARROW, right: RIGHT_ARROW, shoot: 90});
    player2 = new player(720, 20, 20, 20, {up: 87, down: 83, left: 65, right: 68, shoot: 70});
}

function draw() {
    //sample1.play();
    dt = Date.now() - oldTime;
    if (dt > 17) {
        oldTime = Date.now();
        update();
    }

    background(0);

    player1.update();
    player2.update();

    fill("red");
    rect(player1.x, player1.y, player1.w, player1.h);

    fill("white");
    textSize(20);
    text("Player 1 Health: " + player1.health, 20, 30);
    text("Player 2 Health: " + player2.health, 585, 30);

    fill("yellow");
    rect(player2.x, player2.y, player2.w, player2.h);

    fill("lime");
    for (let i = 0; i < platforms.length; i++) {
        rect(platforms[i].x, platforms[i].y, platforms[i].w, platforms[i].h);
    }

    for (let i = 0; i < projectiles.length; i++) {
        rect(projectiles[i].x, projectiles[i].y, projectiles[i].w, projectiles[i].h);
    }

    
    if (player1.health <= 0) {
        background("yellow");
        fill("blue")
        textSize(40);
        text("Yellow wins. Press R to restart", 160, 360)
    } else if (player2.health <= 0) {
        background("red");
        fill("blue")
        textSize(40);
        text("Red wins. Press R to restart", 160, 360)
    }
}
function keyPressed() {
    if (key === 'r' || key === 'R') {
        restartGame();
    }
}
function restartGame() {
    
    player1.x = 20;
    player1.y = 20;
    player1.health = 5;

    player2.x = 720;
    player2.y = 20;
    player2.health = 5;

    
    projectiles = [];

    
}
function update() {
    for (let i = 0; i < projectiles.length; i++) {
        projectiles[i].update();
    }
}

function collision(obj1, obj2) {
    if (obj1.x < (obj2.x + obj2.w) && obj2.x < (obj1.x + obj1.w)) {
        if (obj1.y < (obj2.y + obj2.h) && obj2.y < (obj1.y + obj1.h)) {
            return true;
        }
    }
    return false;
}

function checkAllCollisions(entity, list) {
    for (let i = 0; i < list.length; i++) {
        if (collision(entity, list[i])) {
            i = list.length;
            return true;
        }
    }
    return false;
}

class entity {
    constructor(x, y, w, h, xvel = 0, yvel = 0) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.xvel = xvel;
        this.yvel = yvel;
        this.inGround = false;
    }

    update() {
        this.x += this.xvel;
        if (checkAllCollisions(this, platforms)) {
            while (checkAllCollisions(this, platforms)) {
                this.x -= Math.abs(this.xvel) / this.xvel;
            }
            this.xvel = 0;
        }
        this.xvel *= 0.75;

        this.y += this.yvel;
        if (checkAllCollisions(this, platforms)) {
            while (checkAllCollisions(this, platforms)) {
                this.y -= Math.abs(this.yvel) / this.yvel;
            }
            this.yvel = 0;
            this.inGround = true;
        } else {
            this.inGround = false;
        }
        this.yvel++;
    }
}

class player extends entity {
    constructor(x, y, w, h, controls) {
        super(x, y, w, h);
        this.dir = 90;
        this.controls = controls;
        this.shootCooldown = 0; 
        this.shootInterval = 30; 
        this.health = 5;
    }

    update() {
        if (this.shootCooldown > 0) {
            this.shootCooldown--;
        }

        for (let i = 0; i < projectiles.length; i++) {
            if (collision(this, projectiles[i])) {
                this.health--; 
                projectiles.splice(i, 1); 
                i--; 
            }
        }
        if (keyIsDown(this.controls.shoot) && this.shootCooldown === 0) {
            let xOffset = this.dir === 0 ? this.w : -13; 
            let yOffset = -8; 
            projectiles.push(new entity(this.x + xOffset, this.y + yOffset, 12, 7, Math.cos(this.dir) * 80, -2, this)); // Pass the shooter as an argument
            this.shootCooldown = this.shootInterval;
        }

        if (this.health <= 0) {
            
        }

        if (keyIsDown(this.controls.left)) {
            this.xvel--;
            this.dir = Math.PI;
        }
        if (keyIsDown(this.controls.right)) {
            this.xvel++;
            this.dir = 0;
        }
        if (keyIsDown(this.controls.up)) {
            if (this.inGround) {
                this.yvel = -14;
            }
        }

        super.update();
    }
}
 