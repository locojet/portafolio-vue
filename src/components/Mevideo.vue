<template>
  <section class="parent-element wraperr container-1">
    <!-- Sticky Video Element -->
    <div class="sticky-child">
      <video ref="video" autoplay muted playsinline loop preload="auto">
        <source src="../assets/Videos/timeline5.mp4" type="video/mp4" />
        Your browser does not support videos.
      </video>
    </div>

    <!-- Content Section -->
    <div class="hello-container">
      <div ref="meetYou" class="nicetomeetyou fade-in">
        <h2 style="font-family: 'myFont2', sans-serif;">Nice to meet you!</h2>
      </div>
      <div ref="webDeveloper" class="nicetomeetyou1 fade-in">
        <h2 style="font-family: 'myFont2', sans-serif;">I'm a Creator</h2>
      </div>
    </div>

    <!-- Resto del contenido -->
    <div class="content-section container-2">
      <div class="text-container">
        <h3 class="text-3xl text-white mb-8 text-center">What I Can Do for You</h3>
        <div class="grid grid-cols-1 gap-x-8 gap-y-6 text-lg font-medium text-gray-300 sm:grid-cols-2 md:grid-cols-3 lg:gap-x-10">
          <!-- Tarjeta 1: Frontend Wizardry -->
          <div class="text-center">
            <i class="fas fa-laptop-code text-4xl text-white mb-4 animate-bounce"></i>
            <h4 class="text-xl font-semibold text-white">Frontend Wizardry</h4>
            <p>Crafting sleek and responsive user interfaces with HTML, CSS, and JavaScript that feel like magic.</p>
          </div>

          <!-- Tarjeta 2: Backend Mastery -->
          <div class="text-center">
            <i class="fas fa-server text-4xl text-white mb-4 animate-spin"></i>
            <h4 class="text-xl font-semibold text-white">Backend Mastery</h4>
            <p>Building strong, reliable server solutions with Node.js, Express, and MongoDB to keep things running smoothly.</p>
          </div>

          <!-- Tarjeta 3: SEO Optimization -->
          <div class="text-center">
            <i class="fas fa-chart-line text-4xl text-white mb-4 animate-bounce"></i>
            <h4 class="text-xl font-semibold text-white">SEO Optimization</h4>
            <p>Making your website a search engine’s best friend and ensuring it gets the spotlight it deserves.</p>
          </div>

          <!-- Tarjeta 4: Video Storytelling -->
          <div class="text-center">
            <i class="fas fa-video text-4xl text-white mb-4 animate-pulse"></i>
            <h4 class="text-xl font-semibold text-white">Video Storytelling</h4>
            <p>Creating captivating videos that tell your story with style, energy, and unforgettable visuals.</p>
          </div>

          <!-- Tarjeta 5: Photography -->
          <div class="text-center">
            <i class="fas fa-camera text-4xl text-white mb-4 animate-bounce"></i>
            <h4 class="text-xl font-semibold text-white">Photography</h4>
            <p>Capturing stunning moments and translating them into timeless visual art for brands and individuals alike.</p>
          </div>

          <!-- Tarjeta 6: Music Magic -->
          <div class="text-center">
            <i class="fas fa-music text-4xl text-white mb-4 animate-pulse"></i>
            <h4 class="text-xl font-semibold text-white">Music Magic</h4>
            <p>Composing and producing music that hits the right notes and perfectly complements your vision.</p>
          </div>

          <!-- Tarjeta 7: UI/UX Design -->
          <div class="text-center">
            <i class="fas fa-palette text-4xl text-white mb-4 animate-bounce"></i>
            <h4 class="text-xl font-semibold text-white">UI/UX Design</h4>
            <p>Designing intuitive and user-friendly interfaces that enhance user experience and engagement.</p>
          </div>

          <!-- Tarjeta 8: Mobile App Development -->
          <div class="text-center">
            <i class="fas fa-mobile-alt text-4xl text-white mb-4 animate-spin"></i>
            <h4 class="text-xl font-semibold text-white">Artificial Inteligence</h4>
            <p>Building cross-platform mobile applications that deliver seamless performance and functionality.</p>
          </div>

          <!-- Tarjeta 9: E-commerce Solutions -->
          <div class="text-center">
            <i class="fas fa-shopping-cart text-4xl text-white mb-4 animate-pulse"></i>
            <h4 class="text-xl font-semibold text-white">E-commerce Solutions</h4>
            <p>Developing robust e-commerce platforms that drive sales and enhance customer experience.</p>
          </div>
        </div>
      </div>
    </div>

   
  </section>
