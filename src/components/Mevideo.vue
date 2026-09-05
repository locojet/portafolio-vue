<template>
  <section ref="stickySection" id="presence" class="parent-element wraperr container-1">
    <!-- Sticky Video Element -->
    <div ref="stickyTrack" class="sticky-track">
      <div
        ref="stickyVideo"
        class="sticky-child"
        :class="{ 'sticky-child--video-visible': isPresenceVideoVisible }"
      >
        <video
          ref="video"
          autoplay
          muted
          playsinline
          webkit-playsinline
          loop
          preload="none"
          :poster="isPresenceVideoLoaded ? timelinePoster : undefined"
        >
          <source
            v-if="isPresenceVideoLoaded"
            :src="timelineMobile"
            type="video/mp4"
            media="(max-width: 639px)"
          />
          <source
            v-if="isPresenceVideoLoaded"
            :src="timelineTablet"
            type="video/mp4"
            media="(min-width: 640px) and (max-width: 1024px)"
          />
          <source
            v-if="isPresenceVideoLoaded"
            :src="timelineDesktop"
            type="video/mp4"
          />
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
    <div
      id="presence-services"
      ref="contentSection"
      class="content-section container-2"
      :class="{ 'content-section--services-active': serviceHeadingHidden }"
    >
      <div class="services-sticky">
        <div class="text-container">
          <h3 class="services-heading text-3xl text-white text-center">Digitale Auftritte für Unternehmen, die gesehen werden wollen</h3>
          <div ref="servicesTrack" class="services-track">
            <article class="service-slide" :class="{ 'service-slide--active': activeServiceIndex === 0 }">
            <span class="service-icon service-icon--web service-icon--bounce" aria-hidden="true"></span>
            <h4 class="text-xl font-semibold text-white">Webdesign & Entwicklung</h4>
            <p>Individuelle Websites mit klarer Benutzerführung, schnellem Aufbau, responsivem Design und einem Kontaktbereich, der Vertrauen schafft.</p>
            </article>

            <article class="service-slide" :class="{ 'service-slide--active': activeServiceIndex === 1 }">
            <span class="service-icon service-icon--camera service-icon--bounce" aria-hidden="true"></span>
            <h4 class="text-xl font-semibold text-white">Foto, Drohne & Bildsprache</h4>
            <p>Echte Mitarbeiter, Räume, Produkte, Maschinen, Prozesse und Drohnenflüge für starke Luftperspektiven statt austauschbarer Stockfotos.</p>
            </article>

            <article class="service-slide" :class="{ 'service-slide--active': activeServiceIndex === 2 }">
            <span class="service-icon service-icon--video service-icon--pulse" aria-hidden="true"></span>
            <h4 class="text-xl font-semibold text-white">Video & Reels</h4>
            <p>Imagefilme, Recruiting-Videos, Produktclips, Reels und kurze Formate, die mit Bewegung, Stimme und Atmosphäre sichtbar machen.</p>
            </article>

            <article class="service-slide" :class="{ 'service-slide--active': activeServiceIndex === 3 }">
            <span class="service-icon service-icon--spark service-icon--pulse" aria-hidden="true"></span>
            <h4 class="text-xl font-semibold text-white">Content Creation</h4>
            <p>Aus einem Produktionstag entstehen Inhalte für Website, Social Media, Google Profile, Recruiting, Präsentationen und laufende Kommunikation.</p>
            </article>

            <article ref="lastServiceCard" class="service-slide" :class="{ 'service-slide--active': activeServiceIndex === 4 }">
            <span class="service-icon service-icon--route service-icon--pulse" aria-hidden="true"></span>
            <h4 class="text-xl font-semibold text-white">Strategie & Komplettauftritt</h4>
            <p>Kennenlernen, Konzept, Produktion, Entwicklung, Launch und ein fertiger digitaler Auftritt aus einer Hand.</p>
            </article>
          </div>
        </div>
      </div>
    </div>

   
  </section>
