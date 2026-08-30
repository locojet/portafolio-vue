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
      <div class="section-copy">
        <h3>Fotografie</h3>
        <p>
          Wir zeigen Mitarbeiter, Räume, Produkte, Maschinen, Prozesse und
          Details so, wie Kunden sie erleben sollen: hochwertig, klar und
          authentisch.
        </p>
      </div>

      <div class="photo-grid">
        <figure>
          <img src="../assets/img/holo1.png" alt="Atmosphärische Unternehmensfotografie" />
          <figcaption>Menschen & Atmosphäre</figcaption>
        </figure>
        <figure>
          <img src="../assets/img/holo2.PNG" alt="Detailaufnahme für digitale Präsenz" />
          <figcaption>Details & Produkte</figcaption>
        </figure>
        <figure>
          <img src="../assets/img/laptoprosa.PNG" alt="Website und digitale Präsentation" />
          <figcaption>Web & Präsentation</figcaption>
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
        <article>
          <video autoplay muted loop playsinline preload="metadata">
            <source src="../assets/Videos/timeline5.mp4" type="video/mp4" />
            Ihr Browser unterstützt dieses Video nicht.
          </video>
          <h4>Imagefilm</h4>
          <p>Ein starker erster Eindruck für Website und Präsentationen.</p>
        </article>
        <article>
          <video autoplay muted loop playsinline preload="metadata">
            <source src="../assets/Videos/timeline6.mp4" type="video/mp4" />
            Ihr Browser unterstützt dieses Video nicht.
          </video>
          <h4>Social Clips</h4>
          <p>Kurze Formate für Instagram, TikTok, LinkedIn und Kampagnen.</p>
        </article>
        <article>
          <video autoplay muted loop playsinline preload="metadata">
            <source src="../assets/Videos/timeline8.mp4" type="video/mp4" />
            Ihr Browser unterstützt dieses Video nicht.
          </video>
          <h4>Arbeitsprozesse</h4>
          <p>Authentische Einblicke, die Vertrauen aufbauen.</p>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.wraperr {
  overflow-x: hidden;
}

.media-showcase {
  background: #000;
  color: #fff;
  padding: 8rem 4rem;
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
  font-size: 3rem;
  line-height: 1.1;
  margin-bottom: 1.5rem;
}

h3 {
  font-size: 2rem;
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
}

img,
video {
  aspect-ratio: 4 / 5;
  display: block;
  height: auto;
  object-fit: cover;
  width: 100%;
}

video {
  aspect-ratio: 16 / 10;
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

@media (max-width: 1024px) {
  .media-showcase {
    padding: 6rem 1.2rem;
  }

  h2 {
    font-size: 2rem;
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
