<template>
  <q-layout view="lHh Lpr lFf" class="architect-command-center font-display bg-background-dark text-slate-200">

    <q-drawer v-model="leftDrawer" show-if-above :width="260" :mini="miniState" @mouseover="miniState = false"
      @mouseout="miniState = true" class="bg-obsidian-80 backdrop-blur-md border-right-white-5">
      <div class="column full-height">
        <div class="h-20 flex flex-center lg-justify-start q-px-md border-bottom-white-5">
          <q-avatar size="32px" class="bg-gradient-primary shadow-primary">
            <q-icon name="all_inclusive" size="20px" color="black" />
          </q-avatar>
          <div v-if="!miniState" class="q-ml-md text-h6 text-bold tracking-widest text-white">
            NUM<span class="text-primary">OS</span>
          </div>
        </div>

        <q-list class="q-px-sm q-py-lg gap-sm">
          <q-item clickable v-ripple class="rounded-lg text-slate-400 hover-white">
            <q-item-section avatar>
              <q-icon name="dashboard" />
            </q-item-section>
            <q-item-section class="text-sm font-medium">Command</q-item-section>
          </q-item>

          <q-item clickable v-ripple active class="nav-active rounded-lg q-my-sm">
            <q-item-section avatar>
              <q-icon name="payments" />
            </q-item-section>
            <q-item-section class="text-sm font-bold">Finances</q-item-section>
            <div class="active-indicator"></div>
          </q-item>

          <q-item v-for="link in ['people_alt', 'auto_awesome', 'settings_suggest']" :key="link" clickable v-ripple
            class="rounded-lg text-slate-400">
            <q-item-section avatar>
              <q-icon :name="link" />
            </q-item-section>
            <q-item-section class="text-sm font-medium">{{ link.replace('_', ' ') }}</q-item-section>
          </q-item>
        </q-list>

        <q-space />

        <div class="q-pa-md border-top-white-5">
          <div class="user-pill flex items-center no-wrap q-pa-sm rounded-lg clickable">
            <q-avatar size="40px" class="border-primary-50">
              <img src="https://cdn.quasar.dev/img/avatar.png">
            </q-avatar>
            <div v-if="!miniState" class="q-ml-sm overflow-hidden">
              <div class="text-sm text-bold text-white">The Architect</div>
              <div class="text-xs text-primary">System Admin</div>
            </div>
          </div>
        </div>
      </div>
    </q-drawer>

    <q-page-container class="relative-position overflow-hidden">
      <div class="absolute-full bg-grid-pattern opacity-20 no-pointer-events"></div>
      <div class="glow-orb top-right bg-primary-10"></div>
      <div class="glow-orb bottom-left bg-cyan-5"></div>

      <q-page class="column no-wrap">
        <header
          class="h-20 q-px-xl flex items-center justify-between border-bottom-white-5 backdrop-blur-sm relative-position z-top">
          <div>
            <h1 class="text-h5 text-bold text-white tracking-wider uppercase glow-text q-ma-none">The Architect's View
            </h1>
            <p class="text-7 text-slate-400 text-uppercase tracking-widest q-mt-xs">Financial Pulse • System v9.2</p>
          </div>
          <div class="row q-gutter-x-md">
            <q-btn flat round icon="notifications" color="slate-400" class="glass-btn" />
            <q-btn unelevated icon="download" label="Export Data" class="export-btn" />
          </div>
        </header>

        <div class="col scroll q-pa-lg lg-q-pa-xl z-top">

          <div class="row q-col-gutter-lg q-mb-xl">
            <div class="col-12 col-md-4">
              <q-card flat class="hud-card q-pa-lg group relative-position">
                <div class="card-accent"></div>
                <div class="row justify-between q-mb-md">
                  <span class="text-7 text-slate-400 text-bold tracking-widest text-uppercase">Total Cosmic Flow</span>
                  <q-icon name="monetization_on" color="primary" size="sm" />
                </div>
                <div class="text-h3 text-white text-bold glow-text">$12,450.00</div>
                <q-linear-progress :value="0.75" color="primary" class="q-mt-md hud-progress" />
              </q-card>
            </div>
            <div class="col-12 col-md-4">
              <q-card flat class="hud-card q-pa-lg group emerald-border">
                <div class="row justify-between q-mb-md">
                  <span class="text-7 text-slate-400 text-bold tracking-widest text-uppercase">Today's Influx</span>
                  <q-icon name="bolt" color="white" size="sm" />
                </div>
                <div class="row items-end gap-sm">
                  <span class="text-h3 text-white text-bold">850.00</span>
                  <div class="influx-badge q-px-sm q-py-xs rounded">
                    <q-icon name="arrow_upward" size="14px" /> 12%
                  </div>
                </div>
                <p class="text-xs text-slate-500 q-mt-md">vs yesterday ($760.00)</p>
              </q-card>
            </div>
            <div class="col-12 col-md-4">
              <q-card flat class="hud-card q-pa-lg group cyan-border">
                <div class="row justify-between q-mb-md">
                  <span class="text-7 text-slate-400 text-bold tracking-widest text-uppercase">Net Energy</span>
                  <q-icon name="offline_bolt" color="cyan-accent" size="sm" />
                </div>
                <div class="text-h3 text-cyan-accent text-bold cyan-glow">85%</div>
                <div class="row q-gutter-x-xs q-mt-md">
                  <div v-for="n in 3" :key="n" class="col h-1 bg-cyan-accent shadow-cyan"></div>
                  <div class="col h-1 bg-white-10"></div>
                </div>
              </q-card>
            </div>
          </div>

          <q-card flat class="pulse-section q-pa-lg q-mb-xl">
            <div class="row justify-between items-center q-mb-lg">
              <div>
                <h2 class="text-subtitle1 text-bold text-white text-uppercase tracking-wider">Financial Pulse</h2>
                <p class="text-7 text-slate-400">7 Day Trajectory</p>
              </div>
              <q-btn-toggle v-model="timeFrame" toggle-color="primary-dim" flat dense class="time-toggle"
                :options="[{ label: '7D', value: '7' }, { label: '30D', value: '30' }, { label: 'YTD', value: '365' }]" />
            </div>
            <div class="chart-container relative-position flex flex-center">
              <svg viewBox="0 0 1000 300" class="full-width h-64">
                <path d="M0,250 C100,240 150,200 250,180 S350,220 450,150 S600,100 700,120 S850,50 1000,20" fill="none"
                  stroke="#f4af25" stroke-width="3" class="chart-path" />
                <path d="M0,250 C100,240 150,200 250,180 S350,220 450,150 S600,100 700,120 S850,50 1000,20 V300 H0 Z"
                  fill="url(#chartFill)" />
                <defs>
                  <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#f4af25" stop-opacity="0.2" />
                    <stop offset="100%" stop-color="#f4af25" stop-opacity="0" />
                  </linearGradient>
                </defs>
              </svg>
              <div class="absolute-center flex q-gutter-xl">
                <div class="point-marker"><q-tooltip class="bg-black"> $4,200 </q-tooltip></div>
                <div class="point-marker"><q-tooltip class="bg-black"> $8,940 </q-tooltip></div>
              </div>
            </div>
          </q-card>

          <q-card flat class="feed-section glass-panel">
            <div class="q-pa-lg row justify-between items-center border-bottom-white-5">
              <h2 class="text-subtitle1 text-bold text-white text-uppercase tracking-wider">Live Transaction Feed</h2>
              <q-input dense rounded outlined v-model="search" class="search-input">
                <template v-slot:prepend><q-icon name="search" size="xs" color="slate-500" /></template>
              </q-input>
            </div>

            <q-markup-table flat class="bg-transparent text-slate-400 architect-table">
              <thead>
                <tr class="text-7 text-uppercase tracking-widest text-slate-300">
                  <th class="text-left">ID</th>
                  <th class="text-left">User Email</th>
                  <th class="text-left">Plan</th>
                  <th class="text-right">Amount</th>
                  <th class="text-left">Date</th>
                  <th class="text-left">Status</th>
                  <th class="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="n in 5" :key="n" class="hover-white-02">
                  <td class="font-mono text-primary-dim">#TRX-902{{ n }}</td>
                  <td class="text-white font-medium">user.{{ n }}@cosmic.net</td>
                  <td><q-badge outline label="Grand Master" class="plan-badge" /></td>
                  <td class="text-right text-bold text-white">$249.00</td>
                  <td>Oct 24, 2023</td>
                  <td>
                    <q-badge class="status-badge paid">
                      <div class="dot-status bg-emerald-400"></div> Paid
                    </q-badge>
                  </td>
                  <td class="text-center">
                    <q-btn flat round dense icon="block" size="sm" color="slate-600" class="hover-red" />
                  </td>
                </tr>
              </tbody>
            </q-markup-table>

            <div class="q-pa-md row justify-between items-center border-top-white-5">
              <span class="text-7 text-slate-500 uppercase">Showing 5 of 128 transactions</span>
              <div class="row q-gutter-x-xs">
                <q-btn flat dense icon="chevron_left" class="page-btn" />
                <q-btn unelevated label="1" class="page-btn active" />
                <q-btn flat label="2" class="page-btn" />
                <q-btn flat dense icon="chevron_right" class="page-btn" />
              </div>
            </div>
          </q-card>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
</script>

<style scoped>
@import url('../styles/financedashboard.css');
</style>