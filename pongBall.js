const VELOCITY_INITIAL = .015
const INCREASE_VELOCITY = .000005

/*Creates a ball element*/
export default class Ball {
    constructor(pongBallElem) {
        this.pongBallElem = pongBallElem
        this.reset()
    }

    /*gets x coordinates of the ball*/
    get x() {
        return parseFloat(getComputedStyle(this.pongBallElem).getPropertyValue("--x"))
    }
    /*sets x coordinates of the ball*/
    set x(value) {
        this.pongBallElem.style.setProperty("--x", value)
    }
    /*gets y coordinates of the ball*/
    get y() {
        return parseFloat(getComputedStyle(this.pongBallElem).getPropertyValue("--y"))
    }
    /*sets y coordinates of the ball*/
    set y(value) {
        this.pongBallElem.style.setProperty("--y", value)
    }
    
    rect() {
        return this.pongBallElem.getBoundingClientRect()
    }
    /*resets ball position to center of screen*/
    reset() {
        this.x = 50
        this.y = 50
        this.direction = { x: 0 }
        while (
            Math.abs(this.direction.x) <= 0.2 ||
            Math.abs(this.direction.x) >= 0.9
        ) {
            const heading = randNumBet(0, 2 * Math.PI)
            this.direction = { x: Math.cos(heading), y: Math.sin(heading) }
        }
        this.velocity = VELOCITY_INITIAL
    }

    /*slowly increases speed of ball as it touches paddle*/
    update(delta, pongPaddleRects) {
        this.x += this.direction.x * this.velocity * delta
        this.y += this.direction.y * this.velocity * delta
        this.velocity += INCREASE_VELOCITY * delta
        const rect = this.rect()

        /*if ball touches bottom or top of screen it will bounce*/
        if (rect.bottom >= window.innerHeight || rect.top <= 0) {
            this.direction.y *= -1
        }
        /*if ball touches left or right of screen it will award point to player or cpu*/
        if (pongPaddleRects.some(r => collides(r, rect))) {
            this.direction.x *= -1
        }
    }
}
/*randomizes direction of ball after reset*/
function randNumBet(min, max) {
    return Math.random() * (max - min) + min
}
/*checks for collisions*/
function collides(rectNum1, rectNum2) {
    return (
        rectNum1.left <= rectNum2.right &&
        rectNum1.right >= rectNum2.left &&
        rectNum1.top <= rectNum2.bottom &&
        rectNum1.bottom >= rectNum2.top
    )
}