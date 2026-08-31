<template>
  <section ref="stickySection" id="presence" class="parent-element wraperr container-1">
    <!-- Sticky Video Element -->
    <div ref="stickyTrack" class="sticky-track">
      <div ref="stickyVideo" class="sticky-child">
        <video ref="video" autoplay muted playsinline loop preload="auto">
          <source src="../assets/Videos/timeline5.mp4" type="video/mp4" />
          Your browser does not support videos.
        </video>
      </div>
    </div>

    <!-- Content Section -->
    <div ref="helloContainer" class="hello-container">
      <div id="presence-state-wir" ref="meetYou" class="state-panel nicetomeetyou fade-in">
        <div class="state-content">
          <h2 style="font-family: 'myFont2', sans-serif;">Wir schaffen digitale Präsenz.</h2>
          <button class="state-arrow-button" type="button" aria-label="Zu Web Foto Film scrollen" @click="scrollToState('presence-state-web')">
            <span class="state-arrow"></span>
          </button>
        </div>
      </div>
      <div id="presence-state-web" ref="webDeveloper" class="state-panel nicetomeetyou1 fade-in">
        <div class="state-content">
          <h2 style="font-family: 'myFont2', sans-serif;">Web. Foto. Film.</h2>
          <button class="state-arrow-button" type="button" aria-label="Zu Services scrollen" @click="scrollToState('presence-services')">
            <span class="state-arrow"></span>
          </button>
        </div>
      </div>
    </div>

    <!-- Resto del contenido -->
    <div id="presence-services" ref="contentSection" class="content-section container-2">
      <div class="text-container">
        <h3 class="text-3xl text-white mb-8 text-center">Digitale Auftritte für Unternehmen, die gesehen werden wollen</h3>
        <div class="grid grid-cols-1 gap-x-8 gap-y-6 text-lg font-medium text-gray-300 sm:grid-cols-2 md:grid-cols-3 lg:gap-x-10">
          <div class="text-center">
            <i class="fas fa-laptop-code text-4xl text-white mb-4 animate-bounce"></i>
            <h4 class="text-xl font-semibold text-white">Webdesign & Entwicklung</h4>
            <p>Individuelle Websites, klare Benutzerführung, schnelle Ladezeiten und ein Auftritt, der auf Desktop, Tablet und Smartphone funktioniert.</p>
          </div>

          <div class="text-center">
            <i class="fas fa-camera text-4xl text-white mb-4 animate-bounce"></i>
            <h4 class="text-xl font-semibold text-white">Professionelle Fotografie</h4>
            <p>Echte Mitarbeiter, Räume, Produkte, Maschinen und Prozesse statt austauschbarer Stockfotos.</p>
          </div>

          <div class="text-center">
            <i class="fas fa-video text-4xl text-white mb-4 animate-pulse"></i>
            <h4 class="text-xl font-semibold text-white">Videoproduktion</h4>
            <p>Imagefilme, Recruiting-Videos, Produktclips, Reels und kurze Formate, die in Sekunden Vertrauen schaffen.</p>
          </div>

          <div class="text-center">
            <i class="fas fa-magic text-4xl text-white mb-4 animate-pulse"></i>
            <h4 class="text-xl font-semibold text-white">Content Creation</h4>
            <p>Aus einem Produktionstag entstehen Inhalte für Website, Social Media, Google Profile, Recruiting und Präsentationen.</p>
          </div>

          <div class="text-center">
            <i class="fas fa-fingerprint text-4xl text-white mb-4 animate-bounce"></i>
            <h4 class="text-xl font-semibold text-white">Authentische Positionierung</h4>
            <p>Wir zeigen digital, was Ihr Unternehmen in der Realität ausmacht: Menschen, Arbeit, Qualität und Haltung.</p>
          </div>

          <div class="text-center">
            <i class="fas fa-route text-4xl text-white mb-4 animate-pulse"></i>
            <h4 class="text-xl font-semibold text-white">Ein klarer Prozess</h4>
            <p>Kennenlernen, Konzept, Produktion, Entwicklung, Launch und auf Wunsch langfristige Weiterentwicklung.</p>
          </div>

          <div class="text-center">
            <i class="fas fa-store-alt text-4xl text-white mb-4 animate-bounce"></i>
            <h4 class="text-xl font-semibold text-white">Für echte Betriebe</h4>
            <p>Handwerk, Gastronomie, Fitness, Immobilien, Industrie, Dienstleister und lokale Unternehmen mit sichtbarer Qualität.</p>
          </div>

          <div class="text-center">
            <i class="fas fa-layer-group text-4xl text-white mb-4 animate-spin"></i>
            <h4 class="text-xl font-semibold text-white">Alles aus einer Hand</h4>
            <p>Eine Strategie, eine Bildsprache, ein Design, ein Ansprechpartner und ein fertiger digitaler Auftritt.</p>
          </div>

          <div ref="lastServiceCard" class="text-center">
            <i class="fas fa-comments text-4xl text-white mb-4 animate-pulse"></i>
            <h4 class="text-xl font-semibold text-white">Erstgespräch statt Preisliste</h4>
            <p>Wir starten mit einem Gespräch über Ziele, Wirkung und das Material, das Ihr Unternehmen wirklich sichtbar macht.</p>
          </div>
        </div>
      </div>
    </div>

   
  </section>
