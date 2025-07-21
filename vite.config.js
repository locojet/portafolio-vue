import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue({
    template: {
      compilerOptions: {
        isCustomElement: (tag) => tag.startsWith('webgi-') || tag === 'parallax'
      }
    }
  })],
  base: '/portafolio-vue/',
  assetsInclude: ['**/*.gltf', '**/*.glb', '**/*.webp', '**/*.png'],
  optimizeDeps: {
    exclude: ['vue-parallax-js']
  }
});