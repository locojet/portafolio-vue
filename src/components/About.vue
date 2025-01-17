<template>
  <div class="container-about relative isolate overflow-hidden bg-gray-900">
    <!-- Video Background -->
    <div class="relative h-screen w-full">
      <video 
  ref="video"
  muted 
  playsinline 
  loop
  class="video-man h-full w-full object-cover">
  <source src="../assets/Videos/TimeLine1.mp4" type="video/mp4" />
  Your browser does not support videos.
</video>

      <div class="absolute inset-0"></div> <!-- Dark Overlay -->

      <!-- Centered Text on Video -->
      <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center">
        <h2 class="text-5xl font-semibold text-white sm:text-6xl">
          Nice to meet you,
        </h2>
      </div>
    </div>

    <!-- Content Below the Video -->
    <div class="bg-gray-900 pt-24 pb-16 sm:pt-32 sm:pb-24">
      <!-- Main Content -->
      <div class="text-container mx-auto max-w-7xl px-6 lg:px-8">
        <!-- Services -->
        <div class="mx-auto mt-16 max-w-2xl lg:mx-0 lg:max-w-none">
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
    </div>
  </div>
</template>

<script>
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default {
  name: "VideoScrollTrigger",
  mounted() {
    const video = this.$refs.video;

    // Configuración de ScrollTrigger para reproducir y pausar el video
    ScrollTrigger.create({
      trigger: video, // Elemento que activa el ScrollTrigger
      start: "top bottom", // Inicia cuando la parte superior del video toca la parte inferior de la ventana
      end: "bottom top", // Termina cuando la parte inferior del video toca la parte superior de la ventana
      onEnter: () => video.play(), // Reproduce el video al entrar
      onLeave: () => video.pause(), // Pausa el video al salir
      onEnterBack: () => video.play(), // Reproduce al volver a entrar
      onLeaveBack: () => video.pause(), // Pausa al salir hacia atrás
    });
  },
};
</script>

<style scoped>
.video-man {
  transform: scale(1.2);
}

.container-about {
  top: -7.5rem;
}

h2 {
  font-size: 3rem;
  animation: fadeInUp 1s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
