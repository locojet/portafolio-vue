<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

// Controla la visibilidad del preloader
const isPreloaderVisible = ref(true);

// Oculta el preloader después de la carga
onMounted(() => {
  setTimeout(() => {
    isPreloaderVisible.value = false;
  }, 1500); // El preloader se oculta después de 1.5 segundos
});

// Estado para el ítem activo del menú
const activeItem = ref(null);

// Función para establecer el ítem activo
const setActive = (index) => {
  activeItem.value = index;
};

// Detectar el desplazamiento y desvanecer los elementos
const greetingOpacity = ref(1);  // Inicia con opacidad 1
const arrowOpacity = ref(1);  // Inicia con opacidad 1

const handleScroll = () => {
  const scrollPosition = window.scrollY;

  // Cambiar la opacidad según el desplazamiento
  greetingOpacity.value = Math.max(1 - scrollPosition / 500, 0);  // La opacidad se reduce a medida que se hace scroll
  arrowOpacity.value = Math.max(1 - scrollPosition / 500, 0);  // Lo mismo para la flecha
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
  <div class="banner-container">
    <!-- Preloader -->
    <div
      id="preloader"
      :class="{ hidden: !isPreloaderVisible }"
    ></div>

    <!-- Holder Container -->
    <div id="holder" v-if="!isPreloaderVisible">
      <!-- Main Section -->
      <main>
        <div tabindex="1" class="video-container">
          <video autoplay muted loop playsinline src="../assets/Videos/videos:video-leute-tanzen.mp4">
            Tu navegador no soporta videos HTML5.
          </video>
          
          <div class="gradient-overlay"></div> <!-- Gradiente sobre el video -->
        </div>
      </main>

      

     
    </div>
  </div>
</template>

<style scoped>
/* Variables de colores */
main{
  background: var(--quaternary-color);
  
}
.banner-container {
  
  height: 105vh;
  width: 100vw;
  margin: 0;
  padding: 0;
  background: var(--quaternary-color);
  margin-top: -2rem;
  
  
  
  
}
:root {
  --primary-color: #fff;
  --secondary-color: #74f6fd;
  --tertiary-color: #000;
  --quaternary-color: rgba(27, 87, 87, 0.5);
}

/* Reset y estilos globales */
* {
  box-sizing: border-box;
  font-family: 'Orbitron', sans-serif;
  user-select: none;
}

html {
  position: relative;
  min-width: 100%;
}

body {
  
  
  overflow: scroll;
  margin: 0;
  color: #fff;
  font-family: 'Orbitron', sans-serif;
  width: 100hv;
  height: 100wv;
  overflow-y: hidden;
  
}

body.loaded,
html {
  opacity: 1;
  overflow-x: hidden;
}

@media screen and (max-width: 1024px) {
  body {
    background-size: contain;
    background-repeat: no-repeat;
    background-position-y: 50%;
  }


}

/* Preloader Estilo */
#preloader {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: black;
  z-index: 2000;
  transition: opacity 0.5s ease, visibility 0.5s ease;
}

#preloader.hidden {
  opacity: 0;
  visibility: hidden;
}

/* Holder Container */
#holder {
  display: flex;
  flex-direction: column;
  max-width: 80%;
  margin: 0 auto;
  transition: all 1s ease-in-out;
  position: relative;
}

.gradient-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, #000000 110%);
  pointer-events: none;
}

@media (min-width: 1024px) {
  .gradient-overlay {
    display: none;
  }
}


</style>
