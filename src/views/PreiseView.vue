<script setup>
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { imageAssets } from '../assets/optimized/media';
import { pricingOffers } from '../data/pricing';
import PhotoScroll from '../components/PhotoScroll.vue';

const route = useRoute();
const router = useRouter();
const logoAvifSrcset = imageAssets.logo.avif;
const logoWebpSrcset = imageAssets.logo.webp;
const logoFallback = imageAssets.logo.fallback;
const selectedOffer = computed(() => (
  pricingOffers.find((offer) => offer.slug === route.params.slug) || null
));
const closeRoute = computed(() => (
  selectedOffer.value
    ? { name: 'preise' }
    : { name: 'home' }
));

const openContact = () => {
  if (window.matchMedia('(min-width: 640px)').matches) {
    router.push({
      name: 'home',
      query: {
        contact: 'footer',
      },
    });
    return;
  }

  router.push({
    name: 'home',
    query: {
      contact: 'open',
    },
  });
};
</script>

<template>
  <div class="prices-page">
    <header class="prices-header">
      <RouterLink
        class="prices-logo"
        to="/"
        aria-label="Zur Startseite"
      >
        <picture>
          <source
            type="image/avif"
            :srcset="logoAvifSrcset"
            sizes="(max-width: 639px) 8.5rem, 11rem"
          />
          <source
            type="image/webp"
            :srcset="logoWebpSrcset"
            sizes="(max-width: 639px) 8.5rem, 11rem"
          />
          <img
            :src="logoFallback"
            alt="Digital Kontext"
            width="1774"
            height="887"
            decoding="async"
          />
        </picture>
      </RouterLink>

      <RouterLink
        class="prices-close"
        :to="closeRoute"
        :aria-label="selectedOffer ? 'Paketdetails schließen' : 'Preise schließen und zur Startseite zurückkehren'"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </RouterLink>
    </header>

    <main>
      <section
        class="prices-hero"
        :class="{ 'prices-hero--detail': selectedOffer }"
        aria-labelledby="prices-title"
      >
        <p>Preise</p>
        <h1 v-if="!selectedOffer" id="prices-title">
          Digitale Lösungen,<br />
          klar kalkuliert.
        </h1>
        <h1 v-else id="prices-title">
          {{ selectedOffer.name }}
        </h1>
        <span v-if="!selectedOffer">
          Vier klare Ausgangspunkte für Website, Foto und Film. Der genaue
          Umfang wird nach dem ersten Gespräch transparent festgelegt.
        </span>
        <span v-else>{{ selectedOffer.description }}</span>
      </section>

      <PhotoScroll
        v-if="!selectedOffer"
        embedded
        show-details
        section-id="price-options"
      />

      <RouterLink
        v-else
        class="price-detail-back"
        :to="{ name: 'preise' }"
      >
        <span aria-hidden="true">←</span>
        Alle Pakete
      </RouterLink>

      <section
        v-if="selectedOffer"
        class="prices-list prices-list--single"
        aria-label="Paketdetails"
      >
        <article
          class="price-offer"
        >
          <header class="price-offer__header">
            <div>
              <span>{{ selectedOffer.number }} / {{ selectedOffer.category }}</span>
              <h2>{{ selectedOffer.name }}</h2>
            </div>
            <p>{{ selectedOffer.price }}</p>
          </header>

          <div class="price-offer__body">
            <div class="price-offer__intro">
              <p>{{ selectedOffer.description }}</p>

              <div>
                <h3>Geeignet für</h3>
                <p>{{ selectedOffer.suitableFor }}</p>
              </div>

              <div class="price-offer__reason">
                <h3>Wie der Preis entsteht</h3>
                <p>{{ selectedOffer.priceReason }}</p>
              </div>
            </div>

            <div class="price-offer__details">
              <div>
                <h3>Enthalten</h3>
                <ul>
                  <li
                    v-for="item in selectedOffer.included"
                    :key="item"
                  >
                    {{ item }}
                  </li>
                </ul>
              </div>

              <div>
                <h3>Optional / erweiterbar</h3>
                <ul>
                  <li
                    v-for="item in selectedOffer.optional"
                    :key="item"
                  >
                    {{ item }}
                  </li>
                </ul>
              </div>

              <p class="price-offer__note">
                <strong>Nicht automatisch enthalten:</strong>
                {{ selectedOffer.notIncluded }}
              </p>
            </div>
          </div>
        </article>
      </section>

      <section
        v-if="!selectedOffer"
        class="prices-extension"
        aria-labelledby="extensions-title"
      >
        <p>Nach Umfang</p>
        <div>
          <h2 id="extensions-title">
            Relaunch, größere Websites und zusätzliche Produktionen.
          </h2>
          <p>
            Mehrseitige Unternehmenswebsites, bestehende Auftritte,
            Shop-Funktionen, Interviews, Drohnenaufnahmen und laufender
            Content unterscheiden sich stark im Umfang. Dafür entsteht nach
            dem Kennenlernen ein nachvollziehbares individuelles Angebot.
          </p>
        </div>
      </section>

      <section class="prices-cta" aria-labelledby="prices-cta-title">
        <p>Projekt im Kopf?</p>
        <h2 id="prices-cta-title">
          Lassen Sie uns den passenden Umfang finden.
        </h2>
        <button type="button" @click="openContact">
          Projekt anfragen
          <span aria-hidden="true">→</span>
        </button>
      </section>
    </main>

    <footer class="prices-footer">
      <span>Alle Preise verstehen sich als Ausgangspreise.</span>
      <RouterLink :to="selectedOffer ? { name: 'preise' } : { name: 'home' }">
        {{ selectedOffer ? 'Alle Pakete' : 'Zurück zur Startseite' }}
      </RouterLink>
    </footer>
  </div>
