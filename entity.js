class entity
{
    constructor(x, y, w, h)
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

class player extends entity
{
    constructor(x, y, w, h, controls)
    {
        super(x, y, w, h);
        this.controls = controls;
    }

    update()
    {
        if(keyIsDown(this.controls.left))
            this.xvel--;
        if(keyIsDown(this.controls.right))
            this.xvel++;
        if(keyIsDown(this.controls.up) && this.inGround)
            this.yvel = -12;
        super.update();
    }
}
