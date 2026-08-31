<template>
  <div ref="container">
    <div class="wrapper" ref="wrapper">
      <header ref="header">
        <img ref="cloudOne" src="../assets/img/Clouds/cloud1.png" class="cloud cloud-one" />
        <img ref="cloudTwo" src="../assets/img/Clouds/cloud7.png" class="cloud cloud-two" />
        <img ref="cloudThree" src="../assets/img/Clouds/cloud8.png" class="cloud cloud-three" />
        
        <h1 ref="title" class="titel cloud-text">
          <span class="text-normal">{{ titleText }}</span>
          <span ref="titleMask" class="text-cloud-mask" aria-hidden="true">{{ titleText }}</span>
        </h1>
      </header>
      <section ref="copy" class="cloud-copy cloud-text">
        <p class="copy-text text-normal">{{ copyText }}</p>
        <p ref="copyMask" class="copy-text text-cloud-mask" aria-hidden="true">{{ copyText }}</p>
      </section>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

const titleText = 'Echt sichtbar.';
const copyText = 'Wir arbeiten nicht wie eine anonyme Agentur im Hintergrund. Wir kommen zu Ihnen, lernen Ihr Unternehmen kennen und entwickeln daraus eine digitale Präsenz, die zeigt, wer Sie sind, was Sie leisten und warum man Ihnen vertrauen kann.';

const wrapper = ref(null);
const cloudOne = ref(null);
const cloudTwo = ref(null);
const cloudThree = ref(null);
const title = ref(null);
const copy = ref(null);
const titleMask = ref(null);
const copyMask = ref(null);

let frameId = 0;

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const applyCloudPerspective = (cloud, y, scale) => {
  cloud.style.setProperty('--cloud-y', `${y}px`);
  cloud.style.setProperty('--cloud-scale', scale.toFixed(3));
};

const getCloudRects = () => {
  const clouds = [cloudOne.value, cloudTwo.value, cloudThree.value];
  const names = ['one', 'two', 'three'];

  return clouds
    .map((cloud, index) => (cloud ? { name: names[index], rect: cloud.getBoundingClientRect() } : null))
    .filter(Boolean);
};

const setCloudMask = (maskElement, hostElement, cloudRects) => {
  if (!maskElement || !hostElement) return;

  const hostRect = hostElement.getBoundingClientRect();

  cloudRects.forEach(({ name, rect: cloudRect }) => {
    maskElement.style.setProperty(`--mask-${name}-x`, `${cloudRect.left - hostRect.left}px`);
    maskElement.style.setProperty(`--mask-${name}-y`, `${cloudRect.top - hostRect.top}px`);
    maskElement.style.setProperty(`--mask-${name}-width`, `${cloudRect.width}px`);
    maskElement.style.setProperty(`--mask-${name}-height`, `${cloudRect.height}px`);
  });
};

const updateScene = () => {
  frameId = 0;

  if (!wrapper.value || !cloudOne.value || !cloudTwo.value || !cloudThree.value || !title.value) return;

  const wrapperRect = wrapper.value.getBoundingClientRect();
  const viewportHeight = window.innerHeight;

  if (wrapperRect.top > viewportHeight * 1.35 || wrapperRect.bottom < -viewportHeight * 0.35) return;

  const wrapperTop = wrapperRect.top;
  const isResponsive = window.innerWidth <= 1024;
  const isMobile = window.innerWidth <= 639;
  const wrapperHeight = wrapper.value.offsetHeight || window.innerHeight;
  const sceneProgress = clamp(
    (window.innerHeight - wrapperTop) / (window.innerHeight + wrapperHeight),
    0,
    1
  );
  const titleMaxOffset = isResponsive ? 44 : 36;
  const titleOffset = sceneProgress * titleMaxOffset;

  title.value.style.setProperty('--title-parallax', `${titleOffset}px`);

  if (isResponsive) {
    const cloudOneOffset = sceneProgress * (isMobile ? 124 : 176);
    const cloudTwoOffset = sceneProgress * (isMobile ? 66 : 100);
    const cloudThreeOffset = sceneProgress * (isMobile ? 172 : 238);

    applyCloudPerspective(cloudOne.value, cloudOneOffset, 1 + sceneProgress * (isMobile ? 0.035 : 0.045));
    applyCloudPerspective(cloudTwo.value, cloudTwoOffset, 1 + sceneProgress * (isMobile ? 0.018 : 0.024));
    applyCloudPerspective(cloudThree.value, cloudThreeOffset, 1 + sceneProgress * (isMobile ? 0.058 : 0.072));
  } else {
    applyCloudPerspective(cloudOne.value, sceneProgress * 250, 1 + sceneProgress * 0.045);
    applyCloudPerspective(cloudTwo.value, sceneProgress * 136, 1 + sceneProgress * 0.022);
    applyCloudPerspective(cloudThree.value, sceneProgress * 330, 1 + sceneProgress * 0.078);
  }

  const cloudRects = getCloudRects();
  setCloudMask(titleMask.value, title.value, cloudRects);
  setCloudMask(copyMask.value, copy.value, cloudRects);
};

