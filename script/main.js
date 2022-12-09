const viewerSize = 15

const start = () => {
    //create viewer member
    let viewer = document.getElementById("viewer")
    for (let i = 0; i < viewerSize ** 2; i++) {
        let block = document.createElement("div")
        block.classList.add("block")
        viewer.append(block)
    }
}