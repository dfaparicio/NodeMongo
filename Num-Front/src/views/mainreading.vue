<template>
  <q-page class="soul-reading-page font-display text-white">
    <div class="fixed-full z-behind">
      <img src="https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?auto=format&fit=crop&q=80"
        class="bg-image opacity-60 full-width full-height object-cover" />
      <div class="absolute-full geometry-bg"></div>
      <div class="absolute-full ambient-vignette"></div>
    </div>

    <nav class="relative-position z-top full-width q-px-xl q-py-lg flex justify-between items-center">
      <div class="flex items-center gap-sm">
        <q-icon name="auto_awesome" color="primary" size="32px" />
        <span class="font-serif-display text-h6 text-bold tracking-widest text-white-90">NUMERIS</span>
      </div>
      <div class="flex items-center q-gutter-x-lg">
        <q-btn flat no-caps label="Dashboard" class="text-caption tracking-wider opacity-70 hover-primary" />
        <q-btn flat no-caps label="Readings" class="text-caption tracking-wider opacity-70 hover-primary" />
        <q-avatar size="40px" class="avatar-border">
          <img src="https://cdn.quasar.dev/img/avatar2.jpg">
        </q-avatar>
      </div>
    </nav>

    <main class="relative-position z-top container mx-auto q-px-md flex flex-center min-h-85">
      <div
        class="full-width max-w-lg-container glass-panel prismatic-border q-pa-lg lg:q-pa-xl rounded-xl overflow-hidden">
        <div class="absolute-full spotlight no-pointer-events"></div>

        <header class="text-center q-mb-xl relative-position z-top">
          <h1
            class="font-serif-display text-h3 lg:text-h2 text-bold text-gold-gradient q-mb-xs tracking-wide drop-shadow-lg">
            Your Cosmic Blueprint
          </h1>
          <p class="text-white-50 text-uppercase tracking-widest text-caption font-medium">
            Principal Soul Reading • Oct 24, 2023
          </p>
        </header>

        <div class="row q-col-gutter-xl items-start relative-position z-top">
          <div class="col-12 col-md-4 q-gutter-y-xl">
            <div class="reading-section">
              <h3 class="text-primary text-caption text-bold text-uppercase tracking-widest q-mb-md flex items-center">
                <div class="line-accent q-mr-sm"></div> Core Essence
              </h3>
              <p class="font-light text-body1 line-height-relaxed text-white-80">
                At your core, you are a seeker of truth. The vibration of the 7 resonates with deep introspection and a
                hunger for knowledge.
              </p>
            </div>
            <div class="reading-section">
              <h3 class="text-primary text-caption text-bold text-uppercase tracking-widest q-mb-md flex items-center">
                <div class="line-accent q-mr-sm"></div> Soul Urge
              </h3>
              <p class="font-light text-body2 line-height-relaxed text-white-60">
                Your inner desire is for solitude and contemplation. You find your power in the quiet moments between
                thoughts.
              </p>
            </div>
          </div>

          <div class="col-12 col-md-4 flex flex-center column">
            <div class="astrolabe-container relative-position">
              <div class="astrolabe-ring ring-outer animate-spin-slow"></div>
              <div class="astrolabe-ring ring-middle animate-spin-reverse-slow"></div>
              <div class="astrolabe-ring ring-inner animate-spin-slow-dashed"></div>

              <div class="absolute-center">
                <span class="font-serif-display text-num text-primary text-glow animate-pulse">7</span>
              </div>
            </div>
            <div class="q-mt-xl">
              <div class="mystic-badge q-px-md q-py-xs rounded-full text-bold text-caption tracking-widest">
                THE MYSTIC
              </div>
            </div>
          </div>

          <div class="col-12 col-md-4 q-gutter-y-xl text-right-md">
            <div class="reading-section column items-end-md">
              <h3
                class="text-primary text-caption text-bold text-uppercase tracking-widest q-mb-md flex items-center reverse-md">
                Life Purpose <div class="line-accent q-ml-sm-md"></div>
              </h3>
              <p class="font-light text-body1 line-height-relaxed text-white-80">
                Your destiny is one of analysis and spiritual teaching. You are here to bridge the gap between science
                and spirituality.
              </p>
            </div>
            <div class="reading-section column items-end-md">
              <h3
                class="text-primary text-caption text-bold text-uppercase tracking-widest q-mb-md flex items-center reverse-md">
                Karmic Lesson <div class="line-accent q-ml-sm-md"></div>
              </h3>
              <p class="font-light text-body2 line-height-relaxed text-white-60">
                Learn to trust your intuition without needing empirical proof. Vulnerability is the gateway to
                connection.
              </p>
            </div>
          </div>
        </div>

        <div class="q-mt-xl q-pt-lg border-top-white-10 row justify-between items-center q-gutter-y-md">
          <q-btn flat no-caps color="white" class="opacity-60 hover-100 group">
            <q-avatar size="32px" color="white-5" class="q-mr-sm group-hover-primary">
              <q-icon name="share" size="14px" />
            </q-avatar>
            <span class="text-caption tracking-wider">Share Wisdom</span>
          </q-btn>

          <q-btn unelevated color="primary" text-color="dark" class="download-btn q-px-xl q-py-sm" rounded>
            <q-icon name="file_download" class="q-mr-sm" />
            <span class="text-bold">Download Certificate</span>
          </q-btn>

          <q-btn flat no-caps color="white" class="opacity-60 hover-100 group">
            <span class="text-caption tracking-wider q-mr-sm">Daily Transit</span>
            <q-avatar size="32px" color="white-5" class="group-hover-primary">
              <q-icon name="explore" size="14px" />
            </q-avatar>
          </q-btn>
        </div>
      </div>
    </main>
  </q-page>
</template>

<script setup>
</script>

<style scoped>
@import url('../styles/mainreading.css');
</style>