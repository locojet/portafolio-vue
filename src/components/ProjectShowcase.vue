<template>
  <section ref="showcase" id="projects" class="project-showcase wraperr" aria-labelledby="projects-title">
    <div class="project-showcase__intro">
      <p>{{ eyebrow }}</p>
      <h2 id="projects-title">{{ title }}</h2>
    </div>

    <div
      ref="carousel"
      class="project-showcase__carousel"
      :class="{ 'project-showcase__carousel--dragging': isDragging }"
      :style="carouselStyle"
      @focusin="pauseAutoplay"
      @focusout="resumeAutoplaySoon"
      @pointerdown="handlePointerDown"
      @pointermove="handlePointerMove"
      @pointerup="handlePointerUp"
      @pointerleave="handlePointerLeave"
      @pointercancel="handlePointerCancel"
      @click.capture="handleClickCapture"
      @wheel="handleWheel"
      @dragstart.prevent
    >
      <div class="project-showcase__stage" aria-live="polite">
        <a
          v-for="(project, index) in projectItems"
          :key="project.title"
          class="project-card"
          :class="projectCardClass(index)"
          :href="project.href"
          :aria-current="activeIndex === index ? 'true' : undefined"
          :aria-hidden="isVisibleProject(index) ? undefined : 'true'"
          :aria-label="project.title"
          :tabindex="isVisibleProject(index) ? 0 : -1"
          :target="project.href?.startsWith('http') ? '_blank' : undefined"
          :rel="project.href?.startsWith('http') ? 'noreferrer' : undefined"
        >
          <picture>
            <source type="image/avif" :srcset="project.image.avif" sizes="(max-width: 639px) 72vw, (max-width: 1024px) 54vw, 400px" />
            <source type="image/webp" :srcset="project.image.webp" sizes="(max-width: 639px) 72vw, (max-width: 1024px) 54vw, 400px" />
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

const carousel = ref(null);
const showcase = ref(null);
const activeIndex = ref(0);
const dragOffset = ref(0);
const isDragging = ref(false);
const isCarouselVisible = ref(false);

let autoplayTimer = 0;
let resumeId = 0;
let visibilityObserver = null;
let isInteracting = false;
let isInViewport = true;
let pointerIsDown = false;
let pointerId = null;
let pointerStartX = 0;
let pointerStartY = 0;
let pointerAxis = '';
let shouldCancelClick = false;
let wheelLocked = false;
let wheelUnlockTimer = 0;

const carouselStyle = computed(() => ({
  '--project-drag-x': `${dragOffset.value}px`,
}));

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const normalizeIndex = (index) => {
  const count = projectItems.value.length;
  if (count === 0) return 0;

  return ((index % count) + count) % count;
};

const getWrappedOffset = (index) => {
  const count = projectItems.value.length;
  if (count <= 1) return 0;

  let offset = index - activeIndex.value;

  if (offset > count / 2) offset -= count;
  if (offset < -count / 2) offset += count;

  return offset;
};

const isVisibleProject = (index) => Math.abs(getWrappedOffset(index)) <= 1;

const projectCardClass = (index) => {
  const offset = getWrappedOffset(index);

  return {
    'project-card--visible': isCarouselVisible.value,
    'project-card--active': offset === 0,
    'project-card--left': offset === -1,
    'project-card--right': offset === 1,
    'project-card--hidden': Math.abs(offset) > 1,
  };
};

const moveToProject = (nextIndex) => {
  activeIndex.value = normalizeIndex(nextIndex);
  dragOffset.value = 0;
};

const moveByDirection = (direction) => {
  if (projectItems.value.length <= 1) return;
  moveToProject(activeIndex.value + direction);
};

const playNextProject = () => {
  if (isInteracting || document.hidden || !isInViewport) return;
  moveByDirection(1);
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
    scheduleAutoplay(700);
  }, 900);
};

const getDragLimit = () => Math.min(Math.max(window.innerWidth * 0.28, 72), 180);

const resetPointerState = () => {
  pointerIsDown = false;
  pointerId = null;
  pointerAxis = '';
  isDragging.value = false;
  dragOffset.value = 0;
};

const capturePointer = (event) => {
  const element = carousel.value;

  if (!element?.setPointerCapture || element.hasPointerCapture?.(event.pointerId)) {
    return;
  }

  element.setPointerCapture(event.pointerId);
};

