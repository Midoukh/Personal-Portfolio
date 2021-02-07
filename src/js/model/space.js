import * as THREE from 'three';


//in order to display anything in three js we need these three things
let scene, camera, renderer, starGeo, star, stars

export function init() {
    console.log(window.location.pathname)

    scene = new THREE.Scene()
    camera = new THREE.PerspectiveCamera(75, window.innerHeight / window.innerWidth, 0.1, 1000)
    camera.position.z = 1
    camera.rotation.x = Math.PI / 2
    renderer = new THREE.WebGLRenderer()


    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement)

    starGeo = new THREE.Geometry()

    for (let i = 0; i < 5000; i++) {

        star = new THREE.Vector3(
            Math.random() * 600 - 300,
            Math.random() * 600 - 300,
            Math.random() * 600 - 300
        );
        starGeo.vertices.push(star)
    }
    let sprite = new THREE.TextureLoader().load('../assets/img/circle.svg')
    let starMaterial = new THREE.PointsMaterial({
        color: 0xaaaaaa,
        size: 0.7,
        map: sprite
    })
    stars = new THREE.Points(starGeo, starMaterial)
    scene.add(stars)

    animate()
}

const animate = () => {
    renderer.render(scene, camera)
    requestAnimationFrame(animate)



}