</template>

<script>
import timelinePoster from '../assets/optimized/img/timeline5-poster-640.webp';
import timelineDesktop from '../assets/optimized/videos/timeline5-1080.mp4';
import timelineMobile from '../assets/optimized/videos/timeline5-540.mp4';

export default {
  name: "StickyVideoWithContent",
  data() {
    return {
      fadeObserver: null,
      resizeObserver: null,
      serviceResizeObserver: null,
      videoLoadObserver: null,
      stickyHeightFrame: 0,
      serviceScrollFrame: 0,
      serviceStartTranslate: 0,
      serviceEndTranslate: 0,
      serviceTranslateDistance: 0,
      stableViewportHeight: 0,
      stableViewportWidth: 0,
      activeServiceIndex: 0,
      serviceHeadingHidden: false,
      isPresenceVideoLoaded: false,
      isPresenceVideoVisible: false,
      timelineDesktop,
      timelineMobile,
      timelinePoster,
      timelineTablet: timelineDesktop,
    };
  },
  mounted() {
    this.refreshStableViewportMetrics(true);
    this.setupFadeObserver();
    this.setupStickyHeight();
    this.setupServiceScroll();
    this.setupPresenceVideoLoading();
    window.addEventListener("resize", this.handleViewportResize);
    window.addEventListener("orientationchange", this.handleViewportResize);
  },
  beforeUnmount() {
    this.fadeObserver?.disconnect();
    this.resizeObserver?.disconnect();
    this.serviceResizeObserver?.disconnect();
    this.videoLoadObserver?.disconnect();
    window.removeEventListener("load", this.scheduleStickyHeightUpdate);
    window.removeEventListener("scroll", this.scheduleServiceScrollPosition);
    window.removeEventListener("load", this.updateServiceMeasurements);
    window.removeEventListener("resize", this.handleViewportResize);
    window.removeEventListener("orientationchange", this.handleViewportResize);

    if (this.stickyHeightFrame) {
      cancelAnimationFrame(this.stickyHeightFrame);
    }

    if (this.serviceScrollFrame) {
      cancelAnimationFrame(this.serviceScrollFrame);
    }

  },
  methods: {
    isMobileViewport() {
      return window.innerWidth <= 639;
    },
    refreshStableViewportMetrics(force = false) {
      const nextWidth =
        window.innerWidth ||
        document.documentElement.clientWidth ||
        0;
      const nextHeight =
        window.innerHeight ||
        document.documentElement.clientHeight ||
        1;
      const widthChanged =
        Math.abs(nextWidth - this.stableViewportWidth) > 24;

      if (
        force ||
        !this.stableViewportHeight ||
        !this.isMobileViewport() ||
        widthChanged
      ) {
        this.stableViewportWidth = nextWidth;
        this.stableViewportHeight = nextHeight;
      }
    },
    getViewportHeight() {
      if (this.isMobileViewport()) {
        return (
          this.stableViewportHeight ||
          document.documentElement.clientHeight ||
          window.innerHeight ||
          1
        );
      }

      return (
        window.innerHeight ||
        document.documentElement.clientHeight ||
        1
      );
    },
    handleViewportResize() {
      const nextWidth =
        window.innerWidth ||
        document.documentElement.clientWidth ||
        0;
      const widthChanged =
        Math.abs(nextWidth - this.stableViewportWidth) > 24;

      if (this.isMobileViewport() && !widthChanged) {
        return;
      }

      this.refreshStableViewportMetrics(true);
      this.scheduleStickyHeightUpdate();
      this.updateServiceMeasurements();
    },
    setupPresenceVideoLoading() {
      const trigger = this.$refs.webDeveloper;

      const loadVideo = () => {
        this.isPresenceVideoVisible = true;

        if (this.isPresenceVideoLoaded) return;

        this.isPresenceVideoLoaded = true;

        this.$nextTick(() => {
          const video = this.$refs.video;

          if (!video) return;

          video.muted = true;
          video.defaultMuted = true;
          video.playsInline = true;
          video.setAttribute("muted", "");
          video.setAttribute("playsinline", "");
          video.setAttribute("webkit-playsinline", "");
          video.load();
          video.play?.().catch(() => undefined);
        });
      };

      if ("IntersectionObserver" in window && trigger) {
        this.videoLoadObserver = new IntersectionObserver(([entry]) => {
          if (!entry.isIntersecting) return;

          loadVideo();
          this.videoLoadObserver?.disconnect();
        }, {
          rootMargin: "0px 0px -18% 0px",
          threshold: 0.08,
        });

        this.videoLoadObserver.observe(trigger);
        return;
      }

      loadVideo();
    },
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
        this.$refs.servicesTrack,
        this.$refs.lastServiceCard,
      ].forEach((element) => {
        if (element) {
          this.resizeObserver.observe(element);
        }
      });

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
      const viewportHeight = this.getViewportHeight();
      const stickyHeight = stickyVideo.getBoundingClientRect().height || viewportHeight;
      const lastCardTop = lastServiceCard
        ? lastServiceCard.getBoundingClientRect().top + window.scrollY - sectionTop
        : stickyHeight;
      const releasePoint = Math.min(Math.max(stickyHeight * 0.62, 280), stickyHeight - 96);
      const stickyReleaseScroll = Math.max(0, lastCardTop - releasePoint);
      const trackHeight = Math.ceil(
        Math.max(stickyHeight + 1, stickyReleaseScroll + stickyHeight, contentBottom)
      );
      const trailingGap = Math.min(Math.max(stickyHeight * 0.05, 28), 64);
      const sectionHeight = Math.ceil(Math.max(contentBottom + trailingGap, trackHeight));

      stickyTrack.style.setProperty("--presence-video-track-height", `${trackHeight}px`);
      section.style.setProperty("--presence-scroll-height", `${sectionHeight}px`);
    },
    setupServiceScroll() {
      this.$nextTick(() => {
        const track = this.$refs.servicesTrack;
        const section = this.$refs.contentSection;

        if (!track || !section) return;

        this.serviceResizeObserver = new ResizeObserver(this.updateServiceMeasurements);
        this.serviceResizeObserver.observe(track);
        this.serviceResizeObserver.observe(section);

        window.addEventListener("scroll", this.scheduleServiceScrollPosition, { passive: true });
        window.addEventListener("load", this.updateServiceMeasurements, { once: true });
        document.fonts?.ready?.then(() => this.updateServiceMeasurements());

        this.updateServiceMeasurements();
      });
    },
    updateServiceMeasurements() {
      const section = this.$refs.contentSection;
      const track = this.$refs.servicesTrack;

      if (!section || !track) return;

      const viewportWidth = section.clientWidth || window.innerWidth;
      const viewportHeight = this.getViewportHeight();
      const services = track.querySelectorAll(".service-slide");
      const firstService = services[0];
      const lastService = services[services.length - 1];

      if (!firstService || !lastService) return;

      const viewportCenter = viewportWidth / 2;
      const firstServiceCenter = firstService.offsetLeft + firstService.offsetWidth / 2;
      const lastServiceCenter = lastService.offsetLeft + lastService.offsetWidth / 2;

      this.serviceStartTranslate = viewportCenter - firstServiceCenter;
      this.serviceEndTranslate = viewportCenter - lastServiceCenter;
      this.serviceTranslateDistance = Math.abs(this.serviceEndTranslate - this.serviceStartTranslate);

      section.style.setProperty(
        "--services-scroll-height",
        `${Math.ceil(viewportHeight + this.serviceTranslateDistance)}px`
      );

      this.scheduleServiceScrollPosition();
      this.scheduleStickyHeightUpdate();
    },
    scheduleServiceScrollPosition() {
      if (this.serviceScrollFrame) return;

      this.serviceScrollFrame = requestAnimationFrame(() => {
        this.serviceScrollFrame = 0;
        this.applyServiceScrollPosition();
      });
    },
    applyServiceScrollPosition() {
      const section = this.$refs.contentSection;
      const track = this.$refs.servicesTrack;

      if (!section || !track) return;

      const viewportHeight = this.getViewportHeight();
      const scrollableDistance = Math.max(section.offsetHeight - viewportHeight, 1);
      const rect = section.getBoundingClientRect();
      const rawProgress = -rect.top / scrollableDistance;
      const progress = Math.min(Math.max(rawProgress, 0), 1);
      const currentTranslate = this.serviceStartTranslate
        + (this.serviceEndTranslate - this.serviceStartTranslate) * progress;
      const diagonalDistance = Math.min(Math.max(viewportHeight * 0.26, 96), 240);
      const currentDiagonal = (progress - 0.5) * diagonalDistance;
      const serviceCount = track.querySelectorAll(".service-slide").length;

      if (serviceCount > 0) {
        this.activeServiceIndex = Math.min(
          Math.max(Math.round(progress * (serviceCount - 1)), 0),
          serviceCount - 1
        );
      }

      this.serviceHeadingHidden = rect.top <= 0 && rect.bottom >= viewportHeight;
      track.style.setProperty("--services-scroll-x", `${currentTranslate}px`);
      track.style.setProperty("--services-scroll-y", `${currentDiagonal}px`);
      this.updateServiceMenuVisibility(track, currentTranslate);
    },
    updateServiceMenuVisibility(track, currentTranslate) {
      const slides = [...track.querySelectorAll(".service-slide")];
      const desktopNav = document.querySelector(".desktop-nav.desktop-nav--visible");
      const usesPersistentNavigation = window.innerWidth >= 640;

      if (!desktopNav || !usesPersistentNavigation) {
        slides.forEach((slide) => {
          slide.style.removeProperty("--service-menu-opacity");
        });
        return;
      }

      const navRight = desktopNav.getBoundingClientRect().right;
      const fadeDistance = Math.min(Math.max(window.innerWidth * 0.05, 54), 86);

      slides.forEach((slide) => {
        const visualContentWidth = [...slide.children].reduce((width, child) => {
          return Math.max(width, child.getBoundingClientRect().width);
        }, 220);
        const contentHalfWidth = visualContentWidth / 2;
        const fullyHiddenAt = navRight + contentHalfWidth + 18;
        const fadeStartsAt = fullyHiddenAt + fadeDistance;
        const slideCenter = currentTranslate + slide.offsetLeft + slide.offsetWidth / 2;
        const opacity = Math.min(
          Math.max((slideCenter - fullyHiddenAt) / (fadeStartsAt - fullyHiddenAt), 0),
          1
        );

        slide.style.setProperty("--service-menu-opacity", opacity.toFixed(3));
      });
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
  background: #000;
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
  opacity: 0;
  position: sticky;
  top: 0;
  height: 100vh;
  width: 100vw;
  background-color: black;
  z-index: 0;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  transition: opacity 1.8s ease;
}

