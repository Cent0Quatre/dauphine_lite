import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { scrollTimeline, coefLook } from "./timeline";

gsap.registerPlugin(ScrollTrigger);

// Variables de base pour créer une scène 3D
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight);
camera.position.z = 10;
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
const loader = new GLTFLoader();

let modelD;
let batiment;

loader.load('models/d_3d_lite.glb', 
    function(glb) {
        modelD = glb.scene;
        modelD.scale.set(0.5, 0.5, 0.5);
        modelD.position.set(-1, 0, 12);
        scene.add(modelD);

        // chargé en tant qu'enfant ralié à modelD
        loader.load('models/batiment.glb', 
            function(glb) {
                batiment = glb.scene;
                batiment.scale.set(0.75, 0.75, 0.75);
                batiment.rotation.set(-Math.PI/2, Math.PI, 0);
                batiment.position.set(-1, -0.1, -1.5);
                modelD.add(batiment);
            },
            function(xhr) {
                console.log("Batiment: " + (xhr.loaded / xhr.total * 100) + '% loaded');
            },
            function(error) {
                console.error('Erreur de chargement', error);
            }
        );

        scrollTimeline(modelD, camera);
    },
    function(xhr) {
        console.log("D: " + (xhr.loaded / xhr.total * 100) + '% loaded');
    },
    function(error) {
        console.error('D: Erreur de chargement', error);
    }
);

const ambientLight = new THREE.AmbientLight("#ffffff", 0.5);
scene.add(ambientLight);
// Fonction pour ajouter des lumières
function addLight(color, intensity, position) {
    const light = new THREE.PointLight(color, intensity);
    light.position.set(...position);
    scene.add(light);
}
addLight("#ffffff", 50, [0, 2, 10]);

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

    if (modelD) {
        const time = Date.now() * 0.001; // Temps en secondes
        modelD.position.y = Math.sin(time * 2) * 0.1; // Amplitude de 0.1

        if (coefLook.valeur) {
            modelD.lookAt(
                3.5 * mouseX * coefLook.valeur, 
                -mouseY * coefLook.valeur, 
                7.5
            );
        }
    }

    rendu.render(scene, camera);
};

animate();
