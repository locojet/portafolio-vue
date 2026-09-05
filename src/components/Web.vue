<template>
  <div id="contact" class="hero">
    <picture class="background-picture">
      <source type="image/avif" :srcset="backgroundImage.avif" sizes="100vw" />
      <source type="image/webp" :srcset="backgroundImage.webp" sizes="100vw" />
      <img
        class="background"
        :src="backgroundImage.fallback"
        alt="Fondo hero"
        width="1536"
        height="1024"
        loading="lazy"
        decoding="async"
      />
    </picture>

    <div class="overlay">
      <div class="left">
        <h1>Ihr Unternehmen hat mehr zu zeigen.</h1>

        <p>
          Wir machen diese Qualität digital sichtbar: mit Website,
          Fotografie, Film und Content, die zusammen funktionieren.
        </p>
      </div>

      <div class="right">
        <p>
          Erzählen Sie uns von Ihrem Betrieb, Ihren Kunden und Ihren Zielen.
          Aus dem ersten Gespräch entsteht ein klares Konzept für einen
          modernen digitalen Auftritt.
        </p>

      </div>
    </div>
  </div>
</template>

<script>
import { imageAssets } from '../assets/optimized/media';

export default {
  data() {
    return {
      backgroundImage: imageAssets.compuviejo,
    };
  },
  mounted() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const h1 = entry.target.querySelector("h1");
            const pElements = entry.target.querySelectorAll("p");
            const contactAction = entry.target.querySelector(".contact-action-shell");

            // Reset de las animaciones
            [h1, ...pElements, contactAction].forEach((el) => {
              if (el) {
                el.style.opacity = "0";
                el.style.transform = "translateY(20px)";
              }
            });

            // Animación del título
            setTimeout(() => {
              if (h1) {
                h1.style.transition =
                  "opacity 0.8s ease-out, transform 0.8s ease-out";

                h1.style.opacity = "1";
                h1.style.transform = "translateY(0)";
              }
            }, 100);

            // Primer párrafo
            setTimeout(() => {
              if (pElements[0]) {
                pElements[0].style.transition =
                  "opacity 0.8s ease-out, transform 0.8s ease-out";

                pElements[0].style.opacity = "1";
                pElements[0].style.transform = "translateY(0)";
              }
            }, 300);

            // Segundo párrafo
            setTimeout(() => {
              if (pElements[1]) {
                pElements[1].style.transition =
                  "opacity 0.8s ease-out, transform 0.8s ease-out";

                pElements[1].style.opacity = "1";
                pElements[1].style.transform = "translateY(0)";
              }
            }, 500);

            // Botón de contacto
            setTimeout(() => {
              if (contactAction) {
                contactAction.style.transition =
                  "opacity 0.8s ease-out, transform 0.8s ease-out";

                contactAction.style.opacity = "1";
                contactAction.style.transform = "translateY(0)";
              }
            }, 700);

            entry.target.classList.add("show");
          } else {
            entry.target.classList.remove("show");

            const h1 = entry.target.querySelector("h1");
            const pElements = entry.target.querySelectorAll("p");
            const contactAction = entry.target.querySelector(".contact-action-shell");

            [h1, ...pElements, contactAction].forEach((el) => {
              if (el) {
                el.style.opacity = "0";
                el.style.transform = "translateY(20px)";
                el.style.transition = "none";
              }
            });
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    document
      .querySelectorAll(".left, .right")
      .forEach((el) => observer.observe(el));
  },
};
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
  inset: 0;

  width: 100%;
  height: 100%;

  object-fit: cover;

  filter: brightness(0.6);
}

.background-picture {
  display: block;
  inset: 0;
  position: absolute;
}

.overlay {
  position: relative;

  z-index: 1;

  display: flex;

  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: 100%;

  padding: 2rem 4rem;

  color: white;
}

.left,
.right {
  width: 40%;
  max-width: 500px;
}

.right {
  transition-delay: 0.3s;
}

/* ==========================================
   ESTADO INICIAL DE LAS ANIMACIONES
========================================== */

.left h1,
.left p,
.right p,
.right :deep(.contact-action-shell) {
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

  background: #4caf50;

  color: white;

  border: none;
  border-radius: 4px;

  cursor: pointer;

  transition: background 0.3s;
}

button:hover {
  background: #45a049;
}

/* ==========================================
   TABLET Y MÓVIL
========================================== */

@media (min-width: 640px) and (max-width: 1024px) {
  .hero {
    height: 150vh;
  }

  .overlay {
    flex-direction: column;

    justify-content: flex-start;
    align-items: center;

    text-align: center;

    gap: 2rem;

    width: 100%;
    height: 100%;

    padding: 5rem 1.5rem 2rem;
  }

  .left,
  .right {
    width: 100%;
    max-width: 500px;
  }

  .right {
    transition-delay: 0s !important;
  }

  h1 {
    font-size: 1.8rem;
  }

  p {
    font-size: 1rem;
  }
}

/* ==========================================
   MÓVILES
========================================== */

@media (max-width: 639px) {
  .hero {
    height: 150svh;
  }

  .overlay {
    flex-direction: column;

    justify-content: flex-start;
    align-items: center;

    text-align: center;

    gap: clamp(1.5rem, 4vw, 2rem);

    /*
      El primer valor controla qué tan abajo
      comienza todo el contenido.
    */
    padding: clamp(5rem, 20vw, 6rem) 1.2rem 2rem;
  }

  .left,
  .right {
    width: 100%;
    max-width: none;
  }

  h1 {
    font-size: clamp(1.6rem, 5vw, 1.8rem);
    line-height: 1.2;
  }

  p {
    font-size: clamp(0.95rem, 2.8vw, 1rem);
    line-height: 1.5;
  }

  button {
    padding: 0.75rem 1.3rem;
  }
}

</style>
