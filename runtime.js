var x = 20;
var y = 20;
var xvel = 0;
var yvel = 20;

var oldTime = 0;

var platforms = [
    {x: 0, y: 380, w: 400, h: 20},
    {x: 100, y: 320, w: 60, h: 20},
    {x: 180, y: 260, w: 60, h: 20},
];

function preload()
{

}

function setup()
{
    createCanvas(400, 400);
}

function draw()
{
    dt = Date.now() - oldTime;
    if(dt > 17)
    {
        oldTime = Date.now();
        update();
    }

    background(0);
    fill("red");
    rect(x, y, 20, 20);

    fill("blue");
    for(var i = 0; i < platforms.length; i++)
    {
        rect(platforms[i].x, platforms[i].y, platforms[i].w, platforms[i].h);
    }
}

function update()
{
    //xvel++;
    if(keyIsDown(RIGHT_ARROW))
        xvel++;
    if(keyIsDown(LEFT_ARROW))
        xvel--;
    x += xvel;
    xvel *= 0.9;
    if(checkAllCollisions(platforms))
    {
        while(checkAllCollisions(platforms))
        {
            x -= Math.abs(xvel) / xvel;
        }
        xvel = 0;
    }

    yvel += 1;
    y += yvel;
    if(checkAllCollisions(platforms))
    {
        while(checkAllCollisions(platforms))
        {
            y -= Math.abs(yvel) / yvel;
        }
        if(keyIsDown(UP_ARROW) && Math.abs(yvel) / yvel > 0)
            yvel = -12;
        else
            yvel = 0;
    }
}

function collision(obj1, obj2)
{
    if(obj1.x < (obj2.x + obj2.w) && obj2.x < (obj1.x + obj1.w))
    {
        if(obj1.y < (obj2.y + obj2.h) && obj2.y < (obj1.y + obj1.h))
        {
            return true;
        }
    }
    return false;
}

function checkAllCollisions(list)
{
    for(var i = 0; i < list.length; i++)
    {
        if(collision({x: x, y: y, w: 20,h: 20}, list[i]))
        {
            i = list.length;
            return true;
        }
    }
    return false;
}