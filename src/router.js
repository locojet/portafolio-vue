import {
  createRouter,
  createWebHistory
} from 'vue-router';
import HomeView from './views/HomeView.vue';

const defaultTitle =
  'Digitale Präsenz | Web. Foto. Film.';

const defaultDescription =
  'Digitale Präsenz für Unternehmen: Webdesign, Webentwicklung, Fotografie, Film und Content aus einer Hand.';

const scrollPositions = new Map();

const getScrollPositionKey = (route) => {
  if (route.name === 'preis-detail') {
    return `preis-detail:${route.params.slug}`;
  }

  return String(route.name || route.path);
};

const restoreScrollPosition = (position, delay = 0) => (
  new Promise((resolve) => {
    const finish = () => {
      document.documentElement.classList.add(
        'route-scroll-restore'
      );

      requestAnimationFrame(() => {
        resolve({
          left: position.left || 0,
          top: position.top || 0,
          behavior: 'auto',
        });

        requestAnimationFrame(() => {
          document.documentElement.classList.remove(
            'route-scroll-restore'
          );
        });
      });
    };

    if (delay > 0) {
      setTimeout(finish, delay);
      return;
    }

    finish();
  })
);

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
      path: '/preise',
      name: 'preise',
      component: () => import(
        './views/PreiseView.vue'
      ),
      meta: {
        title: 'Preise | Digital Kontext',
        description:
          'Preise und Leistungen für Websites, Unternehmensfotografie, Imagefilm und digitale Komplettauftritte von Digital Kontext.',
      },
    },
    {
      path: '/preise/:slug',
      name: 'preis-detail',
      component: () => import(
        './views/PreiseView.vue'
      ),
      meta: {
        title: 'Paketdetails | Digital Kontext',
        description:
          'Leistungsumfang und transparente Preisdetails für digitale Projekte von Digital Kontext.',
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

    const rememberedPosition = scrollPositions.get(
      getScrollPositionKey(to)
    );

    if (rememberedPosition) {
      const transitionDelay = to.meta.transition === 'preise-open'
        ? 420
        : 0;

      return restoreScrollPosition(
        rememberedPosition,
        transitionDelay
      );
    }

    return {
      top: 0,
    };
  },
});

router.beforeEach((to, from) => {
  if (from.name) {
    scrollPositions.set(
      getScrollPositionKey(from),
      {
        left: window.scrollX,
        top: window.scrollY,
      }
    );
  }

  const isPriceRoute = (route) => (
    ['preise', 'preis-detail'].includes(route.name)
  );

  if (isPriceRoute(to) && from.name && !isPriceRoute(from)) {
    to.meta.transition = 'preise-open';
    return;
  }

  if (isPriceRoute(from) && !isPriceRoute(to)) {
    to.meta.transition = 'preise-close';
    return;
  }

  to.meta.transition = '';
});

router.afterEach((to) => {
  document.title =
    to.meta.title || defaultTitle;

  const description = document.querySelector(
    'meta[name="description"]'
  );

  description?.setAttribute(
    'content',
    to.meta.description || defaultDescription
  );
});

export default router;
