<template>
  <div
    ref="contactAction"
    class="contact-action-shell"
    :class="{
      'contact-action-shell--opening-contact':
        phase === 'opening-contact',

      'contact-action-shell--opening-menu':
        phase === 'opening-menu',

      'contact-action-shell--open':
        phase === 'open',

      'contact-action-shell--closing-menu':
        phase === 'closing-menu',

      'contact-action-shell--closing-contact':
        phase === 'closing-contact'
    }"
  >
    <div
      class="contact-action-backdrop"
      aria-hidden="true"
    ></div>

    <button
      class="contact-action-toggle"
      type="button"
      :aria-expanded="phase === 'open'"
      aria-controls="contact-action-options"
      aria-label="Kontaktmenü öffnen"
      @click="openContactOptions"
    >
      <span class="contact-action-toggle__label">
        {{ label }}
      </span>
    </button>

    <div
      class="contact-action-menu-background"
      aria-hidden="true"
    ></div>

    <div
      id="contact-action-options"
      class="contact-action-options"
      :aria-hidden="phase !== 'open'"
    >
      <a
        class="contact-action-option contact-action-option--icon"
        :href="emailHref"
        aria-label="E-Mail schreiben"
      >
        <svg
          class="contact-action-icon"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            d="M3 5h18c1.1 0 2 .9 2 2v10c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V7c0-1.1.9-2 2-2Zm9 7 8-5H4l8 5Zm0 2.3L3 8.7V17h18V8.7l-9 5.6Z"
          />
        </svg>
      </a>

      <a
        class="contact-action-option contact-action-option--icon"
        :href="phoneHref"
        aria-label="Anrufen"
      >
        <svg
          class="contact-action-icon"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            d="M6.6 10.8c1.5 3 3.9 5.4 6.9 6.9l2.3-2.3c.3-.3.7-.4 1.1-.3 1.2.4 2.5.6 3.8.6.6 0 1 .4 1 1V21c0 .6-.4 1-1 1C10.4 22 2 13.6 2 3.3c0-.6.4-1 1-1h4.3c.6 0 1 .4 1 1 0 1.3.2 2.6.6 3.8.1.4 0 .8-.3 1.1l-2 2.6Z"
          />
        </svg>
      </a>

      <a
        class="contact-action-option contact-action-option--impressum"
        :href="impressumHref"
      >
        Impressum
      </a>

      <button
        class="contact-action-option contact-action-option--close"
        type="button"
        aria-label="Kontaktmenü schließen"
        @click="closeMenu"
      >
        <span
          class="contact-action-x"
          aria-hidden="true"
        >
          <span></span>
          <span></span>
        </span>
      </button>
    </div>
  </div>
</template>

<script setup>
import {
  computed,
  onMounted,
  onUnmounted,
  ref
} from 'vue';

const props = defineProps({
  label: {
    type: String,
    default: 'Kontakt',
  },

  email: {
    type: String,
    default: 'kontakt@digital-kontext.de',
  },

  phone: {
    type: String,
    default: '+49 000 00000000',
  },

  impressumHref: {
    type: String,
    default: '#footer-contact',
  },
});

const contactAction = ref(null);
const phase = ref('closed');

const KONTAKT_DURATION = 160;
const MENU_DURATION = 180;
const MENU_OPEN_DELAY = 80;
const CONTACT_RETURN_DELAY = 70;

let animationTimer = null;
let secondaryTimer = null;

const emailHref = computed(() => {
  return `mailto:${props.email}?subject=Projekt%20besprechen`;
});

const phoneHref = computed(() => {
  return `tel:${props.phone.replace(/[^\d+]/g, '')}`;
});

const clearAnimationTimers = () => {
  if (animationTimer) {
    clearTimeout(animationTimer);
    animationTimer = null;
  }

  if (secondaryTimer) {
    clearTimeout(secondaryTimer);
    secondaryTimer = null;
  }
};

const openContactOptions = () => {
  if (phase.value !== 'closed') {
    return;
  }

  clearAnimationTimers();

  phase.value = 'opening-contact';

  animationTimer = setTimeout(() => {
    phase.value = 'opening-menu';

    secondaryTimer = setTimeout(() => {
      phase.value = 'open';
    }, MENU_DURATION);

  }, MENU_OPEN_DELAY);
};

