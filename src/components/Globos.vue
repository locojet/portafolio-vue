<template>
  <div ref="container">
    <div class="wrapper" ref="wrapper">
      <header ref="header">
        <img src="../assets/img/Clouds/cloud1.png" class="cloud cloud-one" />
        <img src="../assets/img/Clouds/cloud7.png" class="cloud cloud-two" />
        <img src="../assets/img/Clouds/cloud8.png" class="cloud cloud-three" />
        
        <h1 class="titel">That’s yours truly</h1>
      </header>
      <section>
       I thrive on solving problems and helping others succeed. Learning new skills? Always up for it. I believe what makes me valuable is that same drive I help foster in others – that need for momentum and purpose every single day. I truly enjoy my work, and there's nothing more rewarding than being part of forward-moving processes.
      </section>
    </div>
  </div>
</template>
<script setup>
import { onMounted, onBeforeUnmount } from 'vue';

onMounted(() => {
  const cloudOne = document.querySelector('.cloud-one');
  const title = document.querySelector('.titel');
  const cloudThree = document.querySelector('.cloud-three');

  const handleScroll = () => {
    const scrollY = window.scrollY;
    // Mueve la nube más despacio (dividiendo entre 4)
    cloudOne.style.transform = `translateY(${scrollY * 0.25}px)`;
    cloudThree.style.transform = `translateY(${scrollY * 0.15}px)`;
    title.style.transform = `translateY(${scrollY * 0.25}px)`;
    
    
  };

  window.addEventListener('scroll', handleScroll);

  onBeforeUnmount(() => {
    window.removeEventListener('scroll', handleScroll);
  });
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
  font-size: 5rem;
  color: white;
  z-index: 1;
  margin: 0;
  margin-top: -90rem;
}

section {
  font-size: 2rem;
  padding: 2rem;
  color: rgb(255, 255, 255);
  margin: 3rem auto;
  max-width: 800px;
  line-height: 1.6;
}

@media (max-width: 639px) {
  .cloud {
    width: 30rem;
  
  }

  .elefhant {
    width: 12rem;
  }

  .titel {
    font-size: 2.5rem;
    margin-top: -220rem;
  }

  section {
    font-size: 1.5rem;
    margin: 2rem;
    padding: 1rem;
    text-align: justify;
    margin-top: -20rem;
  }
  .cloud-one{
  position: absolute;
  top: -90rem;
  left: 50%;
  transform: translateX(-50%);
  width: 80rem;
  max-width: 100vw;
  z-index: 0;
}

  .cloud-two{
    position: absolute;
  top: -90rem;
  margin-left: 30rem;
  transform: translateX(-50%);
  width: 80rem;
  max-width: 100vw;
  z-index: 0;
  }
  
}
</style>