<template>
    <div class="fullscreen-video">
      <!-- Hintergrundvideo -->
      <video autoplay muted loop playsinline>
        <source src="../assets/videos/clouds.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
  
      <!-- Dynamisch generierte Ballons -->
      <div
        v-for="(balloon, index) in balloons"
        :key="index"
        class="balloon"
        :style="{ backgroundImage: `url(${balloon})` }"
      ></div>
    </div>
  </template>
  
  <script>
  export default {
    name: "FullscreenBalloons",
    data() {
      return {
        // Ballon-Bilder (relativer Pfad zu src/assets/)
        balloons: Array.from({ length: 10 }, (_, i) => `../assets/img/globo${i + 1}.webp`),
      };
    },
    mounted() {
      this.animateBalloons();
    },
    methods: {
      animateBalloons() {
        const balloons = document.querySelectorAll(".balloon");
        balloons.forEach((balloon) => {
          const duration = Math.random() * 20 + 10; // Zufällige Animationszeit (10-30 Sekunden)
          const delay = Math.random() * 5; // Zufällige Verzögerung (0-5 Sekunden)
          const startX = Math.random() * 100; // Startposition (0-100% Breite)
          const endX = Math.random() * 100; // Endposition (0-100% Breite)
  
          // Setze die Animation mit CSS Variablen
          balloon.style.setProperty("--startX", `${startX}%`);
          balloon.style.setProperty("--endX", `${endX}%`);
          balloon.style.setProperty("--duration", `${duration}s`);
          balloon.style.setProperty("--delay", `${delay}s`);
        });
      },
    },
  };
  </script>
  
  <style scoped>
  .fullscreen-video {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    position: relative; /* Für absolute Positionierung der Ballons */
  }
  
  .fullscreen-video video {
    width: 100%;
    height: 100%;
    object-fit: cover; /* Video füllt den gesamten Container */
    position: absolute; /* Video ist hinter allen anderen Elementen */
    z-index: -1; /* Sicherstellen, dass das Video hinter den Ballons liegt */
  }
  
  .balloon {
    position: absolute;
    width: 50px;
    height: 70px;
    background-size: cover;
    background-position: center;
    animation: floatBalloon var(--duration) linear var(--delay) infinite;
    top: 100%; /* Startet unten am Viewport */
    left: var(--startX); /* Startet an zufälliger horizontaler Position */
  }
  
  /* Keyframes für die Animation */
  @keyframes floatBalloon {
    0% {
      transform: translateY(0) translateX(0);
    }
    100% {
      transform: translateY(-120vh) translateX(calc(var(--endX) - var(--startX)));
    }
  }
  </style>
  