<script setup>
import { imageAssets } from '../assets/optimized/media';

const logoAvifSrcset = imageAssets.logo.avif;
const logoWebpSrcset = imageAssets.logo.webp;
const logoFallback = imageAssets.logo.fallback;
</script>

<template>
  <div class="impressum-page">
    <header class="impressum-header">
      <RouterLink
        class="impressum-logo"
        to="/"
        aria-label="Zur Startseite"
      >
        <picture>
          <source
            type="image/avif"
            :srcset="logoAvifSrcset"
            sizes="(max-width: 639px) 9rem, 11rem"
          />
          <source
            type="image/webp"
            :srcset="logoWebpSrcset"
            sizes="(max-width: 639px) 9rem, 11rem"
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
        class="impressum-back"
        to="/"
      >
        <span aria-hidden="true">←</span>
        Zurück
      </RouterLink>
    </header>

    <main class="impressum-content">
      <p class="impressum-kicker">
        Rechtliches
      </p>

      <h1>Impressum</h1>
      <div class="impressum-accent" aria-hidden="true"></div>

      <section class="impressum-block">
        <h2>Angaben gemäß § 5 DDG</h2>

        <address>
          <strong>Digital Kontext</strong>
          <span>Inhaber: Juan Carlos Mejia Carmona</span>
          <span>Lauenberg 25A</span>
          <span>25337 Kölln-Reisiek</span>
          <span>Deutschland</span>
        </address>
      </section>

      <section class="impressum-block">
        <h2>Kontakt</h2>

        <dl class="impressum-contact">
          <div>
            <dt>E-Mail</dt>
            <dd>
              <a href="mailto:hello@digital-kontext.de">
                hello@digital-kontext.de
              </a>
            </dd>
          </div>

          <div>
            <dt>Telefon</dt>
            <dd>
              <a href="tel:+4917640137484">
                +49 176 40137484
              </a>
            </dd>
          </div>
        </dl>
      </section>
    </main>

    <footer class="impressum-footer">
      <span>Digital Kontext</span>
      <span>Web. Foto. Film.</span>
    </footer>
  </div>
</template>

<style scoped>
.impressum-page {
  background:
    radial-gradient(
      circle at 88% 12%,
      rgba(214, 147, 147, 0.13),
      transparent 29rem
    ),
    #050505;
  color: rgba(255, 255, 255, 0.82);
  display: flex;
  flex-direction: column;
  min-height: 100svh;
  overflow: hidden;
  padding:
    clamp(1.5rem, 3vw, 3rem)
    clamp(1.5rem, 5vw, 5.5rem)
    clamp(1.8rem, 4vw, 3.5rem);
  position: relative;
}

.impressum-page::before {
  background: var(--quaternary-color);
  content: "";
  height: 1px;
  left: 0;
  opacity: 0.62;
  position: absolute;
  top: 0;
  width: 100%;
}

.impressum-header {
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  max-width: 1180px;
  width: 100%;
}

.impressum-logo,
.impressum-back,
.impressum-contact a {
  margin: 0;
  scale: 1;
}

.impressum-logo picture,
.impressum-logo img {
  display: block;
}

.impressum-logo img {
  height: auto;
  width: clamp(8.5rem, 12vw, 11rem);
}

.impressum-back {
  align-items: center;
  color: rgba(255, 255, 255, 0.72);
  display: inline-flex;
  font-family: myFont, Helvetica, Arial, sans-serif;
  font-size: 0.84rem;
  gap: 0.65rem;
  letter-spacing: 0.02em;
  padding: 0.7rem 0;
}

.impressum-back span {
  color: var(--quaternary-color);
  font-family: Helvetica, Arial, sans-serif;
  font-size: 1.25rem;
  transition: transform 180ms ease;
}

.impressum-back:hover span,
.impressum-back:focus-visible span {
  transform: translateX(-0.25rem);
}

.impressum-content {
  margin: clamp(6rem, 12svh, 9rem) auto 0;
  max-width: 760px;
  width: 100%;
}

