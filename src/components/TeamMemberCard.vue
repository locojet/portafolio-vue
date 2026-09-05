<template>
  <article class="team-member-card" :aria-labelledby="headingId">
    <figure class="team-member-card__portrait">
      <span class="team-member-card__photo-frame">
        <picture>
          <source
            type="image/avif"
            :srcset="member.photo.avif"
            sizes="(max-width: 639px) 54vw, (max-width: 1024px) 48vw, 18vw"
          />
          <source
            type="image/webp"
            :srcset="member.photo.webp"
            sizes="(max-width: 639px) 54vw, (max-width: 1024px) 48vw, 18vw"
          />
          <img
            class="team-member-card__photo"
            :src="member.photo.fallback"
            :alt="member.name"
            :width="member.photo.width"
            :height="member.photo.height"
            loading="lazy"
            decoding="async"
          />
        </picture>
      </span>

      <picture v-if="member.signature" class="team-member-card__signature-wrap">
        <source
          type="image/avif"
          :srcset="member.signature.avif"
          sizes="(max-width: 639px) 26vw, (max-width: 1024px) 22vw, 10vw"
        />
        <source
          type="image/webp"
          :srcset="member.signature.webp"
          sizes="(max-width: 639px) 26vw, (max-width: 1024px) 22vw, 10vw"
        />
        <img
          class="team-member-card__signature"
          :src="member.signature.fallback"
          alt=""
          :width="member.signature.width"
          :height="member.signature.height"
          loading="lazy"
          decoding="async"
        />
      </picture>
    </figure>

    <div class="team-member-card__copy">
      <p>{{ member.eyebrow }}</p>
      <h2 :id="headingId">{{ member.name }}</h2>
      <span>{{ member.role }}</span>
      <p v-if="member.copy">{{ member.copy }}</p>
    </div>
  </article>
</template>

<script setup>
defineProps({
  headingId: {
    type: String,
    required: true,
  },
  member: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped>
.team-member-card {
  align-items: center;
  background:
    radial-gradient(circle at 78% 18%, rgba(214, 147, 147, 0.16), rgba(214, 147, 147, 0) 32%),
    rgba(255, 255, 255, 0.035);
  border: 1px solid rgba(255, 218, 218, 0.13);
  border-radius: 8px;
  display: grid;
  gap: clamp(2rem, 5vw, 4.5rem);
  grid-template-columns: minmax(14rem, 0.72fr) minmax(0, 1fr);
  margin: 0 auto;
  max-width: min(72rem, 90vw);
  padding: clamp(1.4rem, 4vw, 3rem);
}

.team-member-card__portrait {
  align-items: flex-end;
  display: flex;
  gap: clamp(0.8rem, 2vw, 1.35rem);
  justify-content: center;
  margin: 0;
  overflow: visible;
}

.team-member-card__photo-frame {
  aspect-ratio: 1;
  border: 1px solid rgba(255, 218, 218, 0.16);
  border-radius: 50%;
  box-shadow: 0 1.8rem 4rem rgba(0, 0, 0, 0.46);
  display: block;
  flex: 0 0 clamp(13rem, 20vw, 19rem);
  overflow: hidden;
  position: relative;
}

.team-member-card__photo-frame::after {
  background:
    linear-gradient(180deg, rgba(0, 0, 0, 0.02) 0%, rgba(0, 0, 0, 0.2) 55%, rgba(0, 0, 0, 0.72) 100%),
    radial-gradient(circle at 75% 80%, rgba(214, 147, 147, 0.16), rgba(214, 147, 147, 0) 34%);
  content: "";
  inset: 0;
  pointer-events: none;
  position: absolute;
}

.team-member-card__photo-frame picture {
  display: block;
  height: 100%;
  width: 100%;
}

.team-member-card__photo {
  display: block;
  height: 100%;
  object-fit: cover;
  object-position: center top;
  width: 100%;
}

.team-member-card__signature-wrap {
  flex: 0 0 auto;
  margin-bottom: clamp(1rem, 2.6vw, 1.8rem);
  width: clamp(5.5rem, 9vw, 8.5rem);
  z-index: 2;
}

.team-member-card__signature {
  display: block;
  filter: drop-shadow(0 0.5rem 1.4rem rgba(0, 0, 0, 0.62));
  height: auto;
  width: 100%;
}

.team-member-card__copy {
  max-width: 42rem;
  min-width: 0;
}

.team-member-card__copy > p:first-child {
  color: var(--quaternary-color);
  font-size: clamp(0.78rem, 0.95vw, 0.94rem);
  font-weight: 900;
  margin: 0 0 0.75rem;
  text-transform: uppercase;
}

.team-member-card__copy h2 {
  font-size: clamp(2rem, 3.2vw, 3.25rem);
  font-weight: 900;
  line-height: 1;
  margin: 0;
}

.team-member-card__copy span {
  color: rgba(255, 218, 218, 0.82);
  display: block;
  font-size: clamp(1rem, 1.32vw, 1.18rem);
  font-weight: 800;
  line-height: 1.35;
  margin: clamp(0.9rem, 1.8vw, 1.3rem) 0;
}

.team-member-card__copy > p:last-child {
  color: rgba(255, 255, 255, 0.82);
  font-size: clamp(0.96rem, 1.28vw, 1.12rem);
  line-height: 1.65;
  margin: 0;
}

@media (min-width: 640px) and (max-width: 1024px) {
  .team-member-card {
    grid-template-columns: 1fr;
    max-width: min(34rem, calc(100vw - 2rem));
  }

  .team-member-card__portrait {
    justify-content: flex-start;
    max-width: 100%;
    width: 100%;
  }

  .team-member-card__photo-frame {
    flex-basis: clamp(12rem, 52vw, 18rem);
  }

  .team-member-card__signature-wrap {
    margin-bottom: clamp(0.8rem, 4vw, 1.5rem);
    width: clamp(5.2rem, 22vw, 8rem);
  }
}

@media (max-width: 639px) {
  .team-member-card {
    grid-template-columns: 1fr;
    max-width: min(34rem, calc(100vw - 2rem));
    padding: clamp(1.2rem, 5vw, 1.6rem);
  }

  .team-member-card__portrait {
    justify-content: flex-start;
    max-width: 100%;
    width: 100%;
  }

  .team-member-card__photo-frame {
    flex-basis: clamp(11rem, 54vw, 15rem);
  }

  .team-member-card__signature-wrap {
    margin-bottom: clamp(0.8rem, 4vw, 1.5rem);
    width: clamp(5.2rem, 22vw, 8rem);
  }

  .team-member-card__copy h2 {
    font-size: clamp(1.75rem, 8vw, 2.25rem);
  }
}
</style>
