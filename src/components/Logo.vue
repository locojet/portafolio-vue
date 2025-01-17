<template>
  
  <a tabindex="0" href="#" class="wraperr">
    <img src="/src/assets/img/firma.png" alt="Logo de la web" />
  </a>

</template>

<style scoped>
.wraperr{
  overflow-x: hidden;

}

/* Estilos del logo */
img {
  position: absolute;
  right: 5rem;
  top: 50vh;
  filter: drop-shadow(4px 4px 10px rgba(0, 0, 0, 0.5));
  
  
  z-index: 2100;
  width: 10vw; /* Incrementa el tamaño cambiando el valor */
  
  min-width: 8rem; /* Ajusta el tamaño mínimo */
  transition: transform 0.2s ease-in-out;
  
}

img:hover {
  transform: scale(1.04); /* Incrementa el efecto hover si quieres un cambio más notorio */
}

@media screen and (max-width: 1024px) {
  img {
    position: fixed;
    left: 0rem;
    top: 10px;
    width: 10vw; /* Ajusta el tamaño en dispositivos más pequeños */
    transform: scale(0.9) rotate(-2.3deg); 
    transition: all 0.3s ease-in-out;
    opacity: 1;
    
  }
}
</style>
