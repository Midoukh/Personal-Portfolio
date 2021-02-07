const mouseCoords = {
    x: 0,
    y: 0
}
const cursor = document.querySelector('.cursor')

const moveWithMouse = (e, cursor) => {
    let newXpos = e.clientX
    let newYpos = e.clientY
    mouseCoords.x = newXpos
    mouseCoords.y = newYpos



    cursor.style.top = mouseCoords.y + 'px'
    cursor.style.left = mouseCoords.x + 'px'

    cursor.style.border = `solid 2px rgb(${mouseCoords.x - 1}, ${mouseCoords.x - 10}, ${mouseCoords.x - 100})`

}


document.addEventListener('mousemove', (e) => {

    moveWithMouse(e, cursor)

})