</template>

<script>
export default {
  name: "StickyVideoWithContent",
  mounted() {
    // Configura el Intersection Observer
    const options = {
      root: null, // Observa el viewport
      rootMargin: "0px",
      threshold: 0.1, // Activa la animación cuando el 50% del elemento es visible
    };

    // Callback para manejar la visibilidad
    const callback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Elemento entra en el viewport
          entry.target.classList.add("visible");
          entry.target.classList.remove("fade-out");
        } else {
          // Elemento sale del viewport
          entry.target.classList.remove("visible");
          entry.target.classList.add("fade-out");
        }
      });
    };

    // Crea el observer
    const observer = new IntersectionObserver(callback, options);

    // Observa los elementos
    observer.observe(this.$refs.meetYou);
    observer.observe(this.$refs.webDeveloper);
  },
};
</script>

<style scoped>
/* Tus estilos CSS aquí */
@font-face {
  font-family: myFont2;
  src: url(../assets/fonts/PressStart2P-Regular.ttf);
  font-display: swap;
}

.wraperr {
  overflow-x: hidden;
}

.hello-container {
  width: 100vw;
  height: 100vh;
}

.nicetomeetyou,
.nicetomeetyou1 {
  font-size: 1rem;
  margin-top: 45rem;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.5);
  font-family: myFont2 !important;
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}

.nicetomeetyou1 {
  margin-top: 30rem;
}

.inspiration-container {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 100vh;
  flex-direction: column;
}

.inspiration {
  font-size: 4rem;
  margin-top: 85rem;
  text-align: center;
  text-transform: uppercase;
  background-color: rgba(232, 115, 134, 0.5);
  width: 95%;
  padding: 1rem;
  writing-mode: vertical-lr;
  text-orientation: upright;
}

.parent-element {
  min-height: 320vh;
  position: relative;
  overflow: visible;
  width: 100%;
  height: 100%;
  margin-top: -80rem;
}

.sticky-child {
  position: sticky;
  top: 0;
  height: 100vh;
  width: 100vw;
  background-color: black;
  z-index: -1;
  aspect-ratio: 16 / 9;
  overflow: hidden;
}

.sticky-child video {
  width: 100vw;
  height: 100vh;
  object-fit: cover;
  object-position: center;
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
  pointer-events: none;
  background: radial-gradient(circle, transparent, rgba(0, 0, 0, 1) 85%);
}

.content-section {
  position: relative;
  z-index: 1;
  color: white;
  background: rgba(0, 0, 0, 0.7);
  padding-top: 2rem;
  top: 70rem;
}

.content-section p {
  text-align: start;
}

.text-container {
  padding: 2rem;
}

.service-card {
  background-color: rgba(0, 0, 0, 0.7);
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.5);
}

.fade-in {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}

.fade-in.visible {
  opacity: 1;
  transform: translateY(0);
}

.fade-out {
  opacity: 0;
  transform: translateY(-20px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}

/* Ajustes para pantallas pequeñas */
@media (max-width: 1024px) {
  .sticky-child::before {
    background: radial-gradient(circle, transparent, rgba(0, 0, 0, 1) 100%);
  }

  .parent-element {
    height: 630vh;
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

  .service-card {
    width: 100%;
    margin: 0 auto;
    padding: 0px;
  }
}

@media (min-width: 1024px) {
  .content-section {
    top: 0;
  }

  .inspiration-container {
    position: relative;
    display: flex;
    justify-content: flex-end;
  }

  .inspiration {
    margin-top: 0rem;
    position: absolute;
  }

  .inspiration h2 {
    right: 0;
  }
}
</style>