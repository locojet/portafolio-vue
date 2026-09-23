<script setup>
import { imageAssets } from '../assets/optimized/media';

const logoAvifSrcset = imageAssets.logo.avif;
const logoWebpSrcset = imageAssets.logo.webp;
const logoFallback = imageAssets.logo.fallback;
</script>

<template>
  <div class="privacy-page">
    <header class="privacy-header">
      <RouterLink
        class="privacy-logo"
        to="/"
        aria-label="Zur Startseite"
      >
        <picture>
          <source
            type="image/avif"
            :srcset="logoAvifSrcset"
            sizes="(max-width: 639px) 9rem, 11rem"
          />
          <source
            type="image/webp"
            :srcset="logoWebpSrcset"
            sizes="(max-width: 639px) 9rem, 11rem"
          />
          <img
            :src="logoFallback"
            alt="Digital Kontext"
            width="1774"
            height="887"
            decoding="async"
          />
        </picture>
      </RouterLink>

      <RouterLink class="privacy-back" to="/">
        <span aria-hidden="true">←</span>
        Zurück
      </RouterLink>
    </header>

    <main class="privacy-content">
      <p class="privacy-kicker">Rechtliches</p>
      <h1>Datenschutz</h1>
      <div class="privacy-accent" aria-hidden="true"></div>

      <section class="privacy-block">
        <h2>Verantwortlicher</h2>
        <div class="privacy-copy">
          <address>
            <strong>Digital Kontext</strong>
            <span>Inhaber: Juan Carlos Mejia Carmona</span>
            <span>Lauenberg 25A</span>
            <span>25337 Kölln-Reisiek</span>
            <span>Deutschland</span>
          </address>
          <p>
            E-Mail:
            <a href="mailto:hello@digital-kontext.de">
              hello@digital-kontext.de
            </a>
          </p>
          <p>
            Telefon:
            <a href="tel:+4917640137484">
              +49 176 40137484
            </a>
          </p>
        </div>
      </section>

      <section class="privacy-block">
        <h2>Hosting über GitHub Pages</h2>
        <div class="privacy-copy">
          <p>
            Diese Website wird als statische Website über GitHub Pages
            bereitgestellt. Anbieter des Dienstes ist GitHub. Beim Aufruf
            einer GitHub-Pages-Website wird die IP-Adresse des Besuchers
            nach Angaben von GitHub unabhängig von einer Anmeldung zu
            Sicherheitszwecken protokolliert und gespeichert.
          </p>
          <p>
            Darüber hinaus können technisch erforderliche Verbindungsdaten
            verarbeitet werden, insbesondere Datum und Uhrzeit des Abrufs,
            aufgerufene Seite, Referrer, Browser- und Geräteinformationen.
            Die Bereitstellung erfolgt auf Grundlage unseres berechtigten
            Interesses an einer sicheren und zuverlässigen Website gemäß
            Art. 6 Abs. 1 lit. f DSGVO.
          </p>
          <p>
            GitHub verarbeitet Daten auch außerhalb der Europäischen Union.
            Angaben zu den eingesetzten Schutzmechanismen und zur
            Speicherdauer stellt GitHub in der eigenen
            <a
              href="https://docs.github.com/de/site-policy/privacy-policies/github-general-privacy-statement"
              target="_blank"
              rel="noopener noreferrer"
            >
              Datenschutzerklärung
            </a>
            bereit. Die konkrete Speicherdauer der Hosting-Protokolle ist
            aus dem Quellcode dieser Website nicht ersichtlich und wird von
            GitHub bestimmt.
          </p>
        </div>
      </section>

      <section class="privacy-block">
        <h2>Cookies und lokale Speicherung</h2>
        <div class="privacy-copy">
          <p>
            Diese Website setzt nach dem derzeitigen technischen Stand
            keine eigenen Cookies und verwendet weder Local Storage noch
            Session Storage oder IndexedDB. Es sind keine Analyse-,
            Marketing- oder Tracking-Dienste eingebunden.
          </p>
          <p>
            Deshalb wird derzeit kein Consent- oder Cookie-Banner angezeigt.
            Sollte die Website später um einwilligungspflichtige Dienste
            ergänzt werden, wird diese Erklärung angepasst und vor deren
            Aktivierung eine geeignete Einwilligung eingeholt.
          </p>
        </div>
      </section>

      <section class="privacy-block">
        <h2>Schriftarten und Medien</h2>
        <div class="privacy-copy">
          <p>
            Die auf dieser Website verwendeten Schriftarten, Bilder und
            Videos werden lokal zusammen mit der Website ausgeliefert. Beim
            bloßen Laden dieser Inhalte wird keine Verbindung zu Google
            Fonts, Video-Plattformen, sozialen Netzwerken oder sonstigen
            Medien-CDNs hergestellt.
          </p>
        </div>
      </section>

      <section class="privacy-block">
        <h2>Kontaktaufnahme</h2>
        <div class="privacy-copy">
          <p>
            Die Website enthält keine Kontaktformulare und sendet selbst
            keine Formulardaten. Wenn Sie per E-Mail oder Telefon Kontakt
            aufnehmen, verarbeiten wir die von Ihnen übermittelten Angaben,
            um Ihre Anfrage zu beantworten.
          </p>
          <p>
            Die Verarbeitung erfolgt bei vorvertraglichen oder vertraglichen
            Anfragen auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO, im Übrigen
            auf Grundlage unseres berechtigten Interesses an der Bearbeitung
            Ihrer Anfrage gemäß Art. 6 Abs. 1 lit. f DSGVO. Die Daten werden
            gelöscht, sobald der Zweck der Kommunikation entfällt und keine
            gesetzlichen Aufbewahrungspflichten entgegenstehen.
          </p>
        </div>
      </section>

      <section class="privacy-block">
        <h2>Kontakt über WhatsApp</h2>
        <div class="privacy-copy">
          <p>
            Im Kontaktmenü befindet sich ein freiwillig nutzbarer Link zu
            WhatsApp. Erst wenn Sie diesen Link anklicken, verlassen Sie
            unsere Website und stellen eine Verbindung zu WhatsApp her.
            Dabei können insbesondere Ihre IP-Adresse sowie Geräte- und
            Verbindungsdaten an WhatsApp übermittelt werden. Für Nutzer in
            der Europäischen Region wird der Dienst von WhatsApp Ireland
            Limited bereitgestellt.
          </p>
          <p>
            Die Nutzung von WhatsApp ist nicht erforderlich; Sie können uns
            stattdessen per E-Mail oder Telefon erreichen. Weitere Angaben
            finden Sie in der
            <a
              href="https://www.whatsapp.com/legal/privacy-policy-eea?lang=de"
              target="_blank"
              rel="noopener noreferrer"
            >
              Datenschutzerklärung von WhatsApp
            </a>.
          </p>
        </div>
      </section>

      <section class="privacy-block">
        <h2>Externe Links</h2>
        <div class="privacy-copy">
          <p>
            Die Projektübersicht enthält Links zu externen Websites. Diese
            Inhalte werden nicht in Digital Kontext eingebettet und beim
            Besuch unserer Website nicht vorab geladen. Erst durch Ihren
            Klick wird eine Verbindung zum jeweiligen Anbieter hergestellt.
            Für die dortige Datenverarbeitung ist der jeweilige Anbieter
            verantwortlich.
          </p>
        </div>
      </section>

      <section class="privacy-block">
        <h2>Ihre Rechte</h2>
        <div class="privacy-copy">
          <p>
            Sie haben im Rahmen der gesetzlichen Voraussetzungen das Recht
            auf Auskunft, Berichtigung, Löschung, Einschränkung der
            Verarbeitung und Datenübertragbarkeit. Sie können einer auf
            Art. 6 Abs. 1 lit. f DSGVO beruhenden Verarbeitung aus Gründen,
            die sich aus Ihrer besonderen Situation ergeben, widersprechen.
          </p>
          <p>
            Außerdem haben Sie das Recht, sich bei einer zuständigen
            Datenschutzaufsichtsbehörde zu beschweren. Zur Ausübung Ihrer
            Rechte können Sie die oben genannten Kontaktdaten verwenden.
          </p>
        </div>
      </section>

      <p class="privacy-updated">Stand: September 2026</p>
    </main>

    <footer class="privacy-footer">
      <span>Digital Kontext</span>
      <nav aria-label="Rechtliche Navigation">
        <RouterLink to="/impressum">Impressum</RouterLink>
        <span aria-hidden="true">·</span>
        <RouterLink to="/">Startseite</RouterLink>
      </nav>
    </footer>
  </div>
