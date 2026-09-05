<template>
  <section id="about" class="founder-profile wraperr" aria-labelledby="founder-title">
    <div class="founder-profile__team">
      <TeamMemberCard
        v-for="member in teamMembers"
        :key="member.id"
        :heading-id="member.headingId"
        :member="member"
      />
    </div>

    <div class="founder-profile__vision" aria-label="Vision und Arbeitsweise">
      <article v-for="item in visionList" :key="item.title">
        <p>{{ item.label }}</p>
        <h3>{{ item.title }}</h3>
        <span>{{ item.copy }}</span>
      </article>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue';
import { imageAssets } from '../assets/optimized/media';
import TeamMemberCard from './TeamMemberCard.vue';

const defaultTeamMembers = [
  {
    id: 'founder',
    headingId: 'founder-title',
    eyebrow: 'Founder',
    name: 'Juan Mejia',
    role: 'Digital Kontext / Web, Foto & Film',
    copy: 'Juan verbindet Strategie, Bildsprache und Umsetzung zu digitalen Auftritten, die nahbar wirken und professionell bleiben.',
    photo: imageAssets.fotoJuan,
    signature: imageAssets.firma,
  },
  {
    id: 'ann-katrin',
    headingId: 'ann-katrin-title',
    eyebrow: 'Client & Operations',
    name: 'Ann-Katrin Jahn',
    role: 'Client & Operations Manager',
    copy: 'Ann-Katrin begleitet Kunden, organisiert Abläufe und hält Projekte klar, verbindlich und nah an dem, was Unternehmen wirklich brauchen.',
    photo: imageAssets.fotoJuan,
  },
];

const defaultVisionItems = [
  {
    label: 'Vision',
    title: 'Echt sichtbar statt austauschbar.',
    copy: 'Digitale Auftritte sollen nicht nur sauber aussehen, sondern zeigen, warum ein Unternehmen vertrauenswürdig ist.',
  },
  {
    label: 'Arbeitsweise',
    title: 'Strategie, Bilder und Umsetzung zusammen.',
    copy: 'Konzept, Website, Foto, Film und Content greifen ineinander, damit alles nach einer klaren Handschrift wirkt.',
  },
  {
    label: 'Anspruch',
    title: 'Nahbar, klar und hochwertig.',
    copy: 'Keine leeren Versprechen, keine künstliche Fassade. Der Auftritt soll professionell sein und trotzdem menschlich bleiben.',
  },
];

const props = defineProps({
  members: {
    type: Array,
    default: null,
  },
  visionItems: {
    type: Array,
    default: null,
  },
});

const teamMembers = computed(() => (
  Array.isArray(props.members) && props.members.length > 0
    ? props.members
    : defaultTeamMembers
));

const visionList = computed(() => (
  Array.isArray(props.visionItems) && props.visionItems.length > 0
    ? props.visionItems
    : defaultVisionItems
));
</script>

<style scoped>
.wraperr {
  overflow-x: clip;
}

.founder-profile {
  background:
    radial-gradient(circle at 78% 18%, rgba(214, 147, 147, 0.18), rgba(214, 147, 147, 0) 30%),
    linear-gradient(180deg, #000 0%, #110c0c 48%, #000 100%);
  color: #fff;
  margin-top: -1px;
  padding: clamp(4.5rem, 8vw, 8rem) clamp(1.2rem, 5vw, 4rem);
  scroll-margin-top: clamp(6rem, 12svh, 9rem);
  width: 100vw;
}

.founder-profile__team {
  display: grid;
  gap: clamp(1.4rem, 3vw, 2.4rem);
}

.founder-profile__vision {
  display: grid;
  gap: clamp(1rem, 2vw, 1.4rem);
  grid-template-columns: repeat(3, minmax(0, 1fr));
  margin: clamp(3.5rem, 7vw, 6rem) auto 0;
  max-width: min(72rem, 90vw);
}

.founder-profile__vision article {
  background:
    radial-gradient(circle at 16% 12%, rgba(214, 147, 147, 0.18), rgba(214, 147, 147, 0) 34%),
    rgba(255, 255, 255, 0.035);
  border: 1px solid rgba(255, 218, 218, 0.12);
  border-radius: 8px;
  padding: clamp(1rem, 2vw, 1.4rem);
}

.founder-profile__vision p {
  color: var(--quaternary-color);
  font-size: clamp(0.68rem, 0.9vw, 0.82rem);
  font-weight: 900;
  margin: 0 0 0.7rem;
  text-transform: uppercase;
}

.founder-profile__vision h3 {
  font-size: clamp(1rem, 1.35vw, 1.22rem);
  font-weight: 900;
  line-height: 1.25;
  margin: 0 0 0.85rem;
}

.founder-profile__vision span {
  color: rgba(255, 255, 255, 0.72);
  display: block;
  font-size: clamp(0.86rem, 1.05vw, 0.98rem);
  line-height: 1.55;
}

@media (min-width: 640px) and (max-width: 1024px) {
  .founder-profile__vision {
    grid-template-columns: 1fr;
    max-width: min(34rem, calc(100vw - 2rem));
  }
}

@media (max-width: 639px) {
  .founder-profile {
    padding: clamp(4rem, 8svh, 5rem) 1rem;
  }

  .founder-profile__vision {
    grid-template-columns: 1fr;
    max-width: min(34rem, calc(100vw - 2rem));
  }
}
</style>
