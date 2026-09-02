<template>
  <div>

    <!-- Fondo blur inclinado detrás del menú -->
    <div
      class="wraperr fondo"
      :class="{
        active: isBlurActive,
        degradado: !isNavActive,
        compacto: !isNavActive && isFixed
      }"
      :style="{ '--menu-blur-height': menuBlurHeight }"
    ></div>

    <!-- Contenedor del menú hamburguesa -->
    <div
      ref="navButton"
      :class="{
        navkorb: true,
        active: isNavActive,
        fixed: isFixed
      }"
      @click="toggleNav"
    >
      <div class="navbar">

        <!-- Botón decorativo redondo -->
        <div
          class="boton"
          :class="{ active: isNavActive }"
        ></div>

        <!-- Präsenz -->
        <div tabindex="8" class="bar eins">
          <a
            class="bartext"
            href="#presence-services"
            @click="navigateToSection($event, 'presence-services')"
          >
            Präsenz
          </a>
        </div>

        <!-- Konzept -->
        <div tabindex="9" class="bar zwei">
          <a
            class="bartext"
            href="#media"
            @click="navigateToSection($event, 'media')"
          >
            Konzept
          </a>
        </div>

        <!-- About -->
        <div tabindex="10" class="bar drei">
          <a
            class="bartext"
            href="#about"
            @click="navigateToSection($event, 'about')"
          >
            About
          </a>
        </div>

        <!-- Segundo botón decorativo -->
        <div class="boton1"></div>

      </div>
    </div>

  </div>
</template>


<script setup>
import {
  ref,
  onMounted,
  onUnmounted,
  computed,
  nextTick
} from 'vue';


/* ==========================================================
   ESTADOS
   ========================================================== */

const isNavActive = ref(false);

const isFixed = ref(false);

const isScrolledEnough = ref(false);

const navButton = ref(null);

const menuBlurHeight = ref('12rem');

let menuBlurFrame = 0;

let menuBlurTimers = [];


/* ==========================================================
   CALCULAR ALTURA DEL BLUR
   ========================================================== */

const updateMenuBlurHeight = () => {

  if (!navButton.value) {
    return;
  }


  const menuElements = [
    ...navButton.value.querySelectorAll(
      '.boton, .bar, .bartext'
    )
  ];


  const menuBottom = menuElements.reduce(
    (bottom, element) => {

      const rect =
        element.getBoundingClientRect();

      return Math.max(
        bottom,
        rect.bottom
      );

    },
    0
  );


  /*
   * Cuando el menú está abierto,
   * dejamos espacio después del último
   * elemento antes de comenzar el fade.
   */
  const extraSpace =
    isNavActive.value

      ? Math.min(
          Math.max(
            window.innerHeight * 0.012,
            10
          ),
          18
        )

      : 16;


  const nextHeight = Math.min(

    window.innerHeight,

    Math.max(

      isNavActive.value
        ? 160
        : 96,

      Math.ceil(
        menuBottom + extraSpace
      )

    )

  );


  menuBlurHeight.value =
    `${nextHeight}px`;

};


/* ==========================================================
   ACTUALIZAR BLUR
   ========================================================== */

const scheduleMenuBlurUpdate = () => {

  if (menuBlurFrame) {
    return;
  }


  menuBlurFrame =
    requestAnimationFrame(() => {

      menuBlurFrame = 0;

      updateMenuBlurHeight();

    });

};


/* ==========================================================
   ACTUALIZAR DURANTE TRANSICIÓN
   ========================================================== */

const scheduleMenuBlurTransitionUpdates = () => {

  menuBlurTimers.forEach(
    (timer) => clearTimeout(timer)
  );


  menuBlurTimers = [];


  scheduleMenuBlurUpdate();


  [90, 220, 420, 650].forEach(
    (delay) => {

      menuBlurTimers.push(

        setTimeout(
          scheduleMenuBlurUpdate,
          delay
        )

      );

    }
  );

};


/* ==========================================================
   ABRIR / CERRAR MENÚ
   ========================================================== */