</template>

<script>
export default {
  name: "StickyVideoWithContent",
  data() {
    return {
      fadeObserver: null,
      resizeObserver: null,
      stickyHeightFrame: 0,
    };
  },
  mounted() {
    this.setupFadeObserver();
    this.setupStickyHeight();
  },
  beforeUnmount() {
    this.fadeObserver?.disconnect();
    this.resizeObserver?.disconnect();
    window.removeEventListener("resize", this.scheduleStickyHeightUpdate);
    window.removeEventListener("load", this.scheduleStickyHeightUpdate);

    if (this.stickyHeightFrame) {
      cancelAnimationFrame(this.stickyHeightFrame);
    }
  },
  methods: {
    setupFadeObserver() {
      const options = {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      };

      const callback = (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            entry.target.classList.remove("fade-out");
          } else {
            entry.target.classList.remove("visible");
            entry.target.classList.add("fade-out");
          }
        });
      };

      this.fadeObserver = new IntersectionObserver(callback, options);

      [this.$refs.meetYou, this.$refs.webDeveloper].forEach((element) => {
        if (element) {
          this.fadeObserver.observe(element);
        }
      });
    },
    setupStickyHeight() {
      this.resizeObserver = new ResizeObserver(this.scheduleStickyHeightUpdate);

      [
        this.$refs.helloContainer,
        this.$refs.meetYou,
        this.$refs.webDeveloper,
        this.$refs.contentSection,
        this.$refs.lastServiceCard,
      ].forEach((element) => {
        if (element) {
          this.resizeObserver.observe(element);
        }
      });

      window.addEventListener("resize", this.scheduleStickyHeightUpdate);
      window.addEventListener("load", this.scheduleStickyHeightUpdate, { once: true });
      document.fonts?.ready?.then(() => this.scheduleStickyHeightUpdate());
      this.scheduleStickyHeightUpdate();
    },
    scheduleStickyHeightUpdate() {
      if (this.stickyHeightFrame) return;

      this.stickyHeightFrame = requestAnimationFrame(() => {
        this.stickyHeightFrame = 0;
        this.updateStickyHeight();
      });
    },
    updateStickyHeight() {
      const section = this.$refs.stickySection;
      const stickyTrack = this.$refs.stickyTrack;
      const stickyVideo = this.$refs.stickyVideo;
      const lastServiceCard = this.$refs.lastServiceCard;

      if (!section || !stickyTrack || !stickyVideo) return;

      const sectionTop = section.getBoundingClientRect().top + window.scrollY;
      const contentNodes = [
        this.$refs.helloContainer,
        this.$refs.meetYou,
        this.$refs.webDeveloper,
        this.$refs.contentSection,
        lastServiceCard,
      ].filter(Boolean);
      const contentBottom = contentNodes.reduce((lowestPoint, element) => {
        const rect = element.getBoundingClientRect();
        return Math.max(lowestPoint, rect.bottom + window.scrollY - sectionTop);
      }, 0);
      const stickyHeight = stickyVideo.getBoundingClientRect().height || window.innerHeight;
      const lastCardTop = lastServiceCard
        ? lastServiceCard.getBoundingClientRect().top + window.scrollY - sectionTop
        : stickyHeight;
      const releasePoint = Math.min(Math.max(stickyHeight * 0.62, 280), stickyHeight - 96);
      const stickyReleaseScroll = Math.max(0, lastCardTop - releasePoint);
      const trackHeight = Math.ceil(
        Math.max(stickyHeight + 1, stickyReleaseScroll + stickyHeight)
      );
      const trailingGap = Math.min(Math.max(stickyHeight * 0.05, 28), 64);
      const sectionHeight = Math.ceil(Math.max(contentBottom + trailingGap, trackHeight));

      stickyTrack.style.setProperty("--presence-video-track-height", `${trackHeight}px`);
      section.style.setProperty("--presence-scroll-height", `${sectionHeight}px`);
    },
    scrollToState(targetId) {
      const target = document.getElementById(targetId);
      if (!target) return;

      window.scrollTo({
        top: target.getBoundingClientRect().top + window.scrollY,
        behavior: "smooth",
      });
    },
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
  --presence-intro-offset: clamp(75rem, 140dvh, 90rem);
  min-height: calc(var(--presence-intro-offset) + 200dvh);
  padding-top: var(--presence-intro-offset);
  position: relative;
  width: 100vw;
  z-index: 1;
}

