class entity
{
    constructor(x, y, w, h, xvel = 0, yvel = 0)
    {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.xvel = xvel;
        this.yvel = yvel;

        this.inGround = false;
    }

    update()
    {

        this.x += this.xvel;
        if(checkAllCollisions(this, platforms))
        {
            while(checkAllCollisions(this, platforms))
                this.x -= Math.abs(this.xvel) / this.xvel;
            this.xvel = 0;
        }
        this.xvel *= 0.9;

        this.y += this.yvel;
        if(checkAllCollisions(this, platforms))
        {
            while(checkAllCollisions(this, platforms))
                this.y -= Math.abs(this.yvel) / this.yvel;
            this.yvel = 0;
            this.inGround = true;
        }
        else
        {
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
    }

    update() {
        // Reduce the cooldown timer
        if (this.shootCooldown > 0) {
            this.shootCooldown--;
        }

        // Shooting logic with cooldown
        if (keyIsDown(this.controls.shoot) && this.shootCooldown === 0) {
            projectiles.push(new entity(this.x, this.y, 12, 7, Math.cos(this.dir) * 100, -2));
            this.shootCooldown = this.shootInterval; // Reset cooldown timer
        }

        // Other movement logic
        if (keyIsDown(this.controls.left)) {
            this.xvel--;
            this.dir = Math.PI;
        }
        if (keyIsDown(this.controls.right)) {
            this.xvel++;
            this.dir = 0;
        }
        if (keyIsDown(this.controls.up)) {
            if (this.inGround)
                this.yvel = -12;
        }

        super.update();
    }
}