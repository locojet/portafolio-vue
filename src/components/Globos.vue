<template>
  <section ref="scene" class="cloud-scene wraperr" aria-labelledby="cloud-title">
    <div class="cloud-scene__stage" aria-hidden="true">
      <picture ref="cloudOne" class="cloud cloud-one">
        <source type="image/avif" :srcset="cloudOneImage.avif" sizes="(max-width: 639px) 116vw, (max-width: 1024px) 86vw, 50vw" />
        <source type="image/webp" :srcset="cloudOneImage.webp" sizes="(max-width: 639px) 116vw, (max-width: 1024px) 86vw, 50vw" />
        <img :src="cloudOneImage.fallback" alt="" width="5522" height="3682" loading="lazy" decoding="async" />
      </picture>
      <picture ref="cloudTwo" class="cloud cloud-two">
        <source type="image/avif" :srcset="cloudTwoImage.avif" sizes="(max-width: 639px) 96vw, (max-width: 1024px) 72vw, 38vw" />
        <source type="image/webp" :srcset="cloudTwoImage.webp" sizes="(max-width: 639px) 96vw, (max-width: 1024px) 72vw, 38vw" />
        <img :src="cloudTwoImage.fallback" alt="" width="4000" height="4000" loading="lazy" decoding="async" />
      </picture>
      <picture ref="cloudThree" class="cloud cloud-three">
        <source type="image/avif" :srcset="cloudThreeImage.avif" sizes="(max-width: 639px) 132vw, (max-width: 1024px) 96vw, 64vw" />
        <source type="image/webp" :srcset="cloudThreeImage.webp" sizes="(max-width: 639px) 132vw, (max-width: 1024px) 96vw, 64vw" />
        <img :src="cloudThreeImage.fallback" alt="" width="5517" height="3682" loading="lazy" decoding="async" />
      </picture>
    </div>

    <div class="cloud-scene__content">
      <h1 id="cloud-title" ref="title" class="titel cloud-text">{{ titleText }}</h1>

      <section ref="copy" class="cloud-copy cloud-text">
        <p>{{ copyText }}</p>
      </section>
    </div>
  </section>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { imageAssets } from '../assets/optimized/media';

const titleText = 'Echt sichtbar.';
const copyText = 'Wir arbeiten nicht wie eine anonyme Agentur im Hintergrund. Wir kommen zu Ihnen, lernen Ihr Unternehmen kennen und entwickeln daraus eine digitale Präsenz, die zeigt, wer Sie sind, was Sie leisten und warum man Ihnen vertrauen kann.';
const cloudOneImage = imageAssets.cloud1;
const cloudTwoImage = imageAssets.cloud7;
const cloudThreeImage = imageAssets.cloud8;

const scene = ref(null);
const cloudOne = ref(null);
const cloudTwo = ref(null);
const cloudThree = ref(null);
const title = ref(null);
const copy = ref(null);

let frameId = 0;

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const setLayer = (element, x, y, scale) => {
  if (!element) return;

  element.style.setProperty('--cloud-x', `${x.toFixed(2)}px`);
  element.style.setProperty('--cloud-y', `${y.toFixed(2)}px`);
  element.style.setProperty('--cloud-scale', scale.toFixed(3));
};

const updateScene = () => {
  frameId = 0;

  if (!scene.value) return;

  const rect = scene.value.getBoundingClientRect();
  const viewportHeight = window.innerHeight || 1;

  if (rect.top > viewportHeight * 1.25 || rect.bottom < -viewportHeight * 0.25) {
    return;
  }

  const progress = clamp(
    (viewportHeight - rect.top) / (viewportHeight + rect.height),
    0,
    1
  );
  const centeredProgress = progress - 0.5;
  const isTablet = window.innerWidth <= 1024;
  const isMobile = window.innerWidth <= 639;
  const motion = isMobile ? 0.74 : isTablet ? 0.86 : 1;

  setLayer(cloudOne.value, centeredProgress * -70 * motion, centeredProgress * -260 * motion, 1 + progress * 0.075);
  setLayer(cloudTwo.value, centeredProgress * 92 * motion, centeredProgress * -150 * motion, 1 + progress * 0.045);
  setLayer(cloudThree.value, centeredProgress * -42 * motion, centeredProgress * -350 * motion, 1 + progress * 0.11);

  title.value?.style.setProperty('--text-y', `${(centeredProgress * -54 * motion).toFixed(2)}px`);
  copy.value?.style.setProperty('--text-y', `${(centeredProgress * -34 * motion).toFixed(2)}px`);
};

