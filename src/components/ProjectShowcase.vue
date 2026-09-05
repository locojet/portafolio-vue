<template>
  <section ref="showcase" id="projects" class="project-showcase wraperr" aria-labelledby="projects-title">
    <div class="project-showcase__intro">
      <p>{{ eyebrow }}</p>
      <h2 id="projects-title">{{ title }}</h2>
    </div>

    <div class="project-showcase__carousel">
      <div
        ref="rail"
        class="project-showcase__rail"
        @focusin="pauseAutoplay"
        @focusout="resumeAutoplaySoon"
        @pointerdown="handlePointerDown"
        @pointermove="handlePointerMove"
        @pointerup="handlePointerUp"
        @pointerleave="handlePointerUp"
        @pointercancel="handlePointerCancel"
        @click.capture="handleClickCapture"
        @dragstart.prevent
        @touchstart.passive="pauseAutoplay"
        @touchend.passive="resumeAutoplaySoon"
        @wheel.passive="pauseAutoplayTemporarily"
        @scroll.passive="handleRailScroll"
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
          :aria-current="activeIndex === index ? 'true' : undefined"
          :aria-label="project.title"
          :target="project.href?.startsWith('http') ? '_blank' : undefined"
          :rel="project.href?.startsWith('http') ? 'noreferrer' : undefined"
        >
          <picture>
            <source type="image/avif" :srcset="project.image.avif" sizes="(max-width: 639px) 56vw, (max-width: 1024px) 46vw, 400px" />
            <source type="image/webp" :srcset="project.image.webp" sizes="(max-width: 639px) 56vw, (max-width: 1024px) 46vw, 400px" />
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
let snapTimer = 0;
let visibilityObserver = null;
let revealObserver = null;
let railResizeObserver = null;
let isInteracting = false;
let isInViewport = true;
let isPointerDragging = false;
let dragStartX = 0;
let dragStartScrollLeft = 0;
let hasDragged = false;
let shouldCancelClick = false;
let isSnapping = false;
let snapReleaseTimer = 0;
let lastRailWidth = 0;

const getCards = () => Array.from(rail.value?.querySelectorAll('.project-card') ?? []);

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const getClosestProjectIndex = () => {
  const element = rail.value;
  const cards = getCards();

  if (!element || cards.length === 0) return activeIndex.value;

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

  return closestIndex;
};

const updateProjectStyles = (closestIndex = getClosestProjectIndex()) => {
  const element = rail.value;
  const cards = getCards();

  if (!element || cards.length === 0) return;

  const railCenter = element.scrollLeft + element.clientWidth / 2;
  const cardStep = cards.length > 1
    ? Math.max(Math.abs(cards[1].offsetLeft - cards[0].offsetLeft), 1)
    : Math.max(cards[0].offsetWidth, 1);

  cards.forEach((card, index) => {
    const cardCenter = card.offsetLeft + card.offsetWidth / 2;
    const relativePosition = (cardCenter - railCenter) / cardStep;
    const clampedPosition = clamp(relativePosition, -1.35, 1.35);
    const distance = Math.min(Math.abs(relativePosition), 2);
    const isCenter = index === closestIndex;
    const rotateY = isCenter ? 0 : clamp(-clampedPosition * 11, -12, 12);
    const scale = isCenter ? 1.02 : clamp(1 - distance * 0.07, 0.88, 0.96);
    const translateZ = isCenter ? 34 : clamp(12 - distance * 30, -42, 10);
    const opacity = isCenter ? 1 : clamp(0.9 - distance * 0.18, 0.34, 0.78);

    card.style.setProperty('--project-rotate-y', `${rotateY.toFixed(2)}deg`);
    card.style.setProperty('--project-scale', scale.toFixed(3));
    card.style.setProperty('--project-z', `${translateZ.toFixed(1)}px`);
    card.style.setProperty('--project-visual-opacity', opacity.toFixed(3));
    card.classList.toggle('project-card--is-center', isCenter);
    card.classList.toggle('project-card--is-left', relativePosition < -0.12);
    card.classList.toggle('project-card--is-right', relativePosition > 0.12);
  });
};