</template>

<style scoped>
.prices-page {
  background:
    radial-gradient(
      circle at 96% 9%,
      rgba(214, 147, 147, 0.18),
      transparent 31rem
    ),
    #050505;
  color: #fff;
  min-height: 100svh;
  overflow-x: clip;
  padding:
    clamp(1.5rem, 3vw, 3rem)
    clamp(1.5rem, 5vw, 5.5rem)
    clamp(2rem, 4vw, 4rem);
  width: 100%;
}

.prices-page::before {
  background: var(--quaternary-color);
  content: "";
  height: 1px;
  left: 0;
  opacity: 0.72;
  position: absolute;
  top: 0;
  width: 100%;
}

.prices-header,
.prices-hero,
.prices-list,
.prices-extension,
.prices-cta,
.prices-footer {
  margin-left: auto;
  margin-right: auto;
  max-width: 1180px;
  width: 100%;
}

.prices-header {
  align-items: center;
  display: flex;
  justify-content: space-between;
}

.prices-logo,
.prices-close,
.prices-footer a {
  margin: 0;
  scale: 1;
}

.prices-logo picture,
.prices-logo img {
  display: block;
}

.prices-logo img {
  height: auto;
  width: clamp(8.5rem, 12vw, 11rem);
}

.prices-close {
  align-items: center;
  background: #000;
  border: 1px solid rgba(214, 147, 147, 0.72);
  border-radius: 50%;
  display: inline-flex;
  height: 3rem;
  justify-content: center;
  position: fixed;
  right: calc(
    clamp(1.25rem, 5vw, 5.5rem)
    + env(safe-area-inset-right, 0px)
  );
  top: calc(
    clamp(1.25rem, 3vw, 3rem)
    + env(safe-area-inset-top, 0px)
  );
  transition:
    background 160ms ease,
    transform 160ms ease;
  width: 3rem;
  z-index: 4100;
}

.prices-close span {
  background: var(--quaternary-color);
  height: 1.5px;
  left: 50%;
  position: absolute;
  top: 50%;
  width: 1.15rem;
}

.prices-close span:first-child {
  transform: translate(-50%, -50%) rotate(45deg);
}

.prices-close span:last-child {
  transform: translate(-50%, -50%) rotate(-45deg);
}

.prices-close:hover,
.prices-close:focus-visible {
  background: #000;
  outline: none;
  transform: scale(1.05);
}

.prices-hero {
  padding: clamp(5rem, 10svh, 7rem) 0 clamp(5rem, 8vw, 7rem);
}

