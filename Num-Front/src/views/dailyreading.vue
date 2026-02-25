<template>
  <q-page class="dashboard-page overflow-hidden relative-position text-white">

    <div class="absolute-full bg-deep-space z-behind">
      <div class="absolute-full grid-pattern"></div>
      <div class="warm-glow-orb absolute-bottom-left"></div>
    </div>

    <div class="absolute-top row justify-between items-start q-pa-lg z-top w-full">

      <div class="glass-panel border-white-5 row items-center q-px-sm q-py-xs" style="border-radius: 4px;">
        <q-icon name="wb_sunny" class="text-blue-accent q-mr-sm" size="xs" />
        <div class="column justify-center">
          <span class="text-uppercase text-grey-6 text-weight-bold"
            style="font-size: 9px; letter-spacing: 1px;">HOY</span>
          <span class="text-white text-weight-medium" style="font-size: 13px; line-height: 1;">24 Octubre, 2023</span>
        </div>
      </div>

      <div class="glass-panel border-white-5 row items-center q-px-md q-py-sm q-gutter-x-lg hidden md-flex"
        style="border-radius: 4px;">
        <q-icon name="chevron_left" class="text-grey-6 cursor-pointer hover-white" size="xs" />

        <div class="row q-gutter-x-lg items-end">
          <div v-for="day in ['OCT 22', 'OCT 23']" :key="day"
            class="column items-center cursor-pointer text-grey-6 hover-white">
            <span style="font-size: 9px; font-weight: bold; letter-spacing: 1px;">{{ day }}</span>
            <div class="timeline-dot q-mt-xs bg-grey-8"></div>
          </div>

          <div class="column items-center cursor-pointer text-blue-accent relative-position">
            <span
              style="font-size: 10px; font-weight: bold; letter-spacing: 1px; transform: translateY(-2px);">HOY</span>
            <div class="timeline-dot-active bg-blue-accent relative-position">
              <div class="absolute-center bg-blue-accent glow-dot"></div>
            </div>
          </div>

          <div v-for="day in ['OCT 25', 'OCT 26']" :key="day"
            class="column items-center cursor-pointer text-grey-6 hover-white">
            <span style="font-size: 9px; font-weight: bold; letter-spacing: 1px;">{{ day }}</span>
            <div class="timeline-dot q-mt-xs bg-grey-8"></div>
          </div>
        </div>

        <q-icon name="chevron_right" class="text-grey-6 cursor-pointer hover-white" size="xs" />
      </div>
    </div>

    <div class="absolute-full flex flex-center z-content">
      <div class="row items-center justify-center q-col-gutter-xl w-full" style="max-width: 1000px;">

        <div class="col-12 col-md-6 flex flex-center column">
          <div class="relative-position flex flex-center q-mb-md">
            <div class="giant-number text-gold">5</div>
          </div>

          <div class="badge-gold q-mt-lg">NÚMERO DIARIO</div>
        </div>

        <div class="col-12 col-md-6 flex flex-center">
          <div class="info-card glass-panel border-white-5 column q-pa-xl">

            <h2 class="text-h4 text-white q-ma-none text-weight-regular" style="font-family: Arial, sans-serif;">Vientos
              de Cambio</h2>
            <div class="text-blue-accent text-uppercase text-weight-bold q-mt-sm"
              style="font-size: 10px; letter-spacing: 0.15em;">PRONÓSTICO CÓSMICO DE HOY</div>
            <div class="text-grey-7 q-my-md text-weight-bold" style="letter-spacing: 2px;">•••</div>

            <p class="text-grey-4 line-height-relaxed" style="font-size: 14px; margin-bottom: 30px;">
              Hoy trae una ola de energía dinámica. La interacción entre el universal <span
                class="text-blue-accent text-weight-bold">5</span> y tu número principal sugiere un día para decisiones
              audaces y giros inesperados. Abraza el caos de lo nuevo. La estructura puede sentirse limitante hoy;
              permite que tu intuición te guíe a través del polvo estelar de la oportunidad.
            </p>

            <div class="row border-top-light q-pt-lg">
              <div class="col-6 column q-gutter-y-xs">
                <span class="text-grey-6 text-uppercase" style="font-size: 10px; letter-spacing: 1px;">COLOR DE LA
                  SUERTE</span>
                <div class="row items-center q-gutter-x-sm">
                  <div class="color-dot bg-green"></div>
                  <span class="text-white text-weight-medium" style="font-size: 13px;">Verde Nebulosa</span>
                </div>
              </div>

              <div class="col-6 column q-gutter-y-xs">
                <span class="text-grey-6 text-uppercase" style="font-size: 10px; letter-spacing: 1px;">PALABRA DE
                  PODER</span>
                <span class="text-white text-weight-medium" style="font-size: 13px;">Liberación</span>
              </div>
            </div>

            <div class="row q-mt-lg items-end">
              <div class="col-6 column q-gutter-y-sm">
                <span class="text-grey-6 text-uppercase" style="font-size: 10px; letter-spacing: 1px;">RESONANCIA</span>
                <q-linear-progress :value="0.85" color="info" track-color="grey-9" size="3px" class="resonance-bar"
                  style="width: 80%;" />
              </div>

              <div class="col-6 flex justify-end">
                <a href="#"
                  class="text-blue-accent text-decoration-none row items-center hover-glow transition text-weight-bold"
                  style="font-size: 12px;">
                  Leer Reporte Completo <q-icon name="arrow_forward" size="xs" class="q-ml-xs" />
                </a>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>

  </q-page>
</template>

<script setup>
</script>

<style scoped>
@import url('../styles/dailyreading.css');
</style>