const toggleNav = () => {

  isNavActive.value =
    !isNavActive.value;


  nextTick(
    scheduleMenuBlurTransitionUpdates
  );

};


/* ==========================================================
   ENLACES
   ========================================================== */

const clampValue = (
  value,
  min,
  max
) => Math.min(
  Math.max(
    value,
    min
  ),
  max
);


const getSectionOffset = (targetId) => {

  const isSmallViewport =
    window.matchMedia('(max-width: 1024px)').matches;


  if (targetId === 'presence-services') {

    const presenceOffset =
      isSmallViewport
        ? window.innerHeight * 0.3
        : window.innerHeight * 0.14;


    return clampValue(
      presenceOffset + (isNavActive.value ? 18 : 0),
      isSmallViewport ? 220 : 110,
      isSmallViewport ? 290 : 180
    );

  }


  const baseOffset =
    isSmallViewport
      ? window.innerHeight * 0.2
      : window.innerHeight * 0.14;


  const activeMenuExtra =
    isNavActive.value
      ? 28
      : 0;


  return clampValue(
      baseOffset + activeMenuExtra,
      isSmallViewport ? 150 : 100,
      isSmallViewport ? 240 : 180
  );

};


const navigateToSection = (event, targetId) => {

  event.stopPropagation();
  event.preventDefault();


  const target =
    document.getElementById(targetId);


  if (!target) {
    return;
  }


  const targetTop =
    target.getBoundingClientRect().top +
    window.scrollY -
    getSectionOffset(targetId);


  window.history.pushState(
    null,
    '',
    `${window.location.pathname}${window.location.search}#${targetId}`
  );


  window.scrollTo({
    top: Math.max(targetTop, 0),
    behavior: 'smooth'
  });


  nextTick(
    scheduleMenuBlurTransitionUpdates
  );

};


/* ==========================================================
   SCROLL
   ========================================================== */

const handleScroll = () => {

  const scrollPosition =
    window.scrollY;


  /*
   * IMPORTANTE:
   *
   * Antes de 330px:
   *
   * menú está ABAJO
   * position: absolute
   * top: 19rem
   *
   *
   * Desde 330px:
   *
   * menú está ARRIBA
   * position: fixed
   * top: -24px
   */
  isFixed.value =
    scrollPosition >= 330;


  isScrolledEnough.value =
    scrollPosition >= 440;


  nextTick(
    scheduleMenuBlurUpdate
  );

};


/* ==========================================================
   VISIBILIDAD DEL BLUR
   ========================================================== */

/*
 * ESTA ES LA LÓGICA CORRECTA:
 *
 *
 * MENÚ ABAJO + CERRADO
 * ---------------------
 * isFixed = false
 * isNavActive = false
 *
 * → SIN BLUR
 *
 *
 * MENÚ ABAJO + ABIERTO
 * ---------------------
 * isNavActive = true
 *
 * → BLUR
 *
 *
 * MENÚ ARRIBA + CERRADO
 * ----------------------
 * isFixed = true
 *
 * → BLUR COMPACTO ARRIBA
 *
 *
 * MENÚ ARRIBA + ABIERTO
 * ----------------------
 * isNavActive = true
 *
 * → BLUR COMPLETO
 */
const isBlurActive = computed(() => {

  return (
    isNavActive.value ||
    isFixed.value
  );

});


/* ==========================================================
   MOUNT
   ========================================================== */

onMounted(() => {

  /*
   * Detectamos inmediatamente dónde
   * está realmente la página.
   */
  handleScroll();


  window.addEventListener(
    'scroll',
    handleScroll
  );


  window.addEventListener(
    'resize',
    scheduleMenuBlurTransitionUpdates
  );


  nextTick(
    scheduleMenuBlurTransitionUpdates
  );

});


/* ==========================================================
   UNMOUNT
   ========================================================== */

onUnmounted(() => {

  window.removeEventListener(
    'scroll',
    handleScroll
  );


  window.removeEventListener(
    'resize',
    scheduleMenuBlurTransitionUpdates
  );


  menuBlurTimers.forEach(
    (timer) => clearTimeout(timer)
  );


  if (menuBlurFrame) {

    cancelAnimationFrame(
      menuBlurFrame
    );

  }

});

