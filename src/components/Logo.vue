<template>
  <a
    ref="mainLogo"
    tabindex="0"
    href="#"
    class="brand-logo brand-logo--main"
    aria-label="Zur Startseite"
  >
    <picture>
      <source
        type="image/avif"
        :srcset="logoAvifSrcset"
        sizes="(max-width: 600px) 38vw, (max-width: 1024px) 16vw, 10vw"
      />
      <source
        type="image/webp"
        :srcset="logoWebpSrcset"
        sizes="(max-width: 600px) 38vw, (max-width: 1024px) 16vw, 10vw"
      />
      <img
        :src="logoFallback"
        alt="Logo de la web"
        width="1774"
        height="887"
        decoding="async"
        fetchpriority="high"
        data-critical-media="true"
      />
    </picture>
  </a>

  <a
    tabindex="0"
    href="#"
    class="brand-logo brand-logo--sticky"
    :class="{ 'brand-logo--sticky-visible': isStickyLogoVisible }"
    aria-label="Zur Startseite"
  >
    <picture>
      <source
        type="image/avif"
        :srcset="logoAvifSrcset"
        sizes="(min-width: 1025px) 9vw, 1px"
      />
      <source
        type="image/webp"
        :srcset="logoWebpSrcset"
        sizes="(min-width: 1025px) 9vw, 1px"
      />
      <img
        :src="logoFallback"
        alt="Logo de la web"
        width="1774"
        height="887"
        decoding="async"
      />
    </picture>
  </a>
</template>

<script setup>
import { imageAssets } from '../assets/optimized/media';
import {
  onMounted,
  onUnmounted,
  ref
} from 'vue';

const logoAvifSrcset = imageAssets.logo.avif;
const logoWebpSrcset = imageAssets.logo.webp;
const logoFallback = imageAssets.logo.fallback;
const mainLogo = ref(null);
const isStickyLogoVisible = ref(false);

let logoFrame = 0;

const isDesktopViewport = () => (
  window.matchMedia('(min-width: 1025px)').matches &&
  window.matchMedia(
    '(hover: hover) and (pointer: fine)'
  ).matches
);

const updateStickyLogo = () => {
  const logoElement =
    mainLogo.value?.querySelector('img');

  if (
    !logoElement ||
    !isDesktopViewport()
  ) {
    isStickyLogoVisible.value = false;
    return;
  }

  const rect =
    logoElement.getBoundingClientRect();

  isStickyLogoVisible.value =
    window.scrollY > 8 &&
    rect.bottom <= 0;
};

const scheduleStickyLogoUpdate = () => {
  if (logoFrame) {
    return;
  }

  logoFrame =
    requestAnimationFrame(() => {
      logoFrame = 0;
      updateStickyLogo();
    });
};

onMounted(() => {
  updateStickyLogo();

  window.addEventListener(
    'scroll',
    scheduleStickyLogoUpdate,
    {
      passive: true
    }
  );

  window.addEventListener(
    'resize',
    scheduleStickyLogoUpdate
  );
});

onUnmounted(() => {
  window.removeEventListener(
    'scroll',
    scheduleStickyLogoUpdate
  );

  window.removeEventListener(
    'resize',
    scheduleStickyLogoUpdate
  );

  if (logoFrame) {
    cancelAnimationFrame(
      logoFrame
    );
  }
});
</script>

<style scoped>

/* =========================
   LOGO GENERAL
========================= */

.brand-logo {
  display: block;
  text-decoration: none;
}

.brand-logo picture {
  display: block;
}

.brand-logo img {
  --logo-scale: 1;

  display: block;

  width: 10vw;
  min-width: 8rem;

  transform:
    rotate(0deg)
    scale(var(--logo-scale));

  transform-origin: center;

  transition:
    transform 0.2s
    ease-in-out;
}


/* =========================
   LOGO PRINCIPAL DESKTOP
========================= */

.brand-logo--main img {
  position: absolute;

  right: 5rem;
  top: 50vh;

  z-index: 2100;
}


/* =========================
   LOGO STICKY DESKTOP
========================= */

.brand-logo--sticky {
  position: fixed;

  left:
    clamp(
      1rem,
      1.8vw,
      1.7rem
    );

  top:
    clamp(
      1rem,
      2.4dvh,
      1.65rem
    );

  opacity: 0;

  pointer-events: none;

  transform:
    translateY(-0.75rem);

  transition:
    opacity 220ms ease,
    transform 260ms ease;

  z-index: 2060;
}

.brand-logo--sticky img {
  min-width: 7rem;

  width:
    clamp(
      7rem,
      8.5vw,
      9.6rem
    );

  filter:
    drop-shadow(
      0 0 0.55rem
      rgba(
        0,
        0,
        0,
        0.65
      )
    )
    drop-shadow(
      0 0 0.4rem
      rgba(
        214,
        147,
        147,
        0.24
      )
    );
}

.brand-logo--sticky-visible {
  opacity: 1;

  pointer-events: auto;

  transform:
    translateY(0);
}


/* =========================
   HOVER DESKTOP
========================= */

@media (
  hover: hover
) and (
  pointer: fine
) {

  .brand-logo img:hover {
    --logo-scale: 1.04;
  }

}


/* =========================
   IPAD + MOBILE
========================= */

@media screen and
(max-width: 1024px) {

  .brand-logo--main {
    position: fixed;

    left:
      calc(
        env(safe-area-inset-left, 0px)
        - 0.45rem
      );

    top:
      calc(
        env(safe-area-inset-top, 0px)
        - 0.15rem
      );

    width: auto;
    height: auto;

    overflow: visible;

    opacity: 1;
    visibility: visible;

    pointer-events: auto;

    z-index: 9999;
  }

  .brand-logo--main img {
    --logo-scale: 0.9;

    position: relative;

    display: block;

    left: 0;
    top: 0;

    right: auto;

    width:
      clamp(
        9.5rem,
        16vw,
        12rem
      );

    min-width: 0;
    max-width: none;

    opacity: 1;
    visibility: visible;

    pointer-events: auto;

    transform:
      scale(
        var(--logo-scale)
      );

    transition:
      transform
      0.3s
      ease-in-out;

    z-index: 9999;
  }

  .brand-logo--sticky {
    display: none;
  }
}


/* =========================
   MÓVILES
========================= */

@media screen and
(max-width: 600px) {

  .brand-logo--main {
    left:
      calc(
        env(safe-area-inset-left, 0px)
        - 0.55rem
      );

    top:
      calc(
        env(safe-area-inset-top, 0px)
        - 0.25rem
      );
  }

  .brand-logo--main img {
    top: 0;

    width:
      clamp(
        8.5rem,
        36vw,
        10.25rem
      );

    min-width: 0;
    max-width: none;
  }
}


/* =========================
   MÓVILES PEQUEÑOS
========================= */

@media screen and
(max-width: 400px) {

  .brand-logo--main img {
    top: 0;

    width:
      clamp(
        7.8rem,
        38vw,
        9.6rem
      );
  }
}

</style>
