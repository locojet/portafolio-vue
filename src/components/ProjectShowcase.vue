<template>
  <section ref="showcase" id="projects" class="project-showcase wraperr" aria-labelledby="projects-title">
    <div class="project-showcase__intro">
      <p>{{ eyebrow }}</p>
      <h2 id="projects-title">{{ title }}</h2>
    </div>

    <div
      ref="rail"
      class="project-showcase__rail"
      @focusin="pauseAutoplay"
      @focusout="resumeAutoplaySoon"
      @pointerdown="pauseAutoplay"
      @pointerup="resumeAutoplaySoon"
      @pointercancel="resumeAutoplaySoon"
      @touchstart.passive="pauseAutoplay"
      @touchend.passive="resumeAutoplaySoon"
      @wheel.passive="pauseAutoplayTemporarily"
      @scroll.passive="updateActiveProject"
    >
      <a
        v-for="(project, index) in projectItems"
        :key="project.title"
        class="project-card"
        :class="[
          { 'project-card--active': activeIndex === index },
          index % 2 === 0 ? 'project-card--from-left' : 'project-card--from-right'
        ]"
        :href="project.href"
        :aria-label="project.title"
        :target="project.href?.startsWith('http') ? '_blank' : undefined"
        :rel="project.href?.startsWith('http') ? 'noreferrer' : undefined"
      >
        <picture>
          <source type="image/avif" :srcset="project.image.avif" sizes="(max-width: 639px) 18.5rem, (max-width: 1024px) 62vw, 28vw" />
          <source type="image/webp" :srcset="project.image.webp" sizes="(max-width: 639px) 18.5rem, (max-width: 1024px) 62vw, 28vw" />
          <img
            :src="project.image.fallback"
            :alt="project.title"
            :width="project.image.width"
            :height="project.image.height"
            loading="lazy"
            decoding="async"
          />
        </picture>
        <span class="project-card__veil"></span>

        <span class="project-card__content">
          <span class="project-card__kicker">{{ project.kicker }}</span>
          <span class="project-card__title">{{ project.title }}</span>
          <span class="project-card__copy">{{ project.description }}</span>
        </span>
      </a>
    </div>
  </section>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import { imageAssets } from '../assets/optimized/media';

const defaultProjects = [
  {
    title: 'Sherpa East Studio',
    kicker: 'Website',
    description: 'Tonstudio / Berlin Höhenlage',
    href: 'https://locojet.github.io/sherpa-east-studio/',
    image: imageAssets.projectSherpa,
  },
  {
    title: 'Ladenie',
    kicker: 'Online Shop',
    description: 'Beauty Shop mit Produktübersicht',
    href: 'https://locojet.github.io/online-shop-ladenie/',
    image: imageAssets.projectLadenie,
  },
  {
    title: 'MCEKAT',
    kicker: 'Company Website',
    description: 'Industrial services and NDT overview',
    href: 'https://www.mcekat.com',
    image: imageAssets.projectMcekat,
  },
  {
    title: 'Empanada Society',
    kicker: 'Restaurant Website',
    description: 'Brand, food culture and reservation flow',
    href: 'https://locojet.github.io/Empanada-Society/',
    image: imageAssets.projectEmpanada,
  },
];

const props = defineProps({
  eyebrow: {
    type: String,
    default: 'Ausgewählte Projekte',
  },
  title: {
    type: String,
    default: 'Websites, die schon online sind.',
  },
  projects: {
    type: Array,
    default: null,
  },
  autoplayDelay: {
    type: Number,
    default: 3400,
  },
});

const projectItems = computed(() => (
  Array.isArray(props.projects) && props.projects.length > 0
    ? props.projects
    : defaultProjects
));

const rail = ref(null);
const showcase = ref(null);
const activeIndex = ref(0);

let autoplayTimer = 0;
let resumeId = 0;
let scrollFrame = 0;
let visibilityObserver = null;
let revealObserver = null;
let isInteracting = false;
let isInViewport = true;

const getCards = () => Array.from(rail.value?.querySelectorAll('.project-card') ?? []);

const scrollToProject = (index, behavior = 'smooth') => {
  const element = rail.value;
  const cards = getCards();
  const card = cards[index];

  if (!element || !card) return;

  const left = card.offsetLeft - (element.clientWidth - card.offsetWidth) / 2;
  element.scrollTo({ left, behavior });
  activeIndex.value = index;
};

