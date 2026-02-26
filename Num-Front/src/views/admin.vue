<template>
  <q-layout view="lHh Lpr lFf" class="dashboard-layout">
    <!-- LEFT SIDEBAR -->
    <q-drawer
      show-if-above
      :width="260"
      class="bg-sidebar no-border"
    >
      <div class="column full-height">
        <!-- Logo Area -->
        <div class="q-pa-xl column items-center">
          <div class="row items-center no-wrap">
            <div class="logo-container q-mr-sm">
              <q-icon name="all_inclusive" size="20px" />
            </div>
            <div class="logo-text">NUM<span>OS</span></div>
          </div>
        </div>

        <!-- Navigation -->
        <div class="q-px-md flex-grow-1">
          <q-list class="q-gutter-y-sm">

            <q-item clickable v-ripple class="nav-item">
              <q-item-section avatar>
                <q-icon name="group" size="24px" class="nav-icon" />
              </q-item-section>
              <q-item-section class="nav-label">Buscadores</q-item-section>
            </q-item>

            <q-item clickable v-ripple class="nav-item">
              <q-item-section avatar>
                <q-icon name="auto_awesome" size="24px" class="nav-icon" />
              </q-item-section>
              <q-item-section class="nav-label">Lecturas</q-item-section>
            </q-item>

            <q-item clickable v-ripple class="nav-item">
              <q-item-section avatar>
                <q-icon name="settings" size="24px" class="nav-icon" />
              </q-item-section>
              <q-item-section class="nav-label">Matriz</q-item-section>
            </q-item>
          </q-list>
        </div>

        <!-- User Profile -->
        <div class="q-pa-md">
          <div class="profile-card">
            <q-item class="q-pa-sm">
              <q-item-section avatar>
                <div class="avatar-container">
                  <q-icon name="person_outline" size="24px" />
                  <div class="status-indicator"></div>
                </div>
              </q-item-section>
              <q-item-section>
                <q-item-label class="profile-name">El arquitecto</q-item-label>
                <q-item-label caption class="profile-role">Administrador del Sistema</q-item-label>
              </q-item-section>
            </q-item>
          </div>
        </div>
      </div>
    </q-drawer>

    <!-- PAGE CONTENT -->
    <q-page-container>
      <q-page class="q-px-xl q-py-lg page-bg">
        <!-- HEADER -->
        <header class="row items-center justify-between q-mb-xl">
          <div>
            <h1 class="page-title text-uppercase no-margin">La visión del arquitecto</h1>
            <p class="page-subtitle text-uppercase q-mt-xs q-mb-none font-weight-bold">Financial Pulse • System V9.2</p>
          </div>
          <div class="row items-center q-gutter-x-lg">
            <span class="header-deco-letter text-grey-8">N</span>
            <div class="header-deco-circle"></div>
            <q-btn unelevated class="export-btn no-caps q-px-lg" label="Datos de exportación" />
          </div>
        </header>

        <!-- KPI GRID -->
        <div class="row q-col-gutter-lg q-mb-xl">
          <!-- KPI 1: Flujo Cósmico -->
          <div class="col-12 col-md-4">
            <div class="glass-card kpi-card orange-accent relative-position overflow-hidden">
              <div class="card-gradient"></div>
              <div class="row justify-between items-start q-mb-lg">
                <div class="column">
                  <span class="kpi-tag-sm op-60">Mando</span>
                  <span class="kpi-label-top text-uppercase">Flujo Cósmico Total</span>
                </div>
                <div class="kpi-icon-container orange-glow">
                  <q-icon name="monetization_on" size="20px" />
                </div>
              </div>
              <div class="kpi-value">12.450,00 $</div>
              <div class="q-mt-lg">
                <div class="custom-progress-bg">
                  <div class="custom-progress-bar orange-bg" style="width: 65%"></div>
                </div>
              </div>
            </div>
          </div>

          <!-- KPI 2: Llegada Actual -->
          <div class="col-12 col-md-4">
            <div class="glass-card kpi-card relative-position overflow-hidden">
              <div class="row justify-between items-start q-mb-lg">
                <span class="kpi-label-top text-uppercase">La llegada actual</span>
                <span class="deco-font-c text-grey-7">C</span>
              </div>
              <div class="row items-end q-gutter-x-md">
                <div class="kpi-value">850.00</div>
                <div class="growth-badge row items-center no-wrap">
                  <q-icon name="north" size="14px" class="q-mr-xs" />
                  <span>12%</span>
                </div>
              </div>
              <p class="kpi-comparison q-mt-sm op-40">vs ayer (760.00 $)</p>
            </div>
          </div>

          <!-- KPI 3: Energía Neta -->
          <div class="col-12 col-md-4">
            <div class="glass-card kpi-card cyan-accent relative-position overflow-hidden">
              <div class="card-gradient-cyan"></div>
              <div class="row justify-between items-start q-mb-lg">
                <span class="kpi-label-top text-uppercase">Energía Neta</span>
                <div class="kpi-icon-container cyan-glow">
                  <q-icon name="bolt" size="20px" />
                </div>
              </div>
              <div class="kpi-value text-cyan">85%</div>
              <div class="q-mt-lg row q-gutter-x-sm">
                <div class="segment flex-1 cyan-bg shadow-cyan"></div>
                <div class="segment flex-1 cyan-bg shadow-cyan"></div>
                <div class="segment flex-1 cyan-bg shadow-cyan"></div>
                <div class="segment flex-1 active-dim"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- BOTTOM TABLE SECTION -->
        <div class="glass-card table-section q-pa-xl">
          <div class="row justify-between items-center">
            <h3 class="table-title text-uppercase no-margin">Transmisión de transacciones en vivo</h3>
            <div class="search-box">
              <q-input
                dark
                dense
                borderless
                placeholder="Identificación de búsqueda o..."
                class="search-input"
              >
                <template v-slot:append>
                  <q-icon name="font_download" color="grey-6" size="20px" class="op-60" />
                </template>
              </q-input>
            </div>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { useQuasar } from 'quasar';
