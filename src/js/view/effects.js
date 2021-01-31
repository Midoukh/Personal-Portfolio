import { elements } from './base'


export function styleMenuIcons(icons) {
    const menuIcons = icons
    menuIcons.forEach(icon => {
        icon.addEventListener('click', () => {
            icon.classList.toggle('icon-clicked')
            console.log('clicked')
        })
    })


}