.prices-hero > p,
.prices-extension > p,
.prices-cta > p {
  color: var(--quaternary-color);
  font-family: myFont, Helvetica, Arial, sans-serif;
  font-size: clamp(0.72rem, 1vw, 0.88rem);
  font-weight: 700;
  text-transform: uppercase;
}

.prices-hero h1 {
  font-size: clamp(2.7rem, 5vw, 4.5rem);
  letter-spacing: 0;
  line-height: 1;
  margin: 1.3rem 0 clamp(2rem, 4vw, 3rem);
  max-width: 1000px;
}

.prices-hero > span {
  color: rgba(255, 255, 255, 0.62);
  display: block;
  font-size: clamp(1rem, 1.5vw, 1.22rem);
  line-height: 1.65;
  max-width: 42rem;
}

.prices-hero--detail {
  padding-bottom: clamp(2.5rem, 5vw, 4rem);
}

.price-detail-back {
  align-items: center;
  color: rgba(255, 255, 255, 0.68);
  display: inline-flex;
  font-family: myFont, Helvetica, Arial, sans-serif;
  font-size: 0.78rem;
  gap: 0.65rem;
  margin: 0 0 1.5rem;
  text-decoration: none;
  transition:
    color 160ms ease,
    transform 160ms ease;
}

.price-detail-back span {
  color: var(--quaternary-color);
  font-family: Helvetica, Arial, sans-serif;
  font-size: 1.15rem;
}

.price-detail-back:hover,
.price-detail-back:focus-visible {
  color: #fff;
  outline: none;
  transform: translateX(-0.2rem);
}

.prices-list--single {
  min-height: 50svh;
}

.price-offer {
  border-top: 1px solid rgba(255, 255, 255, 0.16);
  padding: clamp(3rem, 5vw, 4.75rem) 0;
}

.price-offer__header {
  align-items: flex-end;
  display: flex;
  gap: 2rem;
  justify-content: space-between;
}

.price-offer__header span {
  color: var(--quaternary-color);
  font-family: myFont, Helvetica, Arial, sans-serif;
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
}

.price-offer__header h2 {
  font-size: clamp(1.9rem, 3.4vw, 3.25rem);
  letter-spacing: 0;
  line-height: 1;
  margin-top: 0.8rem;
}

.price-offer__header > p {
  color: #fff;
  flex: 0 0 auto;
  font-size: clamp(1.45rem, 2.3vw, 2.15rem);
  font-weight: 800;
  line-height: 1;
}

.price-offer__body {
  display: grid;
  gap: clamp(3rem, 7vw, 7rem);
  grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.15fr);
  margin-top: clamp(2.5rem, 4vw, 3.75rem);
}

