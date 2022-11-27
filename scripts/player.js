function walk(y, x) {
    player.move(y, x)
    let chunk = player.currentChunk()
    for (let y = 0; y < 9; y++) {
        visibleChunk[y] = chunk.chunkMap[y].slice()
    }
    visibleChunk[player.y][player.x] = 1

    document.getElementById("player-pos").innerHTML = "pos : (" + player.x + ", " + player.y + ")"
    document.getElementById("chunk-pos").innerHTML = "chunk pos : (" + player.chunkX + ", " + player.chunkY + ")"

    display()
}
class Player {
    constructor() {
        this.x = 4
        this.y = 4
        this.chunkX = 0
        this.chunkY = 0
    }
    move(y, x) {
        this.x = this.x + x
        this.y = this.y + y

        if (this.x < 0 || this.x > 8 || this.y < 0 || this.y > 8) {
            this.moveChunk(this.y, this.x)
        }
    }
    moveChunk(y, x) {
        if (x < 0 || x > 8) {
            this.chunkX = this.chunkX + ((x > 8) ? 1 : -1)
            this.x = (x > 8) ? 0 : 8
        } else {
            this.chunkY = this.chunkY + ((y > 8) ? 1 : -1)
            this.y = (y > 8) ? 0 : 8
        }
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