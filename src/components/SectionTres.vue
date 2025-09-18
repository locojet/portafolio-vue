<template>
  <div class="scene">
    <div
      v-for="(phrase, i) in phrases"
      :key="i"
      class="perspective-text"
      :style="getTransformStyle(i)"
    >
      {{ phrase }}
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const scrollY = ref(0)

const phrases = [
  'Todo empezó desde cero.',
  'Las ruinas también cuentan historias.',
  'El fuego interno nunca se apaga.',
  'Los pasos firmes marcan el ritmo.',
  'No hay sombra sin luz.',
  'Donde duele, ahí es.',
  'Silencio también es respuesta.',
  'No todos los caminos llevan a Roma.',
  'Mirar atrás a veces impulsa.',
  'Desde aquí, todo es posible.'
]

const getTransformStyle = (index) => {
  const baseDepth = index * 100
  const depthOffset = scrollY.value / 2
  const rotateX = (scrollY.value - index * 100) / 20
  const translateZ = baseDepth - depthOffset

  return `
    transform: perspective(800px) rotateX(${rotateX}deg) translateZ(${translateZ}px);
  `
}

const handleScroll = () => {
  scrollY.value = window.scrollY
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.scene {
  height: 300vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  padding-top: 20vh;
  perspective: 1000px;
  background: linear-gradient(to bottom, #111, #222);
}

.perspective-text {
  font-size: 2.5rem;
  color: #fff;
  margin: 3rem 0;
  text-align: center;
  transition: transform 0.1s ease-out;
  will-change: transform;
}
</style>