.impressum-kicker {
  color: var(--quaternary-color);
  font-family: myFont, Helvetica, Arial, sans-serif;
  font-size: clamp(0.72rem, 1vw, 0.88rem);
  font-weight: 700;
  letter-spacing: 0;
  margin-bottom: 1.1rem;
  text-transform: uppercase;
}

h1 {
  color: #fff;
  font-size: clamp(3.5rem, 8vw, 7.5rem);
  font-weight: 700;
  letter-spacing: 0;
  line-height: 0.92;
  text-transform: uppercase;
}

.impressum-accent {
  background: var(--quaternary-color);
  height: 3px;
  margin: clamp(1.8rem, 4vw, 3rem) 0 clamp(4.5rem, 9vw, 7rem);
  width: clamp(4rem, 10vw, 7rem);
}

.impressum-block {
  border-top: 1px solid rgba(255, 255, 255, 0.14);
  display: grid;
  gap: clamp(1.7rem, 4vw, 3.5rem);
  grid-template-columns: minmax(14rem, 0.8fr) 1.2fr;
  padding: clamp(2rem, 4vw, 3rem) 0;
}

.impressum-block h2 {
  color: rgba(255, 255, 255, 0.55);
  font-family: myFont, Helvetica, Arial, sans-serif;
  font-size: clamp(0.82rem, 1.2vw, 1rem);
  font-weight: 600;
  line-height: 1.5;
}

address {
  display: flex;
  flex-direction: column;
  font-size: clamp(1.05rem, 1.5vw, 1.28rem);
  font-style: normal;
  gap: 0.45rem;
  line-height: 1.55;
}

address strong {
  color: #fff;
  font-weight: 600;
  margin-bottom: 0.45rem;
}

.impressum-contact {
  display: flex;
  flex-direction: column;
  gap: 1.7rem;
}

.impressum-contact div {
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
}

.impressum-contact dt {
  color: rgba(255, 255, 255, 0.44);
  font-size: 0.78rem;
  font-weight: 700;
  text-transform: uppercase;
}

.impressum-contact a {
  color: #fff;
  display: inline-block;
  font-size: clamp(1.05rem, 1.5vw, 1.28rem);
  transition: color 160ms ease;
}

.impressum-contact a:hover,
.impressum-contact a:focus-visible {
  color: var(--quaternary-color);
  outline: none;
}

.impressum-footer {
  align-items: center;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.35);
  display: flex;
  font-size: 0.78rem;
  justify-content: space-between;
  margin: clamp(5rem, 12vw, 9rem) auto 0;
  max-width: 1180px;
  padding-top: 1.4rem;
  width: 100%;
}

@media (min-width: 640px) and (max-width: 1024px) {
  .impressum-page {
    padding: 2rem clamp(2.5rem, 7vw, 5rem) 2.5rem;
  }

  .impressum-content {
    margin-top: clamp(5rem, 10svh, 7rem);
    max-width: 680px;
  }
}

@media (max-width: 639px) {
  .impressum-page {
    padding:
      calc(1.25rem + env(safe-area-inset-top, 0px))
      clamp(1.25rem, 6vw, 1.75rem)
      calc(1.75rem + env(safe-area-inset-bottom, 0px));
  }

  .impressum-logo img {
    width: 8.5rem;
  }

  .impressum-back {
    font-size: 0.72rem;
    gap: 0.45rem;
  }

  .impressum-content {
    margin-top: clamp(4.5rem, 11svh, 6rem);
  }

  h1 {
    font-size: clamp(2.8rem, 13vw, 3.4rem);
  }

  .impressum-accent {
    margin-bottom: 3.8rem;
  }

  .impressum-block {
    gap: 1.4rem;
    grid-template-columns: 1fr;
    padding: 2rem 0 2.4rem;
  }

  .impressum-block h2 {
    max-width: 16rem;
  }

  .impressum-footer {
    align-items: flex-start;
    flex-direction: column;
    gap: 0.45rem;
    margin-top: 4.5rem;
  }
}
</style>