.sticky-child--video-visible {
  opacity: 1;
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
  min-height: var(--services-scroll-height, 100dvh);
  padding: 0;
  scroll-margin-top: clamp(6rem, 12svh, 9rem);
  top: 0;
  background: transparent;
}

.services-sticky {
  align-items: center;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.74) 18%,
    rgba(0, 0, 0, 0.78) 50%,
    rgba(0, 0, 0, 0.74) 82%,
    #000 100%
  );
  display: flex;
  height: 100dvh;
  overflow: hidden;
  position: sticky;
  top: 0;
  width: 100vw;
}

.content-section p {
  text-align: center;
}

.text-container {
  align-items: center;
  display: flex;
  height: 100%;
  padding: clamp(5rem, 10dvh, 7rem) 0 clamp(3rem, 6dvh, 5rem);
  position: relative;
  width: 100%;
}

.services-heading {
  left: 50%;
  line-height: 1.2;
  margin: 0;
  max-width: min(84vw, 54rem);
  position: absolute;
  top: clamp(2rem, 6dvh, 4.5rem);
  transform: translateX(-50%);
  transition:
    opacity 260ms ease,
    transform 320ms ease;
  width: max-content;
}

.services-track {
  display: flex;
  flex: 0 0 auto;
  gap: 0;
  padding: 0;
  transform: translate3d(var(--services-scroll-x, 0px), var(--services-scroll-y, 0px), 0);
  will-change: transform;
}