const releasePointer = (event) => {
  const element = carousel.value;

  if (element?.hasPointerCapture?.(event.pointerId)) {
    element.releasePointerCapture(event.pointerId);
  }
};

const handlePointerDown = (event) => {
  if (!event.isPrimary || event.button > 0) return;

  pauseAutoplay();
  pointerIsDown = true;
  pointerId = event.pointerId;
  pointerStartX = event.clientX;
  pointerStartY = event.clientY;
  pointerAxis = '';
  shouldCancelClick = false;
  dragOffset.value = 0;
};

const handlePointerMove = (event) => {
  if (!pointerIsDown || event.pointerId !== pointerId) return;

  const deltaX = event.clientX - pointerStartX;
  const deltaY = event.clientY - pointerStartY;

  if (!pointerAxis && Math.max(Math.abs(deltaX), Math.abs(deltaY)) > 8) {
    pointerAxis = Math.abs(deltaX) > Math.abs(deltaY) * 1.18 ? 'horizontal' : 'vertical';

    if (pointerAxis === 'horizontal') {
      capturePointer(event);
    }
  }

  if (pointerAxis === 'vertical') {
    return;
  }

  if (pointerAxis !== 'horizontal') {
    return;
  }

  event.preventDefault();
  isDragging.value = true;
  shouldCancelClick = Math.abs(deltaX) > 6;
  dragOffset.value = clamp(deltaX, -getDragLimit(), getDragLimit());
};

const finishPointerGesture = (event) => {
  if (!pointerIsDown || event.pointerId !== pointerId) return;

  const distance = dragOffset.value;
  const threshold = Math.min(Math.max(window.innerWidth * 0.08, 34), 84);

  releasePointer(event);

  if (pointerAxis === 'horizontal' && Math.abs(distance) >= threshold) {
    moveByDirection(distance < 0 ? 1 : -1);
  }

  resetPointerState();
  resumeAutoplaySoon();
};

const handlePointerUp = (event) => {
  finishPointerGesture(event);
};

const handlePointerLeave = (event) => {
  if (event.pointerType === 'mouse') {
    finishPointerGesture(event);
  }
};

const handlePointerCancel = (event) => {
  if (event.pointerId !== pointerId) return;

  releasePointer(event);
  resetPointerState();
  resumeAutoplaySoon();
};

const handleClickCapture = (event) => {
  if (!shouldCancelClick) return;

  event.preventDefault();
  event.stopPropagation();
  shouldCancelClick = false;
};

const handleWheel = (event) => {
  const horizontalDelta = Math.abs(event.deltaX) > Math.abs(event.deltaY);
  if (!horizontalDelta) return;

  event.preventDefault();
  pauseAutoplay();

  if (!wheelLocked) {
    moveByDirection(event.deltaX > 0 ? 1 : -1);
    wheelLocked = true;
    clearTimeout(wheelUnlockTimer);
    wheelUnlockTimer = window.setTimeout(() => {
      wheelLocked = false;
    }, 420);
  }

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
  window.requestAnimationFrame(() => {
    isCarouselVisible.value = true;
  });

  if ('IntersectionObserver' in window && showcase.value) {
    visibilityObserver = new IntersectionObserver(([entry]) => {
      isInViewport = entry.isIntersecting;

      if (isInViewport) {
        scheduleAutoplay(900);
      } else {
        clearTimeout(autoplayTimer);
      }
    }, { threshold: 0.18 });

    visibilityObserver.observe(showcase.value);
  } else {
    scheduleAutoplay(900);
  }

  document.addEventListener('visibilitychange', handleVisibilityChange);
});

onBeforeUnmount(() => {
  visibilityObserver?.disconnect();
  document.removeEventListener('visibilitychange', handleVisibilityChange);
  clearTimeout(autoplayTimer);
  clearTimeout(resumeId);
  clearTimeout(wheelUnlockTimer);
});
</script>

<style scoped>
.wraperr {
  overflow-x: clip;
}

.project-showcase {
  --project-card-height: clamp(19rem, 44svh, 26rem);
  --project-card-width: clamp(14rem, 30vw, 18.5rem);
  --project-side-offset: clamp(13rem, 34vw, 19.5rem);
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
  cursor: grab;
  height: calc(var(--project-card-height) + 2.5rem);
  margin: 0 auto;
  max-width: min(58rem, 100vw);
  overflow: clip;
  perspective: 1080px;
  perspective-origin: center center;
  position: relative;
  touch-action: pan-y;
  width: 100%;
}

