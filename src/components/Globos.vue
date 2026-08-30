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
let hasScrolled = false;

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const setCloudMask = (maskElement, hostElement) => {
  if (!maskElement || !hostElement) return;

  const hostRect = hostElement.getBoundingClientRect();
  const clouds = [cloudOne.value, cloudTwo.value, cloudThree.value];
  const names = ['one', 'two', 'three'];

  clouds.forEach((cloud, index) => {
    if (!cloud) return;

    const cloudRect = cloud.getBoundingClientRect();
    const name = names[index];

    maskElement.style.setProperty(`--mask-${name}-x`, `${cloudRect.left - hostRect.left}px`);
    maskElement.style.setProperty(`--mask-${name}-y`, `${cloudRect.top - hostRect.top}px`);
    maskElement.style.setProperty(`--mask-${name}-width`, `${cloudRect.width}px`);
    maskElement.style.setProperty(`--mask-${name}-height`, `${cloudRect.height}px`);
  });
};

const updateScene = () => {
  frameId = 0;

  if (!wrapper.value || !cloudOne.value || !cloudTwo.value || !cloudThree.value || !title.value) return;

  const scrollY = window.scrollY;
  const wrapperTop = wrapper.value.getBoundingClientRect().top;
  const sceneScroll = Math.max(window.innerHeight - wrapperTop, 0);
  const isResponsive = window.innerWidth <= 1024;
  const titleProgress = clamp((window.innerHeight - wrapperTop) / window.innerHeight, 0, 1);
  const titleMaxOffset = isResponsive ? 44 : 36;
  const titleOffset = titleProgress * titleMaxOffset;

  title.value.style.setProperty('--title-parallax', `${titleOffset}px`);

  if (isResponsive) {
    const isMobile = window.innerWidth <= 639;
    const parallaxScale = isMobile ? 0.48 : 0.72;
    const maxOffset = window.innerHeight * (isMobile ? 0.34 : 0.46);

    const cloudOneOffset = Math.min(sceneScroll * 0.25 * parallaxScale, maxOffset);
    const cloudTwoOffset = Math.min(sceneScroll * 0.10 * parallaxScale, maxOffset * 0.5);
    const cloudThreeOffset = Math.min(sceneScroll * 0.15 * parallaxScale, maxOffset * 0.75);

    cloudOne.value.style.transform = `translate3d(0, ${cloudOneOffset}px, 0)`;
    cloudTwo.value.style.transform = `translate3d(0, ${cloudTwoOffset}px, 0)`;
    cloudThree.value.style.transform = `translate3d(0, ${cloudThreeOffset}px, 0)`;
  } else {
    cloudOne.value.style.transform = hasScrolled ? `translateY(${scrollY * 0.25}px)` : '';
    cloudTwo.value.style.transform = '';
    cloudThree.value.style.transform = hasScrolled ? `translateY(${scrollY * 0.15}px)` : '';
  }

  setCloudMask(titleMask.value, title.value);
  setCloudMask(copyMask.value, copy.value);
};

const requestSceneUpdate = (event) => {
  if (event?.type === 'scroll') {
    hasScrolled = true;
  }

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
  overflow-x: hidden;
  background: var(--quaternary-color);
  scroll-behavior: smooth;
  padding-bottom: 4rem;
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
  height: 100vh;
  gap: 1.5rem;
  text-align: center;
  position: relative;
}
.cloud-one{
  position: absolute;
  top: -50rem;
  left: 50%;
  transform: translateX(-50%);
  width: 80rem;
  max-width: 100vw;
  z-index: 0;
}

.cloud-two{
  position: absolute;
  top: -30rem;
  left: 30%;
  transform: translateX(-50%);
  width: 80rem;
  max-width: 100vw;
  z-index: 0;
  
}

.cloud-three{
  position: absolute;
  top: -10rem;
  left: 20%;
  transform: translateX(-50%);
  width: 80rem;
  max-width: 100vw;
  z-index: 0;
}



.cloud {
  width: 80rem;
 
  position: absolute;
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
  z-index: 1;
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
    height: clamp(32rem, 64dvh, 44rem);
  }

  .cloud {
    max-width: none;
    width: clamp(36rem, 88vw, 52rem);
  }

  .cloud-one{
    top: clamp(-24rem, -32dvh, -10rem);
    left: clamp(-16rem, -24vw, -5rem);
  }

  .cloud-two{
    top: clamp(-16rem, -17dvh, -4rem);
    left: clamp(11rem, 34vw, 25rem);
  }

  .cloud-three{
    top: clamp(4rem, 18dvh, 12rem);
    left: clamp(-8rem, -7vw, 4rem);
  }

  .titel {
    font-size: clamp(3rem, 7vw, 4.4rem);
    line-height: 1.15;
    top: clamp(5rem, 13dvh, 8rem);
  }

  .cloud-copy {
    font-size: clamp(1.35rem, 2.4vw, 1.8rem);
    margin: clamp(-9rem, -10dvh, -4rem) auto 3rem;
    max-width: min(82vw, 760px);
  }
}

@media (max-width: 639px) {
  .cloud {
    width: clamp(27rem, 116vw, 38rem);
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
    height: clamp(25rem, 52dvh, 31rem);
  }

  .cloud-copy {
    font-size: clamp(1.25rem, 5.4vw, 1.5rem);
    margin: clamp(-8rem, -13dvh, -5rem) auto 2rem;
    max-width: min(88vw, 28rem);
    padding: 1rem;
    text-align: justify;
  }

  .cloud-one{
    top: clamp(-8rem, -16dvh, -4rem);
    left: clamp(-3rem, -10vw, -1rem);
  }

  .cloud-two{
    top: clamp(2rem, 8dvh, 5rem);
    left: clamp(1rem, 9vw, 4rem);
  }

  .cloud-three{
    top: clamp(13rem, 30dvh, 19rem);
    left: clamp(-2rem, -6vw, 0rem);
  }
}
</style>