const scrollToProject = (index, behavior = 'smooth') => {
  const element = rail.value;
  const cards = getCards();
  const card = cards[index];

  if (!element || !card) return;

  const left = card.offsetLeft - (element.clientWidth - card.offsetWidth) / 2;
  isSnapping = behavior !== 'auto';
  clearTimeout(snapReleaseTimer);
  clearTimeout(snapTimer);
  element.scrollTo({ left, behavior });
  activeIndex.value = index;
  updateProjectStyles(index);

  if (behavior === 'auto') {
    isSnapping = false;
    return;
  }

  snapReleaseTimer = window.setTimeout(() => {
    isSnapping = false;
  }, 520);
};

const updateActiveProject = () => {
  if (scrollFrame) return;

  scrollFrame = requestAnimationFrame(() => {
    scrollFrame = 0;

    const element = rail.value;
    const cards = getCards();
    if (!element || cards.length === 0) return;

    const closestIndex = getClosestProjectIndex();

    activeIndex.value = closestIndex;
    updateProjectStyles(closestIndex);
  });
};

const snapToClosestProject = (behavior = 'smooth') => {
  const cards = getCards();

  if (cards.length === 0) return;

  scrollToProject(getClosestProjectIndex(), behavior);
};

const scheduleSnapAfterScroll = () => {
  if (isSnapping || isPointerDragging) return;

  clearTimeout(snapTimer);
  snapTimer = window.setTimeout(() => {
    snapToClosestProject('smooth');
  }, 150);
};

const handleRailScroll = () => {
  updateActiveProject();
  scheduleSnapAfterScroll();
};

const handleRailScrollEnd = () => {
  if (isPointerDragging) return;

  snapToClosestProject('smooth');
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

const handlePointerDown = (event) => {
  pauseAutoplay();

  if (event.pointerType !== 'mouse') return;

  const element = rail.value;
  if (!element) return;

  isPointerDragging = true;
  hasDragged = false;
  shouldCancelClick = false;
  dragStartX = event.clientX;
  dragStartScrollLeft = element.scrollLeft;
  element.classList.add('project-showcase__rail--dragging');
  element.setPointerCapture?.(event.pointerId);
};

const handlePointerMove = (event) => {
  const element = rail.value;

  if (!isPointerDragging || !element) return;

  const deltaX = event.clientX - dragStartX;

  if (Math.abs(deltaX) > 4) {
    hasDragged = true;
    shouldCancelClick = true;
  }

  if (!hasDragged) return;

  event.preventDefault();
  element.scrollLeft = dragStartScrollLeft - deltaX;
};

const finishPointerDrag = (event) => {
  const element = rail.value;

  if (isPointerDragging && element) {
    element.classList.remove('project-showcase__rail--dragging');
    element.releasePointerCapture?.(event.pointerId);
    isPointerDragging = false;
    snapToClosestProject('smooth');
  }

  resumeAutoplaySoon();
};

const handlePointerUp = (event) => {
  finishPointerDrag(event);
};

const handlePointerCancel = (event) => {
  finishPointerDrag(event);
};

const handleClickCapture = (event) => {
  if (!shouldCancelClick) return;

  event.preventDefault();
  event.stopPropagation();
  shouldCancelClick = false;
};

const syncRailAfterResize = () => {
  const element = rail.value;
  if (!element) return;

  const width = Math.round(element.clientWidth);

  if (!width || width === lastRailWidth) {
    updateProjectStyles(activeIndex.value);
    return;
  }

  lastRailWidth = width;
  scrollToProject(activeIndex.value, 'auto');
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
  syncRailAfterResize();

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

  if ('ResizeObserver' in window && rail.value) {
    railResizeObserver = new ResizeObserver(syncRailAfterResize);
    railResizeObserver.observe(rail.value);
  }

  rail.value?.addEventListener('scrollend', handleRailScrollEnd, { passive: true });
  document.addEventListener('visibilitychange', handleVisibilityChange);
});