</template>

<style scoped>
.privacy-page {
  background:
    radial-gradient(
      circle at 88% 12%,
      rgba(214, 147, 147, 0.13),
      transparent 29rem
    ),
    #050505;
  color: rgba(255, 255, 255, 0.82);
  display: flex;
  flex-direction: column;
  min-height: 100svh;
  overflow: hidden;
  padding:
    clamp(1.5rem, 3vw, 3rem)
    clamp(1.5rem, 5vw, 5.5rem)
    clamp(1.8rem, 4vw, 3.5rem);
  position: relative;
}

.privacy-page::before {
  background: var(--quaternary-color);
  content: "";
  height: 1px;
  left: 0;
  opacity: 0.62;
  position: absolute;
  top: 0;
  width: 100%;
}

.privacy-header {
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  max-width: 1180px;
  width: 100%;
}

.privacy-logo,
.privacy-back,
.privacy-copy a,
.privacy-footer a {
  margin: 0;
  scale: 1;
}

.privacy-logo picture,
.privacy-logo img {
  display: block;
}

.privacy-logo img {
  height: auto;
  width: clamp(8.5rem, 12vw, 11rem);
}

.privacy-back {
  align-items: center;
  color: rgba(255, 255, 255, 0.72);
  display: inline-flex;
  font-family: myFont, Helvetica, Arial, sans-serif;
  font-size: 0.84rem;
  gap: 0.65rem;
  letter-spacing: 0;
  padding: 0.7rem 0;
}