.service-slide {
  align-items: center;
  display: flex;
  --service-slide-width: 84vw;
  flex: 0 0 var(--service-slide-width);
  flex-direction: column;
  justify-content: center;
  min-height: clamp(16rem, 42dvh, 24rem);
  opacity: var(--service-menu-opacity, 1);
  padding: clamp(1.4rem, 4vw, 3rem) max(1.25rem, 8vw);
  pointer-events: none;
  text-align: center;
  transform: translateY(0) scale(1);
  transition:
    opacity 170ms linear,
    transform 280ms ease;
  visibility: visible;
}

.service-slide--active {
  opacity: var(--service-menu-opacity, 1);
  pointer-events: auto;
  transform: translateY(0) scale(1);
  visibility: visible;
}

.service-slide h4 {
  margin: 0 0 clamp(0.85rem, 2dvh, 1.2rem);
}

.service-icon {
  color: #fff;
  display: block;
  height: clamp(2.2rem, 5dvh, 3rem);
  margin-bottom: clamp(0.9rem, 2.4dvh, 1.4rem);
  position: relative;
  width: clamp(2.2rem, 5dvh, 3rem);
}

.service-icon::before,
.service-icon::after {
  content: "";
  position: absolute;
}

.service-icon--web::before {
  border: 0.24rem solid currentColor;
  border-radius: 0.2rem;
  height: 58%;
  left: 10%;
  top: 8%;
  width: 80%;
}

