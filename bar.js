import { getRandomNumberBetween } from "./util.js";
import Sprite from "./sprite.js";

class Dimensions {
    constructor(top, left, height, width) {
        this.left = left;
        this.top = top;
        this.height = height;
        this.width = width;
    }
}

class Bars extends Sprite {
    constructor({ ctx, canvas, birdRadius }) {
        super();
        this.ctx = ctx;
        this.dx = 5;
        this.width = 20;
        this.destroyed = false;
        this.gap = getRandomNumberBetween(birdRadius * 5, birdRadius * 9);
        let topBarheight = getRandomNumberBetween(20, canvas.height - 20 - this.gap);
        this.topBarDimensions = new Dimensions(0, canvas.width, topBarheight, this.width);
        let bottomBarTop = topBarheight + this.gap;
        let bottomBarHeight = canvas.height - bottomBarTop;
        this.bottomBarDimensions = new Dimensions(bottomBarTop, canvas.width, bottomBarHeight, this.width);
    }

    render() {
        this.ctx.beginPath();
        this.ctx.rect(
            this.topBarDimensions.left,
            this.topBarDimensions.top,
            this.topBarDimensions.width,
            this.topBarDimensions.height
        );
        this.ctx.rect(
            this.bottomBarDimensions.left,
            this.bottomBarDimensions.top,
            this.bottomBarDimensions.width,
            this.bottomBarDimensions.height
        );
        this.ctx.stroke();
        this.ctx.fillStyle = '#fff'
        this.ctx.fill();
    }

    checkHorizontalOverlapping(objRightPoint, objLeftPoint) {
        return this.topBarDimensions.left - this.width >= objLeftPoint 
            && this.topBarDimensions.left <= objRightPoint;
    }

    checkCollisionWithTopBar(objTopPoint, objRightPoint, objLeftPoint) {
        if (objTopPoint <= this.topBarDimensions.height)
            return this.checkHorizontalOverlapping(objRightPoint, objLeftPoint);
        return 0;
    }

    checkCollisionWithBottomBar(objBottomPoint, objRightPoint, objLeftPoint) {
        if (objBottomPoint >= this.bottomBarDimensions.top)
            return this.checkHorizontalOverlapping(objRightPoint, objLeftPoint);
        return false;
    }

    update({ checkCollisionWith }) {
        this.topBarDimensions.left -= this.dx;
        this.bottomBarDimensions.left -= this.dx;
        if (this.topBarDimensions.left < -this.width)
            this.destroyed = true;
        let objTopPoint = checkCollisionWith.getTopPoint();
        let objBottomPoint = checkCollisionWith.getBottomPoint();
        let objLeftPoint = checkCollisionWith.getLeftPoint();
        let objRightPoint = checkCollisionWith.getRightPoint();
        return this.checkCollisionWithTopBar(objTopPoint, objRightPoint, objLeftPoint)
            || this.checkCollisionWithBottomBar(objBottomPoint, objRightPoint, objLeftPoint);
    }
}

export default Bars;