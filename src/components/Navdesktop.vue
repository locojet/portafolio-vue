<template>
  <nav
    class="desktop-nav"
    :class="{ 'desktop-nav--visible': visible }"
    aria-label="Desktop Navigation"
  >
    <a
      v-for="(item, index) in navItems"
      :key="item.target"
      :class="{ active: activeItem === index }"
      :href="`#${item.target}`"
      :aria-current="activeItem === index ? 'true' : undefined"
      @click="navigateToSection($event, item.target, index)"
    >
      <span class="desktop-nav__number">
        {{ String(index + 1).padStart(2, '0') }}
      </span>

      {{ item.label }}
    </a>
  </nav>
</template>

<script setup>
import {
  onMounted,
  onUnmounted,
  ref
} from 'vue';

defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
});

const activeItem = ref(null);

const navItems = [
  {
    label: 'Präsenz',
    target: 'presence-services'
  },
  {
    label: 'Konzept',
    target: 'media'
  },
  {
    label: 'About',
    target: 'about'
  },
  {
    label: 'Kontakt',
    target: 'footer-contact'
  },
];

let activeFrame = 0;

const clampValue = (
  value,
  min,
  max
) => Math.min(
  Math.max(value, min),
  max
);

const getDocumentTop = (element) => (
  element.getBoundingClientRect().top
  +
  window.scrollY
);

const getSectionOffset = (targetId) => {
  const desktopOffset =
    window.innerHeight * 0.12;

  if (targetId === 'presence-services') {
    return clampValue(
      desktopOffset,
      110,
      170
    );
  }

  if (targetId === 'footer-contact') {
    return clampValue(
      desktopOffset,
      96,
      150
    );
  }

  return clampValue(
    desktopOffset,
    105,
    165
  );
};

const navigateToSection = (
  event,
  targetId,
  index
) => {
  event.preventDefault();

  const target =
    document.getElementById(targetId);

  if (!target) {
    return;
  }

  activeItem.value = index;

  const targetTop =
    target.getBoundingClientRect().top
    +
    window.scrollY
    -
    getSectionOffset(targetId);

  window.history.pushState(
    null,
    '',
    `${window.location.pathname}${window.location.search}#${targetId}`
  );

  window.scrollTo({
    top: Math.max(targetTop, 0),
    behavior: 'smooth',
  });
};

const updateActiveItem = () => {
  const viewportAnchor =
    window.scrollY
    +
    window.innerHeight * 0.42;

  let nextActive = null;

  navItems.forEach((item, index) => {
    const section =
      document.getElementById(item.target);

    if (!section) {
      return;
    }

    const top =
      getDocumentTop(section);

    if (viewportAnchor >= top) {
      nextActive = index;
    }
  });

  activeItem.value = nextActive;
};

const scheduleActiveItemUpdate = () => {
  if (activeFrame) {
    return;
  }

  activeFrame =
    requestAnimationFrame(() => {
      activeFrame = 0;

      updateActiveItem();
    });
};

onMounted(() => {
  updateActiveItem();

  window.addEventListener(
    'scroll',
    scheduleActiveItemUpdate,
    {
      passive: true
    }
  );

  window.addEventListener(
    'resize',
    scheduleActiveItemUpdate
  );
});

onUnmounted(() => {
  window.removeEventListener(
    'scroll',
    scheduleActiveItemUpdate
  );

  window.removeEventListener(
    'resize',
    scheduleActiveItemUpdate
  );

  if (activeFrame) {
    cancelAnimationFrame(activeFrame);
  }
});
</script>

<style scoped>

.desktop-nav {
  display: none;
}


/* ==========================================================
   MENÚ VISIBLE
   ========================================================== */