.service-icon--web::after {
  background: currentColor;
  border-radius: 999px;
  bottom: 12%;
  height: 0.28rem;
  left: 4%;
  width: 92%;
}

.service-icon--camera::before {
  border: 0.24rem solid currentColor;
  border-radius: 0.36rem;
  height: 62%;
  left: 5%;
  top: 22%;
  width: 90%;
}

.service-icon--camera::after {
  border: 0.26rem solid currentColor;
  border-radius: 999px;
  height: 38%;
  left: 31%;
  top: 34%;
  width: 38%;
}

.service-icon--video::before {
  border: 0.24rem solid currentColor;
  border-radius: 0.28rem;
  height: 58%;
  left: 8%;
  top: 20%;
  width: 62%;
}

.service-icon--video::after {
  border-bottom: 0.62rem solid transparent;
  border-left: 0.9rem solid currentColor;
  border-top: 0.62rem solid transparent;
  right: 4%;
  top: 32%;
}

.service-icon--spark::before {
  background: currentColor;
  border-radius: 999px;
  height: 86%;
  left: 47%;
  top: 7%;
  transform: rotate(36deg);
  width: 0.24rem;
}

.service-icon--spark::after {
  background: currentColor;
  border-radius: 999px;
  height: 0.24rem;
  left: 7%;
  top: 47%;
  transform: rotate(36deg);
  width: 86%;
}

.service-icon--route::before {
  border: 0.22rem solid currentColor;
  border-bottom: 0;
  border-left: 0;
  border-radius: 0 1.4rem 0 0;
  height: 62%;
  left: 16%;
  top: 15%;
  transform: rotate(18deg);
  width: 62%;
}

.service-icon--route::after {
  background:
    radial-gradient(circle, currentColor 0 45%, transparent 48%) 0 0 / 50% 50%;
  height: 74%;
  left: 10%;
  top: 12%;
  width: 74%;
}

.service-icon--bounce {
  animation: serviceIconFloat 1.5s ease-in-out infinite alternate;
}

