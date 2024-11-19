import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { animClones } from "./anim_clones";
import { scrollAnimCam } from "./tl_cam";

// Variables de base pour créer une scène 3D
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight);
camera.position.z = 15;
const rendu = new THREE.WebGLRenderer({
    canvas: document.querySelector("#canva_html"), 
    alpha: true 
});

// Redimensionnement automatique de la scène pour s'adapter à toute la page
rendu.setPixelRatio(window.devicePixelRatio);
rendu.setSize(window.innerWidth, window.innerHeight);
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    rendu.setSize(window.innerWidth, window.innerHeight);
});

// Charger les modèles .glb
const dClones = []; // Tableau pour stocker les clones

const loader = new GLTFLoader();
loader.load('models/d_3d_lite.glb', 
    function(glb) {
        const modelD = glb.scene;
        modelD.scale.set(0.25, 0.25, 0.25);

        const spacing = 2.5;
        // des clones tout le long de l'écran
        for (let i = 0; i < 12; i++) {
            // Clone à droite
            const cloneRight = modelD.clone();
            cloneRight.position.set(i*spacing-15, 0, 0);
            scene.add(cloneRight);
            dClones.push(cloneRight);
        }

        animClones(dClones);
    },
    function(xhr) {
        console.log("D: " + (xhr.loaded / xhr.total * 100) + '% loaded');
    },
    function(error) {
        console.error('D: Erreur de chargement', error);
    }
);

/////////////////////////////////////////////////////////////////////////////////

const ambientLight = new THREE.AmbientLight("#ffffff", 0.5);
scene.add(ambientLight);
// Fonction pour ajouter des lumières
function addLight(color, intensity, position) {
    const light = new THREE.PointLight(color, intensity);
    light.position.set(...position);
    scene.add(light);
}
addLight("#ffffff", 50, [0, 0, 6]);

//////////////////////////////////////////////////////////////////////////////////

let mouseX = 0;
let mouseY = 0;
document.addEventListener('mousemove', (event) => {
  // Normaliser les coordonnées X et Y entre -1 et 1
  mouseX = (event.clientX / window.innerWidth) * 2 - 1;
  mouseY = (event.clientY / window.innerHeight) * 2 - 1;
});

// Fonction d'animation
function animate() {
    requestAnimationFrame(animate);

    rendu.render(scene, camera);
};

scrollAnimCam(camera);
animate();
