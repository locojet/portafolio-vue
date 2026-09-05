<template>
  <section id="media" class="media-showcase wraperr">
    <div class="media-intro">
      <p class="eyebrow">Foto + Film</p>
      <h2>Ein Produktionstag, viele digitale Einsatzorte.</h2>
      <p>
        Aus echten Bildern und bewegten Momenten entsteht Content für Website,
        Social Media, Recruiting, Google-Unternehmensprofile und Kampagnen.
      </p>
    </div>

    <div class="photo-section">
      <picture class="reveal-photo reveal-photo--from-right">
        <source type="image/avif" :srcset="images.claqueta.avif" sizes="(max-width: 1024px) calc(100vw - 2.4rem), 900px" />
        <source type="image/webp" :srcset="images.claqueta.webp" sizes="(max-width: 1024px) calc(100vw - 2.4rem), 900px" />
        <img
          class="foto-film-clapper"
          :src="images.claqueta.fallback"
          alt="Claqueta de producción audiovisual"
          width="1536"
          height="1024"
          loading="lazy"
          decoding="async"
        />
      </picture>

      <div class="section-copy">
        <h3>Fotografie</h3>
        <p>
          Wir zeigen Mitarbeiter, Räume, Produkte, Maschinen, Prozesse und
          Details so, wie Kunden sie erleben sollen: hochwertig, klar und
          authentisch.
        </p>
      </div>

      <div class="photo-grid">
        <figure
          v-for="(item, index) in photoItems"
          :key="item.caption"
          class="reveal-photo"
          :class="index % 2 === 0 ? 'reveal-photo--from-left' : 'reveal-photo--from-right'"
        >
          <picture>
            <source type="image/avif" :srcset="item.image.avif" sizes="(max-width: 1024px) calc(100vw - 2.4rem), 33vw" />
            <source type="image/webp" :srcset="item.image.webp" sizes="(max-width: 1024px) calc(100vw - 2.4rem), 33vw" />
            <img
              :src="item.image.fallback"
              :alt="item.alt"
              :width="item.image.width"
              :height="item.image.height"
              loading="lazy"
              decoding="async"
            />
          </picture>
          <figcaption>{{ item.caption }}</figcaption>
        </figure>
      </div>
    </div>

    <div class="video-section">
      <div class="section-copy">
        <h3>Videoproduktion</h3>
        <p>
          Film macht sichtbar, wie gearbeitet wird. Kurze Clips, Imagefilme,
          Interviews und Behind-the-Scenes-Material geben Unternehmen eine
          Stimme und ein Gesicht.
        </p>
      </div>

      <div class="video-grid">
        <article
          v-for="(item, index) in videoItems"
          :key="item.title"
          class="reveal-photo"
          :class="index % 2 === 0 ? 'reveal-photo--from-right' : 'reveal-photo--from-left'"
        >
          <picture>
            <source type="image/avif" :srcset="item.image.avif" sizes="(max-width: 1024px) calc(100vw - 2.4rem), 33vw" />
            <source type="image/webp" :srcset="item.image.webp" sizes="(max-width: 1024px) calc(100vw - 2.4rem), 33vw" />
            <img
              :src="item.image.fallback"
              :alt="item.title"
              :width="item.image.width"
              :height="item.image.height"
              loading="lazy"
              decoding="async"
            />
          </picture>
          <h4>{{ item.title }}</h4>
          <p>{{ item.copy }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onBeforeUnmount, onMounted } from 'vue';
import { imageAssets } from '../assets/optimized/media';

const images = imageAssets;

const photoItems = [
  {
    alt: 'Atmosphärische Unternehmensfotografie',
    caption: 'Menschen & Atmosphäre',
    image: images.menschenundatmosphere,
  },
  {
    alt: 'Detailaufnahme für digitale Präsenz',
    caption: 'Details & Produkte',
    image: images.detailsundprodukte,
  },
  {
    alt: 'Website und digitale Präsentation',
    caption: 'Web & Präsentation',
    image: images.webundpresentation,
  },
];

const videoItems = [
  {
    copy: 'Ein starker erster Eindruck für Website und Präsentationen.',
    image: images.imagefilm,
    title: 'Imagefilm',
  },
  {
    copy: 'Kurze Formate für Instagram, TikTok, LinkedIn und Kampagnen.',
    image: images.socialclips,
    title: 'Social Clips',
  },
  {
    copy: 'Authentische Einblicke, die Vertrauen aufbauen.',
    image: images.arbeitsprocesse,
    title: 'Arbeitsprozesse',
  },
];

