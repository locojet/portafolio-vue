<template>
  <section class="parent-element wraperr container-1">
    <!-- Sticky Video Element -->
    <div class="sticky-child">
      <video ref="video" autoplay muted playsinline loop preload="auto">
        <source src="../assets/Videos/timeline1.mp4" type="video/mp4" />
        Your browser does not support videos.
      </video>
    </div>

    <!-- Content Section -->

    <div class="hello-container">
      <div class="nicetomeetyou"><h2>Nice to meet you!</h2></div>
    <div class="nicetomeetyou1"><h2>I'm <br> Juan Mejia</h2></div>
  </div>

    <div class="content-section container-2">
      <div class="text-container">
        <h3 class="text-3xl font-semibold text-white mb-8 text-center">What I Can Do for You</h3>
        <div class="grid grid-cols-1 gap-x-8 gap-y-6 text-lg font-medium text-gray-300 sm:grid-cols-2 md:grid-cols-3 lg:gap-x-10">
          <div class="service-card text-center">
            <i class="fas fa-laptop-code text-4xl text-white mb-4 animate-bounce"></i>
            <h4 class="text-xl font-semibold text-white">Frontend Wizardry</h4>
            <p>Crafting sleek and responsive user interfaces with HTML, CSS, and JavaScript that feel like magic.</p>
          </div>
          <div class="service-card text-center">
            <i class="fas fa-server text-4xl text-white mb-4 animate-spin"></i>
            <h4 class="text-xl font-semibold text-white">Backend Mastery</h4>
            <p>Building strong, reliable server solutions with Node.js, Express, and MongoDB to keep things running smoothly.</p>
          </div>
          <div class="service-card text-center">
            <i class="fas fa-chart-line text-4xl text-white mb-4 animate-bounce"></i>
            <h4 class="text-xl font-semibold text-white">SEO Optimization</h4>
            <p>Making your website a search engine’s best friend and ensuring it gets the spotlight it deserves.</p>
          </div>
          <div class="service-card text-center">
            <i class="fas fa-video text-4xl text-white mb-4 animate-pulse"></i>
            <h4 class="text-xl font-semibold text-white">Video Storytelling</h4>
            <p>Creating captivating videos that tell your story with style, energy, and unforgettable visuals.</p>
          </div>
          <div class="service-card text-center">
            <i class="fas fa-camera text-4xl text-white mb-4 animate-bounce"></i>
            <h4 class="text-xl font-semibold text-white">Photography</h4>
            <p>Capturing stunning moments and translating them into timeless visual art for brands and individuals alike.</p>
          </div>
          <div class="service-card text-center">
            <i class="fas fa-music text-4xl text-white mb-4 animate-pulse"></i>
            <h4 class="text-xl font-semibold text-white">Music Magic</h4>
            <p>Composing and producing music that hits the right notes and perfectly complements your vision.</p>
          </div>
        </div>
      </div>
    </div>
    
      <div class="inspiration-container"><div class="inspiration"><h2>Get Inspired</h2></div></div>
    
  
  </section>
</template>

<script>
export default {
  name: "StickyVideoWithContent",
};
</script>



<style scoped>
.wraperr{
  overflow-x: hidden;
}
.hello-container{
  width: 100wh;
  height: 100vh;
}
.nicetomeetyou {
  font-size: 2rem;
margin-top: 20rem;
text-align: center;
background-color: rgba(0, 0, 0, 0.5); /* Rosa seno transparente */
}
.nicetomeetyou1 {
  font-size: 2rem;
margin-top: 30rem;
text-align: center;
background-color: rgba(0, 0, 0, 0.5); /* Rosa seno transparente */


}
.inspiration-container{
  
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 100vh; /* Ajusta según el espacio disponible */
  flex-direction: column;
}

.inspiration{
  font-size: 4rem;
margin-top: 90rem;
text-align: center;
text-transform: uppercase;
background-color: rgba(232, 115, 134, 0.5); /* Rosa seno transparente */
width: 95%;


  writing-mode: vertical-lr; /* O vertical-rl para el otro lado */
  text-orientation: upright; /* Mantiene las letras derechas */
  
               /* Ajusta el ancho según sea necesario */

}
/* Contenedor Padre */
.parent-element {
  min-height: 320vh; /* Suficiente altura para scroll */
  position: relative;
  overflow: visible;
  width: 100%; /* Asegura que el contenedor ocupe el ancho completo */
  height: 100%;
  margin-top: -80rem;
}

/* Elemento Sticky con Video */
.sticky-child {
  position: sticky; /* Activa el comportamiento sticky */
  top: 0; /* Fija el elemento en la parte superior */
  height: 100vh; /* El video ocupa toda la altura del viewport */
  width: 100vw; /* Volle Breite des Viewports */
  background-color: black; /* Fondo negro */
  z-index: -1; /* El video está detrás del contenido */
  aspect-ratio: 16 / 9; /* Falls das Video 16:9 ist */
  overflow: hidden;
  
}

.sticky-child video {
  width: 100vw; /* El video ocupa todo el ancho del contenedor */
  height: 100vh; /* El video ocupa toda la altura del sticky */
  object-fit: cover; /* Ajusta el video para llenar el contenedor */
  object-position: center; /* Zentriert das Video */
  z-index: 1;
  position: relative;
  
  
}
.sticky-child::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  pointer-events: none; /* Kein Blockieren der Interaktion */
  background: radial-gradient(circle, transparent, rgba(0, 0, 0, 1) 85%);
}

/* Sección de Contenido */
.content-section {
  position: relative;
  z-index: 1; /* El contenido está sobre el video */
  color: white;
  background: rgba(0, 0, 0, 0.7); /* Fondo semitransparente para mejorar visibilidad */
  padding-top: 2rem;
  top: 70rem;
  
  
}

.text-container {
  padding: 2rem;
}

.service-card {
  background-color: rgba(0, 0, 0, 0.7); /* Contraste para las tarjetas */
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.5);
}


/* Ajustes para Pantallas Pequeñas */
@media (max-width: 1024px) {
  .sticky-child::before{
    background: radial-gradient(circle, transparent, rgba(0, 0, 0, 1) 100%);
  }
  .parent-element {
    height: 680vh; /* Ajusta la altura para móviles */
    margin-top: -50rem;
  }

  .sticky-child {
    height: 100vh;
  }

  .content-section {
    padding: 1rem;
    top: 90vh;
    margin-top: -10rem;
  }
  .text-container {
    padding: 2rem;
  }
}
</style>
