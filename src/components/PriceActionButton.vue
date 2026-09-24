<template>
  <RouterLink
    class="price-action-button"
    to="/preise"
    aria-label="Preise öffnen"
  >
    <span>Preise</span>
  </RouterLink>
</template>

<style scoped>
.price-action-button {
  align-items: center;
  appearance: none;
  background: transparent;
  border: 1px solid rgba(214, 147, 147, 0.9);
  border-radius: 8px 0 0 8px;
  bottom: calc(5rem + 7.25rem);
  color: #fff;
  cursor: pointer;
  display: inline-flex;
  isolation: isolate;
  justify-content: center;
  margin: 0;
  min-width: 2.55rem;
  overflow: hidden;
  padding: 1.15rem 0.42rem;
  position: fixed;
  right: max(0.35rem, env(safe-area-inset-right));
  scale: 1;
  text-decoration: none;
  touch-action: manipulation;
  z-index: 1990;
}

.price-action-button::before {
  -webkit-backdrop-filter: blur(7px) saturate(1.2);
  backdrop-filter: blur(7px) saturate(1.2);
  background: rgba(214, 147, 147, 0.68);
  content: "";
  inset: 0;
  pointer-events: none;
  position: absolute;
  transition: background 160ms ease;
  z-index: -1;
}

.price-action-button span {
  color: #fff;
  font-family: myFont, Helvetica, Arial, sans-serif;
  font-size: clamp(1.08rem, 4.1vw, 1.32rem);
  font-style: italic;
  font-weight: 800;
  letter-spacing: 0;
  line-height: 1;
  writing-mode: vertical-rl;
  transform: rotate(180deg);
}

.price-action-button:hover::before,
.price-action-button:focus-visible::before {
  background: rgba(214, 147, 147, 0.8);
}

.price-action-button:focus-visible {
  box-shadow: 0 0 0 3px rgba(255, 218, 218, 0.42);
  outline: none;
}

.price-action-button:active {
  transform: scale(0.97);
}

@media (prefers-reduced-motion: reduce) {
  .price-action-button,
  .price-action-button::before {
    transition: none;
  }
}
</style>
