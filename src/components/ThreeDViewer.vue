<template>
    <div class="viewer-container">
      <div ref="threeContainer" class="three-canvas"></div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, onBeforeUnmount } from 'vue'
  import * as THREE from 'three'
  import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
  import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
  
  // Ruta al modelo dentro de assets
  import modeloUrl from '../assets/3dmodells/floating_astronaut.glb'
  
  const threeContainer = ref(null)
  let scene, camera, renderer, controls, model
  
  const initThree = () => {
    // Crear escena
    scene = new THREE.Scene()
  
    // Crear cámara
    camera = new THREE.PerspectiveCamera(
      45, // Ángulo de la cámara
      threeContainer.value.clientWidth / threeContainer.value.clientHeight,
      0.1,
      1000
    )
    camera.position.set(0, 1, 10) // Ajuste de la posición de la cámara
    camera.lookAt(new THREE.Vector3(0, 0, 0)) // Foco en el centro de la escena
    
    // Configurar el renderer
    renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    })
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.setSize(threeContainer.value.clientWidth, threeContainer.value.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    threeContainer.value.appendChild(renderer.domElement)
  
    // Controles Orbit
    controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.screenSpacePanning = false
    controls.maxPolarAngle = Math.PI
  
    // Iluminación
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5) // Luz ambiental
    scene.add(ambientLight)
  
    const directionalLight1 = new THREE.DirectionalLight(0xffffff, 3) // Luz direccional principal
    directionalLight1.position.set(5, 10, 7.5)
    directionalLight1.castShadow = true
    directionalLight1.shadow.mapSize.width = 1024
    directionalLight1.shadow.mapSize.height = 1024
    scene.add(directionalLight1)
  
    const directionalLight2 = new THREE.DirectionalLight(0xffeedd, 1.5) // Luz direccional de relleno
    directionalLight2.position.set(-4, 1, -2)
    scene.add(directionalLight2)
  
    const backLight = new THREE.DirectionalLight(0xffffff, 1) // Luz de fondo para resaltar bordes
    backLight.position.set(0, 1, -3)
    scene.add(backLight)
  
    // Cargar el modelo
    loadModel()
  
    // Animación
    animate()
  
    // Ajustar tamaño con el resize
    window.addEventListener('resize', onWindowResize)
  }
  
  const loadModel = () => {
    const loader = new GLTFLoader()
  
    loader.load(
      modeloUrl,
      (gltf) => {
        if (model) scene.remove(model)
  
        model = gltf.scene
        scene.add(model)
  
        // Ajustar materiales para mejor visualización de metales
        model.traverse((child) => {
          if (child.isMesh) {
            if (child.material) {
              child.material.envMapIntensity = 1.5
              child.material.needsUpdate = true
            }
          }
        })
  
        // Ajustar la cámara en función del tamaño del modelo
        const box = new THREE.Box3().setFromObject(model)
        const center = box.getCenter(new THREE.Vector3())
        const size = box.getSize(new THREE.Vector3())
  
        camera.position.copy(center)
        camera.position.z += size.length() * 1.8
        controls.target.copy(center)
        controls.update()
      },
      undefined,
      (error) => {
        console.error('Error cargando el modelo:', error)
      }
    )
  }
  
  const animate = () => {
    requestAnimationFrame(animate)
    controls.update()
    renderer.render(scene, camera)
  }
  
  const onWindowResize = () => {
    camera.aspect = threeContainer.value.clientWidth / threeContainer.value.clientHeight
    camera.updateProjectionMatrix()
    renderer.setSize(threeContainer.value.clientWidth, threeContainer.value.clientHeight)
  }
  
  onMounted(() => {
    initThree()
    onWindowResize() // Forzar resize inicial
  })
  
  onBeforeUnmount(() => {
    window.removeEventListener('resize', onWindowResize)
    if (renderer) {
      renderer.dispose()
    }
  })
  </script>
  
  <style scoped>
  .viewer-container {
    top: 0;
    left: 0;
    width: 100vw;
    height: 90vh;
    background: linear-gradient(135deg, #ff9a9e 0%, #fad0c4 50%, #a18cd1 100%);
    z-index: 1;
  }
  
  .three-canvas {
    width: 100%;
    height: 100%;
    display: block;
  }
  </style>