const requestSceneUpdate = (event) => {
  if (frameId) return;
  frameId = requestAnimationFrame(updateScene);
};

onMounted(() => {
  requestSceneUpdate();
  window.addEventListener('scroll', requestSceneUpdate, { passive: true });
  window.addEventListener('resize', requestSceneUpdate);

  [cloudOne.value, cloudTwo.value, cloudThree.value].forEach((cloud) => {
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
.wrapper {
  min-height: 100vh;
  overflow: clip;
  background: var(--quaternary-color);
  padding-bottom: 4rem;
  position: relative;
}

.wrapper::before {
  background: linear-gradient(
    to bottom,
    var(--quaternary-color) 0%,
    rgba(214, 147, 147, 0.96) 42%,
    rgba(214, 147, 147, 0.48) 76%,
    rgba(214, 147, 147, 0) 100%
  );
  content: "";
  height: clamp(11rem, 26vh, 19rem);
  left: 0;
  pointer-events: none;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 1;
}

.cloud-text {
  position: relative;
}

.text-normal {
  display: block;
  position: relative;
  z-index: 1;
}

.text-cloud-mask {
  color: var(--quaternary-color);
  display: block;
  inset: 0;
  mask-image:
    url("../assets/img/Clouds/cloud1.png"),
    url("../assets/img/Clouds/cloud7.png"),
    url("../assets/img/Clouds/cloud8.png");
  mask-position:
    var(--mask-one-x, -9999px) var(--mask-one-y, -9999px),
    var(--mask-two-x, -9999px) var(--mask-two-y, -9999px),
    var(--mask-three-x, -9999px) var(--mask-three-y, -9999px);
  mask-repeat: no-repeat;
  mask-size:
    var(--mask-one-width, 0px) var(--mask-one-height, 0px),
    var(--mask-two-width, 0px) var(--mask-two-height, 0px),
    var(--mask-three-width, 0px) var(--mask-three-height, 0px);
  pointer-events: none;
  position: absolute;
  text-shadow:
    0 1px 2px rgba(70, 32, 38, 0.3),
    0 3px 12px rgba(70, 32, 38, 0.24);
  -webkit-mask-image:
    url("../assets/img/Clouds/cloud1.png"),
    url("../assets/img/Clouds/cloud7.png"),
    url("../assets/img/Clouds/cloud8.png");
  -webkit-mask-position:
    var(--mask-one-x, -9999px) var(--mask-one-y, -9999px),
    var(--mask-two-x, -9999px) var(--mask-two-y, -9999px),
    var(--mask-three-x, -9999px) var(--mask-three-y, -9999px);
  -webkit-mask-repeat: no-repeat;
  -webkit-mask-size:
    var(--mask-one-width, 0px) var(--mask-one-height, 0px),
    var(--mask-two-width, 0px) var(--mask-two-height, 0px),
    var(--mask-three-width, 0px) var(--mask-three-height, 0px);
  z-index: 2;
}

header {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: clamp(42rem, 78dvh, 58rem);
  gap: 1.5rem;
  text-align: center;
  position: relative;
}
.cloud-one{
  position: absolute;
  top: clamp(11rem, 24dvh, 17rem);
  left: 50%;
  width: clamp(36rem, 56vw, 68rem);
  z-index: 0;
}

.cloud-two{
  position: absolute;
  top: clamp(17rem, 34dvh, 25rem);
  left: 57%;
  width: clamp(30rem, 42vw, 52rem);
  z-index: 0;
  
}

.cloud-three{
  position: absolute;
  top: clamp(28rem, 50dvh, 38rem);
  left: 44%;
  width: clamp(38rem, 60vw, 72rem);
  z-index: 0;
}



.cloud {
  position: absolute;
  transform: translate3d(-50%, var(--cloud-y, 0px), 0) scale(var(--cloud-scale, 1));
  will-change: transform;
}

.elefhant {
  position: absolute;
  width: 20rem;
  max-width: 80vw;
}

.titel {
  position: absolute;
  top: clamp(6rem, 18vh, 12rem);
  left: 50%;
  transform: translateX(-50%) translateY(var(--title-parallax, 0px));
  width: min(90vw, 900px);
  font-size: 5rem;
  color: white;
  z-index: 2;
  margin: 0;
  text-shadow: none;
}

.titel .text-cloud-mask {
  color: var(--primary-color);
  -webkit-text-stroke: 0.9px rgba(18, 8, 10, 0.82);
  paint-order: stroke fill;
}

.cloud-copy {
  font-size: 2rem;
  padding: 2rem;
  color: rgb(255, 255, 255);
  margin: 3rem auto;
  max-width: 800px;
  line-height: 1.6;
  
  z-index: 1;
}

.copy-text {
  margin: 0;
}

.cloud-copy .text-cloud-mask {
  box-sizing: border-box;
  color: var(--primary-color);
  height: 100%;
  padding: inherit;
  -webkit-text-stroke: 0.9px rgba(18, 8, 10, 0.82);
  paint-order: stroke fill;
  text-align: inherit;
  width: 100%;
}

@media (max-width: 1024px) {
  .wrapper {
    min-height: 100dvh;
  }

  header {
    height: clamp(34rem, 68dvh, 46rem);
  }

  .cloud {
    max-width: none;
    width: clamp(35rem, 80vw, 50rem);
  }

  .cloud-one{
    top: clamp(-15rem, -12dvh, -7rem);
    left: clamp(14rem, 34vw, 23rem);
  }

  .cloud-two{
    top: clamp(3rem, 13dvh, 8rem);
    left: clamp(27rem, 72vw, 40rem);
  }

  .cloud-three{
    top: clamp(20rem, 38dvh, 28rem);
    left: clamp(14rem, 34vw, 24rem);
  }

  .titel {
    font-size: clamp(3rem, 7vw, 4.4rem);
    line-height: 1.15;
    top: clamp(5rem, 13dvh, 8rem);
  }

  .cloud-copy {
    font-size: clamp(1.35rem, 2.4vw, 1.8rem);
    margin: clamp(-8rem, -8dvh, -4rem) auto 3rem;
    max-width: min(82vw, 760px);
  }
}

@media (max-width: 639px) {
  .cloud {
    width: clamp(24rem, 104vw, 33rem);
  }

  .elefhant {
    width: 12rem;
  }

  .titel {
    font-size: clamp(2.15rem, 9vw, 2.8rem);
    top: clamp(5rem, 12dvh, 7rem);
    line-height: 1.15;
  }

  header {
    height: clamp(28rem, 58dvh, 34rem);
  }

  .cloud-copy {
    font-size: clamp(1.25rem, 5.4vw, 1.5rem);
    margin: clamp(-5.5rem, -8dvh, -3.5rem) auto 2rem;
    max-width: min(88vw, 28rem);
    padding: 1rem;
    text-align: justify;
  }

  .cloud-one{
    top: clamp(-6.5rem, -10dvh, -3.5rem);
    left: clamp(13rem, 49vw, 16rem);
  }

  .cloud-two{
    top: clamp(7rem, 14dvh, 10rem);
    left: clamp(18rem, 72vw, 24rem);
  }

  .cloud-three{
    top: clamp(20rem, 34dvh, 25rem);
    left: clamp(12rem, 46vw, 17rem);
  }
}
</style>
