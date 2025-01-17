<template>
    <section class="parent-element">
      <!-- Elemento Sticky con Video -->
      <div class="sticky-child">
        <video ref="video" autoplay muted playsinline loop preload="auto">
          <source src="../assets/Videos/timeline2.mp4" type="video/mp4" />
          Your browser does not support videos.
        </video>
      </div>
    </section>
  </template>
  
  <script>
 /* export default {
    name: "StickyVideoExample",
    mounted() {
      const section = this.$el; // Referencia al contenedor principal
      const vid = this.$refs.video; // Referencia al video
  
      vid.pause(); // Iniciar con el video pausado
  
      let lastKnownScrollPosition = 0; // Última posición de scroll conocida
      let ticking = false; // Control para evitar múltiples eventos de scroll simultáneos
  
      const syncVideoWithScroll = () => {
        const distance = window.scrollY - section.offsetTop;
        const total = section.clientHeight - window.innerHeight;
  
        let percentage = distance / total;
        percentage = Math.max(0, percentage);
        percentage = Math.min(percentage, 1);
  
        // Actualizar el tiempo del video según el porcentaje
        if (vid.duration > 0) {
          vid.currentTime = vid.duration * percentage;
        }
  
        ticking = false; // Resetear el control
      };
  
      const handleScroll = () => {
        lastKnownScrollPosition = window.scrollY;
  
        // Evitar múltiples actualizaciones simultáneas
        if (!ticking) {
          requestAnimationFrame(syncVideoWithScroll);
          ticking = true;
        }
      };
  
      // Añadir evento de scroll
      window.addEventListener("scroll", handleScroll);
  
      // Limpiar evento al desmontar el componente
      this.$once("hook:beforeDestroy", () => {
        window.removeEventListener("scroll", handleScroll);
      });
    },
  };*/
  </script>
  
  <style>
  /* Contenedor Padre */
  .parent-element {
    position: absolute; /* Proporciona contexto para el sticky */
    overflow: visible; /* Permite que el hijo sticky sea visible */
    height: 3000px; /* Espacio suficiente para scroll */
    width: 100%; /* Asegura que el contenedor ocupe el ancho completo */
  }
  
  /* Elemento Sticky con Video */
  .sticky-child {
    position: sticky; /* Activa el comportamiento sticky */
    top: 0; /* Fija el elemento en la parte superior */
    height: 100vh; /* El video ocupa toda la altura del viewport */
    background-color: black; /* Fondo negro */
    z-index: 10; /* Asegura que el sticky esté sobre otros elementos */
  }
  
  .sticky-child video {
    width: 100%; /* El video ocupa todo el ancho del contenedor */
    height: 100%; /* El video ocupa toda la altura del sticky */
    object-fit: cover; /* Ajusta el video para llenar el contenedor */
  }
  </style>
  