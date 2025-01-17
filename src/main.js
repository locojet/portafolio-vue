import { createApp } from 'vue'
import './style.css'
import App from './App.vue'


createApp(App).mount('#app')


const setVH = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  };
  
  // Configurar la altura dinámica al cargar la página y en redimensionamientos
  window.addEventListener('resize', setVH);
  setVH();
  