<template>
  <q-page class="cosmic-billing-page font-display text-white overflow-hidden">
    <div class="fixed-full cosmic-bg z-behind"></div>
    <div class="fixed-full sacred-geo-bg z-behind opacity-40"></div>

    <div class="nebula nebula-top-left"></div>
    <div class="nebula nebula-bottom-right"></div>

    <nav
      class="relative-position z-top row justify-between items-center q-px-xl q-py-lg border-bottom-white-5 backdrop-blur">
      <div class="row items-center gap-sm">
        <q-icon name="auto_awesome" color="primary" size="32px" />
        <span class="text-h5 text-bold tracking-wide">AETHERIA</span>
      </div>

      <div class="gt-sm row items-center q-gutter-x-xl text-white-70">
        <q-btn flat no-caps label="Readings" class="hover-primary" />
        <q-btn flat no-caps label="Charts" class="hover-primary" />
        <q-btn flat no-caps label="Account" class="text-white border-bottom-primary" />
      </div>

      <q-avatar size="40px" class="avatar-border shadow-glow">
        <img src="https://cdn.quasar.dev/img/avatar.png">
      </q-avatar>
    </nav>

    <main class="relative-position z-top flex flex-center q-pa-md q-pa-md-xl">
      <q-card flat class="billing-card full-width max-w-lg glass-panel overflow-hidden">

        <div class="header-section q-pa-lg q-pa-md-xl border-bottom-primary-20 row justify-between items-end gap-md">
          <div class="col-12 col-md-7">
            <div class="row items-center q-mb-sm">
              <div class="accent-line q-mr-md"></div>
              <span class="text-primary text-bold text-uppercase tracking-widest text-caption">Billing History</span>
            </div>
            <h1 class="text-h3 md:text-h2 font-display italic font-light text-white q-ma-none leading-tight">
              Your <span class="text-primary font-normal not-italic">Cosmic</span> Transactions
            </h1>
            <p class="q-mt-md text-white-60 text-subtitle1 font-light max-width-p">
              A record of your energy exchanges and premium guidance unlocked.
            </p>
          </div>

          <q-btn unelevated class="manage-sub-btn q-px-lg q-py-md" rounded>
            <q-icon name="settings" size="xs" class="q-mr-sm" />
            <span class="text-bold">Manage Subscription</span>
          </q-btn>
        </div>

        <div class="table-container scroll">
          <q-markup-table flat class="bg-transparent cosmic-table text-white">
            <thead>
              <tr class="bg-white-5 text-white-50 text-caption text-uppercase tracking-wider">
                <th class="text-left q-pl-xl">Date Initiated</th>
                <th class="text-left">Cosmic Plan / Service</th>
                <th class="text-left">Energy Exchange</th>
                <th class="text-left">Alignment Status</th>
                <th class="text-right q-pr-xl">Invoice</th>
              </tr>
            </thead>
            <tbody class="divide-primary-10">
              <tr v-for="item in transactions" :key="item.id" class="table-row-hover transition-300">
                <td class="q-pl-xl font-light text-subtitle1 text-nowrap">{{ item.date }}</td>
                <td>
                  <div class="row no-wrap items-center gap-md">
                    <div class="plan-icon-box flex flex-center" :class="item.iconBg">
                      <q-icon :name="item.icon" size="sm" :color="item.iconColor" />
                    </div>
                    <div>
                      <div class="text-subtitle1 font-normal">{{ item.service }}</div>
                      <div class="text-caption text-white-40">ID: {{ item.idCode }}</div>
                    </div>
                  </div>
                </td>
                <td class="font-display italic text-h5 text-primary">{{ item.amount }}</td>
                <td>
                  <q-badge :color="item.status === 'Paid' ? 'emerald-900-40' : 'amber-900-20'"
                    :class="item.status === 'Paid' ? 'text-emerald-300' : 'text-amber-500'"
                    class="status-badge border-status q-px-md q-py-xs" rounded>
                    <div class="dot-pulse q-mr-xs" :class="item.status === 'Paid' ? 'bg-emerald-400' : 'bg-amber-500'">
                    </div>
                    {{ item.status }}
                  </q-badge>
                </td>
                <td class="text-right q-pr-xl">
                  <q-btn flat round :icon="item.status === 'Paid' ? 'download' : 'receipt_long'"
                    class="text-white-40 hover-primary" />
                </td>
              </tr>
            </tbody>
          </q-markup-table>
        </div>

        <div class="q-pa-lg border-top-primary-20 bg-black-20 row justify-between items-center text-white-40">
          <div class="font-light">
            Showing <span class="text-white">1-4</span> of <span class="text-white">12</span> transactions
          </div>
          <div class="row q-gutter-x-sm">
            <q-btn flat dense icon="chevron_left" class="nav-btn" disabled />
            <q-btn flat dense icon="chevron_right" class="nav-btn" />
          </div>
        </div>
      </q-card>
    </main>

    <div class="fixed-bottom-left q-ml-xl q-mb-xl opacity-20 gt-md">
      <div class="text-primary font-display italic leading-none" style="font-size: 10rem">∞</div>
    </div>
  </q-page>
</template>

<script setup>
</script>

<style scoped>
@import url('../styles/historicalpayments.css');
</style>