</script>


<style scoped>


/* ==========================================================
   VARIABLES
   ========================================================== */

:root {

  --primary-color: #fff;

  --secondary-color: #74f6fd;

  --tertiary-color: #000;

  --quaternary-color:
    rgba(27, 87, 87, 0.5);

}


.wraperr {
  overflow-x: hidden;
}


/* ==========================================================
   FONDO BLUR
   ========================================================== */

.fondo {

  /*
   * Extensión superior para evitar
   * cortes visibles.
   *
   * NO es degradado.
   */
  --menu-blur-overscan:
    clamp(
      5rem,
      11dvh,
      8rem
    );


  /*
   * Fade solamente abajo.
   */
  --menu-blur-fade:
    clamp(
      6.5rem,
      12svh,
      9rem
    );


  position: fixed;


  top:
    calc(
      -1 *
      var(--menu-blur-overscan)
    );


  /*
   * Más ancho para compensar
   * la inclinación.
   */
  left: -12vw;

  width: 124vw;


  /*
   * Altura cuando el menú
   * está desplegado.
   */
  height:
    calc(
      var(
        --menu-blur-height,
        12rem
      )
      +
      var(
        --menu-blur-overscan
      )
      +
      var(
        --menu-blur-fade
      )
    );


  z-index: 1900;


  /*
   * Por defecto:
   * blur invisible.
   */
  opacity: 0;


  background:
    rgba(
      0,
      0,
      0,
      0.1
    );


  /* ========================================================
     BLUR UNIFORME
     ======================================================== */

  backdrop-filter:
    blur(8px);

  -webkit-backdrop-filter:
    blur(8px);


  /* ========================================================
     DEGRADADO INFERIOR

     NO existe degradado arriba.
     ======================================================== */

  mask-image:
    linear-gradient(
      to bottom,

      #000 0%,

      #000
        calc(
          100%
          -
          var(--menu-blur-fade)
        ),

      rgba(0, 0, 0, 0.68)
        calc(
          100%
          -
          var(--menu-blur-fade)
          +
          2rem
        ),

      rgba(0, 0, 0, 0.2)
        calc(
          100%
          -
          2rem
        ),

      transparent 100%
    );


  -webkit-mask-image:
    linear-gradient(
      to bottom,

      #000 0%,

      #000
        calc(
          100%
          -
          var(--menu-blur-fade)
        ),

      rgba(0, 0, 0, 0.68)
        calc(
          100%
          -
          var(--menu-blur-fade)
          +
          2rem
        ),

      rgba(0, 0, 0, 0.2)
        calc(
          100%
          -
          2rem
        ),

      transparent 100%
    );


  /* ========================================================
     INCLINACIÓN
     ======================================================== */

  transform:
    rotate(-6deg)
    scaleX(1.08);


  transform-origin:
    top right;


  pointer-events: none;


  /* ========================================================
     ESTADO CERRADO
     ======================================================== */

  clip-path:
    inset(
      0
      0
      100%
      0
    );


  will-change:
    clip-path,
    height,
    opacity;


  transition:

    opacity
      0.7s
      ease-in-out,

    clip-path
      0.65s
      cubic-bezier(
        0.22,
        1,
        0.36,
        1
      );

}


/* ==========================================================
   BLUR ACTIVO
   ========================================================== */

.fondo.active {

  clip-path:
    inset(0);

  opacity: 1;

}


/* ==========================================================
   MENÚ ARRIBA + CERRADO

   Este fondo existe SOLAMENTE cuando:
   
   isFixed === true
   &&
   isNavActive === false
   ========================================================== */

.fondo.compacto {

  height:
    calc(
      10rem
      +
      var(--menu-blur-overscan)
    );

}



/* ==========================================================
   MENÚ HAMBURGUESA
   ========================================================== */

