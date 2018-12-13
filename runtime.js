var x = 20;
var y = 20;
var xvel = 0;
var yvel = 20;

var oldTime = 0;

var character;

var platforms = [
    {x: 0, y: 380, w: 400, h: 20},
    {x: 100, y: 320, w: 60, h: 20},
    {x: 180, y: 260, w: 60, h: 20},
];

var test = [8, 20];

function preload()
{

}

function setup()
{
    createCanvas(400, 400);

    character = new player(20, 20, 20, 20, {up: UP_ARROW, down: DOWN_ARROW, left: LEFT_ARROW, right: RIGHT_ARROW});
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
    rect(character.x, character.y, character.w, character.h);

    fill("blue");
    for(var i = 0; i < platforms.length; i++)
    {
        rect(platforms[i].x, platforms[i].y, platforms[i].w, platforms[i].h);
    }
}

function update()
{
    character.update();
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

function checkAllCollisions(entity, list)
{
    for(var i = 0; i < list.length; i++)
    {
        if(collision(entity, list[i]))
        {
            i = list.length;
            return true;
        }
    }
    return false;
}