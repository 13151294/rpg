var visibleChunk = 0
var allChunk = []
var player = 0

function start() {
    //create screen
    let screen = document.getElementById("screen")
    for (let i = 0; i < 81; i++) {
        let block = document.createElement("div")
        block.classList.add("blocks")

        block.id = "block(" + i % 9 + "," + Math.floor(i / 9) + ")"

        screen.appendChild(block)
    }

    //create visible chunk
    let chunk = new Chunk(0, 0)
    allChunk.push(chunk)
    visibleChunk = chunk.chunkMap

    //create player
    player = new Player()
    
    visibleChunk[player.y][player.x] = 1

    console.table(visibleChunk)

    display()
}
function display() {
    let numtoclass = {
        0 : "grass",
        1 : "player"
    }
    for (let y = 0; y < 9; y++) {
        for (let x = 0; x < 9; x++) {
            let id = "block(" + x + "," + y + ")"
            document.getElementById(id).classList.add(numtoclass[visibleChunk[y][x]])   
        }
    }
}

class Chunk {
    constructor(x, y) {
        this.chunkMap = []
        for (let y = 0; y < 9; y++) {
            this.chunkMap.push([0, 0, 0, 0, 0, 0, 0, 0, 0])
        }
        this.x = x
        this.y = y
    }
}
