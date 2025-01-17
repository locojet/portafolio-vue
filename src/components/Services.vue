<template>
  <div class="container-about relative isolate overflow-hidden bg-gray-900">
    <!-- Sticky Video Background -->
    <div class="sticky-container">
      <div class="video-holder">
        <video autoplay muted playsinline loop class="background-video">
          <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
          Your browser does not support videos.
        </video>
      </div>
    </div>

    <!-- Content to Scroll Over the Video -->
    <div class="content-section">
      <div class="text-container mx-auto max-w-7xl px-6 lg:px-8">
        <div class="mx-auto mt-16 max-w-2xl lg:mx-0 lg:max-w-none">
          <h3 class="text-3xl font-semibold text-white mb-8 text-center">What I Can Do for You</h3>
          <div class="grid grid-cols-1 gap-x-8 gap-y-6 text-lg font-medium text-gray-300 sm:grid-cols-2 md:grid-cols-3 lg:gap-x-10">
            <div class="service-card text-center">
              <i class="fas fa-laptop-code text-4xl text-white mb-4 animate-bounce"></i>
              <h4 class="text-xl font-semibold text-white">Frontend Wizardry</h4>
              <p>Crafting sleek and responsive user interfaces with HTML, CSS, and JavaScript that feel like magic.</p>
            </div>
            <div class="service-card text-center">
              <i class="fas fa-server text-4xl text-white mb-4 animate-spin"></i>
              <h4 class="text-xl font-semibold text-white">Backend Mastery</h4>
              <p>Building strong, reliable server solutions with Node.js, Express, and MongoDB to keep things running smoothly.</p>
            </div>
            <div class="service-card text-center">
              <i class="fas fa-chart-line text-4xl text-white mb-4 animate-bounce"></i>
              <h4 class="text-xl font-semibold text-white">SEO Optimization</h4>
              <p>Making your website a search engine’s best friend and ensuring it gets the spotlight it deserves.</p>
            </div>
            <div class="service-card text-center">
              <i class="fas fa-video text-4xl text-white mb-4 animate-pulse"></i>
              <h4 class="text-xl font-semibold text-white">Video Storytelling</h4>
              <p>Creating captivating videos that tell your story with style, energy, and unforgettable visuals.</p>
            </div>
            <div class="service-card text-center">
              <i class="fas fa-camera text-4xl text-white mb-4 animate-bounce"></i>
              <h4 class="text-xl font-semibold text-white">Photography</h4>
              <p>Capturing stunning moments and translating them into timeless visual art for brands and individuals alike.</p>
            </div>
            <div class="service-card text-center">
              <i class="fas fa-music text-4xl text-white mb-4 animate-pulse"></i>
              <h4 class="text-xl font-semibold text-white">Music Magic</h4>
              <p>Composing and producing music that hits the right notes and perfectly complements your vision.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "StickyVideoScroll",
};
</script>

<style scoped>
/* Container adjustments */
.container-about {
  position: relative;
}

/* Sticky Video Styles */
.sticky-container {
  position: relative;
  height: 100vh;
  overflow: hidden;
}

.video-holder {
  position: sticky;
  top: 0;
  height: 100vh;
  z-index: 1; /* Video stays below the text */
}

.background-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 1;
  opacity: 0.5;
}

/* Content Section Styles */
.content-section {
  position: relative;
  z-index: 2; /* Content stays above the video */
  color: white;
  background: rgba(0, 0, 0, 0.5); /* Optional: Adds a semi-transparent background for better readability */
  margin-top: -100vh; /* Ensures content starts overlapping the video */
  padding-top: 100vh; /* Ensures proper spacing with the video */
}

.text-container {
  z-index: 3; /* Higher z-index to guarantee visibility */
  position: relative;
}

.service-card {
  background-color: rgba(0, 0, 0, 0.7); /* Optional for better contrast */
  padding: 20px;
  border-radius: 8px;
}
</style>
