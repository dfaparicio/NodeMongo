<template>
  <q-page class="cosmic-bg font-display min-h-screen row text-white overflow-hidden">
    <div class="fixed-full z-behind opacity-20 pointer-events-none">
      <img
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDURC83wQPs436yjmwbq85kbDNxgA5yFl3ZccQmAnhmP1L1d7Cdy3QDi7PYKn3e9t5sczTCQMUSi6-Lo3IKEt-Tka66pve3m3VoE7oPoo2F2cF1pA0gCAuF8263SJwHkP6nIqlJRV8TRQ0V0I2awEHdf7rZBTMTRivLL-zyR80jG5DUdosAFnIwfN5aZubQqF26PbAY64tRdve7DRaRKfIfICvs1PQIRGm9sBwqRomUIsFKGeDbfnfARX9B9xlCraeE8VgDRcRbvKEV"
        class="fit object-cover" />
    </div>

    <div class="col-12 col-md-4 relative-position flex flex-center column q-pa-xl z-top border-right-cosmic">
      <div class="absolute nebula-glow nebula-1"></div>
      <div class="absolute nebula-glow nebula-2"></div>

      <div class="relative-position flex flex-center column z-top">
        <div class="avatar-wrapper q-mb-lg relative-position">
          <div class="absolute-full animate-pulse flex flex-center">
            <svg class="w-full h-full svg-primary-opacity" viewBox="0 0 200 200">
              <circle cx="100" cy="100" fill="none" r="90" stroke="currentColor" stroke-width="0.5"></circle>
              <polygon fill="none" points="100,10 190,160 10,160" stroke="currentColor" stroke-width="0.5"></polygon>
              <polygon fill="none" points="100,190 190,40 10,40" stroke="currentColor" stroke-width="0.5"></polygon>
            </svg>
          </div>

          <div class="avatar-aura rounded-circle flex flex-end justify-center overflow-hidden relative-position z-top">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCEmVepiBUNq978to_P4cY7_mBbmhakdJZSTiVWRvA160TfATdNsYgBA4KGPV_pYTVbjAP4VZzhOb964bf5CTNXwfsuoGV_qiSJDo4lvQ5tKMtfaB6M2vxQsVMm44_RvupSEAeYwvGp8aiuoDitkcDndIrKl3tU8NVG1FVAXgFod0DeLXPAih9Ckb1VbEyj14q8TdvMZtqEy-Jw7ecXXyYaU8GX2m99mEf74mATrMqcDlVTsdGYMQ77k57Hg5lRNnAnugTF7xfsGBX9"
              class="fit object-cover mix-blend-luminosity opacity-80" />
          </div>

          <div class="pulse-indicator absolute"></div>
        </div>

        <h1 class="text-h4 text-weight-bolder text-gradient-title text-center q-mb-xs tracking-tighter">
          CASSANDRA LUNARIS
        </h1>
        <p class="text-subtitle-cosmic q-mb-xl">The Star Weaver</p>

        <div class="badge-frecuencia flex items-center q-gutter-x-sm">
          <q-icon name="auto_awesome" color="primary" size="xs" />
          <span>Frecuencia Vibracional Alta</span>
        </div>
      </div>
    </div>

    <div class="col-12 col-md-8 relative-position q-pa-xl z-top scroll-y">
      <div class="glass-panel rounded-xl q-pa-lg q-mb-xl">
        <div class="flex justify-center items-center q-gutter-x-xl">
          <secondButton to="/lectura_principal" label="Lectura Principal" class="nav-gold-item" />
          <secondButton to="/lectura_diaria" label="Lectura Diaria" class="nav-gold-item" />
          <secondButton to="/planes" label="Planes" class="nav-gold-item" />
        </div>
      </div>

      <div class="glass-panel rounded-xl q-pa-lg q-mb-xl flex items-center justify-between">
        <div>
          <h2 class="text-h5 text-weight-bold q-mt-none q-mb-sm">
            Perfil Cósmico
          </h2>
          <div class="flex q-gutter-x-xl">
            <span class="flex items-center"><q-icon name="email" class="q-mr-xs" /> c.lunaris@galaxy.io</span>
            <span class="flex items-center"><q-icon name="cake" class="q-mr-xs" /> 28 Años</span>
            <span class="flex items-center"><q-icon name="event" class="q-mr-xs" /> 14 Nov 1995</span>
          </div>
        </div>

        <div class="badge-status text-center">
          <span class="text-status-title">Estado del Alma</span>
          <span class="text-h6 text-weight-bold flex items-center">
            ACTIVO <span class="dot-active q-ml-sm"></span>
          </span>
        </div>
      </div>

      <div class="row q-col-gutter-lg q-mb-xl">
        <div class="col-12 col-md-6">
          <div class="glass-panel rounded-xl q-pa-md flex items-center justify-between">
            <div class="flex items-center">
              <div class="icon-box bg-emerald-box q-mr-md">
                <q-icon name="account_balance_wallet" class="text-emerald" size="sm" />
              </div>
              <div>
                <span class="text-card-subtitle">Estado Financiero</span>
                <span class="block text-subtitle1 text-weight-bold">Al Día</span>
              </div>
            </div>
            <q-icon name="check_circle" class="text-emerald" size="lg" />
          </div>
        </div>

        <div class="col-12 col-md-6">
          <div class="glass-panel rounded-xl q-pa-md flex items-center justify-between">
            <div class="flex items-center">
              <div class="icon-box bg-primary-box q-mr-md">
                <q-icon name="menu_book" color="primary" size="sm" />
              </div>
              <div>
                <span class="text-card-subtitle">Lectura de Hoy</span>
                <span class="block text-subtitle1 text-weight-bold">Completada</span>
              </div>
            </div>
            <q-icon name="verified" color="primary" size="lg" />
          </div>
        </div>
      </div>

      <div class="q-col-gutter-lg q-mb-xl">
        <div class="col-12 col-md-6">
          <div class="glass-panel rounded-xl q-pa-lg relative-position group h-full flex column justify-between">
            <q-icon name="history_edu" class="absolute-top-right q-pa-md text-slate-600" size="sm" />

            <div>
              <h3 class="text-card-title q-mt-none q-mb-md">
                Última Lectura Principal
              </h3>
              <p class="text-slate-300 text-italic font-light" style="line-height: 1.6">
                "Las estrellas se alinean en el sector de la abundancia. Tu
                número maestro 11 vibra con la energía de Plutón, sugiriendo un
                renacimiento financiero inminente..."
              </p>
            </div>

            <button
              class="btn-transparent text-primary text-weight-bold text-caption flex items-center q-mt-md custom-transition">
              VER TRANSCRIPCIÓN COMPLETA
              <q-icon name="arrow_forward" size="xs" class="q-ml-sm icon-slide" />
            </button>
          </div>
        </div>
      </div>

      <div class="glass-panel rounded-xl overflow-hidden">
        <div class="flex border-bottom-primary">
          <button class="tab-btn active">Historial de Lecturas</button>
          <button class="tab-btn inactive">Historial de Pagos</button>
        </div>

        <div class="overflow-auto">
          <table class="full-width cosmic-table text-left" style="border-collapse: collapse">
            <thead>
              <tr>
                <th>Fecha de Portal</th>
                <th>Tipo de Lectura</th>
                <th>Oráculo Asignado</th>
                <th>Estado</th>
                <th class="text-right">Acción</th>
              </tr>
            </thead>
            <tbody>
              <tr class="table-row-hover">
                <td class="text-slate-300">01 Sep, 2023</td>
                <td class="text-weight-medium">Carta Astral Anual</td>
                <td class="text-slate-400 text-italic">Mastro Zephyr</td>
                <td><span class="badge-table-emerald">Archivada</span></td>
                <td class="text-right">
                  <q-icon name="download" class="cursor-pointer hover-white text-primary" size="sm" />
                </td>
              </tr>
              <tr class="table-row-hover">
                <td class="text-slate-300">24 Ago, 2023</td>
                <td class="text-weight-medium">Tránsito de Mercurio</td>
                <td class="text-slate-400 text-italic">Dra. Selene</td>
                <td><span class="badge-table-emerald">Archivada</span></td>
                <td class="text-right">
                  <q-icon name="download" class="cursor-pointer hover-white text-primary" size="sm" />
                </td>
              </tr>
              <tr class="table-row-hover">
                <td class="text-slate-300">12 Ago, 2023</td>
                <td class="text-weight-medium">Sinastría de Almas</td>
                <td class="text-slate-400 text-italic">Oráculo Nox</td>
                <td><span class="badge-table-primary">Pendiente</span></td>
                <td class="text-right">
                  <q-icon name="play_circle" class="cursor-pointer hover-white text-primary" size="sm" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import secondButton from "../components/secondButton.vue";
</script>

<style scoped>
@import url("../styles/dashboard.css");
</style>
