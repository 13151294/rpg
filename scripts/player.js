function walk(y, x) {
    player.move(y, x)
    let chunk = player.currentChunk()
    for (let y = 0; y < chunkSize; y++) {
        visibleChunk[y] = chunk.chunkMap[y].slice()
    }
    visibleChunk[player.y][player.x] = 1

    document.getElementById("player-pos").innerHTML = "pos : (" + (player.x - 8) + ", " + -(player.y - 8) + ")"
    document.getElementById("chunk-pos").innerHTML = "chunk pos : (" + player.chunkX + ", " + -player.chunkY + ")"

    display()
}
class Player {
    constructor() {
        this.x = Math.floor((chunkSize - 1) / 2)
        this.y = Math.floor((chunkSize - 1) / 2)
        this.chunkX = 0
        this.chunkY = 0
    }
    move(y, x) {
        this.x = this.x + x
        this.y = this.y + y

        if (this.x < 0 || this.x > chunkSize - 1 || this.y < 0 || this.y > chunkSize - 1) {
            this.moveChunk(this.y, this.x)
        }
    }
    moveChunk(y, x) {
        if (x < 0 || x > chunkSize - 1) {
            this.chunkX = this.chunkX + ((x > chunkSize - 1) ? 1 : -1)
            this.x = (x > chunkSize - 1) ? 0 : chunkSize - 1
        }
        if (y < 0 || y > chunkSize - 1) {
            this.chunkY = this.chunkY + ((y > chunkSize - 1) ? 1 : -1)
            this.y = (y > chunkSize - 1) ? 0 : chunkSize - 1
        }
        console.table([[this.chunkX, this.chunkY], [x, y]])

    }
    currentChunk() {
        for (let i = 0; i < allChunk.length; i++) {
            if (allChunk[i].y == this.chunkY && allChunk[i].x == this.chunkX) {
                return allChunk[i]
            }
        }
        let chunk = new Chunk(this.chunkX, this.chunkY)
        return chunk
    }
}