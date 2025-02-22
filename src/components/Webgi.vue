<template>
  <div ref="sceneContainer" class="scene-container"></div>
</template>

<script>
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import myModel from '../assets/3dmodells/Splash-gold.glb';

gsap.registerPlugin(ScrollTrigger);

export default {
  mounted() {
    this.initScene();
  },
  methods: {
    initScene() {
      const container = this.$refs.sceneContainer;

      this.scene = new THREE.Scene();
      this.scene.background = new THREE.Color(0xd69393);

      this.camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
      this.camera.position.set(0, 1, 5); // Posición inicial

      this.renderer = new THREE.WebGLRenderer({ antialias: true });
      this.renderer.setSize(container.clientWidth, container.clientHeight);
      this.renderer.outputEncoding = THREE.sRGBEncoding;
      this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
      this.renderer.toneMappingExposure = 2.5;
      this.renderer.shadowMap.enabled = false;
      container.appendChild(this.renderer.domElement);

      const ambientLight = new THREE.AmbientLight(0xffffff, 5);
      this.scene.add(ambientLight);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 10);
      directionalLight.position.set(5, 5, 5);
      this.scene.add(directionalLight);

      const loader = new GLTFLoader();
      loader.load(myModel, (gltf) => {
        this.model = gltf.scene;
        this.scene.add(this.model);
        this.setupScrollTrigger(); // Activamos el scroll después de cargar el modelo
      });

      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
      this.controls.enableDamping = true;

      this.animate();
    },

    animate() {
      requestAnimationFrame(this.animate);
      this.controls.update();
      this.renderer.render(this.scene, this.camera);
    },

    setupScrollTrigger() {
      gsap.timeline({
        scrollTrigger: {
          trigger: this.$refs.sceneContainer,
          start: "top top",
          end: "bottom top",
          scrub: 1
        }
      })
      .to(this.camera.position, { x: 1, y: 2, z: 3 })  // Mover a la derecha y arriba
      .to(this.camera.position, { x: 0, y: 1, z: 5 }) // Mover a la izquierda
      .to(this.camera.position, { x: 0, y: 3, z: 20 })  // Subir y alejarse
      .to(this.camera.rotation, { x: Math.PI / 50, y: Math.PI / -20 }); // Girar la cámara suavemente
    },
  },
};
</script>

<style>
.scene-container {
  width: 100%;
  height: 300vh; /* Asegura scroll largo para probar */
  overflow: hidden;
  margin-top: 10rem;
}
</style>
