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
</style>
