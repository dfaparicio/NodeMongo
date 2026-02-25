<template>
  <q-page class="celestial-archive font-display text-white">
    <div class="fixed-full z-behind">
      <div class="absolute-full bg-nebula-main"></div>
      <q-img src="https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&q=80"
        class="absolute-full opacity-20 mix-blend-screen" />
      <div class="flare flare-gold absolute-top-right"></div>
      <div class="flare flare-purple absolute-bottom-left"></div>
    </div>

    <nav class="fixed-top z-top row justify-between items-center q-px-xl q-py-lg bg-void-gradient">
      <div class="row items-center q-gutter-x-sm">
        <q-icon name="all_inclusive" color="primary" size="32px" />
        <span class="text-h6 font-light tracking-widest text-uppercase">Numera</span>
      </div>
      <div class="row items-center q-gutter-x-xl">
        <div class="gt-sm row q-gutter-x-lg text-white-70">
          <q-btn flat no-caps label="Readings" class="text-caption hover-primary" />
          <q-btn flat no-caps label="Charts" class="text-caption hover-primary" />
          <q-btn flat no-caps label="Profile" class="text-caption hover-primary" />
        </div>
        <div class="avatar-wrapper q-pa-xs">
          <q-avatar size="32px">
            <img src="https://cdn.quasar.dev/img/avatar.png">
          </q-avatar>
        </div>
      </div>
    </nav>

    <main class="relative-position z-top container mx-auto q-px-md pt-32 pb-xl max-width-xl">

      <section class="q-mb-xl relative-position group perspective-1000">
        <div class="aura-blur absolute-full"></div>
        <q-card flat class="glass-card-hero q-pa-lg md:q-pa-xl overflow-hidden shadow-24">
          <div class="luxury-border absolute-full no-pointer-events"></div>

          <div class="row items-center q-col-gutter-xl relative-position z-top">
            <div class="col-12 col-md-6 flex flex-center relative-position h-visual">
              <div class="ring ring-1"></div>
              <div class="ring ring-2"></div>
              <div class="ring ring-3"></div>
              <h1 class="text-holographic floating-orb q-ma-none select-none">7</h1>
              <div class="absolute-bottom text-caption tracking-widest text-primary-80 text-uppercase q-mb-md">Life Path
              </div>
            </div>

            <div class="col-12 col-md-6 text-center text-md-left q-gutter-y-md">
              <div class="vibrational-tag q-px-md q-py-xs inline-block">YOUR CORE FREQUENCY</div>
              <h2 class="text-h3 md:text-h2 font-light text-white q-ma-none">Soul Blueprint</h2>
              <p class="text-h6 text-primary-80 font-light italic q-ma-none">" The Seeker of Truth "</p>
              <p class="text-white-60 font-light line-height-relaxed">
                Your blueprint resonates with deep introspection and spiritual discovery. This cycle highlights a
                profound connection to the metaphysical realm.
              </p>
              <q-btn unelevated class="shimmer-btn q-px-xl q-py-md q-mt-md group" rounded>
                <div class="row items-center no-wrap q-gutter-x-md">
                  <span class="text-bold tracking-wide">VIEW FULL ANALYSIS</span>
                  <q-icon name="arrow_forward" size="xs" class="group-hover-right" />
                </div>
              </q-btn>
            </div>
          </div>
        </q-card>
      </section>

      <section class="q-pl-md md:q-pl-none q-mt-xl">
        <div class="timeline-header row justify-between items-end q-mb-xl border-bottom-white-10 q-pb-md">
          <div class="md-ml-20">
            <h3 class="text-h5 font-light text-white tracking-wide q-ma-none">Celestial Timeline</h3>
            <p class="text-caption text-white-40 q-ma-none">Archive of your daily energetic shifts</p>
          </div>
          <div class="gt-xs row q-gutter-x-md">
            <q-btn flat round icon="filter_list" color="primary-60" size="sm" />
            <q-btn flat round icon="calendar_today" color="primary-60" size="sm" />
          </div>
        </div>

        <div class="timeline-container relative-position">
          <div class="glowing-thread"></div>

          <div class="q-gutter-y-xl">
            <div class="row no-wrap q-col-gutter-xl timeline-entry active-entry">
              <div class="gt-sm col-3 text-right q-pr-xl relative-position">
                <div class="dot dot-main absolute"></div>
                <div class="text-h4 font-light text-primary">Today</div>
                <div class="text-caption text-white-50 tracking-widest text-uppercase">Oct 24</div>
              </div>
              <div class="col-12 col-md-9 relative-position">
                <div class="lt-md dot dot-mobile absolute"></div>
                <q-card flat class="glass-timeline-card active-card q-pa-lg group">
                  <div class="row justify-between items-start q-mb-md">
                    <div class="row items-center q-gutter-x-md">
                      <q-avatar size="40px" class="bg-primary-10 border-primary-20 text-primary">
                        <q-icon name="auto_fix_high" size="xs" />
                      </q-avatar>
                      <div>
                        <h4 class="text-h6 text-white group-hover-primary q-ma-none">Transformation</h4>
                        <p class="text-7 text-primary-70 text-uppercase tracking-wider q-ma-none">Mars entering Scorpio
                        </p>
                      </div>
                    </div>
                    <span class="text-h3 font-thin text-white-20 line-height-none">08</span>
                  </div>
                  <p class="text-white-80 font-light border-left-primary q-pl-md q-mb-md">
                    Today's energy demands shedding old skins. The alignment suggests a powerful moment for personal
                    reinvention.
                  </p>
                  <div class="row q-gutter-x-sm">
                    <q-badge outline label="POWER" class="tag-badge" />
                    <q-badge outline label="REBIRTH" class="tag-badge" />
                  </div>
                </q-card>
              </div>
            </div>

            <div class="row no-wrap q-col-gutter-xl timeline-entry secondary-entry">
              <div class="gt-sm col-3 text-right q-pr-xl relative-position">
                <div class="dot dot-secondary absolute"></div>
                <div class="text-h5 font-light text-white-80">Yesterday</div>
                <div class="text-caption text-white-40 tracking-widest text-uppercase">Oct 23</div>
              </div>
              <div class="col-12 col-md-9 relative-position">
                <div class="lt-md dot dot-mobile-dim absolute"></div>
                <q-card flat class="glass-timeline-card q-pa-lg group">
                  <div class="row justify-between items-start q-mb-md">
                    <div class="row items-center q-gutter-x-md">
                      <q-avatar size="40px" class="bg-white-5 border-white-10 text-white-70">
                        <q-icon name="visibility" size="xs" />
                      </q-avatar>
                      <div>
                        <h4 class="text-h6 text-white-90 q-ma-none">Reflection</h4>
                        <p class="text-7 text-white-40 text-uppercase tracking-wider q-ma-none">Moon void of course</p>
                      </div>
                    </div>
                    <span class="text-h3 font-thin text-white-10 line-height-none">07</span>
                  </div>
                  <p class="text-white-60 font-light border-left-white-10 q-pl-md">
                    Still waters ran deep yesterday. It was a time for pausing and reconsidering your next strategic
                    move.
                  </p>
                </q-card>
              </div>
            </div>
          </div>
        </div>

        <div class="text-center q-mt-xl">
          <q-btn flat no-caps label="Load Archaic Records" class="load-records-btn" />
        </div>
      </section>
    </main>
  </q-page>
</template>

<script setup>
</script>

<style scoped>
@import url('../styles/readinghistory.css');
</style>