const updateActiveProject = () => {
  if (scrollFrame) return;

  scrollFrame = requestAnimationFrame(() => {
    scrollFrame = 0;

    const element = rail.value;
    const cards = getCards();
    if (!element || cards.length === 0) return;

    const center = element.scrollLeft + element.clientWidth / 2;
    let closestIndex = 0;
    let closestDistance = Infinity;

    cards.forEach((card, index) => {
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const distance = Math.abs(center - cardCenter);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    activeIndex.value = closestIndex;
  });
};

const playNextProject = () => {
  if (isInteracting || document.hidden || !isInViewport) return;

  const cards = getCards();
  if (cards.length === 0) return;

  scrollToProject((activeIndex.value + 1) % cards.length);
};

const scheduleAutoplay = (delay = props.autoplayDelay) => {
  clearTimeout(autoplayTimer);

  if (isInteracting || document.hidden || !isInViewport) return;

  autoplayTimer = window.setTimeout(() => {
    playNextProject();
    scheduleAutoplay(props.autoplayDelay);
  }, delay);
};

const pauseAutoplay = () => {
  isInteracting = true;
  clearTimeout(autoplayTimer);
  clearTimeout(resumeId);
};

const resumeAutoplaySoon = () => {
  clearTimeout(resumeId);

  resumeId = window.setTimeout(() => {
    isInteracting = false;
    scheduleAutoplay(650);
  }, 1800);
};

const pauseAutoplayTemporarily = () => {
  pauseAutoplay();
  resumeAutoplaySoon();
};

const handleVisibilityChange = () => {
  if (document.hidden) {
    clearTimeout(autoplayTimer);
    return;
  }

  scheduleAutoplay(900);
};

onMounted(() => {
  scrollToProject(0, 'auto');

  const cards = getCards();

  if ('IntersectionObserver' in window) {
    revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add('project-card--visible');
        revealObserver?.unobserve(entry.target);
      });
    }, {
      rootMargin: '0px 0px -10% 0px',
      threshold: 0.18,
    });

    cards.forEach((card) => revealObserver.observe(card));
  } else {
    cards.forEach((card) => card.classList.add('project-card--visible'));
  }

  if ('IntersectionObserver' in window && showcase.value) {
    visibilityObserver = new IntersectionObserver(([entry]) => {
      isInViewport = entry.isIntersecting;

      if (isInViewport) {
        scheduleAutoplay(900);
      } else {
        clearTimeout(autoplayTimer);
      }
    }, { threshold: 0.2 });

    visibilityObserver.observe(showcase.value);
  } else {
    scheduleAutoplay(900);
  }

  document.addEventListener('visibilitychange', handleVisibilityChange);
});

onBeforeUnmount(() => {
  visibilityObserver?.disconnect();
  revealObserver?.disconnect();
  document.removeEventListener('visibilitychange', handleVisibilityChange);
  clearTimeout(autoplayTimer);
  clearTimeout(resumeId);

  if (scrollFrame) {
    cancelAnimationFrame(scrollFrame);
  }
});
</script>

<style scoped>
.wraperr {
  overflow-x: clip;
}