.project-showcase__carousel--dragging {
  cursor: grabbing;
  user-select: none;
}

.project-showcase__carousel--dragging .project-card {
  transition: none;
}

.project-showcase__stage {
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
  width: 100%;
}

.project-card {
  --project-mask-image: linear-gradient(#000, #000);
  border: 1px solid rgba(255, 218, 218, 0.14);
  border-radius: 8px;
  box-shadow: 0 1.6rem 4rem rgba(0, 0, 0, 0.42);
  display: block;
  height: var(--project-card-height);
  left: 50%;
  margin: 0;
  opacity: 0;
  overflow: hidden;
  pointer-events: none;
  position: absolute;
  scale: 1;
  top: 50%;
  transform:
    translate3d(calc(-50% + var(--project-drag-x, 0px)), -50%, -110px)
    rotateY(0deg)
    scale(0.82);
  transform-origin: center center;
  transition:
    border-color 260ms ease,
    opacity 520ms ease,
    transform 640ms cubic-bezier(0.22, 1, 0.36, 1);
  width: var(--project-card-width);
  will-change: opacity, transform;
  -webkit-mask-image: var(--project-mask-image);
  mask-image: var(--project-mask-image);
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-size: 100% 100%;
  mask-size: 100% 100%;
}

.project-card--visible.project-card--active {
  --project-mask-image: linear-gradient(#000, #000);
  border-color: rgba(255, 218, 218, 0.44);
  opacity: 1;
  pointer-events: auto;
  transform:
    translate3d(calc(-50% + var(--project-drag-x, 0px)), -50%, 54px)
    rotateY(0deg)
    scale(1);
  z-index: 4;
}

.project-card--visible.project-card--left {
  --project-mask-image: linear-gradient(90deg, transparent 0%, rgba(0, 0, 0, 0.22) 15%, #000 44%, #000 100%);
  opacity: 0.82;
  pointer-events: auto;
  transform:
    translate3d(calc(-50% - var(--project-side-offset) + var(--project-drag-x, 0px)), -50%, -58px)
    rotateY(14deg)
    scale(0.91);
  z-index: 2;
}

.project-card--visible.project-card--right {
  --project-mask-image: linear-gradient(90deg, #000 0%, #000 56%, rgba(0, 0, 0, 0.22) 85%, transparent 100%);
  opacity: 0.82;
  pointer-events: auto;
  transform:
    translate3d(calc(-50% + var(--project-side-offset) + var(--project-drag-x, 0px)), -50%, -58px)
    rotateY(-14deg)
    scale(0.91);
  z-index: 2;
}

.project-card--hidden {
  opacity: 0;
  pointer-events: none;
  z-index: 0;
}

.project-card:focus-visible {
  border-color: rgba(255, 218, 218, 0.72);
  outline: 2px solid rgba(214, 147, 147, 0.62);
  outline-offset: 0.35rem;
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
    --project-card-height: clamp(20rem, 46svh, 28rem);
    --project-card-width: clamp(16rem, 40vw, 20rem);
    --project-side-offset: clamp(13.5rem, 38vw, 20rem);
    padding: clamp(4rem, 9svh, 6rem) 0;
  }

  .project-showcase__carousel {
    max-width: 100vw;
    perspective: 980px;
  }
}

@media (max-width: 639px) {
  .project-showcase {
    --project-card-height: clamp(18rem, 50svh, 25rem);
    --project-card-width: clamp(12.5rem, 56vw, 15.5rem);
    --project-side-offset: clamp(10rem, 46vw, 14rem);
    padding: clamp(4rem, 9svh, 6rem) 0;
  }

  .project-showcase__intro {
    max-width: calc(100vw - 2rem);
  }

  .project-showcase__carousel {
    height: calc(var(--project-card-height) + 1.75rem);
    max-width: 100vw;
    perspective: 760px;
  }

  .project-card--visible.project-card--left {
    transform:
      translate3d(calc(-50% - var(--project-side-offset) + var(--project-drag-x, 0px)), -50%, -44px)
      rotateY(12deg)
      scale(0.9);
  }

  .project-card--visible.project-card--right {
    transform:
      translate3d(calc(-50% + var(--project-side-offset) + var(--project-drag-x, 0px)), -50%, -44px)
      rotateY(-12deg)
      scale(0.9);
  }
}

@media (prefers-reduced-motion: reduce) {
  .project-card,
  .project-card img {
    transition: none;
  }
}
</style>
