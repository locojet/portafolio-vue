<template>
  <a tabindex="0" href="#">
    <img src="/src/assets/img/firma.png" alt="Logo de la web" />
  </a>
</template>

<style scoped>
/* Estilos del logo */
img {
  position: absolute;
  left: 5rem;
  z-index: 1000;
  width: 12vw; /* Incrementa el tamaño cambiando el valor */
  margin: 2rem 0 4rem -3rem;
  min-width: 8rem; /* Ajusta el tamaño mínimo */
  transition: transform 0.2s ease-in-out;
  transform: scale(1) rotate(0deg); /* Ajusta scale si deseas agrandarlo más */
}

img:hover {
  transform: scale(1.1) rotate(10deg); /* Incrementa el efecto hover si quieres un cambio más notorio */
}

@media screen and (max-width: 1024px) {
  img {
    position: fixed;
    left: 4rem;
    top: -4rem;
    width: 10vw; /* Ajusta el tamaño en dispositivos más pequeños */
    transform: scale(0.9) rotate(-2.3deg); 
    transition: all 0.3s ease-in-out;
    opacity: 1;
    
  }
}
</style>
