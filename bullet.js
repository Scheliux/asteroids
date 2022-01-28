class Bullet {
    constructor(x, y, vx, vy, color) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.color = color;
    }

    draw() {
        canvas.fillStyle = this.color;
        canvas.beginPath();
        canvas.rect(this.x-2, this.y-2, 3, 3);
        canvas.closePath();
        canvas.fill();
    }

    loop() {
        this.x += this.vx;
        this.y += this.vy;
    }
}