<script setup>
import { nextTick, onMounted, onUnmounted, ref } from 'vue';
import Navigation from './components/Navigation.vue';
import Logo from './components/Logo.vue';
import Navdesktop from './components/Navdesktop.vue';
import VideoInicio from './components/VideoInicio.vue';
import Whatup from './components/Whatup.vue';
import Mevideo from './components/Mevideo.vue';
import PhotoScroll from './components/PhotoScroll.vue';
import Globos from './components/Globos.vue';
import Web from './components/Web.vue';
import MediaShowcase from './components/MediaShowcase.vue';
import Footer from './components/Footer.vue';
import loaderGif from './assets/img/preload.gif';

const isPageReady = ref(false);
const mediaTimeouts = [];

const waitForWindowLoad = () => {
  if (document.readyState === 'complete') {
    return Promise.resolve();
  }

  return new Promise((resolve) => {
    window.addEventListener('load', resolve, { once: true });
  });
};

const waitForFonts = () => {
  if (!document.fonts?.ready) {
    return Promise.resolve();
  }

  return document.fonts.ready.catch(() => undefined);
};

const waitForImage = (image) => {
  if (image.complete && image.naturalWidth > 0) {
    return Promise.resolve();
  }

  return new Promise((resolve) => {
    const finish = () => {
      clearTimeout(timeout);
      image.removeEventListener('load', finish);
      image.removeEventListener('error', finish);
      resolve();
    };
    const timeout = setTimeout(finish, 9000);

    mediaTimeouts.push(timeout);
    image.addEventListener('load', finish, { once: true });
    image.addEventListener('error', finish, { once: true });
  });
};

const waitForVideo = (video) => {
  if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
    return Promise.resolve();
  }

  return new Promise((resolve) => {
    const finish = () => {
      clearTimeout(timeout);
      video.removeEventListener('loadeddata', finish);
      video.removeEventListener('canplay', finish);
      video.removeEventListener('error', finish);
      video.removeEventListener('abort', finish);
      resolve();
    };
    const timeout = setTimeout(finish, 9000);

    mediaTimeouts.push(timeout);
    video.addEventListener('loadeddata', finish, { once: true });
    video.addEventListener('canplay', finish, { once: true });
    video.addEventListener('error', finish, { once: true });
    video.addEventListener('abort', finish, { once: true });
    video.load();
  });
};

const waitForMedia = () => {
  const images = [...document.querySelectorAll('img')];
  const videos = [...document.querySelectorAll('video')];

  return Promise.all([
    ...images.map(waitForImage),
    ...videos.map(waitForVideo),
  ]);
};

const startAutoplayVideos = () => {
  document.querySelectorAll('video[autoplay]').forEach((video) => {
    video.play?.().catch(() => undefined);
  });
};

onMounted(async () => {
  document.documentElement.classList.add('page-loading');
  document.body.classList.add('page-loading');

  await nextTick();
  await Promise.all([
    waitForWindowLoad(),
    waitForFonts(),
    waitForMedia(),
  ]);

  isPageReady.value = true;
  startAutoplayVideos();
  document.documentElement.classList.remove('page-loading');
  document.body.classList.remove('page-loading');
});

onUnmounted(() => {
  mediaTimeouts.forEach((timeout) => clearTimeout(timeout));
  document.documentElement.classList.remove('page-loading');
  document.body.classList.remove('page-loading');
});
</script>

<template>
  <div id="app">
    <div class="site-shell" :class="{ ready: isPageReady }" :aria-hidden="!isPageReady">
      <Logo />
      <Navigation />
      <VideoInicio />
      <Whatup />
      <Mevideo />
      <Globos />
      <MediaShowcase />
      <PhotoScroll />
      <Web />
      <Footer />
    </div>

    <Transition name="loader-fade">
      <div v-if="!isPageReady" class="global-loader" role="status" aria-live="polite">
        <img :src="loaderGif" alt="Loading" />
      </div>
    </Transition>
    
   
    
   
    
    
    
    
    
    
    
    
    
  </div>
</template>

<style scoped>
.site-shell {
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.45s ease-in-out;
}

.site-shell.ready {
  opacity: 1;
  pointer-events: auto;
}

.global-loader {
  align-items: center;
  background: #000;
  display: flex;
  inset: 0;
  justify-content: center;
  position: fixed;
  z-index: 99999;
}

.global-loader img {
  display: block;
  max-width: clamp(7rem, 14vw, 12rem);
  width: 18%;
}

.loader-fade-leave-active {
  transition: opacity 0.45s ease-in-out, visibility 0.45s ease-in-out;
}

.loader-fade-leave-to {
  opacity: 0;
  visibility: hidden;
}

:global(html.page-loading),
:global(body.page-loading) {
  overflow: hidden;
}

html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
}

.parallax-container {
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
  perspective: 10px;
  background: var(--quaternary-color, #222); /* Fallback por si no defines la variable */
  scroll-behavior: smooth;
}

</style>
