function equation(x) {

    let frequency = 20
    let amplitude = 10
    let y = 0
    y += Math.sin(x / frequency) * amplitude
    y += Math.sin(x / frequency * 0.5) * amplitude
    y += Math.sin(x / frequency * 0.7) * amplitude
    y += Math.sin(x / frequency * 0.25) * amplitude * 2
    y -= Math.sin(x / frequency * 10) * amplitude * 0.05
 
    return y
}
function draw() {
    let canvas = document.querySelector("canvas")
    let ctx = canvas.getContext("2d")

    ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue("--bg-color")
    ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue("--node-color")
    ctx.lineWidth = '5px'

    let xOffset = 0
    ctx.moveTo(0, 175 - equation(xOffset))
    for (let x = xOffset; x < 350 + xOffset; x++) {
        ctx.lineTo(x - xOffset, 175 - equation(x))
    }
    ctx.stroke()
}