const requestSceneUpdate = () => {
  if (frameId) return;
  frameId = requestAnimationFrame(updateScene);
};

onMounted(() => {
  requestSceneUpdate();
  window.addEventListener('scroll', requestSceneUpdate, { passive: true });
  window.addEventListener('resize', requestSceneUpdate);

  [
    cloudOne.value?.querySelector('img'),
    cloudTwo.value?.querySelector('img'),
    cloudThree.value?.querySelector('img'),
  ].forEach((cloud) => {
    cloud?.addEventListener('load', requestSceneUpdate, { once: true });
  });
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', requestSceneUpdate);
  window.removeEventListener('resize', requestSceneUpdate);

  if (frameId) {
    cancelAnimationFrame(frameId);
  }
});
</script>

<style scoped>
.wraperr {
  overflow-x: clip;
}

.cloud-scene {
  background: linear-gradient(
    to bottom,
    #000 0%,
    #000 12%,
    rgba(111, 74, 74, 0.96) 32%,
    rgba(214, 147, 147, 0.92) 58%,
    var(--quaternary-color) 100%
  );
  color: #fff;
  isolation: isolate;
  min-height: clamp(48rem, 112svh, 72rem);
  overflow: hidden;
  padding: clamp(5.5rem, 12svh, 8rem) clamp(1.2rem, 5vw, 4rem) clamp(5rem, 11svh, 8rem);
  position: relative;
  width: 100vw;
}

.cloud-scene::before {
  content: "";
  left: 0;
  pointer-events: none;
  position: absolute;
  right: 0;
  z-index: 4;
}

.cloud-scene::before {
  background: linear-gradient(
    to bottom,
    #000 0%,
    rgba(0, 0, 0, 0.86) 34%,
    rgba(0, 0, 0, 0.24) 78%,
    rgba(214, 147, 147, 0) 100%
  );
  height: clamp(8rem, 18svh, 14rem);
  top: 0;
}

.cloud-scene__stage {
  inset: 0;
  overflow: hidden;
  perspective: 900px;
  pointer-events: none;
  position: absolute;
  transform-style: preserve-3d;
  z-index: 0;
}

.cloud {
  backface-visibility: hidden;
  display: block;
  height: auto;
  max-width: none;
  opacity: 0.88;
  position: absolute;
  transform:
    translate3d(
      calc(-50% + var(--cloud-x, 0px)),
      var(--cloud-y, 0px),
      0
    )
    scale(var(--cloud-scale, 1));
  transform-origin: center;
  user-select: none;
  will-change: transform;
}

.cloud img {
  display: block;
  height: auto;
  width: 100%;
}

.cloud-one {
  left: 46%;
  top: clamp(8rem, 18svh, 13rem);
  width: clamp(36rem, 50vw, 68rem);
  z-index: 1;
}

.cloud-two {
  left: 63%;
  top: clamp(16rem, 32svh, 25rem);
  width: clamp(30rem, 38vw, 54rem);
  z-index: 2;
}

.cloud-three {
  bottom: clamp(-12rem, -16svh, -6rem);
  left: 48%;
  width: clamp(48rem, 64vw, 82rem);
  z-index: 3;
}

