<template>
  <q-page class="mystical-page flex flex-center">
    <div class="cosmic-bg absolute-full"></div>
    <div class="stars absolute-full pointer-events-none"></div>

    <div class="glow-purple absolute pointer-events-none"></div>
    <div class="glow-primary absolute pointer-events-none"></div>

    <div class="container z-top q-py-xl q-px-md" style="width: 100%; max-width: 1500px;">

      <div class="text-center q-mb-xl mx-auto" style="max-width: 700px;">
        <div class="reveal-badge inline-flex items-center q-px-md q-py-xs q-mb-md">
          <q-icon name="auto_awesome" class="text-gold" size="xs" />
          <span class="text-caption text-weight-medium q-ml-sm tracking-widest text-gold">DESPIERTA TU POTENCIAL</span>
        </div>

        <h1 class="text-h3 md:text-h2 font-light text-white q-mb-md tracking-tight">
          Domina el Mapa de <br />
          <span class="text-gradient font-medium">Tu Destino</span>
        </h1>

        <p class="text-subtitle1 text-grey-5 font-light mx-auto" style="max-width: 500px;">
          Deja de caminar a ciegas. Obtén predicciones cósmicas altamente precisas y personalizadas para alinear tu
          camino con tu verdadero propósito, el amor y la abundancia.
        </p>
      </div>

      <div class="row justify-center items-stretch q-col-gutter-xl q-mt-lg">

        <div class="col-12 col-md-5" style="max-width: 500px;">
          <div class="glass-card q-pa-lg text-center relative-position hover-up full-height flex column">

            <div class="card-icon-top">
              <q-icon name="nightlight" size="32px" color="grey-4" />
            </div>

            <div class="q-mt-xl q-mb-lg">
              <h3 class="text-h4 font-light text-white q-mb-xs">El Destello</h3>
              <div class="flex flex-center items-baseline">
                <span class="text-h3 text-weight-bold text-grey-3">Gratis</span>
                <span class="text-grey-5 q-ml-xs">/ siempre</span>
              </div>
              <p class="text-caption text-grey-5 q-mt-md">Un primer vistazo a tu plano energético universal.</p>
            </div>

            <q-separator dark class="q-mb-lg opacity-20" />

            <q-list dark class="text-left q-mb-xl flex-grow-1">
              <q-item dense class="q-py-sm">
                <q-item-section avatar min-width="20px">
                  <q-icon name="check_circle_outline" color="grey-5" size="xs" />
                </q-item-section>
                <q-item-section class="text-grey-4 text-body2">Predicciones Diarias de Numerología</q-item-section>
              </q-item>

              <q-item dense class="q-py-sm">
                <q-item-section avatar min-width="20px">
                  <q-icon name="check_circle_outline" color="grey-5" size="xs" />
                </q-item-section>
                <q-item-section class="text-grey-4 text-body2">Perfil Numerológico Completo</q-item-section>
              </q-item>

              <q-item dense class="q-py-sm">
                <q-item-section avatar min-width="20px">
                  <q-icon name="check_circle_outline" color="grey-5" size="xs" />
                </q-item-section>
                <q-item-section class="text-grey-4 text-body2">Seguimiento de Fases Lunares</q-item-section>
              </q-item>

              <q-item dense class="q-py-sm opacity-40">
                <q-item-section avatar min-width="20px">
                  <q-icon name="lock" color="grey-7" size="xs" />
                </q-item-section>
                <q-item-section class="text-grey-6 text-body2">Análisis de Almas Gemelas y Pareja</q-item-section>
              </q-item>
            </q-list>

            <button class="standard-btn q-mt-auto">Comenzar Viaje Gratis</button>
          </div>
        </div>

        <div class="col-12 col-md-5" style="max-width: 600px;">
          <div
            class="glass-card-premium q-pa-xl text-center relative-position sacred-geo premium-scale hover-glow full-height flex column">

            <div class="premium-badge">MÁS POPULAR</div>

            <div class="flex justify-center q-mb-md q-mt-sm relative-position z-top">
              <div class="premium-icon-wrap flex flex-center">
                <q-icon name="public" class="text-gold animate-pulse text-glow" size="32px" />
              </div>
            </div>

            <div class="q-mb-lg relative-position z-top">
              <h3 class="text-h4 font-normal text-white q-mb-xs tracking-wide">El Cosmos</h3>
              <div class="flex flex-center items-baseline">
                <span class="text-h2 text-weight-bold text-gold text-glow">$9.99</span>
                <span class="text-gold text-weight-light q-ml-xs opacity-80">/ mes</span>
              </div>
              <p class="text-caption text-gold opacity-80 q-mt-md">Acceso total a las respuestas más profundas de tu
                vida.</p>
            </div>

            <q-separator class="q-mb-lg opacity-40 z-top relative-position"
              style="background: rgba(244, 175, 37, 0.4);" />

            <q-list dark class="text-left q-mb-xl flex-grow-1 z-top relative-position">
              <q-item dense class="q-py-sm">
                <q-item-section avatar min-width="20px">
                  <q-icon name="verified" class="text-gold" size="xs" />
                </q-item-section>
                <q-item-section class="text-white text-body2">Todo lo incluido en El Destello, más:</q-item-section>
              </q-item>

              <q-item dense class="q-py-sm">
                <q-item-section avatar min-width="20px">
                  <q-icon name="verified" class="text-gold" size="xs" />
                </q-item-section>
                <q-item-section class="text-white text-body2">Análisis Profundo de Compatibilidad
                  Kármica</q-item-section>
              </q-item>

              <q-item dense class="q-py-sm">
                <q-item-section avatar min-width="20px">
                  <q-icon name="verified" class="text-gold" size="xs" />
                </q-item-section>
                <q-item-section class="text-white text-body2">Predicciones de tu Futuro Mes a Mes</q-item-section>
              </q-item>

              <q-item dense class="q-py-sm">
                <q-item-section avatar min-width="20px">
                  <q-icon name="verified" class="text-gold" size="xs" />
                </q-item-section>
                <q-item-section class="text-white text-body2">Perfiles Ilimitados (Amigos y Familiares)</q-item-section>
              </q-item>

              <q-item dense class="q-py-sm">
                <q-item-section avatar min-width="20px">
                  <q-icon name="verified" class="text-gold" size="xs" />
                </q-item-section>
                <q-item-section class="text-white text-body2">Rituales y Mantras Diarios Personalizados</q-item-section>
              </q-item>
            </q-list>

            <button class="destiny-btn q-mt-auto" @click="seleccionarPlan(9.99, 'El Cosmos')">Desbloquear Mi Destino Ahora</button>
          </div>
        </div>

      </div>

      <div class="flex justify-center items-center q-mt-xl text-grey-7 q-gutter-md text-caption">
        <div class="flex items-center"><q-icon name="lock" class="q-mr-xs" /> Pago Seguro y Encriptado</div>
        <div class="dot-separator"></div>
        <div class="flex items-center"><q-icon name="history" class="q-mr-xs" /> Cancela cuando quieras, sin preguntas
        </div>
      </div>

    </div>
  </q-page>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const seleccionarPlan = (monto, titulo) => {
  // Guardamos el plan seleccionado temporalmente (podrías usar store o query params)
  router.push({ 
    path: '/pagos', 
    query: { monto, titulo } 
  });
};
</script>

<style scoped>
@import url('../styles/plans.css');
</style>