let revealObserver = null;

onMounted(() => {
  const revealItems = document.querySelectorAll('.media-showcase .reveal-photo');

  if (!('IntersectionObserver' in window)) {
    revealItems.forEach((item) => item.classList.add('reveal-photo--visible'));
    return;
  }

  revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      entry.target.classList.add('reveal-photo--visible');
      revealObserver?.unobserve(entry.target);
    });
  }, {
    rootMargin: '0px 0px -12% 0px',
    threshold: 0.16,
  });

  revealItems.forEach((item) => revealObserver.observe(item));
});

onBeforeUnmount(() => {
  revealObserver?.disconnect();
});
</script>

<style scoped>
.wraperr {
  overflow-x: hidden;
}

.media-showcase {
  background: #000;
  color: #fff;
  margin-top: -1px;
  padding: 8rem 4rem;
  scroll-margin-top: clamp(6rem, 12svh, 9rem);
  width: 100vw;
}

.media-intro,
.section-copy {
  max-width: 900px;
  margin: 0 auto 4rem;
}

.eyebrow {
  color: var(--secondary-color);
  font-size: 0.9rem;
  font-weight: 700;
  margin-bottom: 1rem;
  text-transform: uppercase;
}

h2 {
  font-size: 2.35rem;
  line-height: 1.1;
  margin-bottom: 1.5rem;
}

h3 {
  font-size: 1.65rem;
  margin-bottom: 1rem;
}

p {
  font-size: 1.1rem;
  line-height: 1.7;
}

.photo-section,
.video-section {
  margin: 6rem auto 0;
  max-width: 1200px;
}

.photo-grid,
.video-grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

figure,
article {
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 8px;
  overflow: hidden;
  transform: translateZ(0);
}

.reveal-photo {
  opacity: 0;
  transition:
    opacity 680ms ease,
    transform 780ms cubic-bezier(0.22, 1, 0.36, 1);
  will-change: opacity, transform;
}

.reveal-photo--from-left {
  transform: translate3d(-4rem, 1.25rem, 0);
}

.reveal-photo--from-right {
  transform: translate3d(4rem, 1.25rem, 0);
}

.reveal-photo--visible {
  opacity: 1;
  transform: translate3d(0, 0, 0);
}

picture {
  display: block;
}

img,
video {
  aspect-ratio: 4 / 5;
  backface-visibility: hidden;
  display: block;
  height: auto;
  object-fit: cover;
  transform: translateZ(0) scale(1.002);
  width: 100%;
}

video {
  aspect-ratio: 16 / 10;
}

.foto-film-clapper {
  aspect-ratio: 16 / 9;
  border: 1px solid rgba(255, 218, 218, 0.16);
  border-radius: 8px;
  box-shadow:
    0 1.6rem 4rem rgba(0, 0, 0, 0.36),
    0 0 2.2rem rgba(214, 147, 147, 0.1);
  display: block;
  margin: 0 auto clamp(2rem, 4vw, 3rem);
  max-width: 900px;
  object-fit: cover;
  object-position: center;
  width: 100%;
}

.foto-film-clapper.reveal-photo {
  display: block;
}

@media (prefers-reduced-motion: reduce) {
  .reveal-photo {
    opacity: 1;
    transform: none;
    transition: none;
  }
}

figcaption,
article h4 {
  font-size: 1rem;
  font-weight: 700;
  padding: 1rem 1rem 0;
}

article p {
  color: rgba(255, 255, 255, 0.78);
  font-size: 0.95rem;
  padding: 0.5rem 1rem 1.2rem;
}

@media (min-width: 640px) and (max-width: 1024px) {
  .media-showcase {
    padding: 6rem 1.2rem;
  }

  h2 {
    font-size: 1.75rem;
  }

  .photo-grid,
  .video-grid {
    grid-template-columns: 1fr;
  }

  .photo-section,
  .video-section {
    margin-top: 4rem;
  }
}

@media (max-width: 639px) {
  .media-showcase {
    padding: 6rem 1.2rem;
  }

  h2 {
    font-size: 1.75rem;
  }

  .photo-grid,
  .video-grid {
    grid-template-columns: 1fr;
  }

  .photo-section,
  .video-section {
    margin-top: 4rem;
  }
}
</style>
