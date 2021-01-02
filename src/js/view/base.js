export const elements = {
    planet: document.querySelector('[data-name="planet"]'),
    outerOrbit: document.querySelector('.outer-atom'),
    welcomePage: document.querySelector('.welcome-page'),
    preloader: document.querySelector('.loader'),
    slideButton: document.querySelector('.contact__button'),
    contactCard: document.querySelector('.contact'),
    animatedBgContainer: document.querySelector('.animated-bg'),
    animatedBg: document.querySelectorAll('.animated-bg > *'),
    infosContainer: document.querySelector('.infos'),
    contactButton: document.querySelector('.contact__button'),
    header: document.querySelector('.header'),
    exit: false,
    mouse: {
        isClicked: false,
        start: {
            x: 0,
            y: 0
        },
        end: {
            x: 0,
            y: 0
        },
        componantClicked: null
    },
    slided: false,
    slidedDirection: 'left'
}