const closeMenu = () => {
  if (phase.value !== 'open') {
    return;
  }

  clearAnimationTimers();

  phase.value = 'closing-menu';

  animationTimer = setTimeout(() => {
    phase.value = 'closing-contact';

    secondaryTimer = setTimeout(() => {
      phase.value = 'closed';
    }, KONTAKT_DURATION);

  }, CONTACT_RETURN_DELAY);
};

const closeContactOptions = (event) => {
  if (
    phase.value === 'open' &&
    !contactAction.value?.contains(event.target)
  ) {
    closeMenu();
  }
};

const closeWithKeyboard = (event) => {
  if (
    event.key === 'Escape' &&
    phase.value === 'open'
  ) {
    closeMenu();
  }
};

onMounted(() => {
  document.addEventListener(
    'click',
    closeContactOptions
  );

  document.addEventListener(
    'keydown',
    closeWithKeyboard
  );
});

onUnmounted(() => {
  clearAnimationTimers();

  document.removeEventListener(
    'click',
    closeContactOptions
  );

  document.removeEventListener(
    'keydown',
    closeWithKeyboard
  );
});
</script>

<style scoped>

.contact-action-shell {
  display: inline-flex;
  flex-direction: column;
  gap: .7rem;
  margin-top: 1.5rem;
  max-width: min(100%, 19rem);
  position: relative;
  width: max-content;
}

.contact-action-shell.floating-contact-action {
  --contact-action-top: 90svh;

  --contact-menu-height:
    clamp(
      13.5rem,
      30svh,
      18rem
    );

  align-items: center;
  flex-direction: row;
  gap: clamp(.65rem, 1.3vw, 1rem);
  margin: 0;
  max-width: none;
  position: fixed;

  right:
    max(
      .35rem,
      env(safe-area-inset-right)
    );

  top: var(--contact-action-top);

  transform:
    translateY(-50%);

  width: auto;
  z-index: 1850;
}

.contact-action-backdrop {
  background:
    rgba(
      10,
      6,
      7,
      .48
    );

  backdrop-filter:
    blur(18px);

  -webkit-backdrop-filter:
    blur(18px);

  height:
    var(
      --contact-menu-height,
      14rem
    );

  left: 0;
  opacity: 0;
  pointer-events: none;
  position: fixed;
  right: 0;

  top:
    calc(
      var(--contact-action-top, 68svh)
      -
      (
        var(--contact-menu-height, 14rem)
        /
        2
      )
    );

  transform:
    translateX(.7rem);

  transition:
    opacity 140ms ease,
    transform 180ms cubic-bezier(.22, 1, .36, 1);

  z-index: 0;
}

.contact-action-shell--opening-menu
.contact-action-backdrop,

.contact-action-shell--open
.contact-action-backdrop,

.contact-action-shell--closing-menu
.contact-action-backdrop {
  opacity: 1;
  transform: translateX(0);
}

.contact-action-menu-background {
  display: none;
}

.contact-action-toggle,
.contact-action-option {
  align-items: center;
  appearance: none;
  color: #fff;
  display: inline-flex;
  justify-content: center;
  letter-spacing: 0;
  text-decoration: none;
  touch-action: manipulation;
}

.contact-action-toggle {
  background: transparent;

  border:
    1px solid
    rgba(
      214,
      147,
      147,
      .9
    );

  border-radius:
    9px 0 0 9px;

  cursor: pointer;
  isolation: isolate;
  overflow: hidden;

  padding:
    1.12rem
    .5rem;

  position: relative;
  width: auto;
  z-index: 20;
}

.contact-action-toggle::before {
  content: "";

  position: absolute;
  inset: 0;

  background:
    rgba(
      214,
      147,
      147,
      .68
    );

  backdrop-filter:
    blur(7px)
    saturate(1.2);

  -webkit-backdrop-filter:
    blur(7px)
    saturate(1.2);

  pointer-events: none;
  z-index: -1;
}

.contact-action-toggle:hover::before,
.contact-action-toggle:focus-visible::before {
  background:
    rgba(
      214,
      147,
      147,
      .76
    );
}

.contact-action-toggle:hover,
.contact-action-toggle:focus-visible {
  outline: none;
}

