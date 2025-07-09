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
          scrub: 1,
        },
      })
        // Primera posición de la cámara (inicial)
        .to(this.camera.position, {
          x: -2.25542,
          y: 0.041308,
          z: 0.565418,
          duration: 1,
        })
        .to(this.camera.quaternion, {
          _x: -0.007,
          _y: -0.6151,
          _z: -0.005,
          _w: 0.7883,
          duration: 1,
          onUpdate: () => {
            this.camera.quaternion.set(this.camera.quaternion._x, this.camera.quaternion._y, this.camera.quaternion._z, this.camera.quaternion._w);
          },
        })

        // Segunda posición de la cámara
        .to(this.camera.position, {
          x: -2.134245, // Nueva posición en X
          y: 0.776005,  // Nueva posición en Y
          z: -0.501159, // Nueva posición en Z
          duration: 1,
        })
        .to(this.camera.quaternion, {
          _x: -0.1051, // Nuevo quaternion X
          _y: -0.772,  // Nuevo quaternion Y
          _z: -0.1326, // Nuevo quaternion Z
          _w: 0.61216, // Nuevo quaternion W
          duration: 1,
          onUpdate: () => {
            this.camera.quaternion.set(this.camera.quaternion._x, this.camera.quaternion._y, this.camera.quaternion._z, this.camera.quaternion._w);
          },
        })

        // Tercera posición de la cámara
        .to(this.camera.position, {
          x: 0.008290,  // Nueva posición en X
          y: 0.378224,  // Nueva posición en Y
          z: -0.856137, // Nueva posición en Z
          duration: 1,
        })
        .to(this.camera.quaternion, {
          _x: 0.0695,  // Nuevo quaternion X
          _y: 0.9252,  // Nuevo quaternion Y
          _z: 0.2077,  // Nuevo quaternion Z
          _w: -0.309,  // Nuevo quaternion W
          duration: 1,
          onUpdate: () => {
            this.camera.quaternion.set(this.camera.quaternion._x, this.camera.quaternion._y, this.camera.quaternion._z, this.camera.quaternion._w);
          },
        })

        // Cuarta posición de la cámara
        .to(this.camera.position, {
          x: 0.325696,  // Nueva posición en X
          y: 0.7169312, // Nueva posición en Y
          z: -0.28019,  // Nueva posición en Z
          duration: 1,
        })
        .to(this.camera.quaternion, {
          _x: 0.3014,  // Nuevo quaternion X
          _y: 0.6412,  // Nuevo quaternion Y
          _z: 0.6371,  // Nuevo quaternion Z
          _w: -0.303,  // Nuevo quaternion W
          duration: 1,
          onUpdate: () => {
            this.camera.quaternion.set(this.camera.quaternion._x, this.camera.quaternion._y, this.camera.quaternion._z, this.camera.quaternion._w);
          },
        })

        // Quinta posición de la cámara
        .to(this.camera.position, {
          x: 0.662931,  // Nueva posición en X
          y: 0.264456,  // Nueva posición en Y
          z: -0.49257,  // Nueva posición en Z
          duration: 1,
        })
        .to(this.camera.quaternion, {
          _x: -0.0812, // Nuevo quaternion X
          _y: 0.8793,  // Nuevo quaternion Y
          _z: 0.1623,  // Nuevo quaternion Z
          _w: 0.4402,  // Nuevo quaternion W
          duration: 1,
          onUpdate: () => {
            this.camera.quaternion.set(this.camera.quaternion._x, this.camera.quaternion._y, this.camera.quaternion._z, this.camera.quaternion._w);
          },
        })

        // Sexta posición de la cámara
        .to(this.camera.position, {
          x: 0.643909,  // Nueva posición en X
          y: -0.05698,  // Nueva posición en Y
          z: -0.29467,  // Nueva posición en Z
          duration: 1,
        })
        .to(this.camera.quaternion, {
          _x: 0.1589,  // Nuevo quaternion X
          _y: 0.7588,  // Nuevo quaternion Y
          _z: -0.201,  // Nuevo quaternion Z
          _w: 0.5985,  // Nuevo quaternion W
          duration: 1,
          onUpdate: () => {
            this.camera.quaternion.set(this.camera.quaternion._x, this.camera.quaternion._y, this.camera.quaternion._z, this.camera.quaternion._w);
          },
        });
    },
  },
};
</script>

<style>
.scene-container {
  width: 100%;
  height: 200vh; /* Asegura scroll largo para probar */
  overflow: hidden;
  margin-top: 10rem;
}
</style>