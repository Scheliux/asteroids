let height = 768;
let width = 1024;

let canvasObject = document.querySelector("canvas");
let canvas = canvasObject.getContext("2d");

function deg(angle) {
    return angle * Math.PI / 180;
}

function trig(cX, cY, angle, length) {
    let x = cX + length * Math.cos(deg(angle));
    let y = cY + length * Math.sin(deg(angle));
    return {x, y}
}

function randomgen(min, max) {
    return Math.round(Math.random()*(max - min) + min);
}

function asteroidgen(){
        let size = randomgen(2, 11);
        let angle = randomgen(0,360);
        let x = randomgen (0, width);
        let y = randomgen(0, height);
    function spawn(x, y) {
        let dist = distance(x, y, width /2, height /2);
        if (dist < 120) {
            return true;
        }
    }
    let direction = randomgen(0,1);
    while(spawn(x, y)){
        x = randomgen (0, width);
        y = randomgen(0, height);
    }
    return {x, y, size, angle, direction};
}

function distance(x1, y1, x2, y2) {
    return Math.sqrt((x1-x2) ** 2 + (y1-y2) ** 2);

}
let StartTime = Date.now();
let ship = new Ship(width / 2, height / 2, 0, "red", 100, 1, 0.1, 8, 6);
let asteroids = [];  
let bullets = [];
let status ="idle";
let score = 0;

for(let i=0; i <= 5; i++) {
    let {x, y, size, angle, direction} = asteroidgen();
    asteroids.push(new Asteroid(x, y, size, angle, direction));
}

let bullet = undefined;

canvasObject.height = height;
canvasObject.width = width;
canvasObject.style.background = "black";


function ScreenDraw() {
    let sincestart = (Date.now() - StartTime) / 10000;
    canvas.clearRect(0, 0, width, height);

    for(let asteroid of asteroids) {
        asteroid.draw();
        asteroid.angle += 0.5;
        if (asteroid.direction == 1) {
            asteroid.x += sincestart;
            asteroid.y -= sincestart;
        } else {
            asteroid.x -= sincestart;
            asteroid.y += sincestart;
        }
    }
    if (ship.health > 0) {
        ship.draw();
    } else {
        canvas.fillStyle = "white";
        canvas.textAlign = "center";
        canvas.font = "bold 40px Consolas";
        canvas.fillText("Game Over", width / 2, height / 2);
    }
    canvas.fillStyle = "white";
    canvas.textAlign = "left";
    canvas.font="bold 24px Consolas";
    canvas.fillText("Score: " + score, 10, 26);

    if (bullets.length != 0) {
        for(let bullet of bullets) {
            bullet.draw();
        }
    }
}

let LastDraw = Date.now();

function GameLoop() {
    let ElipsedTime = (Date.now() - LastDraw) / 500;
    PlayerMovement();
    if (ship.health > 0) {
        ship.loop(ElipsedTime);
    }
    ScreenWrap();
    if (bullets.length != 0) {
        for(let bullet of bullets) {
            bullet.loop();
        }
    }
    //console.log(ship.health);

    //ship hit detection
    if (ship.health <= 0) {
        status = "gameover";
    }
        if (status == "idle") {
            for (let asteroid of asteroids) {
                let dist = distance(ship.x, ship.y, asteroid.x, asteroid.y);
                if(dist < 10*asteroid.size+7) {
                    let damage = 20;
                    ship.health -= damage;
                    status = "invincible";
                }
            }
        }

    //bullet despawn
        for (let bullet of bullets) {
            if (bullet.x > width || bullet.x < 0 || bullet.y > height || bullet.y < 0) {
                    let bulletIndex = bullets.indexOf(bullet);
                    bullets.splice(bulletIndex, 1);
            }
        }
        HitDetection();
    ScreenDraw();
    LastDraw = Date.now();
    requestAnimationFrame(GameLoop);
}

function ScreenWrap(){
    if (ship.x < 0) {
        ship.x = width;
    } else if (ship.x > width) {
        ship.x = 0;
    }else if (ship.y < 0) {
        ship.y = height;
    } else if (ship.y > height) {
        ship.y = 0;
    }
    for(let asteroid of asteroids) {
        if (asteroid.x > width) {
            asteroid.x = 0;
            asteroid.y = randomgen(0, height);
        } else if (asteroid.x < 0) {
            asteroid.x = width;
            asteroid.y = randomgen(0, height);
        } else if (asteroid.y > height) {
            asteroid.x = randomgen(0, width);
            asteroid.y = 0;
        } else if (asteroid.y < 0) {
            asteroid.x = randomgen(0, width);
            asteroid.y = height;
        }
    }
}

function HitDetection() {
    for(let asteroid of asteroids) {
        for(let bullet of bullets) {
            dist = distance(bullet.x, bullet.y, asteroid.x, asteroid.y);
            if (dist < 9 * asteroid.size) {
                let bulletIndex = bullets.indexOf(bullet);
                let asteroidIndex = asteroids.indexOf(asteroid);
                
                bullets.splice(bulletIndex, 1);
                if (asteroids[asteroidIndex].size <= 2) {
                    asteroids.splice(asteroidIndex, 1);
                    score += 100;
                } else {
                    asteroids[asteroidIndex].size -= 2
                }
                if (asteroids.length < 6) {
                    let {x, y, size, angle, direction} = asteroidgen();
                    asteroids.push(new Asteroid(0, y, size, angle, direction));
                }
            }
        }
    }
}
addEventListener("keydown", Keypress);
addEventListener("keyup", Shoot);
addEventListener("keyup", KeypressReset);

GameLoop();
