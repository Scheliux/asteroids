class Asteroid {
    constructor(x, y, size, angle, direction) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.angle = angle;
        this.direction = direction;
    }

    draw() {
        canvas.strokeStyle = "white";
        canvas.lineWidth = 2;
        canvas.beginPath();
        canvas.translate(this.x, this.y);
        canvas.rotate(deg(this.angle));
        canvas.moveTo(0 * this.size, -10 * this.size);
        canvas.lineTo(-10 * this.size, -3 * this.size);
        canvas.lineTo(-6 * this.size, 8 * this.size);
        canvas.lineTo(6 * this.size, 8 * this.size);
        canvas.lineTo(+10 * this.size, -3 * this.size);
        canvas.closePath();
        canvas.rotate(deg(-this.angle));
        canvas.translate(-this.x, -this.y);
        canvas.stroke();
    }
}