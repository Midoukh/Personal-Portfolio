import '../style/main.scss'
import { elements } from './view/base'
import Swup from 'swup';
import * as animation from './view/animation'
import * as effects from './view/effects'

const swup = new Swup()


//events
window.addEventListener('load', () => {
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

//icons on click
