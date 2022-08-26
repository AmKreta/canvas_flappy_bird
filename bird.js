import Vector from './vector.js';
import Sprite from './sprite.js';

class Bird extends Sprite {
    constructor({ ctx }) {
        super();
        this.ctx = ctx;
        this.position = new Vector(100);
        this.acceleration = new Vector();
        this.radius = 30;
        this.accelerate = 25;
        this.steps = 0;
        this.quack_audio=new Audio('./quack_bgm.mp3');
    }

    quack(){
        this.quack_audio.play();
    }

    render() {
        //this.ctx.clearRect(this.position.x - this.radius, this.position.y - this.radius, 2 * this.radius + 1, 2 * this.radius + 1);
        this.ctx.beginPath();
        this.ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
        this.ctx.closePath();
        this.ctx.stroke();
        this.ctx.fillStyle = '#fff'
        this.ctx.fill();
    }

    update({ gravity }) {
        // moving verticlly
        if (this.acceleration.y >= 0) {
            this.position.y += (gravity.y - this.acceleration.y);
            if (this.acceleration.y > this.accelerate / 2)
                this.acceleration.y -= 1;
            else this.acceleration.y -= .5;
        }
        else this.position.y += gravity.y;
        // moving horizontally
        if (this.steps) {
            this.position.x += this.steps;
            if (this.steps > 0) this.steps -= .1;
            else this.steps += .1;
        }
    }

    jump() {
        this.acceleration.y = this.accelerate;
        this.quack();
    }

    moveHorizontally(dx) {
        this.steps = this.radius / 10 * dx;
    }

    getTopPoint() {
        return this.position.y - this.radius;
    }

    getRightPoint() {
        return this.position.x + this.radius;
    }

    getBottomPoint() {
        return this.position.y + this.radius;
    }

    getLeftPoint() {
        return this.position.x - this.radius;
    }

}

export default Bird;