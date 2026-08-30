<template>
  <div id="contact" class="hero">
    <img 
      class="background" 
      src="../assets/img/holo4.jpg " 
      alt="Fondo hero"
    >
    <div class="overlay">
      <div class="left">
        <h1>Ihr Unternehmen hat mehr zu zeigen.</h1>
        <p>Wir machen diese Qualität digital sichtbar: mit Website, Fotografie, Film und Content, die zusammen funktionieren.</p>
      </div>
      <div class="right">
        <p>Erzählen Sie uns von Ihrem Betrieb, Ihren Kunden und Ihren Zielen. Aus dem ersten Gespräch entsteht ein klares Konzept für einen modernen digitalen Auftritt.</p>
        <button>Projekt besprechen</button>
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
          // Staggered animation for inner elements
          const h1 = entry.target.querySelector('h1');
          const pElements = entry.target.querySelectorAll('p');
          const button = entry.target.querySelector('button');
          
          // Reset all animations first
          [h1, ...pElements, button].forEach(el => {
            if (el) {
              el.style.opacity = '0';
              el.style.transform = 'translateY(20px)';
            }
          });
          
          // Animate h1
          setTimeout(() => {
            if (h1) {
              h1.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
              h1.style.opacity = '1';
              h1.style.transform = 'translateY(0)';
            }
          }, 100);
          
          // Animate first paragraph
          setTimeout(() => {
            if (pElements[0]) {
              pElements[0].style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
              pElements[0].style.opacity = '1';
              pElements[0].style.transform = 'translateY(0)';
            }
          }, 300);
          
          // Animate second paragraph (right side)
          setTimeout(() => {
            if (pElements[1]) {
              pElements[1].style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
              pElements[1].style.opacity = '1';
              pElements[1].style.transform = 'translateY(0)';
            }
          }, 500);
          
          // Animate button
          setTimeout(() => {
            if (button) {
              button.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
              button.style.opacity = '1';
              button.style.transform = 'translateY(0)';
            }
          }, 700);
          
          entry.target.classList.add("show");
        } else {
          // Reset when leaving viewport
          entry.target.classList.remove("show");
          const h1 = entry.target.querySelector('h1');
          const pElements = entry.target.querySelectorAll('p');
          const button = entry.target.querySelector('button');
          
          [h1, ...pElements, button].forEach(el => {
            if (el) {
              el.style.opacity = '0';
              el.style.transform = 'translateY(20px)';
              el.style.transition = 'none';
            }
          });
        }
      });
    }, { 
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px"
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
}

/* Initial state for all text elements */
.left h1,
.left p,
.right p,
.right button {
  opacity: 0;
  transform: translateY(20px);
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
    top: 20rem;
  }

  .left, .right {
    width: 100%;
    max-width: none;
  }

  .right {
    transition-delay: 0s !important; /* Elimina el retraso en móvil */
  }
  .hero{
    height: 150vh;
  }
}

/* Efecto escalonado en desktop */
@media (min-width: 769px) {
  .right {
    transition-delay: 0.3s;
  }
}
</style>
