<template>
    <div class="container-about relative isolate overflow-hidden bg-gray-900">
      <!-- Video Background -->
      <VideoBackground />
  
      <!-- Centered Text -->
      <CenteredText />
  
      <!-- Content Below the Video -->
      <div class="bg-gray-900 pt-24 pb-16 sm:pt-32 sm:pb-24">
        <!-- Main Content -->
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
  
  </script>
  
  <style scoped>
  .container-about {
    top: -7.5rem;
  }
  </style>
  