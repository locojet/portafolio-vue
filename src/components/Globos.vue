<template>
  <div ref="container">
    <div class="wrapper" ref="wrapper">
      <header ref="header">
        <img src="../assets/img/Clouds/cloud1.png" class="cloud-one" />
        <img src="../assets/img/Clouds/cloud7.png" class="cloud-two" />
        <img src="../assets/img/elefanterosa.PNG" class="elefhant" />
        <h1 class="titel">That’s yours truly</h1>
      </header>
      <section>
        Like the pink elephant floating above, I’ve always had a thing for defying gravity.  
        I was born to walk, but all I want is to fly.

        I’m a web developer with solid experience building modern, responsive websites that not only work great — they feel alive. On top of that, I currently work as a materials inspector, where attention to detail isn’t just a skill — it’s a must.

        Between code and construction sites, I’ve found a passion for solving problems in unexpected ways. Whether it’s designing an interactive landing page or inspecting a weld with precision, I bring the same energy: curious, creative, and always looking for lift-off.

        If you’re into bold ideas, flying elephants, or just want to build something cool —  
        you’re in the right place.
      </section>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref, nextTick } from 'vue'

const wrapper = ref(null)
const header = ref(null)

function handleScroll() {
  if (!wrapper.value || !header.value) return

  const rect = header.value.getBoundingClientRect()

  // Cuando el header toca el top, permitir scroll interno
  if (rect.top <= 1) {
    wrapper.value.style.overflowY = 'auto'
  } else {
    wrapper.value.style.overflowY = 'hidden'
  }
}

onMounted(async () => {
  await nextTick()

  if (wrapper.value && header.value) {
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Ejecutar una vez por si ya está en top
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.wrapper {
  height: 100vh;
  overflow-y: hidden;
  overflow-x: hidden;
  perspective: 10px;
  background: var(--quaternary-color);
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
}

header {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  transform-style: preserve-3d;
  z-index: -1;
}

.elefhant {
  transform: translateZ(-3px) scale(0.5);
  position: absolute;
  bottom: -18rem;
}

.cloud-one,
.cloud-two {
  position: absolute;
  
  object-fit: cover;
  z-index: 0;
}

.cloud-one {
  transform: translateZ(-10px) scale(2);
  top: -10rem;
}

.cloud-two {
  transform: translateZ(-4px) scale(2.3);
  top: 10rem;
  left: 6rem;
  opacity: 100%;
}

.titel {
  font-size: 5rem;
  color: var(--quaternary-color);
  position: absolute;
  top: 15rem;
  z-index: 2;
}

section {
  
  font-size: 2rem;
  padding: 2rem;
  
  color: black;
  margin: 3rem;
}

@media (max-width: 639px) {
  .elefhant {
    bottom: -5rem;
  }

  .titel {
    margin-top: 10rem;
    font-size: 3rem;
    transform: translateZ(-10px) scale(2);
    
  }

  section {
    font-size: 1.5rem;
    margin: 2rem;
    text-align: justify;
    padding: 1rem;
   
  }
  .cloud-one{
    transform: translateZ(-10px) scale(4);
    height: auto;
    top: 15rem;
   
    
  }
  .cloud-two{
    transform: translateZ(-5px) scale(2.3);
    height: auto;
    top: 30rem;
    opacity: 70%;
  }
  
  
}
</style>