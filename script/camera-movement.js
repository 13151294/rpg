/*
this code is gonna make user drag turn in to movement
and it gonna generate infinite chunks and make them disappear after they are not in sight
*/
const mouseSpeed = 1
const viewportMin = (x) => { return Math.min(window.innerHeight, window.innerWidth) / 100 * x }
const chunkWidth = () => { return document.getElementsByTagName("chunk")[0].getBoundingClientRect().width }
let chunkX = 0;
let chunkY = 0;

var isDown = false;
window.addEventListener('mousedown', () => {
    isDown = true;
});

window.addEventListener('mouseup', () => {
    isDown = false;
});

window.addEventListener('mousemove', client => {
    client.preventDefault()
    if (isDown) {
        dragToMove([client.movementX, client.movementY])
    }
});

let lastXY = [0, 0]
window.addEventListener('touchstart', client => {
    lastXY = [client.touches[0].clientX, client.touches[0].clientY]
})
window.addEventListener('touchmove', client => {
    dragToMove([client.touches[0].clientX - lastXY[0], client.touches[0].clientY - lastXY[1]])
    lastXY = [client.touches[0].clientX, client.touches[0].clientY]
})
function dragToMove (clientMovement) {
    let viewer = document.querySelector("viewer")

    //drag to move
    var x = parseInt(viewer.style.left, 10) + clientMovement[0] * mouseSpeed;
    var y = parseInt(viewer.style.top, 10) + clientMovement[1] * mouseSpeed;

    viewer.style.left = x + 'px'
    viewer.style.top = y + 'px'

    //get the center chunk position
    for (chunkX = Math.floor((x - (chunkWidth() / 2)) / chunkWidth() * -1); chunkX > 0; chunkX--) {
        let calc = (chunkX * chunkWidth()) + (chunkX * viewportMin(0.4))
        if (calc > 0) {
            break
        } else if (calc - viewportMin(0.4) > 0) {
            break
        }
    }

    for (chunkY = Math.floor((y - (chunkWidth() / 2)) / chunkWidth() * -1); chunkY > 0; chunkY--) {
        let calc = (chunkY * chunkWidth()) + (chunkY * viewportMin(0.4))
        if (calc > 0) {
            break
        } else if (calc - viewportMin(0.4) > 0) {
            break
        }
    }

    //create new chunk if there is non chunk at and around that chunk coordinate
    for (let x = -1; x <= 1; x++) {
        for (let y = -1; y <= 1; y++) {
            let chunk = chunks.find(element => element.x == chunkX + x && element.y == chunkY + y)
            if (chunk == undefined) {
                chunks.push(new Chunk(chunkX + x, chunkY + y))
            }
        }
    }
}