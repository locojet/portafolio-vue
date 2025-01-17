<template>
    <nav class="vertical-nav wraperr">
      <ul>
        <li :class="{ active: activeItem === 0 }" @click="setActive(0)">
          <a href="#aboutme">About Me</a>
        </li>
        <li :class="{ active: activeItem === 1 }" @click="setActive(1)">
          <a href="#mywork">My Work</a>
        </li>
        <li :class="{ active: activeItem === 2 }" @click="setActive(2)">
          <a href="#contact">Contact</a>
        </li>
      </ul>
    </nav>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  // Estado para el ítem activo del menú
  const activeItem = ref(null);
  
  // Función para establecer el ítem activo
  const setActive = (index) => {
    activeItem.value = index;
  };
  </script>
  
  <style scoped>
  .wraperr{
  overflow-x: hidden;
}
  /* Barra de navegación vertical al lado derecho */
  .vertical-nav {
    position:absolute; /* Fija la barra en el lado derecho */
    top: -5rem; /* Empieza desde la parte superior */
    right: 8rem; /* Alineada al borde derecho */
    height: 5%; /* Ocupa toda la altura de la página */
    width: 200px; /* Ancho de la barra de navegación */
    background-color: rgba(0, 0, 0, 0); /* Fondo transparente */
    display:inline-block;
    flex-direction: row; /* Hace que los elementos se apilen verticalmente */
    justify-content: flex-start; /* Alinea los elementos al inicio (parte superior) */
    align-items: center; /* Centra los elementos horizontalmente */
    padding-top: 20px; /* Espacio superior */
    z-index: 1000; /* Asegura que esté por encima del contenido */
    font-family: 'Roboto';
    font-style: italic;
    
    
    
  }
  
  .vertical-nav ul {
    list-style: none; /* Elimina los puntos de la lista */
    padding: 0;
    gap: 3rem;
    
  }
  
  .vertical-nav li {
    margin: 20px 0; /* Espaciado entre los enlaces */
    
  }
  
  .vertical-nav li a {
    color: white;
    text-decoration: none;
    font-size: 1rem;
    font-weight: bold;
    
  }
  
  .vertical-nav li.active a {
    color: #74f6fd;  /* Cambia el color cuando está activo */
  }
  
  .vertical-nav li:hover a {
    color: #74f6fd;  /* Cambia el color cuando se pasa el cursor */
  }
  
  /* Para dispositivos pequeños */
  @media (max-width: 1024px) {
    .vertical-nav {
      display: none;  /* Oculta la barra de navegación en dispositivos pequeños */
    }
  }
  </style>
  