<template>
  <section class="parent-element">
    <!-- Sticky Video Element -->
    <div class="sticky-child">
      <video ref="video" autoplay muted playsinline loop preload="auto">
        <source src="../assets/Videos/timeline1.mp4" type="video/mp4" />
        Your browser does not support videos.
      </video>
    </div>

    <!-- Content Section -->
    <div class="content-section">
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
  </section>
</template>

<script>
export default {
  name: "StickyVideoWithContent",
};
</script>

<style scoped>
/* Contenedor Padre */
.parent-element {
  min-height: 500vh; /* Suficiente altura para scroll */
  position: relative;
  overflow: visible;
  width: 100%; /* Asegura que el contenedor ocupe el ancho completo */
  margin-top: -8rem;
}

/* Elemento Sticky con Video */
.sticky-child {
  position: sticky; /* Activa el comportamiento sticky */
  top: 0; /* Fija el elemento en la parte superior */
  height: 100vh; /* El video ocupa toda la altura del viewport */
  background-color: black; /* Fondo negro */
  z-index: -1; /* El video está detrás del contenido */
}

.sticky-child video {
  width: 100%; /* El video ocupa todo el ancho del contenedor */
  height: 100%; /* El video ocupa toda la altura del sticky */
  object-fit: cover; /* Ajusta el video para llenar el contenedor */
}

/* Sección de Contenido */
.content-section {
  position: relative;
  z-index: 1; /* El contenido está sobre el video */
  color: white;
  background: rgba(0, 0, 0, 0.7); /* Fondo semitransparente para mejorar visibilidad */
  padding-top: 2rem;
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
  .parent-element {
    height: 150vh; /* Ajusta la altura para móviles */
    margin-top: -9rem;
  }

  .sticky-child {
    height: 100vh;
  }

  .content-section {
    padding: 1rem;
  }
}
</style>
