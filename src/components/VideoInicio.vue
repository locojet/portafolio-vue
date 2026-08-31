<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

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
    <div class="espacio"></div>
    <!-- Holder Container -->
    <div id="holder">
      <!-- Main Section -->
      <main>
        <div tabindex="1" class="video-container">
          <video autoplay muted loop playsinline preload="auto">
  <source src="../assets/Videos/leute-tanzen.webm" type="video/webm" />
  <source src="../assets/Videos/leute-tanzen.mp4" type="video/mp4" />
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

.video-inicio-container {
  background: #000;
  position: relative;
  z-index: 1;
}

.video-inicio-container::after {
  background: linear-gradient(
    to bottom,
    #000 0%,
    rgba(0, 0, 0, 0.78) 36%,
    rgba(0, 0, 0, 0) 100%
  );
  bottom: calc(-1 * clamp(5rem, 12dvh, 8rem));
  content: "";
  height: clamp(5rem, 12dvh, 8rem);
  left: 0;
  pointer-events: none;
  position: absolute;
  right: 0;
  z-index: 3;
}

.banner-container {
  
  height: 100vh;
  width: 100vw;
  margin: 0;
  padding: 0;
  background: #000;
  
  

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
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0) 36%,
    rgba(0, 0, 0, 0.28) 64%,
    rgba(0, 0, 0, 0.75) 86%,
    #000000 100%
  );
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
    --intro-logo-band: clamp(8.5rem, 16dvh, 12rem);
    min-height: calc(100dvh + 6rem);
    top: -3rem;
  }

  .banner-container {
    background: linear-gradient(
      to bottom,
      var(--quaternary-color) 0 var(--intro-logo-band),
      #000 var(--intro-logo-band) 100%
    );
    height: calc(100dvh + 6rem);
    min-height: calc(100dvh + 6rem);
  }

  main {
    
    width: 150%;
    height: 50vh;
    margin-top: calc(clamp(7rem, 10dvh, 9rem) + 11px);
    margin-left: -5rem;
    rotate: -6deg;
    scale: 1.1;
    
  }

  

  
  main video {
    filter: none;
    opacity: 1;
  }

  
}

@media screen and (max-width: 639px) {
  .video-inicio-container {
    --intro-logo-band: clamp(9rem, 22dvh, 12rem);
  }
}


@media (min-width: 1024px) {
  .gradient-overlay {
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0) 48%,
      rgba(0, 0, 0, 0.32) 74%,
      rgba(0, 0, 0, 0.82) 100%
    );
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



/* Video Base */
video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: none; /* Sin transiciones suaves */
}




@media screen and (max-width: 1024px) {
  /* Remueve filtros en video */
  .video-container {
    filter: none !important;
    animation: none !important;
  }

}



</style>
