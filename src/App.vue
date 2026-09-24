<template>
  <RouterView v-slot="{ Component, route }">
    <Transition :name="route.meta.transition">
      <component
        :is="Component"
        :key="route.name"
      />
    </Transition>
  </RouterView>
</template>

<style>
.preise-open-enter-active,
.preise-close-leave-active {
  inset: 0;
  overflow-y: auto;
  position: fixed;
  transition:
    transform 380ms cubic-bezier(0.22, 1, 0.36, 1),
    opacity 240ms ease;
  width: 100%;
  z-index: 4000;
}

.preise-open-leave-active {
  inset: 0;
  overflow: hidden;
  position: fixed;
  width: 100%;
  z-index: 0;
}

html.route-scroll-restore {
  scroll-behavior: auto !important;
}

.preise-open-enter-from,
.preise-close-leave-to {
  opacity: 0.96;
  transform: translate3d(100%, 0, 0);
}

.preise-open-enter-to,
.preise-close-leave-from {
  opacity: 1;
  transform: translate3d(0, 0, 0);
}

@media (prefers-reduced-motion: reduce) {
  .preise-open-enter-active,
  .preise-close-leave-active {
    transition-duration: 1ms;
  }
}
</style>
