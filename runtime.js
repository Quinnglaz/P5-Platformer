
// 1. Variable Declarations and Initialization
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
    {x: 600, y: 480, w: 60, h: 20},
    {x: 355, y: 400, w: 60, h: 50},
];
var test = [8, 20];


function setup() {
    createCanvas(800, 800);
    player1 = new player(20, 20, 20, 20, {up: UP_ARROW, down: DOWN_ARROW, left: LEFT_ARROW, right: RIGHT_ARROW, shoot: 90});
    player2 = new player(720, 20, 20, 20, {up: 87, down: 83, left: 65, right: 68, shoot: 70});
}

function draw() {
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
    text("Player 1 Health: " + player1.health, 10, 30);
    text("Player 2 Health: " + player2.health, 650, 30);

    fill("yellow");
    rect(player2.x, player2.y, player2.w, player2.h);

    fill("lime");
    for (let i = 0; i < platforms.length; i++) {
        rect(platforms[i].x, platforms[i].y, platforms[i].w, platforms[i].h);
    }

    for (let i = 0; i < projectiles.length; i++) {
        rect(projectiles[i].x, projectiles[i].y, projectiles[i].w, projectiles[i].h);
    }
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
        this.xvel *= 0.9;

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
        this.shootCooldown = 0; // Initialize the cooldown timer
        this.shootInterval = 30; // Cooldown interval (in frames)
        this.health = 3;
    }

    update() {
        if (this.shootCooldown > 0) {
            this.shootCooldown--;
        }

        for (let i = 0; i < projectiles.length; i++) {
            if (collision(this, projectiles[i])) {
                this.health--; // Decrease health points if hit by a projectile
                projectiles.splice(i, 1); // Remove the projectile
                i--; // Adjust index after removal
            }
        }

        if (this.health <= 0) {
            // Player is defeated - add game over logic here
        }

        if (keyIsDown(this.controls.shoot) && this.shootCooldown === 0) {
            projectiles.push(new entity(this.x, this.y, 12, 7, Math.cos(this.dir) * 100, -2));
            this.shootCooldown = this.shootInterval;
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
                this.yvel = -12;
            }
        }

        super.update();
    }
}

 