onBeforeUnmount(() => {
  visibilityObserver?.disconnect();
  revealObserver?.disconnect();
  railResizeObserver?.disconnect();
  rail.value?.removeEventListener('scrollend', handleRailScrollEnd);
  document.removeEventListener('visibilitychange', handleVisibilityChange);
  clearTimeout(autoplayTimer);
  clearTimeout(resumeId);
  clearTimeout(snapTimer);
  clearTimeout(snapReleaseTimer);

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
  --project-card-gap: clamp(1.4rem, 3vw, 2rem);
  --project-card-width: clamp(18rem, 42vw, 25rem);
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

.project-showcase__carousel {
  margin: 0 auto;
  max-width: min(58rem, 100vw);
  overflow: clip;
  perspective: 1050px;
  perspective-origin: center center;
  position: relative;
  width: 100%;
}

.project-showcase__rail {
  cursor: grab;
  display: flex;
  gap: var(--project-card-gap);
  overflow-x: auto;
  overflow-y: hidden;
  overscroll-behavior-inline: contain;
  padding: clamp(0.8rem, 2vw, 1.4rem) max(1.25rem, calc((100% - var(--project-card-width)) / 2));
  scroll-behavior: smooth;
  scroll-padding-inline: max(1.25rem, calc((100% - var(--project-card-width)) / 2));
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
  touch-action: pan-x pan-y;
  transform-style: preserve-3d;
  -webkit-overflow-scrolling: touch;
}

.project-showcase__rail--dragging {
  cursor: grabbing;
  scroll-behavior: auto;
  scroll-snap-type: none;
  user-select: none;
}

.project-showcase__rail::-webkit-scrollbar {
  display: none;
}

.project-card {
  --project-entry-x: 0rem;
  --project-entry-y: 1rem;
  --project-mask-image: linear-gradient(#000, #000);
  --project-rotate-y: 0deg;
  --project-scale: 0.94;
  --project-visual-opacity: 0.78;
  --project-z: -24px;
  aspect-ratio: 4 / 5;
  border: 1px solid rgba(255, 218, 218, 0.14);
  border-radius: 8px;
  box-shadow: 0 1.6rem 4rem rgba(0, 0, 0, 0.42);
  display: block;
  flex: 0 0 var(--project-card-width);
  max-height: clamp(24rem, 62svh, 35rem);
  min-height: clamp(18rem, 40vw, 23rem);
  overflow: hidden;
  position: relative;
  scroll-snap-align: center;
  scroll-snap-stop: always;
  opacity: 0;
  transform:
    translate3d(var(--project-entry-x), var(--project-entry-y), var(--project-z))
    rotateY(var(--project-rotate-y))
    scale(var(--project-scale));
  transform-origin: center center;
  transition:
    border-color 260ms ease,
    opacity 680ms ease,
    transform 780ms cubic-bezier(0.22, 1, 0.36, 1);
  will-change: opacity, transform;
  -webkit-mask-image: var(--project-mask-image);
  mask-image: var(--project-mask-image);
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-size: 100% 100%;
  mask-size: 100% 100%;
}

.project-card--from-left {
  --project-entry-x: -4rem;
}

.project-card--from-right {
  --project-entry-x: 4rem;
}

.project-card--visible {
  --project-entry-x: 0rem;
  --project-entry-y: 0rem;
  opacity: var(--project-visual-opacity, 0.78);
}

.project-card--active,
.project-card:focus-visible {
  border-color: rgba(255, 218, 218, 0.44);
  opacity: 1;
}

.project-card--is-left {
  --project-mask-image: linear-gradient(90deg, transparent 0%, rgba(0, 0, 0, 0.28) 17%, #000 45%, #000 100%);
}

.project-card--is-right {
  --project-mask-image: linear-gradient(90deg, #000 0%, #000 55%, rgba(0, 0, 0, 0.28) 83%, transparent 100%);
}

.project-card--is-center {
  --project-mask-image: linear-gradient(#000, #000);
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

@media (min-width: 640px) and (max-width: 1024px) {
  .project-showcase {
    --project-card-gap: clamp(1.35rem, 3vw, 1.8rem);
    --project-card-width: clamp(21rem, 46vw, 28rem);
    padding: clamp(4rem, 9svh, 6rem) 0;
  }

  .project-showcase__carousel {
    max-width: 100vw;
  }
}

@media (max-width: 639px) {
  .project-showcase {
    --project-card-gap: 0.85rem;
    --project-card-width: clamp(12.75rem, 54vw, 14.75rem);
    padding: clamp(4rem, 9svh, 6rem) 0;
  }

  .project-showcase__intro {
    max-width: calc(100vw - 2rem);
  }

  .project-showcase__carousel {
    max-width: 100vw;
    perspective: 780px;
  }

  .project-showcase__rail {
    padding-inline: max(1rem, calc((100% - var(--project-card-width)) / 2));
    scroll-padding-inline: max(1rem, calc((100% - var(--project-card-width)) / 2));
    scroll-snap-type: x mandatory;
  }

  .project-card {
    min-height: 18.5rem;
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