.desktop-nav.desktop-nav--visible {
  --desktop-nav-pink: #d69393;

  align-items: stretch;

  background:
    rgba(
      16,
      10,
      11,
      0.32
    );

  backdrop-filter:
    blur(18px);

  -webkit-backdrop-filter:
    blur(18px);

  border:
    none;

  border-radius:
    0
    16px
    16px
    0;

  box-shadow:
    6px 6px 20px rgba(0, 0, 0, 0.22),
    4px 0 16px rgba(214, 147, 147, 0.08);

  display:
    flex;

  flex-direction:
    column;

  gap:
    clamp(
      0.36rem,
      0.7vw,
      0.64rem
    );

  justify-content:
    center;

  left:
    clamp(
      0.85rem,
      1.4vw,
      1.35rem
    );

  padding:
    clamp(
      0.82rem,
      1.35vw,
      1.08rem
    )
    clamp(
      0.68rem,
      1.15vw,
      0.96rem
    )
    clamp(
      0.82rem,
      1.35vw,
      1.08rem
    )
    clamp(
      0.9rem,
      1.7vw,
      1.45rem
    );

  position:
    fixed;

  top:
    50%;

  transform:
    translateY(-50%);

  width:
    clamp(
      9.8rem,
      12vw,
      12.3rem
    );

  z-index:
    2050;
}


/* ==========================================================
   SIN LÍNEA ROSA LATERAL
   ========================================================== */

.desktop-nav.desktop-nav--visible::before {
  display:
    none;
}


/* ==========================================================
   LINKS
   ========================================================== */

.desktop-nav.desktop-nav--visible a {
  align-items:
    center;

  background:
    transparent;

  border:
    none;

  border-radius:
    0;

  box-shadow:
    none;

  color:
    rgba(
      255,
      255,
      255,
      0.78
    );

  display:
    inline-flex;

  gap:
    0.48rem;

  font-family:
    'Roboto',
    myFont,
    'Bebas Neue',
    sans-serif;

  font-size:
    clamp(
      0.96rem,
      1vw,
      1.14rem
    );

  font-style:
    italic;

  font-weight:
    800;

  justify-content:
    flex-start;

  line-height:
    1;

  min-height:
    2.85rem;

  padding:
    0.56rem
    clamp(
      0.62rem,
      0.9vw,
      0.84rem
    );

  position:
    relative;

  text-decoration:
    none;

  text-shadow:
    0 0 0.7rem
    rgba(
      0,
      0,
      0,
      0.86
    );

  transition:
    color 180ms ease,
    transform 180ms ease,
    text-shadow 180ms ease;

  white-space:
    nowrap;
}


/* ==========================================================
   NÚMEROS
   ========================================================== */

.desktop-nav__number {
  color:
    rgba(
      255,
      218,
      218,
      0.58
    );

  font-size:
    0.68em;

  font-weight:
    900;

  min-width:
    1.35rem;

  transition:
    color 180ms ease;
}


/* ==========================================================
   SIN FONDO DECORATIVO
   ========================================================== */

.desktop-nav.desktop-nav--visible a::after {
  display:
    none;
}


/* ==========================================================
   HOVER / FOCUS
   ========================================================== */

.desktop-nav.desktop-nav--visible a:hover,
.desktop-nav.desktop-nav--visible a:focus-visible {
  background:
    transparent;

  border:
    none;

  box-shadow:
    none;

  color:
    #fff;

  outline:
    none;

  text-shadow:
    0 0 0.75rem rgba(214, 147, 147, 0.55),
    0 0 1rem rgba(0, 0, 0, 0.9);

  transform:
    translateX(0.28rem);
}


/* ==========================================================
   SECCIÓN ACTIVA
   ========================================================== */

.desktop-nav.desktop-nav--visible a.active {
  background:
    transparent;

  border:
    none;

  box-shadow:
    none;

  color:
    var(--desktop-nav-pink);

  outline:
    none;

  text-shadow:
    0 0 0.7rem rgba(214, 147, 147, 0.48);

  transform:
    translateX(0.28rem);
}


/* ==========================================================
   NÚMERO ACTIVO
   ========================================================== */

.desktop-nav.desktop-nav--visible
a.active
.desktop-nav__number {
  color:
    var(--desktop-nav-pink);
}


/* ==========================================================
   NÚMERO EN HOVER
   ========================================================== */

.desktop-nav.desktop-nav--visible
a:hover
.desktop-nav__number,

.desktop-nav.desktop-nav--visible
a:focus-visible
.desktop-nav__number {
  color:
    rgba(
      214,
      147,
      147,
      0.85
    );
}

</style>