.contact-action-toggle__label {
  color: #fff;
  display: inline-block;

  font-family:
    myFont,
    Helvetica,
    Arial,
    sans-serif;

  font-size:
    clamp(
      1.3rem,
      1.9vw,
      1.65rem
    );

  font-style: italic;
  font-weight: 800;
  line-height: 1;
  position: relative;

  writing-mode:
    vertical-rl;

  transform:
    rotate(180deg);

  z-index: 1;
}

.contact-action-options {
  align-items: flex-end;
  display: flex;
  flex-direction: column;

  gap:
    clamp(
      .7rem,
      1.3vw,
      1rem
    );

  opacity: 0;
  pointer-events: none;
  position: absolute;

  right:
    calc(
      100%
      +
      1rem
    );

  top: 50%;

  transform:
    translate(
      .7rem,
      -50%
    );

  transition:
    opacity 140ms ease,
    transform 180ms cubic-bezier(.22, 1, .36, 1);

  width: max-content;
  z-index: 10;
}

.contact-action-shell--opening-menu
.contact-action-options,

.contact-action-shell--open
.contact-action-options,

.contact-action-shell--closing-menu
.contact-action-options {
  opacity: 1;
  pointer-events: auto;

  transform:
    translate(
      0,
      -50%
    );
}

.contact-action-option {
  background: transparent;

  backdrop-filter:
    blur(12px);

  -webkit-backdrop-filter:
    blur(12px);

  border:
    1px solid
    rgba(
      255,
      218,
      218,
      .36
    );

  border-radius: 999px;
  color: #fff;
  cursor: pointer;

  font-family:
    Helvetica,
    Arial,
    sans-serif;

  min-height: 2.8rem;

  padding:
    .58rem
    1.1rem;
}

.contact-action-icon {
  fill: currentColor;
  height: 1.35rem;
  width: 1.35rem;
}

.contact-action-x {
  display: block;
  height: 1rem;
  pointer-events: none;
  position: relative;
  width: 1rem;
}

.contact-action-x span {
  background: currentColor;
  border-radius: 999px;
  height: 1.5px;
  left: 50%;
  position: absolute;
  top: 50%;
  width: 100%;
}

.contact-action-x span:first-child {
  transform:
    translate(-50%, -50%)
    rotate(45deg);
}

.contact-action-x span:last-child {
  transform:
    translate(-50%, -50%)
    rotate(-45deg);
}

