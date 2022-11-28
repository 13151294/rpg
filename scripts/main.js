var chunkSize = 17;
var visibleChunk = []
var allChunk = []
var player = 0

function start() {
    //create screen
    let screen = document.getElementById("screen")
    for (let i = 0; i < chunkSize * chunkSize; i++) {
        let block = document.createElement("div")
        block.className = "blocks"

        block.id = "block(" + Math.floor(i / chunkSize) + "," + i % chunkSize + ")"

        screen.appendChild(block)
    }

    //change style for chunksize
    document.getElementById("screen").style.gridTemplateColumns = "auto ".repeat(chunkSize)
    document.documentElement.style.setProperty("--chunkNum", "" + chunkSize + "")
    //create visible chunk
    let chunk = new Chunk(0, 0)
    allChunk.push(chunk)
    for (let y = 0; y < chunkSize; y++) {
        visibleChunk.push(chunk.chunkMap[y].slice())
    }

    //create player
    player = new Player()
    
    console.log(visibleChunk)
    visibleChunk[player.y][player.x] = 1

    console.table(visibleChunk)

    display()

    //keyboard input
    window.addEventListener("keydown", (key) => {keydown(key)})
}
function keydown(key) {
    switch (key.key) {
        case 'w':
            walk(-1, 0)
            break
        case 's':
            walk(1, 0)
            break
        case 'a':
            walk(0, -1)
            break
        case 'd':
            walk(0, 1)
            break
        default:
            console.log(key)
            break
    }
}
function display() {
    let numtoclass = {
        0 : "grass",
        1 : "player"
    }
    for (let y = chunkSize - 1; y > -1; y--) {
        for (let x = chunkSize - 1; x > -1; x--) {
            let id = "block(" + y + "," + x + ")"
            let block = document.getElementById(id)
            block.className = "blocks"
            block.classList.add(numtoclass[visibleChunk[y][x]])   
        }
    }
}

class Chunk {
    constructor(x, y) {
        this.chunkMap = []
        for (let y = 0; y < chunkSize; y++) {
            this.chunkMap.push([])
            for (let x = 0; x < chunkSize; x++) {
                this.chunkMap[y].push(0)
            }
        }
        this.x = x
        this.y = y
    }
}