.project-showcase {
  background:
    radial-gradient(circle at 16% 18%, rgba(214, 147, 147, 0.2), rgba(214, 147, 147, 0) 30%),
    linear-gradient(180deg, #000 0%, #080606 54%, #000 100%);
  color: #fff;
  isolation: isolate;
  margin-top: -1px;
  padding: clamp(4.5rem, 9vw, 8rem) 0 clamp(4.5rem, 9vw, 8rem);
  position: relative;
  width: 100vw;
}

.project-showcase__intro {
  margin: 0 auto clamp(2rem, 4vw, 3.5rem);
  max-width: min(72rem, calc(100vw - clamp(2rem, 10vw, 9rem)));
}

.project-showcase__intro p {
  color: var(--quaternary-color);
  font-size: clamp(0.8rem, 1vw, 1rem);
  font-weight: 900;
  letter-spacing: 0;
  margin: 0 0 0.8rem;
  text-transform: uppercase;
}

.project-showcase__intro h2 {
  font-size: clamp(1.8rem, 3.4vw, 3.5rem);
  font-weight: 800;
  line-height: 1.08;
  margin: 0;
  max-width: 16ch;
}

.project-showcase__rail {
  display: flex;
  gap: clamp(1rem, 2.4vw, 2rem);
  overflow-x: auto;
  overflow-y: hidden;
  padding: 0 max(1.25rem, calc((100vw - min(72rem, 84vw)) / 2)) 0;
  scroll-behavior: smooth;
  scroll-padding-inline: max(1.25rem, calc((100vw - min(72rem, 84vw)) / 2));
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
}

.project-showcase__rail::-webkit-scrollbar {
  display: none;
}

.project-card {
  aspect-ratio: 4 / 5;
  border: 1px solid rgba(255, 218, 218, 0.14);
  border-radius: 8px;
  box-shadow: 0 1.6rem 4rem rgba(0, 0, 0, 0.42);
  display: block;
  flex: 0 0 clamp(16rem, 28vw, 25rem);
  max-height: clamp(24rem, 62svh, 35rem);
  min-height: 23rem;
  overflow: hidden;
  position: relative;
  scroll-snap-align: center;
  scroll-snap-stop: always;
  opacity: 0;
  transform: translate3d(0, 1rem, 0) scale(0.96);
  transition:
    border-color 260ms ease,
    opacity 680ms ease,
    transform 780ms cubic-bezier(0.22, 1, 0.36, 1);
  will-change: opacity, transform;
}

.project-card--from-left {
  transform: translate3d(-4rem, 1rem, 0) scale(0.96);
}

.project-card--from-right {
  transform: translate3d(4rem, 1rem, 0) scale(0.96);
}

.project-card--visible {
  opacity: 1;
  transform: translate3d(0, 0, 0) scale(0.96);
}

.project-card--active,
.project-card:focus-visible {
  border-color: rgba(255, 218, 218, 0.44);
  opacity: 1;
  transform: translate3d(0, 0, 0) scale(1);
}

.project-card picture,
.project-card img {
  display: block;
  height: 100%;
  width: 100%;
}

.project-card img {
  height: 100%;
  object-fit: cover;
  transform: scale(1.02);
  transition: transform 600ms ease;
}

.project-card:hover img,
.project-card:focus-visible img {
  transform: scale(1.07);
}

.project-card__veil {
  background:
    linear-gradient(180deg, rgba(0, 0, 0, 0.08) 0%, rgba(0, 0, 0, 0.18) 38%, rgba(0, 0, 0, 0.9) 100%),
    radial-gradient(circle at 20% 18%, rgba(214, 147, 147, 0.16), rgba(214, 147, 147, 0) 34%);
  inset: 0;
  position: absolute;
}

.project-card__content {
  bottom: 0;
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
  left: 0;
  padding: clamp(1.1rem, 2.2vw, 1.8rem);
  position: absolute;
  right: 0;
}

.project-card__kicker {
  color: rgba(255, 218, 218, 0.92);
  font-size: clamp(0.7rem, 0.9vw, 0.85rem);
  font-weight: 900;
  text-transform: uppercase;
}

.project-card__title {
  color: #fff;
  font-size: clamp(1.1rem, 1.55vw, 1.45rem);
  font-weight: 900;
  line-height: 1.1;
}

.project-card__copy {
  color: rgba(255, 255, 255, 0.78);
  font-size: clamp(0.82rem, 1vw, 0.95rem);
  line-height: 1.45;
  max-width: 28ch;
}

@media (max-width: 1024px) {
  .project-showcase {
    padding: clamp(4rem, 9svh, 6rem) 0;
  }

  .project-card {
    flex-basis: clamp(16.5rem, 62vw, 25rem);
  }
}

@media (max-width: 639px) {
  .project-showcase__intro {
    max-width: calc(100vw - 2rem);
  }

  .project-showcase__rail {
    gap: 1rem;
    padding-inline: max(1rem, calc((100vw - 18.5rem) / 2));
    scroll-padding-inline: max(1rem, calc((100vw - 18.5rem) / 2));
  }

  .project-card {
    flex-basis: min(18.5rem, calc(100vw - 2rem));
    min-height: 24rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .project-card,
  .project-card--from-left,
  .project-card--from-right,
  .project-card--visible,
  .project-card--active {
    opacity: 1;
    transform: none;
    transition:
      border-color 260ms ease,
      transform 260ms ease;
  }
}
</style>
