var chunkSize = 17;
var visibleChunk = []
var allChunk = []
var player = 0

var TextureCodeList = (condition) => {
    let arr = []
    if (condition[0]) {Array.prototype.push.apply(arr, Object.keys(ResourceData[9]))}
    if (condition[1]) {Array.prototype.push.apply(arr, Object.keys(ResourceData[1]))}
    if (condition[2]) {Array.prototype.push.apply(arr, Object.keys(ResourceData[2]))}

    return arr
}
var TextureCodeDict = {
    100 : "grass",
    200 : "stone",
    201 : "tree",
    900 : "player"
}
//Resource Block
var ResourceData = {
    //Biome
    1 : {
        100 : {
            "block" : "grass",
            "resource rate" : {
                200 : 5,
                201 : 10
            }
        }
    },
    //Resource Block
    2 : {
        200 : "stone",
        201 : "tree"
    },
    //Entity
    9 : {
        900 : "player"
    },
}

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
    let chunk = new Chunk(0, 0, 100)
    allChunk.push(chunk)
    for (let y = 0; y < chunkSize; y++) {
        visibleChunk.push(chunk.chunkMap[y].slice())
    }

    //create player
    player = new Player()
    
    console.log(visibleChunk)
    visibleChunk[player.y][player.x] = 900

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
    for (let y = chunkSize - 1; y > -1; y--) {
        for (let x = chunkSize - 1; x > -1; x--) {
            let id = "block(" + y + "," + x + ")"
            let block = document.getElementById(id)
            block.className = "blocks"

            console.table(TextureCodeDict)

            block.classList.add(TextureCodeDict[visibleChunk[y][x]])   
        }
    }
}

class Chunk {
    constructor(x, y, biome) {
        this.chunkMap = []
        for (let y = 0; y < chunkSize; y++) {
            this.chunkMap.push([])
            for (let x = 0; x < chunkSize; x++) {
                this.chunkMap[y].push(biome)
            }
        }
        this.x = x
        this.y = y
        this.biome = biome
        this.biomeData = ResourceData[1][biome]
        this.createEnvironment()
    }
    createEnvironment() {
        let blockChance = []
        let left = 100
        Object.entries(this.biomeData["resource rate"]).forEach(([key, value]) => {
            for (let i = 0; i < value; i++) {
                blockChance.push(key)
            }
            left = left - value
        });
        left = Math.max(0, left)
        for (let i = 0; i < left; i++) {
            blockChance.push(this.biome)
        }

        blockChance
        for (let y = 1; y < chunkSize - 1; y++) {
            for (let x = 1; x < chunkSize - 1; x++) {
                let rannum = Math.floor(Math.random() * 100)
                let block = blockChance[rannum]

                console.log([block, rannum])
                this.chunkMap[y][x] = parseInt(block)
            }
        }
    }
}
