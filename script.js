import Ball from "./pongBall.js"
import Paddle from "./pongPaddle.js"

/*creates the pong onjects*/
const pongBall = new Ball(document.getElementById("ball"))
const p1Paddle = new Paddle(document.getElementById("p1-paddle"))
const cpuPaddle = new Paddle(document.getElementById("cpu-paddle"))
const p1ScoreElem = document.getElementById("score-p1")
const cpuScoreElem = document.getElementById("score-cpu")

/*changes hue of paddle and ball by meausuring time in background*/
let lastTime
function update(duration) {
  if (lastTime != null) {
    const delta = duration - lastTime
    pongBall.update(delta, [p1Paddle.rect(), cpuPaddle.rect()])
    cpuPaddle.update(delta, pongBall.y)
    const hue = parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue("--hue")
    )

    document.documentElement.style.setProperty("--hue", hue + delta * 0.01)

    if (isLose()) handleLose()
  }

  lastTime = duration
  window.requestAnimationFrame(update)
}

/*if player misses ball*/
function isLose() {
  const rect = pongBall.rect()
  return rect.right >= window.innerWidth || rect.left <= 0
}

/*awards point to winner*/
function handleLose() {
  const rect = pongBall.rect()
  if (rect.right >= window.innerWidth) {
    p1ScoreElem.textContent = parseInt(p1ScoreElem.textContent) + 1
  } else {
    cpuScoreElem.textContent = parseInt(cpuScoreElem.textContent) + 1
  }
  pongBall.reset()
  cpuPaddle.reset()
}

/*moves player paddle with mouse movement*/
document.addEventListener("mousemove", e => {
  p1Paddle.position = (e.y / window.innerHeight) * 100
})

window.requestAnimationFrame(update)