.navkorb {

  z-index: 2000;

  position: absolute;

  top: 19rem;

  right: 0;

  margin: 1.9rem;

  margin-right: 7vw;

  cursor: pointer;

  width: 60px;

  transform:
    scale(0.7);

  padding: 2px;

  border:
    solid
    3px
    var(--quaternary-color);

  border-left: none;

  border-bottom: none;

  border-top: none;

  border-radius:
    20% 50% 50% 0;

  transform:
    rotate(-6deg);

}


/* ==========================================================
   MENÚ ARRIBA
   ========================================================== */

.navkorb.fixed {

  position: fixed;

  top: -24px;

  right: 0;

}


/* ==========================================================
   MENÚ ACTIVO
   ========================================================== */

.navkorb.active {

  border-radius:
    4% 90% 30% 50%;

  transform:
    rotate(-6deg);

}


/* ==========================================================
   PRIMER ENLACE
   ========================================================== */

.navkorb.active .eins {

  transform:
    translateX(-12vw)
    scale(1.7);

  margin-bottom: 1.3rem;

  margin-top: 1.3rem;

}


/* ==========================================================
   SEGUNDO ENLACE
   ========================================================== */

.navkorb.active .zwei {

  transform:
    translateX(-34vw)
    scale(1.7);

  margin-bottom: 1.3rem;

}


/* ==========================================================
   TERCER ENLACE
   ========================================================== */

.navkorb.active .drei {

  transform:
    translateX(-56vw)
    scale(1.7);

  margin-bottom: 1.3rem;

}



/* ==========================================================
   BOTÓN DECORATIVO
   ========================================================== */

div.boton {

  width: 55px;

  height: 55px;

  transform:
    scale(0.9);

  border-radius: 50%;

  margin-bottom: -3rem;

  box-shadow:
    0 0
    0.5rem
    var(--quaternary-color);

  border:
    solid
    2px
    var(--quaternary-color);

  transition:

    transform
      0.4s
      ease-in-out,

    margin-bottom
      0.4s
      ease-in-out;

}


/* ==========================================================
   BOTÓN ACTIVO
   ========================================================== */

div.boton.active {

  margin-bottom: -3rem;

  transform:
    translateX(-15px)
    translateY(50px)
    scale(0.9);

}



/* ==========================================================
   SEGUNDO BOTÓN DECORATIVO
   ========================================================== */

.boton1 {

  width: 55px;

  height: 55px;

  border-radius: 50%;

  margin-top: -3rem;

  margin-left: -0.3rem;

  box-shadow:
    0 0
    0.5rem
    rgba(
      171,
      248,
      245,
      0.8
    );

  border:
    solid
    2px
    rgba(
      161,
      233,
      227,
      0.8
    );

  opacity: 0;

}



/* ==========================================================
   BARRAS
   ========================================================== */

.bar {

  background:
    var(--quaternary-color);

  width: 60px;

  height: 6px;

  margin: 6px;

  margin-left: -0.15rem;

  cursor: pointer;

  transform:
    scale(0.6);

  border-radius: 0.3rem;

  transition:
    all
    0.3s
    ease-in-out;

  opacity: 1;

}


.active .bar {

  background:
    rgba(
      248,
      248,
      0,
      0
    );

}



/* ==========================================================
   TEXTO
   ========================================================== */

.bartext {
  display: inline-block;

  font-family: Helvetica, Arial, sans-serif;
  font-weight: 400;
  font-style: italic;

  opacity: 0;
  color: var(--primary-color);
  text-align: center;

  position: absolute;
  top: 0px;

  transform: translate(-50%, 0);

  z-index: 1000;

  transition:
    opacity 0.3s ease-in-out,
    transform 0.3s ease-in-out;
}


.bartext.active {

  gap: 2rem;

}


/* ==========================================================
   TEXTO VISIBLE
   ========================================================== */

.navkorb.active .bartext {

  opacity: 1;

  transform:
    translate(
      -50%,
      -10px
    );

}


/* ==========================================================
   HOVER
   ========================================================== */

.navkorb.active .bartext:hover {

  transform:
    translate(
      -50%,
      -15px
    )
    scale(1.1);

  color:
    var(--tertiary-color);

}



</style>
