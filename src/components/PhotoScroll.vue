<template>
  <section class="package-scroll wraperr" aria-label="Pakete">
    <div class="package-scroll__sticky">
      <div class="package-scroll__track">
        <article
          v-for="offer in offers"
          :key="offer.name"
          class="package-card"
          :class="{ 'package-card--featured': offer.featured }"
        >
          <div class="package-card__chrome">
            <span>{{ offer.number }}</span>
            <span>{{ offer.tag }}</span>
          </div>

          <h3>{{ offer.name }}</h3>
          <p class="package-card__price">{{ offer.price }}</p>

          <div class="package-card__includes">
            <p>Enthalten</p>
            <ul>
              <li v-for="item in offer.items" :key="item">{{ item }}</li>
            </ul>
          </div>

          <p class="package-card__footer">{{ offer.footer }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
const offers = [
  {
    number: '01',
    name: 'Starter Präsenz',
    tag: 'Web',
    price: 'ab 690 EUR',
    items: ['Onepage Website', 'Mobile Design', 'Kontaktbereich'],
    footer: 'Schneller Einstieg',
  },
  {
    number: '02',
    name: 'Website + Foto',
    tag: 'Foto',
    price: 'ab 1.490 EUR',
    items: ['Website-Konzept', 'Foto-Session', 'Bildauswahl'],
    footer: 'Echte Bilder',
  },
  {
    number: '03',
    name: 'Video Präsenz',
    tag: 'Film',
    price: 'ab 1.290 EUR',
    items: ['Imagefilm', 'Reels', 'Schnitt'],
    footer: 'Mehr Wirkung',
  },
  {
    number: '04',
    name: 'Komplettauftritt',
    tag: 'Full',
    price: 'ab 2.900 EUR',
    items: ['Website', 'Foto + Film', 'Launch'],
    footer: 'Alles aus einer Hand',
  },
];
</script>

<style scoped>
.wraperr {
  overflow: visible;
}

.package-scroll {
  background:
    linear-gradient(
      to bottom,
      #000 0%,
      #000 74%,
      var(--quaternary-color) 100%
    );
  color: #fff;
  isolation: isolate;
  margin-top: -1px;
  padding: clamp(3.25rem, 5vw, 5.5rem) clamp(1.2rem, 4vw, 3rem);
  position: relative;
  width: 100vw;
}

.package-scroll::before {
  background: #000;
  content: "";
  height: clamp(1.75rem, 5vh, 3.5rem);
  left: 0;
  pointer-events: none;
  position: absolute;
  right: 0;
  top: calc(clamp(1.75rem, 5vh, 3.5rem) * -1);
  z-index: 0;
}

.package-scroll__sticky {
  margin: 0 auto;
  max-width: min(1680px, calc(100vw - clamp(2rem, 5vw, 5rem)));
  position: relative;
  z-index: 1;
}

.package-scroll__track {
  display: flex;
  flex-wrap: wrap;
  gap: clamp(2.5rem, 4.5vw, 5.5rem);
  justify-content: center;
}

.package-card {
  aspect-ratio: 4 / 5;
  background:
    radial-gradient(circle at 18% 12%, rgba(214, 147, 147, 0.34), rgba(214, 147, 147, 0) 35%),
    linear-gradient(145deg, rgba(214, 147, 147, 0.2), rgba(255, 255, 255, 0.04)),
    rgba(10, 10, 10, 0.9);
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 8px;
  box-shadow: 0 1rem 2.2rem rgba(0, 0, 0, 0.36);
  display: flex;
  flex: 0 1 clamp(14rem, 17vw, 17.5rem);
  flex-direction: column;
  justify-content: flex-start;
  margin: 0;
  max-width: clamp(14rem, 17vw, 17.5rem);
  min-height: clamp(21rem, 24vw, 25rem);
  min-width: 0;
  overflow: hidden;
  padding: clamp(0.85rem, 1.2vw, 1.1rem);
  position: relative;
}

.package-card::before {
  background: linear-gradient(90deg, rgba(255, 218, 218, 0.95), var(--quaternary-color));
  content: "";
  height: 3px;
  left: 1rem;
  position: absolute;
  right: 1rem;
  top: 1rem;
}

.package-card--featured {
  background:
    radial-gradient(circle at 18% 12%, rgba(255, 255, 255, 0.35), rgba(255, 255, 255, 0) 32%),
    linear-gradient(145deg, rgba(255, 218, 218, 0.22), rgba(214, 147, 147, 0.16)),
    rgba(10, 10, 10, 0.92);
}

.package-card__chrome {
  align-items: center;
  display: flex;
  flex: 0 0 auto;
  justify-content: space-between;
  margin: 0.95rem 0 clamp(0.7rem, 1vw, 0.95rem);
}

.package-card__chrome span {
  color: rgba(255, 255, 255, 0.68);
  font-size: clamp(0.68rem, 0.78vw, 0.78rem);
  font-weight: 800;
}

.package-card__chrome span:last-child {
  border: 1px solid rgba(214, 147, 147, 0.65);
  border-radius: 999px;
  color: rgba(255, 218, 218, 0.95);
  padding: 0.28rem 0.55rem;
}

.package-card h3 {
  font-size: clamp(0.95rem, 1.1vw, 1.08rem);
  line-height: 1.1;
  margin: 0;
}

.package-card__price {
  color: #fff;
  font-size: clamp(1.3rem, 1.55vw, 1.75rem);
  font-weight: 900;
  line-height: 1;
  margin: clamp(0.85rem, 1.15vw, 1.15rem) 0;
}

.package-card__includes {
  margin-top: clamp(0.8rem, 1.1vw, 1.1rem);
}

.package-card__includes p {
  color: rgba(255, 218, 218, 0.95);
  font-size: clamp(0.66rem, 0.78vw, 0.78rem);
  font-weight: 800;
  margin: 0 0 0.7rem;
  text-transform: uppercase;
}

.package-card ul {
  border-top: 1px solid rgba(255, 255, 255, 0.12);
  list-style: none;
  margin: 0;
  padding: 0.9rem 0 0;
}

.package-card li {
  color: rgba(255, 255, 255, 0.9);
  font-size: clamp(0.72rem, 0.82vw, 0.8rem);
  line-height: 1.45;
  padding-left: 0.9rem;
  position: relative;
}

.package-card li::before {
  background: var(--quaternary-color);
  border-radius: 50%;
  content: "";
  height: 0.32rem;
  left: 0;
  position: absolute;
  top: 0.62rem;
  width: 0.32rem;
}

.package-card__footer {
  border-top: 1px solid rgba(255, 255, 255, 0.12);
  color: rgba(255, 255, 255, 0.58);
  flex: 0 0 auto;
  font-size: clamp(0.6rem, 0.7vw, 0.7rem);
  font-weight: 800;
  margin: auto 0 0;
  padding-top: 0.8rem;
  text-transform: uppercase;
}

@media (max-width: 1024px) {
  .package-scroll {
    background:
      linear-gradient(
        to bottom,
        #000 0%,
        #000 76%,
        var(--quaternary-color) 100%
      );
    min-height: auto;
    padding: clamp(4rem, 8svh, 6rem) clamp(1rem, 5vw, 2rem);
  }

  .package-scroll::after {
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0) 0%,
      var(--quaternary-color) 100%
    );
    bottom: 0;
    content: "";
    height: 34svh;
    left: 0;
    pointer-events: none;
    position: absolute;
    right: 0;
    z-index: 2;
  }

  .package-scroll__sticky {
    max-width: min(46rem, calc(100vw - 2rem));
    overflow: visible;
    position: relative;
  }

  .package-scroll__track {
    display: grid;
    gap: clamp(1.1rem, 4vw, 1.6rem);
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 17rem), 1fr));
    padding: 0;
    transform: none;
    will-change: auto;
  }

  .package-card {
    flex: none;
    height: auto;
    max-width: none;
    min-height: clamp(21rem, 48svh, 27rem);
    padding: clamp(0.95rem, 2.4vw, 1.25rem);
    width: 100%;
  }
}

@media (max-width: 639px) {
  .package-scroll__track {
    gap: clamp(0.85rem, 4vw, 1.15rem);
    grid-template-columns: 1fr;
  }

  .package-card {
    min-height: clamp(20rem, 58svh, 26rem);
  }

  .package-card__price {
    font-size: clamp(1.55rem, 7vw, 2.05rem);
  }
}
</style>