@media (min-width: 640px) and (max-width: 1024px), (max-width: 639px) {

  .contact-action-shell {
    --mobile-menu-height: 4.15rem;
    --mobile-menu-background-extra: 5rem;
    --mobile-menu-background-fade: 3rem;

    --kontakt-duration: 160ms;
    --menu-duration: 180ms;

    width: auto;
  }

  .contact-action-shell.floating-contact-action {
    align-items: center;
    bottom: 5rem;
    left: auto;
    margin: 0;
    position: fixed;

    right:
      max(
        .35rem,
        env(safe-area-inset-right)
      );

    top: auto;
    transform: none;
    width: auto;
    z-index: 2000;
  }

  .contact-action-toggle {
    background: transparent;

    border:
      1px solid
      rgba(
        214,
        147,
        147,
        .9
      );

    border-radius:
      8px 0 0 8px;

    clip-path:
      inset(
        0% 0% 0% 0%
        round
        8px 0 0 8px
      );

    isolation: isolate;
    min-width: 2.55rem;
    overflow: hidden;

    padding:
      .9rem
      .42rem;

    position: relative;

    transition:
      clip-path
      var(--kontakt-duration)
      cubic-bezier(.4, 0, .2, 1);
  }

  .contact-action-toggle::before {
    content: "";
    position: absolute;
    inset: 0;

    background:
      rgba(
        214,
        147,
        147,
        .68
      );

    backdrop-filter:
      blur(7px)
      saturate(1.2);

    -webkit-backdrop-filter:
      blur(7px)
      saturate(1.2);

    pointer-events: none;
    z-index: -1;
  }

  .contact-action-toggle__label {
    color: #fff;

    font-size:
      clamp(
        1.08rem,
        4.1vw,
        1.32rem
      );

    line-height: 1;
    position: relative;
    z-index: 1;
  }

  .contact-action-shell--opening-contact
  .contact-action-toggle {
    clip-path:
      inset(
        100% 0% 0% 0%
        round
        8px 0 0 8px
      );
  }

  .contact-action-shell--opening-menu
  .contact-action-toggle,

  .contact-action-shell--open
  .contact-action-toggle,

  .contact-action-shell--closing-menu
  .contact-action-toggle {
    visibility: hidden;
  }

  .contact-action-shell--closing-contact
  .contact-action-toggle {
    animation:
      kontakt-grow-up
      var(--kontakt-duration)
      cubic-bezier(.4, 0, .2, 1)
      forwards;
  }

  @keyframes kontakt-grow-up {

    0% {
      clip-path:
        inset(
          100% 0% 0% 0%
          round
          8px 0 0 8px
        );
    }

    100% {
      clip-path:
        inset(
          0% 0% 0% 0%
          round
          8px 0 0 8px
        );
    }
  }

  .contact-action-backdrop {
    display: none;
  }

  .contact-action-menu-background {
    display: block;
    position: fixed;
    left: 0;
    right: 0;

    bottom:
      env(safe-area-inset-bottom);

    height:
      calc(
        var(--mobile-menu-height)
        +
        var(--mobile-menu-background-extra)
      );

    background:
      rgba(
        214,
        147,
        147,
        .75
      );

    backdrop-filter:
      blur(10px)
      saturate(1.1);

    -webkit-backdrop-filter:
      blur(10px)
      saturate(1.1);

    mask-image:
      linear-gradient(
        to bottom,
        transparent 0%,
        rgba(0, 0, 0, .08) 12%,
        rgba(0, 0, 0, .22) 24%,
        rgba(0, 0, 0, .45) 38%,
        rgba(0, 0, 0, .7) 52%,
        rgba(0, 0, 0, .9) 64%,
        #000 74%,
        #000 100%
      );

    -webkit-mask-image:
      linear-gradient(
        to bottom,
        transparent 0%,
        rgba(0, 0, 0, .08) 12%,
        rgba(0, 0, 0, .22) 24%,
        rgba(0, 0, 0, .45) 38%,
        rgba(0, 0, 0, .7) 52%,
        rgba(0, 0, 0, .9) 64%,
        #000 74%,
        #000 100%
      );

    clip-path:
      inset(
        0
        0
        0
        100%
      );

    opacity: 0;
    pointer-events: none;

    transition:
      clip-path
      var(--menu-duration)
      cubic-bezier(.22, 1, .36, 1),

      opacity
      20ms linear;

    z-index: 2090;
  }

  .contact-action-shell--opening-menu
  .contact-action-menu-background,

  .contact-action-shell--open
  .contact-action-menu-background {
    clip-path:
      inset(
        0
        0
        0
        0
      );

    opacity: 1;
  }

  .contact-action-shell--closing-menu
  .contact-action-menu-background {
    clip-path:
      inset(
        0
        0
        0
        100%
      );

    opacity: 1;
  }

  .contact-action-shell--closing-contact
  .contact-action-menu-background {
    clip-path:
      inset(
        0
        0
        0
        100%
      );

    opacity: 0;
  }

  .contact-action-options,
  .contact-action-shell.floating-contact-action
  .contact-action-options {
    align-items: stretch;
    background: transparent;

    backdrop-filter: none;
    -webkit-backdrop-filter: none;

    bottom:
      env(safe-area-inset-bottom);

    box-sizing: border-box;

    clip-path:
      inset(
        0
        0
        0
        100%
      );

    display: flex;
    flex-direction: row;
    gap: 0;

    height:
      var(--mobile-menu-height);

    left: 0;
    opacity: 0;
    padding: 0;
    pointer-events: none;
    position: fixed;
    right: 0;
    top: auto;
    transform: none;

    transition:
      clip-path
      var(--menu-duration)
      cubic-bezier(.22, 1, .36, 1),

      opacity
      20ms linear;

    width: 100vw;
    z-index: 2100;
  }

  .contact-action-shell--opening-menu
  .contact-action-options,

  .contact-action-shell--open
  .contact-action-options,

  .contact-action-shell.floating-contact-action.contact-action-shell--opening-menu
  .contact-action-options,

  .contact-action-shell.floating-contact-action.contact-action-shell--open
  .contact-action-options {
    clip-path:
      inset(
        0
        0
        0
        0
      );

    opacity: 1;
    pointer-events: auto;
  }

  .contact-action-shell--closing-menu
  .contact-action-options,

  .contact-action-shell.floating-contact-action.contact-action-shell--closing-menu
  .contact-action-options {
    clip-path:
      inset(
        0
        0
        0
        100%
      );

    opacity: 1;
    pointer-events: none;
  }

  .contact-action-shell--closing-contact
  .contact-action-options,

  .contact-action-shell.floating-contact-action.contact-action-shell--closing-contact
  .contact-action-options {
    clip-path:
      inset(
        0
        0
        0
        100%
      );

    opacity: 0;
    pointer-events: none;
  }

  .contact-action-option {
    align-items: center;
    background: transparent;

    backdrop-filter: none;
    -webkit-backdrop-filter: none;

    border: none;
    border-radius: 0;
    box-shadow: none;
    color: #fff;
    cursor: pointer;
    display: flex;
    flex: 1 1 0;
    height: 100%;
    justify-content: center;
    margin: 0;
    min-height: 0;
    min-width: 0;
    opacity: 0;

    padding:
      0
      .42rem;

    transform:
      translateX(.9rem);

    transition:
      opacity 110ms ease,
      transform 150ms cubic-bezier(.22, 1, .36, 1),
      background 120ms ease;
  }

  .contact-action-shell--opening-menu
  .contact-action-option,

  .contact-action-shell--open
  .contact-action-option {
    opacity: 1;
    transform: translateX(0);
  }

  .contact-action-shell--opening-menu
  .contact-action-option:nth-child(4) {
    transition-delay: 0ms;
  }

  .contact-action-shell--opening-menu
  .contact-action-option:nth-child(3) {
    transition-delay: 15ms;
  }

  .contact-action-shell--opening-menu
  .contact-action-option:nth-child(2) {
    transition-delay: 30ms;
  }

  .contact-action-shell--opening-menu
  .contact-action-option:nth-child(1) {
    transition-delay: 45ms;
  }

  .contact-action-shell--closing-menu
  .contact-action-option {
    opacity: 0;
    transform: translateX(.9rem);
    transition-delay: 0ms;
  }

  .contact-action-option
  +
  .contact-action-option {
    border-left:
      1px solid
      rgba(
        255,
        255,
        255,
        .38
      );
  }

  .contact-action-option--icon {
    flex: .9 1 0;
  }

  .contact-action-icon {
    display: block;
    fill: currentColor;

    height:
      clamp(
        1.75rem,
        5.4vw,
        2.15rem
      );

    pointer-events: none;

    width:
      clamp(
        1.75rem,
        5.4vw,
        2.15rem
      );
  }

  .contact-action-option--impressum {
    flex: 1.48 1 0;

    font-family:
      "Helvetica Neue",
      Helvetica,
      Arial,
      sans-serif;

    font-size:
      clamp(
        1.28rem,
        4.5vw,
        1.6rem
      );

    font-style: normal;
    font-weight: 700;
    letter-spacing: -.02em;
    white-space: nowrap;
  }

  .contact-action-option--close {
    appearance: none;
    background: transparent;

    border:
      none !important;

    flex: .56 1 0;
    padding: 0;
    position: relative;
  }

  .contact-action-option--close::before {
    content: "";

    position: absolute;

    left: 0;

    top: 18%;
    bottom: 18%;

    width: 1px;

    background:
      rgba(
        255,
        255,
        255,
        .38
      );

    pointer-events: none;
  }

  .contact-action-x {
    display: block;
    height: 1.12rem;
    pointer-events: none;
    position: relative;
    width: 1.12rem;
  }

  .contact-action-x span {
    background: #fff;
    border-radius: 999px;
    height: 1.7px;
    left: 50%;
    position: absolute;
    top: 50%;
    width: 100%;
  }

  .contact-action-x
  span:first-child {
    transform:
      translate(-50%, -50%)
      rotate(45deg);
  }

  .contact-action-x
  span:last-child {
    transform:
      translate(-50%, -50%)
      rotate(-45deg);
  }

  .contact-action-option:hover,
  .contact-action-option:focus-visible {
    background: transparent;

    outline: none;
  }

  .contact-action-option:active {
    background: transparent;
  }
}

@media (prefers-reduced-motion: reduce) {

  .contact-action-toggle,
  .contact-action-options,
  .contact-action-menu-background,
  .contact-action-option {
    animation-duration:
      .01ms !important;

    transition-duration:
      .01ms !important;
  }
}

</style>
