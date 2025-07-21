<script setup>
import Navigation from './components/Navigation.vue';
import Logo from './components/Logo.vue';
import Navdesktop from './components/Navdesktop.vue';
import VideoInicio from './components/VideoInicio.vue';
import Whatup from './components/Whatup.vue';
import Mevideo from './components/Mevideo.vue';
import Globos from './components/Globos.vue';



</script>

<template>
  <div id="app">
    <Logo />
    <Navigation />
    <VideoInicio />
    <Whatup />
    <Mevideo />
    <Globos />
    
    
   
    
    
    
    
    
    
    
    
    
  </div>
</template>

<style scoped>
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


