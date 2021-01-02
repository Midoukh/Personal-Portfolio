import { elements } from './base'
// 1*** preloader
//with each page load the preloader appear for a period of time and then disapper
const coords = {
    angle: 0,
    lastTime: null,
    orbitCoords: elements.outerOrbit.getClientRects(),
    planet: elements.planet
}

export function movePlanet(time = 10) {
    const orbitHeigth = coords.orbitCoords[0].height / 2.6
    const orbitWidth = coords.orbitCoords[0].width / 2.6


    if (coords.lastTime !== null) {
        coords.angle += (time - coords.lastTime) / 100;
    }

    coords.lastTime = time
    coords.planet.style.top = (Math.sin(coords.angle) * orbitHeigth) + 'px';
    coords.planet.style.left = (Math.cos(coords.angle) * orbitWidth) + 'px';
    requestAnimationFrame(movePlanet)
}

export function showContent() {
    elements.welcomePage.classList.add('welcome')
    hideLoader()
    hideContactCard()
}

function hideLoader() {
    elements.preloader.classList.add('hide-loader')
}
function hideContactCard() {
    elements.contactCard.classList.add('hide-social-card')
}

export function slideSocialMedia() {
    const right = ` <i class="fas fa-chevron-circle-right"></i> `
    const contactCard = elements.contactCard;

    const darkBackground = document.createElement('div');
    darkBackground.className = 'darkBackground';

    document.body.appendChild(darkBackground)

    if (elements.slidedDirection === 'left' && elements.slided === false) {
        contactCard.classList.add('slide-social-card')
        elements.slidedDirection = 'right'
        elements.slided = true

        setTimeout(() => {
            //changing the chevron from left to right
            elements.contactButton.innerHTML = '';
            elements.contactButton.classList.add('rotate-chev')
            elements.contactButton.innerHTML = right;
        }, 700)

        setTimeout(() => {
            elements.contactButton.classList.add('switch-btn-direction')

        }, 1000)
    }
}

export function slideBack() {
    const left = ` <i class="fas fa-chevron-circle-left"></i> `;
    const contactCard = elements.contactCard;
    const darkBackground = document.querySelector('.darkBackground')

    if (elements.slidedDirection === 'right' && elements.slided) {
        elements.slided = false
        contactCard.classList.remove('slide-social-card')
        elements.slidedDirection = 'left'
        setTimeout(() => {
            // delete darkBackground;
            document.querySelectorAll('body > *').forEach(el => {
                if (el.classList.contains('darkBackground')) {
                    el.remove()
                }
            })
            elements.contactButton.classList.remove('switch-btn-direction')
            elements.contactButton.innerHTML = '';
            elements.contactButton.innerHTML = left;
        }, 150)

    }
}

export function backgroundDuplicateCompns() {
    const animatedBackground = elements.animatedBgContainer
    const animatedBg = elements.animatedBg
    const arr = Array.from(animatedBg)

    let newElements = arr.map(comp => {
        const clone = comp.cloneNode(true)
        clone.className = comp.className

        return clone
    })
    newElements.forEach(comp => animatedBackground.append(comp))

    //randomly reposition the componants
    newElements = newElements.concat(arr)
    elements.animatedComponants = newElements;

    return newElements


}
//random positioning function

export function randomPosition() {

    elements.animatedBgContainer.classList.add('show-comps-anim')
    //the container coordinates
    const componants = elements.animatedComponants

    const coords = elements.infosContainer.getClientRects()[0]
    const height = coords.height;
    const width = coords.width;

    componants.forEach(comp => {
        let randHeight = Math.ceil(Math.random() * height);
        let randWidth = Math.ceil(Math.random() * width);


        comp.style.top = randHeight + 'px';
        comp.style.left = randWidth + 'px';

    })

}
export function moveComponants() {
    //pushing them from the left each 100ms
    elements.animatedComponants.forEach(comp => {
        comp.style.transform += 'translateX(1px)'
    })
}

export function grabComponants(e) {
    let comp = e.target
    let mouseCoords = {
        x: e.pageX,
        y: e.pageY
    }
    elements.mouse.start.x = mouseCoords.x
    elements.mouse.start.y = mouseCoords.y

    //the logic here is to store the coordiates of the initial click x and y
    //and then where at x and y the mouse stopped moving

    if (comp.classList.contains('fab')) {
        comp.classList.add('lighten-comps')
        console.log(comp)
        elements.mouse.componantClicked = comp
    }
}

//TODO
//fix the draging feature
//implement the slide contacts button

export function dragComponants(e) {
    let comp = elements.mouse.componantClicked;

    let eventCoords = {
        x: e.pageX,
        y: e.pageY
    }

    if (comp) {
        comp.style.top = eventCoords.y + 'px';
        comp.style.left = eventCoords.x + 'px';
    }
}

export function burgerMenu(e) {
    let burgerBtn;
    const navbar = document.querySelector('#phone-nv');
    navbar.classList.remove('hide-mobile-menu')

    if (e.target.classList.contains('burger')) {
        burgerBtn = e.target
    }
    else {
        return;
    }
    Array.from(burgerBtn.children).forEach(el => {
        if (el.classList.contains('up')) {
            el.classList.add('collapsed-burger-up')
            elements.exit = true
        }
        else if (el.classList.contains('down')) {
            el.classList.add('collapsed-burger-down')
        }
        else if (el.classList.contains('middle')) {
            el.classList.add('collapsed-burger-middle')
        }
    })
    setTimeout(() => {
        shownMobileMenu(navbar)
    }, 400)

}




function shownMobileMenu(menu) {
    if (window.innerWidth <= 700) {
        menu.style.display = 'flex';
    }
    //burry slide button
    elements.contactCard.classList.add('burry-contact-btn')
}

function hideMobileMenu(menu) {
    if (window.innerWidth > 700) {
        menu.style.display = 'none';
    }
    elements.contactCard.classList.remove('burry-contact-btn')

}

function resetBurgerMenu(menu) {
    //in case of windwo resizing
    if (window.innerWidth > 700) {
        menu.forEach(line => {
            line.classList.add('reset-burger')
        })
    }
}

function burgerExitButtonOnClick() {

    if (elements.exit) {
        document.querySelectorAll('.burger div').forEach(el => {
            if (el.className.includes('up')) {
                el.classList.remove('collapsed-burger-up')
                //hide the mobile menu when clicking on exit but only after the burger return
                //to its original shape
                setTimeout(() => {
                    hideMobileMenuOnClick()
                }, 5)
                elements.exit = false;
            }
            else if (el.className.includes('middle')) {
                el.classList.remove('collapsed-burger-middle')

            }
            else if (el.className.includes('down')) {
                el.classList.remove('collapsed-burger-down')
            }
        })

    }
    elements.contactCard.classList.remove('burry-contact-btn')
}

function hideMobileMenuOnClick() {
    document.querySelector('#phone-nv').classList.add('hide-mobile-menu');
}

function addTitleToMenuOnHover(element) {
    const cla = element.className
    // switch()
    console.log(element)

}

window.addEventListener('resize', () => {
    hideMobileMenu(document.getElementById('phone-nv'))
    resetBurgerMenu(document.querySelectorAll('.burger div'))
})
document.querySelector('.burger').addEventListener('click', burgerExitButtonOnClick)

