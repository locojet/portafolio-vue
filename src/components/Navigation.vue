<template>
    <div>
      <!-- Fondo detrás del ícono de hamburguesa -->
      <div class="fondo" :class="{ active: isTopActive }"></div>
  
      <!-- Contenedor de navegación -->
      <div :class="{ navkorb: true, active: isNavActive, fixed: isFixed }" @click="toggleNav">
        <div class="navbar">
          <div class="boton" :class="{ active: isNavActive }"></div>
          <div tabindex="8" class="bar eins">
            <a class="bartext" href="aboutme.html" @click.prevent="preventNavClose">AboutMe</a>
          </div>
          <div tabindex="9" class="bar zwei">
            <a class="bartext" href="mywork.html" @click.prevent="preventNavClose">MyWork</a>
          </div>
          <div tabindex="10" class="bar drei">
            <a class="bartext" href="contact.html" @click.prevent="preventNavClose">Contact</a>
          </div>
          <div class="boton1"></div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted, computed } from 'vue';
  
  // Estados del menú y posición
  const isNavActive = ref(false);
  const isFixed = ref(false);
  
  // Alternar el menú activo
  const toggleNav = () => {
    isNavActive.value = !isNavActive.value;
  };
  
  // Prevenir el cierre del menú al hacer clic en un enlace
  const preventNavClose = (event) => {
    event.stopPropagation();
  };
  
  // Manejar el scroll para activar la clase "fixed"
  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    isFixed.value = scrollPosition >= 275;
  };
  
  // Computada: Fondo negro solo activo cuando el menú es fijo y está activo
  const isTopActive = computed(() => isNavActive.value && isFixed.value);
  
  // Listener para el evento scroll
  onMounted(() => {
    window.addEventListener('scroll', handleScroll);
  });
  
  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
  });
  </script>
  
  <style scoped>
  :root {
    --primary-color: #fff;
    --secondary-color: #74f6fd;
    --tertiary-color: #000;
    --quaternary-color: rgba(27, 87, 87, 0.5);
  }
  
  /* Fondo detrás del ícono de hamburguesa */
  .fondo {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 7rem;
    background: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(5px);
    z-index: 1;
    opacity: 0;
    transform: rotate(-6deg);
    pointer-events: none;
    transition: opacity 0.3s ease-in-out;
    scale: 1.5;
  }
  
  .fondo.active {
    opacity: 1;
    
  }
  
  /* Contenedor de navegación */
  .navkorb {
    z-index: 2000;
    position: absolute;
    top: 15.5rem;
    right: 0;
    margin: 1.9rem;
    margin-right: 7vw;
    cursor: pointer;
    width: 60px;
    transform: scale(0.7);
    padding: 2px;
    border: solid 3px var(--quaternary-color);
    border-left: none;
    border-bottom: none;
    border-top: none;
    border-radius: 20% 50% 50% 0;
    transform: rotate(-6deg);
  }
  
  /* Menú fijo */
  .navkorb.fixed {
    position: fixed;
    top: -24px;
    right: 0;
  }
  
  /* Menú activo */
  .navkorb.active {
    border-radius: 4% 90% 30% 50%;
    transform: rotate(-6deg);
    
  }
  
  .navkorb.active .eins {
    transform: translateX(-12vw) scale(1.7);
    margin-bottom: 1.3rem;
    margin-top: 1.3rem;
  }
  
  .navkorb.active .zwei {
    transform: translateX(-34vw) scale(1.7);
    margin-bottom: 1.3rem;
  }
  
  .navkorb.active .drei {
    transform: translateX(-56vw) scale(1.7);
    margin-bottom: 1.3rem;
  }

  
  
  /* Botones decorativos */
  div.boton {
    width: 55px;
    height: 55px;
    transform: scale(0.9);
    border-radius: 50%;
    margin-bottom: -3rem;
    box-shadow: 0 0 0.5rem var(--quaternary-color);
    border: solid 2px var(--quaternary-color);
    transition: transform 0.4s ease-in-out, margin-bottom 0.4s ease-in-out;
  }
  
  div.boton.active {
    margin-bottom: -3rem;
    transform: translateX(-15px) translateY(50px) scale(0.9);
  }
  
  .boton1 {
    width: 55px;
    height: 55px;
    border-radius: 50%;
    margin-top: -3rem;
    margin-left: -0.3rem;
    box-shadow: 0 0 0.5rem rgba(171, 248, 245, 0.8);
    border: solid 2px rgba(161, 233, 227, 0.8);
    opacity: 0;
  }
  
  /* Barras del menú */
  .bar {
  background: var(--quaternary-color);
  width: 60px;
  height: 6px;
  margin: 6px;
  margin-left: -0.15rem;
  cursor: pointer;
  transform: scale(0.6);
  border-radius: 0.3rem;
  transition: all 0.3s ease-in-out;
  opacity: 1;
}
  
  .active .bar {
    background: rgba(248, 248, 0, 0);
    
  }
  
  /* Texto del menú */
  .bartext {
  display: inline-block;
  font-family: myFont, 'Bebas Neue', sans-serif;
  font-weight: 400;
  opacity: 0;
  color: var(--primary-color);
  text-align: center;
  position: absolute;
  top: 0px;
  transform: translate(-50%, 0);
  z-index: 1000;
  transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
  font-family: 'Roboto';
  font-style: italic;
  
}
.bartext.active{
  gap: 2rem;
}
  
  .navkorb.active .bartext {
    opacity: 1;
    transform: translate(-50%, -10px);
    
  }
  
  .navkorb.active .bartext:hover {
    transform: translate(-50%, -15px) scale(1.1);
    color: var(--tertiary-color);
  }
  
  /* Media Query para Desktop */
  @media (min-width: 1024px) {
    .navkorb {
      display: none;
    }
    .fondo{
      top: -30rem;
      transition: opacity 0s ease-in-out, transform 0s ease-in-out;
      
    }
  }
  </style>
  