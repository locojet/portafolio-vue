import {
  createRouter,
  createWebHistory
} from 'vue-router';
import HomeView from './views/HomeView.vue';

const defaultTitle =
  'Digitale Präsenz | Web. Foto. Film.';

const router = createRouter({
  history: createWebHistory(
    import.meta.env.BASE_URL
  ),

  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: defaultTitle,
      },
    },
    {
      path: '/impressum',
      name: 'impressum',
      component: () => import(
        './views/ImpressumView.vue'
      ),
      meta: {
        title: 'Impressum | Digital Kontext',
      },
    },
    {
      path: '/datenschutz',
      name: 'datenschutz',
      component: () => import(
        './views/DatenschutzView.vue'
      ),
      meta: {
        title: 'Datenschutz | Digital Kontext',
      },
    },
  ],

  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }

    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      };
    }

    return {
      top: 0,
    };
  },
});

router.afterEach((to) => {
  document.title =
    to.meta.title || defaultTitle;
});

export default router;
