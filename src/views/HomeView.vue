<script setup>
import { nextTick, onMounted, onUnmounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Navigation from '../components/Navigation.vue';
import Logo from '../components/Logo.vue';
import Navdesktop from '../components/Navdesktop.vue';
import VideoInicio from '../components/VideoInicio.vue';
import Whatup from '../components/Whatup.vue';
import Mevideo from '../components/Mevideo.vue';
import Globos from '../components/Globos.vue';
import Web from '../components/Web.vue';
import MediaShowcase from '../components/MediaShowcase.vue';
import ProjectShowcase from '../components/ProjectShowcase.vue';
import FounderProfile from '../components/FounderProfile.vue';
import PhotoScroll from '../components/PhotoScroll.vue';
import ContactActionButton from '../components/ContactActionButton.vue';
import PriceActionButton from '../components/PriceActionButton.vue';
import Footer from '../components/Footer.vue';
import loaderGif from '../assets/optimized/img/preload-160.webp';

const isPageReady = ref(false);
const isDesktopNavigationEnabled = ref(false);
const contactAction = ref(null);
const route = useRoute();
const router = useRouter();
const mediaTimeouts = [];
const autoplayRetryTimeouts = [];

const runWithTimeout = (task, delay = 5500) => Promise.race([
  task,
  new Promise((resolve) => {
    const timeout = setTimeout(resolve, delay);
    mediaTimeouts.push(timeout);
  }),
]);

const updateDesktopNavigationMode = () => {
  isDesktopNavigationEnabled.value = window.innerWidth >= 640;
};

const prepareInlineAutoplayVideo = (video) => {
  if (!(video instanceof HTMLVideoElement)) {
    return;
  }

  video.muted = true;
  video.defaultMuted = true;
  video.playsInline = true;
  video.setAttribute('muted', '');
  video.setAttribute('playsinline', '');
  video.setAttribute('webkit-playsinline', '');
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

const waitForMedia = () => {
  const images = [
    ...document.querySelectorAll('img[data-critical-media="true"]'),
  ];

  return Promise.all(images.map(waitForImage));
};

const startAutoplayVideos = () => {
  document.querySelectorAll('video[autoplay]').forEach((video) => {
    prepareInlineAutoplayVideo(video);
    video.play?.().catch(() => undefined);
  });
};

const scheduleAutoplayRetry = (delay) => {
  const timeout = setTimeout(startAutoplayVideos, delay);
  autoplayRetryTimeouts.push(timeout);
};

const retryAutoplayWhenVisible = () => {
  if (document.visibilityState === 'visible' && isPageReady.value) {
    startAutoplayVideos();
  }
};

const openRequestedContact = async () => {
  const requestedContact = route.query.contact;

  if (!['open', 'footer'].includes(requestedContact)) {
    return;
  }

  await nextTick();

  if (requestedContact === 'footer') {
    await router.replace({
      name: 'home',
      hash: '#footer-contact',
    });

    await nextTick();

    await new Promise((resolve) => {
      setTimeout(resolve, 420);
    });

    const target = document.getElementById('footer-contact');

    if (target) {
      const offset = Math.min(
        Math.max(window.innerHeight * 0.12, 96),
        150
      );

      window.scrollTo({
        top: Math.max(
          target.getBoundingClientRect().top + window.scrollY - offset,
          0
        ),
        behavior: 'smooth',
      });
    }

    return;
  }

  const toggle = contactAction.value?.$el?.querySelector(
    '.contact-action-toggle'
  );

  if (toggle instanceof HTMLButtonElement) {
    toggle.click();
  }

  await router.replace({ name: 'home' });
};

onMounted(async () => {
  document.documentElement.classList.add('page-loading');
  document.body.classList.add('page-loading');

  try {
    updateDesktopNavigationMode();
    document.addEventListener('visibilitychange', retryAutoplayWhenVisible);
    window.addEventListener('resize', updateDesktopNavigationMode);
    window.addEventListener('pageshow', retryAutoplayWhenVisible);

    await nextTick();
    await runWithTimeout(waitForMedia(), 1800);
  } catch {
    // If Safari delays media metadata or blocks a resource, keep the page visible.
  } finally {
    isPageReady.value = true;
    document.documentElement.classList.remove('page-loading');
    document.body.classList.remove('page-loading');
    startAutoplayVideos();
    scheduleAutoplayRetry(250);
    scheduleAutoplayRetry(900);
    await openRequestedContact();
  }
});

onUnmounted(() => {
  mediaTimeouts.forEach((timeout) => clearTimeout(timeout));
  autoplayRetryTimeouts.forEach((timeout) => clearTimeout(timeout));
  document.removeEventListener('visibilitychange', retryAutoplayWhenVisible);
  window.removeEventListener('resize', updateDesktopNavigationMode);
  window.removeEventListener('pageshow', retryAutoplayWhenVisible);
  document.documentElement.classList.remove('page-loading');
  document.body.classList.remove('page-loading');
});
</script>

<template>
  <div id="app">
    <div
      class="site-shell"
      :class="{
        ready: isPageReady,
        'desktop-nav-mode': isDesktopNavigationEnabled
      }"
      :aria-hidden="!isPageReady"
    >
      <Logo />
      <Navdesktop :visible="isDesktopNavigationEnabled" />
      <Navigation />
      <VideoInicio id="start" />
      <Whatup />
      <Mevideo />
      <Globos />
      <MediaShowcase />
      <ProjectShowcase />
      <FounderProfile />
      <PhotoScroll class="desktop-only-prices" />
      <Web />
      <Footer />
      <PriceActionButton
        class="floating-price-action"
      />
      <ContactActionButton
        ref="contactAction"
        class="floating-contact-action"
        label="Kontakt"
      />
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

.desktop-only-prices {
  display: block;
}

.site-shell.desktop-nav-mode :deep(.navkorb),
.site-shell.desktop-nav-mode :deep(.fondo),
.site-shell.desktop-nav-mode :deep(.floating-price-action),
.site-shell.desktop-nav-mode :deep(.floating-contact-action) {
  display: none;
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

@media (min-width: 640px) and (max-width: 1024px) {
  .desktop-only-prices {
    display: none;
  }
}

@media (max-width: 639px) {
  .desktop-only-prices {
    display: none;
  }
}

html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
}

</style>
