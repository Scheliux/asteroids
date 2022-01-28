let keypressed = undefined;

function Keypress(event) {
    let key = event.code;
    if (key == "KeyA") {
        keypressed = "left" ;
    } else if (key == "KeyD") {
        keypressed = "right";
    } else if (key == "KeyW") {
        keypressed = "up";
    } else if (key == "KeyS") {
        keypressed = "down";
    }
}

function Shoot(event){
    let key = event.code;
    if (key == "Space" && status == "idle") {
        let {x, y} = ship.cannon();
        let {x: vx, y: vy} = trig(0, 0, ship.angle, 10);
        bullets.push(new Bullet(x, y, vx, vy, "white"));
    }
}

function KeypressReset() {
    keypressed = undefined;
}

function PlayerMovement() {
    if (keypressed == "up") {
        ship.speed += ship.acc;
    } else if (keypressed == "down") {
        ship.speed -= ship.acc;
    } else if (keypressed == "left"){
        ship.angle -= ship.turn;
    } else if (keypressed == "right") {
        ship.angle += ship.turn;
    }
}