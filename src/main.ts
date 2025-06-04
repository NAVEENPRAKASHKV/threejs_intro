import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import Stats from 'three/examples/jsm/libs/stats.module.js'
import {GUI} from "dat.gui"

const scene = new THREE.Scene()
// scene.background = new THREE.Color(0x0000ff)
scene.background = new THREE.CubeTextureLoader()
.setPath( 'https://sbcode.net/img/' )
.load( [
      'px.png',
      'nx.png',
      'py.png',
      'ny.png',
      'pz.png',
      'nz.png'
    ] );

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.z = 5

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
})
new OrbitControls(camera,renderer.domElement)
const geometry = new THREE.BoxGeometry()
const material = new THREE.MeshNormalMaterial({ wireframe: true })

const cube = new THREE.Mesh(geometry, material)
scene.add(cube)
const stats = new Stats()
document.body.appendChild(stats.dom);
//gui implemention

const gui = new GUI()
const cubeFolder = gui.addFolder("Cube");
cubeFolder.add(cube.rotation,"x",0,Math.PI*2)
cubeFolder.add(cube.rotation,"y",0,Math.PI*2)
cubeFolder.add(cube.rotation,"z",0,Math.PI*2)

const cameraFolder = gui.addFolder("Camera");
cameraFolder.add(camera.position,"z",0,20);
cameraFolder.add(camera.position,"x",-20,20);
cameraFolder.add(camera.position,"y",-20,20);

function animate() {
  requestAnimationFrame(animate)

  cube.rotation.x += 0.0
  cube.rotation.y += 0.1

  renderer.render(scene, camera)
  stats.update()
}

animate()