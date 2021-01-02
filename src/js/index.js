import '../style/main.scss'
import { elements } from './view/base'
// import { movePlanet, showContent, slideSocialMedia, backgroundDuplicateCompns, randomPosition, moveComponants, grabComponants, dragComponants, slideBack, burgerMenu, addTitleToMenuOnHover } from './view/animation'
import * as animation from './view/animation'





//events
window.addEventListener('load', () => {
    // placePanet()
    setTimeout(() => {
        animation.backgroundDuplicateCompns()
        animation.showContent()
        animation.randomPosition()
    }, 4000)

    setTimeout(() => {
        requestAnimationFrame(animation.movePlanet)

    }, 100)
    setInterval(animation.moveComponants, 1000)

})
elements.slideButton.addEventListener('click', () => {
    setTimeout(() => {
        if (elements.slided === false) {
            animation.slideSocialMedia()
        }
        else if (elements.slided) {
            animation.slideBack()
        }

    }, 120)
})

elements.infosContainer.addEventListener('mousedown', (e) => {
    elements.mouse.isClicked = true

    animation.grabComponants(e)
})
elements.infosContainer.addEventListener('mouseup', () => {
    elements.mouse.isClicked = false;
    if (elements.mouse.isClicked === false) {
        elements.mouse.componantClicked = null;
    }

})


elements.infosContainer.addEventListener('mousemove', (e) => {
    if (elements.mouse.isClicked) {
        animation.dragComponants(e)
    }
})

//burger menu
elements.header.addEventListener('click', animation.burgerMenu)
