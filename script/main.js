class Chunk {
    constructor(x, y) {
        this.x = x
        this.y = y

        //create chunk element
        let chunk = document.createElement("chunk")
        chunk.setAttribute("data-position", y + ' ' + x)

        //[position + gap - offset]
        let translate = [`calc(${100 * x}% + 0.4vmin * ${x} - 50%)`, `calc(${100 * y}% + 0.4vmin * ${y} - 50%)`]
        chunk.style.transform = `translate(${translate[0]}, ${translate[1]})`

        chunk.style.gridTemplateColumns = "auto ".repeat(chunkSize)

        //create chunk map
        let i = 0
        while (i < chunkSize**2) {
            let node = document.createElement("node")
            node.setAttribute("data-index-y", Math.floor(i / chunkSize))
            node.setAttribute("data-index-x", i % chunkSize)
            chunk.append(node)

            i++
        }

        this.element = chunk

        //push chunk into viewer
        let viewer = document.querySelector("viewer")
        viewer.append(chunk)

    }
}
const chunkSize = 8
var chunks = []

function start() {
    chunks[0] = new Chunk(0, 0)
}