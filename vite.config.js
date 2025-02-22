import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue({
    template: {
      compilerOptions: {
        // Excluir elementos personalizados como webgi-viewer
        isCustomElement: (tag) => tag.startsWith('webgi-')
      }
    }
  })],
  base: '/portafolio-vue/',  // Ajusta la base si es necesario para producción
  assetsInclude: ['**/*.gltf', '**/*.glb'] // Incluye archivos GLTF y GLB como assets
});
