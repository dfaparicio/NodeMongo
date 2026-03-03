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
        <span class="font-serif-display text-h6 text-bold tracking-widest text-white-90">NUMEROLOGIA</span>
      </div>
      <div class="flex items-center q-gutter-x-lg">
        <secondButton to="/perfil" label="Perfil" class="nav-gold-item" />
        <secondButton to="/lectura_diaria" label="Lectura Diaria" class="nav-gold-item" />
      </div>
    </nav>

    <main class="relative-position z-top container mx-auto q-px-md flex flex-center min-h-85">
      <div
        class="full-width max-w-lg-container glass-panel prismatic-border q-pa-lg lg:q-pa-xl rounded-xl overflow-hidden">
        <div class="absolute-full spotlight no-pointer-events"></div>

        <header class="text-center q-mb-xl relative-position z-top">
          <h1
            class="font-serif-display text-h3 lg:text-h2 text-bold text-gold-gradient q-mb-xs tracking-wide drop-shadow-lg">
            LECTURA PRINCIPAL
          </h1>
          <p class="text-white-50 text-uppercase tracking-widest text-caption font-medium">
            {{ converFecha(lecturaPrincipal?.fechaLectura) }}
          </p>
        </header>

        <div class="row q-col-gutter-xl items-start relative-position z-top">
          <div class=" flex justify-center items-center col-md-4 q-gutter-y-xl">
            <div class="reading-section">
              <h3 class="text-primary text-caption text-bold text-uppercase tracking-widest q-mb-md flex items-center">
                <div class="line-accent q-mr-sm"></div> DESCRIPCIÓN
              </h3>
              <p class="font-light text-body1 line-height-relaxed text-white-80">
                {{ lecturaPrincipal?.contenido?.descripcion }}
              </p>
            </div>
          </div>

          <div class="col-12 col-md-4 flex flex-center column">
            <div class="astrolabe-container relative-position">
              <div class="astrolabe-ring ring-outer animate-spin-slow"></div>
              <div class="astrolabe-ring ring-middle animate-spin-reverse-slow"></div>
              <div class="astrolabe-ring ring-inner animate-spin-slow-dashed"></div>

              <div class="absolute-center">
                <span class="font-serif-display text-num text-primary text-glow animate-pulse">{{
                  lecturaPrincipal?.contenido?.numero }}</span>
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
                MENSAJE <div class="line-accent q-ml-sm-md"></div>
              </h3>
              <p class="font-light text-body1 line-height-relaxed text-white-80">
                {{ lecturaPrincipal?.contenido?.mensaje }}
              </p>
            </div>
            <div class="reading-section column items-end-md">
              <h3
                class="text-primary text-caption text-bold text-uppercase tracking-widest q-mb-md flex items-center reverse-md">
                TALENTOS<div class="line-accent q-ml-sm-md"></div>
              </h3>
              <p class="font-light text-body2 line-height-relaxed text-white-60">
                {{ lecturaPrincipal?.contenido?.talentos }}
              </p>
            </div>
          </div>
        </div>

        <div class="flex justify-center items-center q-gutter-xl q-pt-xl">

          <div>
            <secondButton label="Generar Lectura Principal" type="submit" :loading="loading" />
          </div>
          <div>
            <secondButton label="Descargar Lectura" type="submit" :loading="loading" />
          </div>
        </div>
      </div>
    </main>
  </q-page>
</template>

<script setup>
import { useAuthStore } from "../store/auth.js";
import { storeToRefs } from "pinia";
import { ref } from "vue";

import { converFecha } from "../utils/functions.js";

import secondButton from '../components/secondButton.vue';

const authStore = useAuthStore();
const { lecturasguardadas } = storeToRefs(authStore);

const lecturaPrincipal = ref(null);

lecturaPrincipal.value = lecturasguardadas.value.find(item => item.tipo === 'principal') || null;

console.log(lecturaPrincipal.value);

</script>

<style scoped>
@import url('../styles/mainreading.css');
</style>