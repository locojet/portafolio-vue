<template>
  <footer id="footer-contact" class="site-footer wraperr">
    <div class="footer-inner">
      <p class="footer-brand">Digitale Präsenz</p>
      <p class="footer-line">Web. Foto. Film. Content. Alles aus einer Hand.</p>

      <nav aria-label="Footer Navigation">
        <a href="#presence">Leistungen</a>
        <a href="#media">Foto & Video</a>
        <a href="#contact">Projekt besprechen</a>
      </nav>

      <div class="footer-contact-links" aria-label="Direkter Kontakt">
        <a
          href="mailto:hello@digital-kontext.de"
          aria-label="E-Mail an Digital Kontext schreiben"
          title="E-Mail"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M3 5h18c1.1 0 2 .9 2 2v10c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V7c0-1.1.9-2 2-2Zm9 7 8-5H4l8 5Zm0 2.3L3 8.7V17h18V8.7l-9 5.6Z" />
          </svg>
        </a>

        <span class="footer-phone-number">
          +49 176 40137484
        </span>
      </div>

      <small class="footer-legal">
        <span>© 2026 Digital Kontext</span>
        <span aria-hidden="true">·</span>
        <RouterLink to="/impressum">Impressum</RouterLink>
        <span aria-hidden="true">·</span>
        <RouterLink to="/datenschutz">Datenschutz</RouterLink>
      </small>
    </div>
  </footer>
</template>

<style scoped>
.wraperr {
  overflow-x: hidden;
}

.site-footer {
  background: #000;
  color: #fff;
  padding: 4rem 2rem;
  scroll-margin-top: clamp(6rem, 12svh, 9rem);
  width: 100vw;
}

.footer-inner {
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 0 auto;
  max-width: 900px;
  text-align: center;
}

.footer-brand {
  color: var(--secondary-color);
  font-size: 1.3rem;
  font-weight: 700;
  text-transform: uppercase;
}

.footer-line {
  font-size: 1rem;
}

nav {
  display: flex;
  flex-wrap: wrap;
  gap: 1.2rem;
  justify-content: center;
  margin: 1rem 0;
}

a,
small {
  color: rgba(255, 255, 255, 0.76);
}

a:hover {
  color: var(--secondary-color);
}

.footer-legal {
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
  justify-content: center;
}

.footer-contact-links {
  align-items: center;
  display: flex;
  gap: 0.75rem;
  justify-content: center;
}

.footer-phone-number {
  color: rgba(255, 255, 255, 0.76);
  font-size: 0.95rem;
  line-height: 1;
}

.footer-contact-links a {
  align-items: center;
  border: 1px solid rgba(214, 147, 147, 0.55);
  border-radius: 50%;
  display: inline-flex;
  height: 2.8rem;
  justify-content: center;
  margin: 0;
  scale: 1;
  transition:
    background 160ms ease,
    border-color 160ms ease,
    transform 160ms ease;
  width: 2.8rem;
}

.footer-contact-links svg {
  fill: currentColor;
  height: 1.2rem;
  width: 1.2rem;
}

.footer-contact-links a:hover,
.footer-contact-links a:focus-visible {
  background: rgba(214, 147, 147, 0.14);
  border-color: var(--secondary-color);
  color: var(--secondary-color);
  outline: none;
  transform: translateY(-2px);
}

.footer-legal a {
  color: inherit;
  margin: 0;
  scale: 1;
}

.footer-legal a:hover,
.footer-legal a:focus-visible {
  color: var(--secondary-color);
  outline: none;
}

@media (min-width: 640px) and (max-width: 1024px) {
  .footer-contact-links {
    display: none;
  }
}

@media (max-width: 639px) {
  .footer-contact-links {
    display: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .footer-contact-links a {
    transition: none;
  }
}
</style>
