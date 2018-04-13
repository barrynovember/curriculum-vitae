var w = c.width = window.innerWidth,
    h = c.height = window.innerHeight,
    ctx = c.getContext('2d'),

    radians = 1,
    cen = {x:w/2, y:h/2},
    pos = Object.create(cen),
    vel = {x:.2, y:.4},
    radVel = 0,
    size = {x: 10, y: 40},
    bullets = [],
    lastBullet = 0,
    bulletTime = 1,
    keys = {l:false, r:false, f:false, s:false};

ctx.strokeStyle = 'rgb(0, 200, 200)';

function anim(){
    window.requestAnimationFrame(anim);

    ctx.fillStyle = 'rgba(0, 0, 0, .4)';
    ctx.fillRect(0, 0, w, h);

    drawThing();

    if(keys.l) radVel -= .005;
    if(keys.r) radVel += .005;

    radians += radVel *= .95;

    if(keys.f){
        vel.x += Math.cos(radians)/7;
        vel.y += Math.sin(radians)/7;
    }

    pos.x += vel.x *= .995;
    pos.y += vel.y *= .995;

    if(pos.x > w + 2*size.x) pos.x = -2*size.x;
    if(pos.y > h + 2*size.x) pos.y = -2*size.x;
    if(pos.x < -2*size.x) pos.x = w + 2*size.x;
    if(pos.y < -2*size.x) pos.y = h + 2*size.x;

    ++lastBullet;
    if(keys.s && lastBullet > bulletTime){
        bullets.push(new Bullet);
        lastBullet = 0;
    }
    for(var i = 0; i < bullets.length; ++i){
        var bull = bullets[i];
        bull.update();

        if(bull.pos2.x > w || bull.pos2.x < 0
            ||bull.pos2.y > h || bull.pos2.y < 0){
            bullets.splice(i, 1);
            --i;
        }
    }
}
anim();

function drawThing(){

    ctx.strokeStyle = 'rgb(0, 200, 200)';
    ctx.beginPath();
    ctx.moveTo(
        pos.x + Math.cos(radians) * size.y,
        pos.y + Math.sin(radians) * size.y);
    ctx.lineTo(
        pos.x + Math.cos(radians + (2*Math.PI)/3) * size.x,
        pos.y + Math.sin(radians + (2*Math.PI)/3) * size.x);
    ctx.lineTo(
        pos.x + Math.cos(radians - (2*Math.PI)/3) * size.x,
        pos.y + Math.sin(radians - (2*Math.PI)/3) * size.x);
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
}

function Bullet(){
    this.pos = Object.create(pos);
    this.vel = {x:Math.cos(radians), y:Math.sin(radians)};
    this.pos2 = Object.create(pos);

    this.pos.x += this.vel.x * 45;
    this.pos.y += this.vel.y * 45;

    this.pos2.x += this.vel.x * 35;
    this.pos2.y += this.vel.y * 35;
}
Bullet.prototype.update = function(){
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;

    this.pos2.x += this.vel.x;
    this.pos2.y += this.vel.y;

    ctx.beginPath();
    ctx.moveTo(this.pos.x, this.pos.y);
    ctx.lineTo(this.pos2.x, this.pos2.y);
    ctx.stroke();
    ctx.closePath();
}

document.addEventListener('keydown', function(e){
    var is = true;
    switch(e.keyCode){
        case 37:keys.l = true; break;
        case 38:keys.f = true; break;
        case 39:keys.r = true; break;
        case 32:keys.s = true; break;
        default: is = false;
    }
    if(is) e.preventDefault();
});
document.addEventListener('keyup', function(e){
    var is = true;
    switch(e.keyCode){
        case 37:keys.l = false; break;
        case 38:keys.f = false; break;
        case 39:keys.r = false; break;
        case 32:keys.s = false; break;
        default: is = false;
    }
    if(is) e.preventDefault();
});