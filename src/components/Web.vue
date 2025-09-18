<template>
    <div class="hero">
      <img 
        class="background" 
        src="../assets/img/laptoprosa.PNG " 
        alt="Fondo hero"
      >
      <div class="overlay">
        <div class="left">
          <h1>Título impactante</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        </div>
        <div class="right">
          <p>Texto adicional o llamada a la acción. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>
          <button>Saber más</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    mounted() {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          }
        });
      }, { 
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px" // Activa la animación 50px antes de llegar al elemento
      });
  
      document.querySelectorAll(".left, .right").forEach(el => observer.observe(el));
    }
  }
  </script>
  
  <style scoped>
  .hero {
    position: relative;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
  }
  
  .background {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: brightness(0.6);
  }
  
  .overlay {
    position: relative;
    z-index: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    padding: 2rem 4rem;
    color: white;
  }
  
  .left, .right {
    width: 40%;
    max-width: 500px;
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.8s ease-out, transform 0.8s ease-out;
  }
  
  .left.show, .right.show {
    opacity: 1;
    transform: translateY(0);
  }
  
  h1 {
    font-size: 2rem;
    margin-bottom: 1rem;
  }
  
  p {
    font-size: 1.1rem;
    line-height: 1.6;
  }
  
  button {
    margin-top: 1rem;
    padding: 0.8rem 1.5rem;
    background: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background 0.3s;
  }
  
  button:hover {
    background: #45a049;
  }
  
  /* 🔽 Responsive para móviles */
  @media (max-width: 768px) {
    .overlay {
      flex-direction: column;
      justify-content: center;
      text-align: center;
      gap: 2rem;
      padding: 1rem;
    }
  
    .left, .right {
      width: 100%;
      max-width: none;
    }
  
    .right {
      transition-delay: 0s !important; /* Elimina el retraso en móvil */
    }
  }
  
  /* Efecto escalonado en desktop */
  @media (min-width: 769px) {
    .right {
      transition-delay: 0.3s;
    }
  }
  </style>