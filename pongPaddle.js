/*sets inital speed */
const INITIAL_SPEED = 0.02

/*creates a paddle element*/
export default class Paddle {
    constructor(pongPaddleElem) {
        this.pongPaddleElem = pongPaddleElem
        this.reset()
    }

    /*gets the position of the paddles*/
    get position() {
        return parseFloat(
            getComputedStyle(this.pongPaddleElem).getPropertyValue("--position")
        )
    }
    /*sets the position of the paddles*/
    set position(value) {
        this.pongPaddleElem.style.setProperty("--position", value)
    }

    rect() {
        return this.pongPaddleElem.getBoundingClientRect()
    }
    /*resets the position of the paddles*/
    reset() {
        this.position = 50
    }

    /*updates speed of paddle movement*/
    update(delta, heightOfBall) {
        this.position += INITIAL_SPEED * delta * (heightOfBall - this.position)
    }
}