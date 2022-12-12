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
        let nodeX = 0
        let nodeY = 0

        this.chunkMap = []
        while (nodeY < chunkSize) {
            let node = document.createElement("node")
            node.setAttribute("data-pos", nodeX + ' ' + nodeY)

            node.addEventListener('click', () => {
                let localX = parseInt(node.getAttribute('data-pos').split('')[0])
                let localY = parseInt(node.getAttribute('data-pos').split('')[2])

                this.onNodeClicked(localX, localY)
            })

            chunk.append(node)

            nodeX++
            if (nodeX >= chunkSize) {
                nodeX = 0
                nodeY++
            }
        }

        this.element = chunk

        //push chunk into viewer
        let viewer = document.querySelector("viewer")
        viewer.append(chunk)
    }
    onNodeClicked (x, y) {
        if (!isLocked) {return}
    }
}
const chunkSize = 8
var chunks = []

function start() {
    for (let x = -1; x <= 1; x++) {
        for (let y = -1; y <= 1; y++) {
            chunks.push(new Chunk(x, y))
        }
    }

    draw()
}