.privacy-back span {
  color: var(--quaternary-color);
  font-family: Helvetica, Arial, sans-serif;
  font-size: 1.25rem;
  transition: transform 180ms ease;
}

.privacy-back:hover span,
.privacy-back:focus-visible span {
  transform: translateX(-0.25rem);
}

.privacy-content {
  margin: clamp(6rem, 12svh, 9rem) auto 0;
  max-width: 860px;
  width: 100%;
}

.privacy-kicker {
  color: var(--quaternary-color);
  font-family: myFont, Helvetica, Arial, sans-serif;
  font-size: clamp(0.72rem, 1vw, 0.88rem);
  font-weight: 700;
  letter-spacing: 0;
  margin-bottom: 1.1rem;
  text-transform: uppercase;
}

h1 {
  color: #fff;
  font-size: clamp(3.25rem, 7.5vw, 6.8rem);
  font-weight: 700;
  letter-spacing: 0;
  line-height: 0.92;
  text-transform: uppercase;
}

.privacy-accent {
  background: var(--quaternary-color);
  height: 3px;
  margin: clamp(1.8rem, 4vw, 3rem) 0 clamp(4.5rem, 9vw, 7rem);
  width: clamp(4rem, 10vw, 7rem);
}

.privacy-block {
  border-top: 1px solid rgba(255, 255, 255, 0.14);
  display: grid;
  gap: clamp(1.7rem, 4vw, 3.5rem);
  grid-template-columns: minmax(14rem, 0.75fr) 1.5fr;
  padding: clamp(2rem, 4vw, 3.2rem) 0;
}

.privacy-block h2 {
  color: rgba(255, 255, 255, 0.55);
  font-family: myFont, Helvetica, Arial, sans-serif;
  font-size: clamp(0.82rem, 1.2vw, 1rem);
  font-weight: 600;
  line-height: 1.5;
}

.privacy-copy {
  display: flex;
  flex-direction: column;
  font-size: clamp(1rem, 1.3vw, 1.14rem);
  gap: 1.2rem;
  line-height: 1.75;
}

.privacy-copy address {
  display: flex;
  flex-direction: column;
  font-style: normal;
  gap: 0.35rem;
}

.privacy-copy address strong {
  color: #fff;
  font-weight: 600;
  margin-bottom: 0.35rem;
}

.privacy-copy a {
  color: #fff;
  overflow-wrap: anywhere;
  text-decoration: underline;
  text-decoration-color: rgba(214, 147, 147, 0.58);
  text-underline-offset: 0.18em;
}

.privacy-copy a:hover,
.privacy-copy a:focus-visible,
.privacy-footer a:hover,
.privacy-footer a:focus-visible {
  color: var(--quaternary-color);
  outline: none;
}

.privacy-updated {
  color: rgba(255, 255, 255, 0.4);
  font-size: 0.78rem;
  margin-top: 1.5rem;
}

.privacy-footer {
  align-items: center;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.35);
  display: flex;
  font-size: 0.78rem;
  justify-content: space-between;
  margin: clamp(5rem, 12vw, 9rem) auto 0;
  max-width: 1180px;
  padding-top: 1.4rem;
  width: 100%;
}

.privacy-footer nav {
  align-items: center;
  display: flex;
  gap: 0.55rem;
}

.privacy-footer a {
  color: inherit;
}

@media (min-width: 640px) and (max-width: 1024px) {
  .privacy-page {
    padding: 2rem clamp(2.5rem, 7vw, 5rem) 2.5rem;
  }

  .privacy-content {
    margin-top: clamp(5rem, 10svh, 7rem);
    max-width: 760px;
  }
}

@media (max-width: 639px) {
  .privacy-page {
    padding:
      calc(1.25rem + env(safe-area-inset-top, 0px))
      clamp(1.25rem, 6vw, 1.75rem)
      calc(1.75rem + env(safe-area-inset-bottom, 0px));
  }

  .privacy-logo img {
    width: 8.5rem;
  }

  .privacy-header {
    position: relative;
  }

  .privacy-back {
    font-size: 0.72rem;
    gap: 0.45rem;
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
  }

  .privacy-content {
    margin-top: clamp(4.5rem, 11svh, 6rem);
  }

  h1 {
    font-size: clamp(2rem, 9vw, 2.65rem);
  }

  .privacy-accent {
    margin-bottom: 3.8rem;
  }

  .privacy-block {
    gap: 1.4rem;
    grid-template-columns: 1fr;
    padding: 2rem 0 2.4rem;
  }

  .privacy-block h2 {
    max-width: 18rem;
  }

  .privacy-footer {
    align-items: flex-start;
    flex-direction: column;
    gap: 0.65rem;
    margin-top: 4.5rem;
  }
}
</style>
