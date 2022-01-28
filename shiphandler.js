class Ship {
    constructor(x, y, angle, color, health, acc, diacc, maxspeed, turn){
        this.x = x;
        this.y = y;
        this.angle = angle;
        this.color = "green";
        this.prevcolor = "green"
        this.health = health;
        this.speed = 0
        this.turn = turn;
        this.acc = acc;
        this.diacc = diacc,
        this.maxspeed = maxspeed;
        this.timer;
    }

    draw(){
        canvas.strokeStyle = this.color;
        canvas.lineWidth = 3;
        canvas.beginPath();
        canvas.translate(this.x, this.y);
        canvas.rotate(deg(this.angle));
        canvas.moveTo(+22, -7);
        canvas.lineTo(+14, -15);
        canvas.lineTo(-36, -15);
        canvas.lineTo(-19, -7);
        canvas.lineTo(+30, -7);
        canvas.lineTo(+38, 0);
        canvas.lineTo(+30, +6);
        canvas.lineTo(-19, +6);
        canvas.lineTo(-36, +14);
        canvas.lineTo(+14, +14);
        canvas.lineTo(+22, +6);
        canvas.moveTo(-36, -15);
        canvas.closePath();
        canvas.stroke();
        canvas.rotate(deg(-this.angle));
        canvas.translate(-this.x, -this.y);
    }

    cannon() {
        let {x, y} = trig(this.x, this.y, this.angle, 33)
        return trig(x, y, this.angle, 5);
    }
    
    loop(t){
        if (this.speed < 0){
            this.speed += this.diacc;
        
        } else if (this.speed > 0) {
            this.speed -= this.diacc;
        }
        if (this.speed > this.maxspeed){
            this.speed = this.maxspeed;
        } else if (this.speed < -this.maxspeed){
            this.speed = -this.maxspeed;
        }
        let {x, y} = trig(this.x, this.y, this.angle, this.speed)
        this.x = x;
        this.y = y;
        if (status == "invincible"){
            this.color = "gray"
            this.timer -= t;
            if (this.timer <= 0){
                status = "idle"
            } 
        } else {
        if (this.health > 60 && this.health <= 80){
            this.color = "lime"
            this.prevcolor = "lime"
        } else if (this.health > 40 && this.health <= 60){
            this.prevcolor = "yellow"
            this.color = "yellow"
        } else if (this.health > 20 && this.health <= 40){
            this.color = "orange"
            this.prevcolor = "orange"
        } else if (this.health <= 20) {
            this.color = "red"
            this.prevcolor = "red"
        }
        this.color = this.prevcolor;
        this.timer = 5;
        }
    //console.log(this.timer)
    }
}