.state-panel {
  align-items: center;
  display: flex;
  justify-content: center;
  min-height: 100dvh;
  padding: clamp(2rem, 5vw, 5rem);
  scroll-margin-top: 0;
  text-align: center;
}

.state-content {
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: clamp(2rem, 5dvh, 4rem);
  justify-content: center;
}

.nicetomeetyou,
.nicetomeetyou1 {
  font-size: clamp(0.82rem, 1.2vw, 1rem);
  margin-top: 0;
  text-align: center;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.48) 24%,
    rgba(0, 0, 0, 0.52) 50%,
    rgba(0, 0, 0, 0.48) 76%,
    rgba(0, 0, 0, 0) 100%
  );
  font-family: myFont2 !important;
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}

.nicetomeetyou1 {
  margin-top: 0;
}

.state-arrow-button {
  align-items: center;
  appearance: none;
  background: transparent;
  border: 0;
  cursor: pointer;
  display: flex;
  height: 5.5rem;
  justify-content: center;
  padding: 1rem;
  touch-action: manipulation;
  width: 5.5rem;
}

.state-arrow {
  animation: moveStateArrow 2s infinite alternate;
  border-bottom: 4px solid var(--primary-color);
  border-left: 4px solid var(--primary-color);
  display: block;
  height: 30px;
  transform: rotate(-45deg);
  width: 30px;
}

@keyframes moveStateArrow {
  0% {
    transform: translateY(0) rotate(-45deg);
  }
  100% {
    transform: translateY(20px) rotate(-45deg);
  }
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
  min-height: var(--presence-scroll-height, auto);
  isolation: isolate;
  position: relative;
  overflow: visible;
  width: 100%;
  height: auto;
  margin-top: -80rem;
}

.sticky-track {
  height: var(--presence-video-track-height, 100vh);
  left: 0;
  pointer-events: none;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 0;
}

.sticky-track::before {
  content: "";
  height: clamp(24rem, 58dvh, 38rem);
  left: 0;
  pointer-events: none;
  position: absolute;
  right: 0;
  top: clamp(-20rem, -30dvh, -9rem);
  z-index: 2;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.68) 42%,
    rgba(0, 0, 0, 0.36) 70%,
    rgba(0, 0, 0, 0) 100%
  );
}

.sticky-child {
  position: sticky;
  top: 0;
  height: 100vh;
  width: 100vw;
  background-color: black;
  z-index: 0;
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

.sticky-child::after {
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.45) 48%,
    #000 100%
  );
  bottom: 0;
  content: "";
  height: clamp(10rem, 28dvh, 18rem);
  left: 0;
  pointer-events: none;
  position: absolute;
  right: 0;
  z-index: 3;
}

.content-section {
  position: relative;
  z-index: 1;
  color: white;
  padding-top: 2rem;
  top: 0;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.68) 12%,
    rgba(0, 0, 0, 0.72) 50%,
    rgba(0, 0, 0, 0.68) 88%,
    rgba(0, 0, 0, 0) 100%
  );
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
  .hello-container {
    --presence-intro-offset: clamp(38rem, 72dvh, 52rem);
  }

  .nicetomeetyou,
  .nicetomeetyou1 {
    font-size: clamp(0.76rem, 2vw, 0.92rem);
  }

  .sticky-child::before {
    background: radial-gradient(circle, transparent, rgba(0, 0, 0, 1) 100%);
    height: 110vh;
  }

  .parent-element {
    min-height: var(--presence-scroll-height, auto);
    height: auto;
    margin-top: -50rem;
  }

  .sticky-child {
    height: 100vh;
  }

  .content-section {
    padding: 1rem;
    top: 0;
    margin-top: 0;
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
