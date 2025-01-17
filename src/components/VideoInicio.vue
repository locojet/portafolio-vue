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
  <div class="video-inicio-container">
  <div class="banner-container wraperr">
    <!-- Preloader -->
    <div
      id="preloader"
      :class="{ hidden: !isPreloaderVisible }"
    ></div>
    <div class="espacio"></div>
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
</div>
</template>

<style scoped>

/* Variables de colores */
.wraperr{
  overflow-x: hidden;
}


.banner-container {
  
  height: 100vh;
  width: 100vw;
  margin: 0;
  padding: 0;
  background: var(--quaternary-color);
  
  

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
  z-index: 2;
 
 
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

/* Main Section */
main {
  order: 2;
  width: 100%;
  margin: 0 auto;
  height: 70vh;
  position: relative;
  transition: all 0.5s ease-in-out;
  transform: scale(130%);
  top: 4rem;
  z-index: 1;
  
}



main video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 1.5rem;
  filter: none;
  opacity: 1;
  transition: all 0.3s ease-in-out;
  cursor: pointer;
  
}

.video-container {
  position: relative;
  height: 80%;
  filter: grayscale(50%) blur(5px); /* Aplica escala de grises y desenfoque */
  transition: filter 0.3s ease-in-out;
}

.video-container:hover{
  filter: grayscale(0%) blur(0px); 
  transition: filter 0.3s ease-in-out;
}

.video-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #fff;
  z-index: 1;
  font-family: myFont, sans-serif;
  font-size: calc(5.5vw + 2.5vh);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.6;
  transition: opacity 2s ease-in-out;
  filter: blur(2px);
}

.video-container:hover .video-text {
  opacity: 0;
}

.video-container:hover video {
  opacity: 1;
  filter: blur(0);
}

@media screen and (max-width: 1024px) {
  
  .video-inicio-container{
    top: -3rem;
  }
  main {
    
    width: 150%;
    height: 50vh;
    margin-top: 5rem;
    margin-left: -5rem;
    rotate: -6deg;
    scale: 1.1;
    
  }

  

  
  main video {
    filter: none;
    opacity: 1;
  }

  
}


@media (min-width: 1024px) {
  .gradient-overlay {
    display: none;
  }
  
}


/*glitch*/
.video-container {
  position: relative;
  height: 80%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer; /* Para indicar interactividad */
}

.video-container:hover video {
  animation: hologram-glitch 0.5s steps(10) forwards;
}

/* Video Base */
video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: none; /* Sin transiciones suaves */
}

/* Efecto de Glitch */
.video-container::before,
.video-container::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: inherit;
  mix-blend-mode: screen;
  pointer-events: none;
  opacity: 0.6;
}

.video-container::before {
  filter: drop-shadow(-3px 0 red);
  clip-path: polygon(0 0, 100% 0, 100% 50%, 0 50%);
  animation: glitch-top 0.5s steps(10) forwards;
}

.video-container::after {
  filter: drop-shadow(3px 0 blue);
  clip-path: polygon(0 50%, 100% 50%, 100% 100%, 0 100%);
  animation: glitch-bottom 0.5s steps(10) forwards;
}

/* Animaciones del Glitch */
@keyframes hologram-glitch {
  0% {
    transform: translate(0, 0);
    filter: none;
    opacity: 1;
  }
  25% {
    transform: translate(-5px, 5px);
    filter: hue-rotate(20deg);
    opacity: 0.9;
  }
  50% {
    transform: translate(5px, -5px);
    filter: hue-rotate(-20deg);
    opacity: 0.8;
  }
  75% {
    transform: translate(-5px, -5px);
    filter: hue-rotate(40deg);
    opacity: 0.7;
  }
  100% {
    transform: translate(0, 0);
    filter: none;
    opacity: 1;
  }
}

@keyframes glitch-top {
  0% {
    transform: translate(0, 0);
  }
  25% {
    transform: translate(-3px, 3px);
  }
  50% {
    transform: translate(3px, -3px);
  }
  75% {
    transform: translate(-3px, -3px);
  }
  100% {
    transform: translate(0, 0);
  }
}

@keyframes glitch-bottom {
  0% {
    transform: translate(0, 0);
  }
  25% {
    transform: translate(3px, -3px);
  }
  50% {
    transform: translate(-3px, 3px);
  }
  75% {
    transform: translate(3px, 3px);
  }
  100% {
    transform: translate(0, 0);
  }
}

@media screen and (max-width: 1024px) {
  /* Remueve filtros en video */
  .video-container {
    filter: none !important;
    animation: none !important;
  }

  .video-container:hover {
    filter: none !important;
    animation: none !important;
  }

  /* Pseudo-elementos glitch */
  .video-container::before,
  .video-container::after {
    content: none; /* Elimina los pseudo-elementos */
  }

  /* Video Base */
  main video {
    filter: none !important; /* Remueve cualquier filtro */
    opacity: 1 !important;
    animation: none !important; /* Remueve animaciones */
    transition: none; /* Sin transiciones */
  }
}



</style>
