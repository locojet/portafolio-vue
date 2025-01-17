<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

// Detectar el desplazamiento y desvanecer los elementos
const greetingOpacity = ref(1); // Inicia con opacidad 1
const arrowOpacity = ref(1); // Inicia con opacidad 1

const handleScroll = () => {
  const scrollPosition = window.scrollY;

  // Cambiar la opacidad según el desplazamiento
  greetingOpacity.value = Math.max(1 - scrollPosition / 500, 0.1); // La opacidad se reduce a medida que se hace scroll
  arrowOpacity.value = Math.max(1 - scrollPosition / 500, 0.1); // Lo mismo para la flecha
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll); // Añadir el evento de scroll

  // Limpiar el evento cuando el componente se desmonte
  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
  });
});
</script>

<template>
  
    <!-- Saludo animado y flecha hacia abajo -->
    <div class="greeting-container wraperr" :style="{ opacity: greetingOpacity }">
      <p class="greeting">Hey, what up!</p>
      <div class="arrow-container" :style="{ opacity: arrowOpacity }">
        <div class="arrow"></div>
      </div>
    </div>
  
</template>

<style scoped>
/* Variables de colores */

:root {
  --primary-color: #fff;
}
.wraperr{
  overflow-x: hidden;
}



/* Contenedor del saludo */
.greeting-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  top: -17rem;
  z-index: 10000;
  overflow: hidden;
}

.greeting {
  font-family: 'Roboto', sans-serif;
  font-size: 2rem;
  font-weight: bold;
  color: var(--primary-color);
  text-align: center;
  margin-bottom: 0px;
  font-style: italic;
  transform: rotate(-6deg);
  
}

/* Flecha animada */
.arrow-container {
  display: flex;
  justify-content: center;
  animation: moveArrow 2s infinite alternate;
  padding: 3rem;
  
}

.arrow {
  width: 30px;
  height: 30px;
  border-left: 4px solid var(--primary-color);
  border-bottom: 4px solid var(--primary-color);
  transform: rotate(0deg);
  margin-top: 0;
  

}

/* Animación de la flecha */
@keyframes moveArrow {
  0% {
    transform: translateY(0) rotate(-45deg);
  }
  100% {
    transform: translateY(20px) rotate(-45deg);
  }
}
</style>