import { onMounted } from 'vue';

const $q = useQuasar();

onMounted(() => {
  // Force dark mode
  $q.dark.set(true);
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&family=Playfair+Display:wght@400;700&display=swap');

/* GLOBAL THEME OVERRIDES */
.dashboard-layout {
  font-family: 'Manrope', sans-serif;
  background-color: #0d0f12 !important;
  color: #ffffff;
}

:deep(.q-drawer) {
  background-color: #0b0c0e !important;
}

.page-bg {
  background-color: #0d0f12 !important;
  min-height: 100vh;
}

.op-60 { opacity: 0.6; }
.op-40 { opacity: 0.4; }
.z-top { z-index: 10; }
.flex-1 { flex: 1; }

.bg-sidebar {
  background-color: #0b0c0e !important;
  border-right: 1px solid rgba(255, 255, 255, 0.03) !important;
}

/* LOGO */
.logo-container {
  width: 32px;
  height: 32px;
  background: #f2a900;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #000;
  box-shadow: 0 0 15px rgba(242, 169, 0, 0.4);
}

.logo-text {
  font-size: 22px;
  font-weight: 800;
  letter-spacing: 2px;
  color: #ffffff;
}

.logo-text span {
  color: #f2a900;
}

/* NAVIGATION */
.nav-item {
  border-radius: 12px;
  margin-bottom: 4px;
  color: rgba(255, 255, 255, 0.5);
  transition: all 0.3s ease;
  min-height: 52px;
}

.nav-item:hover {
  background: rgba(255, 255, 255, 0.05);
  color: #ffffff;
}

.active-nav {
  background: rgba(242, 169, 0, 0.04) !important;
  color: #ffffff !important;
  border: 1px solid rgba(242, 169, 0, 0.1);
}

.nav-initial {
  font-family: 'Playfair Display', serif;
  font-size: 20px;
  font-weight: 400;
}

.nav-initial-active {
  font-family: 'Playfair Display', serif;
  font-size: 20px;
  font-weight: 700;
  color: #f2a900;
  text-shadow: 0 0 10px rgba(242, 169, 0, 0.3);
}

.nav-label {
  font-weight: 600;
  font-size: 15px;
}

.active-indicator {
  position: absolute;
  left: 0;
  top: 15%;
  height: 70%;
  width: 3px;
  background: #f2a900;
  border-radius: 0 4px 4px 0;
  box-shadow: 0 0 10px rgba(242, 169, 0, 0.8);
}

/* PROFILE CARD */
.profile-card {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  margin-top: 20px;
}

.avatar-container {
  width: 44px;
  height: 44px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.status-indicator {
  position: absolute;
  bottom: 2px;
  right: 2px;
  width: 10px;
  height: 10px;
  background: #4caf50;
  border: 2px solid #0b0c0e;
  border-radius: 50%;
}

.profile-name {
  font-weight: 700;
  font-size: 14px;
  color: #ffffff;
}

.profile-role {
  font-size: 11px;
  color: #f2a900;
  opacity: 0.8;
}

/* HEADER */
.page-title {
  font-size: 32px;
  font-weight: 800;
  letter-spacing: 1px;
  color: #ffffff;
}

.page-subtitle {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.4);
  letter-spacing: 2px;
}

.header-deco-letter {
  font-family: 'Playfair Display', serif;
  font-size: 26px;
  font-weight: 400;
}

.header-deco-circle {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.export-btn {
  background: #f2a90015;
  color: #f2a900;
  border: 1px solid rgba(242, 169, 0, 0.4);
  border-radius: 20px;
  font-weight: 700;
  font-size: 13px;
  height: 40px;
  transition: all 0.3s ease;
}

.export-btn:hover {
  background: #f2a90025;
  box-shadow: 0 0 15px rgba(242, 169, 0, 0.2);
}

/* KPI CARDS */
.glass-card {
  background: rgba(18, 20, 24, 0.6) !important;
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.04) !important;
  border-radius: 24px;
  transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.glass-card:hover {
  transform: translateY(-5px);
  border-color: rgba(255, 255, 255, 0.1) !important;
}

.kpi-card {
  padding: 32px;
  min-height: 200px;
}

.card-gradient {
  position: absolute;
  top: -20%;
  right: -20%;
  width: 150%;
  height: 150%;
  background: radial-gradient(circle at center, rgba(242, 169, 0, 0.05) 0%, transparent 60%);
  pointer-events: none;
}

.card-gradient-cyan {
  position: absolute;
  top: -20%;
  right: -20%;
  width: 150%;
  height: 150%;
  background: radial-gradient(circle at center, rgba(0, 229, 255, 0.05) 0%, transparent 60%);
  pointer-events: none;
}

.kpi-tag-sm {
  font-size: 12px;
  font-weight: 600;
  color: #f2a900;
}

.kpi-label-top {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 1.5px;
  color: rgba(255, 255, 255, 0.4);
}

.kpi-icon-container {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.2);
}

.orange-glow {
  color: #f2a900;
  border: 1px solid rgba(242, 169, 0, 0.2);
  box-shadow: 0 0 15px rgba(242, 169, 0, 0.15);
}

.cyan-glow {
  color: #00e5ff;
  border: 1px solid rgba(0, 229, 255, 0.2);
  box-shadow: 0 0 15px rgba(0, 229, 255, 0.15);
}

.kpi-value {
  font-size: 36px;
  font-weight: 800;
  line-height: 1;
  color: #ffffff;
}

.text-cyan { color: #00e5ff; }

/* PROGRESS CUSTOM */
.custom-progress-bg {
  height: 6px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 4px;
}

.custom-progress-bar {
  height: 100%;
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(242, 169, 0, 0.5);
}

.orange-bg { background: #f2a900; }
.cyan-bg { background: #00e5ff; }

.growth-badge {
  background: rgba(76, 175, 80, 0.2);
  color: #4caf50;
  border: 1px solid rgba(76, 175, 80, 0.3);
  padding: 4px 10px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 700;
}

.deco-font-c {
  font-family: 'Playfair Display', serif;
  font-size: 24px;
}

.segment {
  height: 6px;
  border-radius: 4px;
}

.shadow-cyan { box-shadow: 0 0 10px rgba(0, 229, 255, 0.4); }
.active-dim { background: rgba(255, 255, 255, 0.1); }

/* CHART SECTION */
.chart-container {
  min-height: 420px;
}

.chart-title {
  font-size: 20px;
  font-weight: 800;
  letter-spacing: 1px;
  color: #ffffff;
}

.chart-subtitle {
  font-size: 14px;
}

.time-switches {
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 30px;
  padding: 6px;
}

.switch {
  padding: 6px 18px;
  font-size: 12px;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.4);
  cursor: pointer;
  border-radius: 20px;
  transition: all 0.3s ease;
}

.switch.active {
  background: rgba(242, 169, 0, 0.1);
  color: #f2a900;
  box-shadow: 0 0 10px rgba(242, 169, 0, 0.1);
}

.chart-area {
  margin-top: -30px;
}

/* TABLE SECTION */
.table-title {
  font-size: 18px;
  font-weight: 800;
  letter-spacing: 0.5px;
  color: #ffffff;
}

.search-box {
  width: 320px;
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 30px;
  padding: 2px 20px;
}

.search-input :deep(input) {
  font-size: 14px;
  font-weight: 500;
  color: #ffffff;
}
</style>