.price-offer__intro,
.price-offer__details {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.price-offer__intro > p {
  color: rgba(255, 255, 255, 0.84);
  font-size: clamp(1.1rem, 1.7vw, 1.42rem);
  line-height: 1.55;
}

.price-offer h3 {
  color: rgba(255, 218, 218, 0.88);
  font-family: myFont, Helvetica, Arial, sans-serif;
  font-size: 0.76rem;
  margin-bottom: 0.9rem;
  text-transform: uppercase;
}

.price-offer__intro div p,
.price-offer__details li,
.price-offer__note {
  color: rgba(255, 255, 255, 0.62);
  font-size: 1rem;
  line-height: 1.65;
}

.price-offer__reason {
  border-top: 1px solid rgba(255, 255, 255, 0.12);
  padding-top: 1.5rem;
}

.price-offer__details ul {
  list-style: none;
}

.price-offer__details li {
  border-bottom: 1px solid rgba(255, 255, 255, 0.09);
  padding: 0.6rem 0 0.6rem 1.5rem;
  position: relative;
}

.price-offer__details li::before {
  color: var(--quaternary-color);
  content: "✓";
  left: 0;
  position: absolute;
}

.price-offer__note {
  border-left: 2px solid rgba(214, 147, 147, 0.5);
  padding-left: 1rem;
}

.price-offer__note strong {
  color: rgba(255, 255, 255, 0.82);
}

.prices-extension {
  border-bottom: 1px solid rgba(255, 255, 255, 0.15);
  border-top: 1px solid rgba(255, 255, 255, 0.15);
  display: grid;
  gap: clamp(2rem, 6vw, 6rem);
  grid-template-columns: minmax(11rem, 0.45fr) 1.55fr;
  padding: clamp(4rem, 6vw, 6rem) 0;
}

.prices-extension h2 {
  font-size: clamp(1.9rem, 3.3vw, 3.2rem);
  letter-spacing: 0;
  line-height: 1.05;
  max-width: 850px;
}

.prices-extension div p {
  color: rgba(255, 255, 255, 0.62);
  font-size: clamp(1rem, 1.4vw, 1.15rem);
  line-height: 1.7;
  margin-top: 2rem;
  max-width: 680px;
}

.prices-cta {
  padding: clamp(5rem, 8vw, 7rem) 0;
}

.prices-cta h2 {
  font-size: clamp(2.2rem, 4.2vw, 4rem);
  letter-spacing: 0;
  line-height: 1.05;
  margin: 1.2rem 0 clamp(2.5rem, 5vw, 4rem);
  max-width: 900px;
}

.prices-cta button {
  align-items: center;
  background: var(--quaternary-color);
  border: 1px solid var(--quaternary-color);
  border-radius: 6px;
  color: #fff;
  cursor: pointer;
  display: inline-flex;
  font-family: myFont, Helvetica, Arial, sans-serif;
  font-size: 0.88rem;
  gap: 1.2rem;
  padding: 1rem 1.25rem;
  transition:
    background 160ms ease,
    color 160ms ease,
    transform 160ms ease;
}

.prices-cta button span {
  font-family: Helvetica, Arial, sans-serif;
  font-size: 1.25rem;
}

.prices-cta button:hover,
.prices-cta button:focus-visible {
  background: transparent;
  color: var(--quaternary-color);
  outline: none;
  transform: translateY(-2px);
}

.prices-footer {
  align-items: center;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.38);
  display: flex;
  font-size: 0.78rem;
  justify-content: space-between;
  padding-top: 1.5rem;
}

.prices-footer a {
  color: rgba(255, 255, 255, 0.6);
}

.prices-footer a:hover,
.prices-footer a:focus-visible {
  color: var(--quaternary-color);
  outline: none;
}

@media (min-width: 640px) and (max-width: 1024px) {
  .prices-page {
    padding: 2rem clamp(2.5rem, 7vw, 5rem) 3rem;
  }

  .prices-hero {
    padding-top: clamp(5rem, 10svh, 7rem);
  }

  .price-offer__body {
    gap: 3.5rem;
  }
}

@media (max-width: 639px) {
  .prices-page {
    padding:
      calc(1.25rem + env(safe-area-inset-top, 0px))
      clamp(1.25rem, 6vw, 1.75rem)
      calc(1.75rem + env(safe-area-inset-bottom, 0px));
  }

  .prices-logo img {
    width: 8.5rem;
  }

  .prices-close {
    height: 2.75rem;
    width: 2.75rem;
  }

  .prices-hero {
    padding: clamp(4.5rem, 11svh, 6rem) 0 5.5rem;
  }

  .prices-hero h1 {
    font-size: clamp(2.25rem, 10vw, 2.8rem);
    line-height: 1;
  }

  .price-offer {
    padding: 3.2rem 0;
  }

  .price-offer__header {
    align-items: flex-start;
    flex-direction: column;
    gap: 1.6rem;
  }

  .price-offer__header h2 {
    font-size: clamp(1.8rem, 8.2vw, 2.3rem);
  }

  .price-offer__header > p {
    font-size: clamp(1.5rem, 7vw, 1.9rem);
  }

  .price-offer__body {
    gap: 2.5rem;
    grid-template-columns: 1fr;
    margin-top: 2.8rem;
  }

  .prices-extension {
    gap: 2rem;
    grid-template-columns: 1fr;
    padding: 4.5rem 0;
  }

  .prices-cta {
    padding: 5rem 0;
  }

  .prices-cta h2 {
    font-size: clamp(2rem, 9vw, 2.55rem);
  }

  .prices-cta button {
    justify-content: space-between;
    min-height: 3rem;
    width: 100%;
  }

  .prices-footer {
    align-items: flex-start;
    flex-direction: column;
    gap: 0.8rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .price-detail-back,
  .prices-close,
  .prices-cta button {
    transition: none;
  }
}
</style>