.cloud-scene__content {
  align-items: center;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  max-width: 56rem;
  min-height: calc(clamp(48rem, 112svh, 72rem) - clamp(10rem, 23svh, 16rem));
  position: relative;
  text-align: center;
  z-index: 5;
}

.cloud-text {
  -webkit-text-stroke: 0.7px rgba(18, 8, 10, 0.82);
  color: #fff;
  paint-order: stroke fill;
  text-shadow:
    0 2px 5px rgba(18, 8, 10, 0.46),
    0 0.85rem 2.2rem rgba(18, 8, 10, 0.28);
  transform: translate3d(0, var(--text-y, 0px), 0);
  will-change: transform;
}

.titel {
  font-size: clamp(2.55rem, 4.8vw, 4.35rem);
  line-height: 1.05;
  margin: clamp(0.4rem, 1.8svh, 1.6rem) 0 clamp(11.5rem, 26svh, 18rem);
}

.cloud-copy {
  font-size: clamp(1.35rem, 2.1vw, 2rem);
  line-height: 1.55;
  max-width: min(82vw, 48rem);
  text-align: left;
}

.cloud-copy p {
  margin: 0;
}

@media (max-width: 1024px) {
  .cloud-scene {
    min-height: clamp(44rem, 104svh, 58rem);
    padding: clamp(4.5rem, 10svh, 7rem) clamp(1.1rem, 5vw, 2.5rem) clamp(4rem, 9svh, 6rem);
  }

  .cloud-scene__content {
    max-width: min(82vw, 44rem);
    min-height: calc(clamp(44rem, 104svh, 58rem) - clamp(8rem, 19svh, 13rem));
  }

  .cloud-one {
    left: 42%;
    top: clamp(4rem, 12svh, 8rem);
    width: clamp(38rem, 86vw, 54rem);
  }

  .cloud-two {
    left: 66%;
    top: clamp(14rem, 30svh, 21rem);
    width: clamp(32rem, 72vw, 48rem);
  }

  .cloud-three {
    bottom: clamp(-8rem, -12svh, -4rem);
    left: 48%;
    width: clamp(44rem, 96vw, 62rem);
  }

  .titel {
    font-size: clamp(2.35rem, 5.6vw, 3.45rem);
    margin: clamp(0.6rem, 2.2svh, 1.8rem) 0 clamp(9.8rem, 21svh, 13.5rem);
  }

  .cloud-copy {
    font-size: clamp(1.35rem, 2.5vw, 1.8rem);
    max-width: min(84vw, 40rem);
  }
}

@media (max-width: 639px) {
  .cloud-scene {
    min-height: clamp(42rem, 102svh, 50rem);
    padding: clamp(4rem, 9svh, 5rem) 1rem clamp(3.5rem, 8svh, 5rem);
  }

  .cloud-scene::before {
    height: clamp(7rem, 16svh, 10rem);
  }

  .cloud-scene__content {
    max-width: min(88vw, 28rem);
    min-height: calc(clamp(42rem, 102svh, 50rem) - clamp(7.5rem, 17svh, 10rem));
  }

  .cloud-one {
    left: 39%;
    top: clamp(3.5rem, 10svh, 6rem);
    width: clamp(28rem, 116vw, 36rem);
  }

  .cloud-two {
    left: 72%;
    top: clamp(13rem, 27svh, 17rem);
    width: clamp(24rem, 96vw, 32rem);
  }

  .cloud-three {
    bottom: clamp(-6rem, -10svh, -3rem);
    left: 48%;
    width: clamp(34rem, 132vw, 44rem);
  }

  .titel {
    font-size: clamp(1.95rem, 8.2vw, 2.55rem);
    margin: clamp(0.5rem, 2.4svh, 1.6rem) 0 clamp(9.4rem, 20svh, 11.8rem);
  }

  .cloud-copy {
    font-size: clamp(1.15rem, 5.1vw, 1.45rem);
    line-height: 1.5;
    max-width: min(88vw, 25rem);
    text-align: left;
  }
}
</style>