.service-icon--pulse {
  animation: serviceIconPulse 1.8s ease-in-out infinite;
}

@keyframes serviceIconFloat {
  from {
    transform: translateY(0);
  }

  to {
    transform: translateY(-0.55rem);
  }
}

@keyframes serviceIconPulse {
  0%,
  100% {
    opacity: 0.7;
    transform: scale(0.96);
  }

  50% {
    opacity: 1;
    transform: scale(1.05);
  }
}

.service-slide p {
  line-height: 1.55;
  margin: 0 auto;
  max-width: 30rem;
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
@media (min-width: 640px) and (max-width: 1024px) {
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
    padding: 0;
    top: 0;
    margin-top: 0;
    scroll-margin-top: clamp(9rem, 24svh, 14rem);
  }

  .text-container {
    padding: clamp(5rem, 11dvh, 7rem) 0 clamp(3rem, 6dvh, 4rem);
  }

  .services-heading {
    font-size: clamp(1.25rem, 3.4vw, 2rem);
    max-width: min(84vw, 42rem);
    top: clamp(2rem, 5dvh, 3.5rem);
    width: auto;
  }

  .content-section--services-active .services-heading {
    opacity: 0;
    transform: translate(-50%, -7rem);
  }

  .services-track {
    gap: 0;
    padding: 0;
  }

  .service-slide {
    flex-basis: 100vw;
    min-height: clamp(18rem, 52dvh, 25rem);
    padding: clamp(1.25rem, 4vw, 2rem);
  }

  .service-card {
    width: 100%;
    margin: 0 auto;
    padding: 0px;
  }
}

@media (max-width: 639px) {
  .hello-container {
    --presence-intro-offset: clamp(38rem, 72svh, 52rem);
    min-height: calc(var(--presence-intro-offset) + 200svh);
  }

  .state-panel {
    min-height: 100svh;
  }

  .state-content {
    gap: clamp(2rem, 5svh, 4rem);
  }

  .nicetomeetyou,
  .nicetomeetyou1 {
    font-size: clamp(0.76rem, 2vw, 0.92rem);
  }

  .sticky-child::before {
    background: radial-gradient(circle, transparent, rgba(0, 0, 0, 1) 100%);
    height: 110svh;
  }

  .sticky-track {
    height: var(--presence-video-track-height, 100svh);
  }

  .sticky-track::before {
    height: clamp(24rem, 58svh, 38rem);
    top: clamp(-20rem, -30svh, -9rem);
  }

  .parent-element {
    min-height: var(--presence-scroll-height, auto);
    height: auto;
    margin-top: -50rem;
  }

  .sticky-child {
    height: 100svh;
  }

  .sticky-child video {
    height: 100svh;
  }

  .sticky-child::after {
    height: clamp(10rem, 28svh, 18rem);
  }

  .content-section {
    min-height: var(--services-scroll-height, 100svh);
    padding: 0;
    top: 0;
    margin-top: 0;
    scroll-margin-top: clamp(9rem, 24svh, 14rem);
  }

  .services-sticky {
    height: 100svh;
  }

  .text-container {
    padding: clamp(5rem, 11svh, 7rem) 0 clamp(3rem, 6svh, 4rem);
  }

  .services-heading {
    font-size: clamp(1rem, 5.4vw, 1.45rem);
    max-width: 88vw;
    top: clamp(2rem, 5svh, 3.5rem);
    width: auto;
  }

  .content-section--services-active .services-heading {
    opacity: 0;
    transform: translate(-50%, -7rem);
  }

  .services-track {
    gap: 0;
    padding: 0;
  }

  .service-slide {
    flex-basis: 100vw;
    min-height: clamp(16rem, 50svh, 22rem);
    padding: 1.35rem;
  }

  .service-slide p {
    font-size: clamp(0.95rem, 4.2vw, 1.1rem);
  }

  .service-card {
    width: 100%;
    margin: 0 auto;
    padding: 0px;
  }
}
</style>
