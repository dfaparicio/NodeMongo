<template>
  <q-layout view="lHh Lpr lFf" class="cosmic-checkout font-display text-white overflow-x-hidden">
    <div class="fixed-full z-behind">
      <div class="absolute-full bg-cosmic-main"></div>
      <div class="glow-orb top-left bg-primary-10"></div>
      <div class="glow-orb bottom-right bg-primary-5"></div>
      <div class="stars-overlay"></div>
    </div>

    <q-page-container>
      <q-page class="row no-wrap items-stretch lg-row-reverse-md">

        <div class="col-12 col-lg-5 xl-col-4 column justify-center q-pa-lg lg-q-pa-xl relative-position">
          <q-card flat class="glass-panel-dark q-pa-xl relative-position overflow-hidden">
            <div class="absolute-top-right decoration-glow"></div>

            <div class="relative-position z-top">
              <div class="row items-center q-gutter-x-sm text-primary q-mb-lg opacity-80">
                <q-icon name="stars" size="xs" />
                <span class="text-7 text-bold tracking-widest text-uppercase">Your Selection</span>
              </div>

              <h1 class="text-h4 text-bold text-white q-mb-md leading-tight">
                Premium Cosmic Guidance
              </h1>
              <p class="text-grey-5 text-subtitle2 q-mb-xl font-light">
                Unlock the secrets of the universe with unlimited Numerology Reports and personalized spiritual
                insights.
              </p>

              <div class="subscription-price q-py-xl q-my-xl border-y-primary-10">
                <span class="text-caption text-grey-5 text-uppercase tracking-wider">Total Subscription</span>
                <div class="row items-baseline q-gutter-x-sm">
                  <span class="text-h2 text-bold gold-text-gradient">$12.99</span>
                  <span class="text-h6 text-grey-5 font-light">/ Month</span>
                </div>
              </div>

              <div class="q-gutter-y-md">
                <div v-for="benefit in benefits" :key="benefit.text" class="row items-center q-gutter-x-md text-grey-4">
                  <div class="benefit-icon-wrap" :class="benefit.color">
                    <q-icon :name="benefit.icon" size="xs" />
                  </div>
                  <span class="text-sm">{{ benefit.text }}</span>
                </div>
              </div>
            </div>
          </q-card>

          <div class="text-center q-mt-md">
            <p class="text-7 text-grey-7">
              By continuing, you agree to the <a href="#" class="text-primary decoration-none">Terms of Service</a>.
            </p>
          </div>
        </div>

        <div class="col-12 col-lg-7 xl-col-8 column justify-center q-pa-md lg-q-pa-xl">
          <q-card flat class="glass-panel-light q-pa-lg lg-q-pa-xl rounded-2xl shadow-2xl max-width-form mx-auto">

            <div class="row justify-between items-center q-mb-xl">
              <div class="row items-center q-gutter-x-md">
                <div class="q-pa-sm bg-primary-10 rounded-lg border-primary-20">
                  <q-icon name="lock_person" color="primary" size="md" />
                </div>
                <div>
                  <h2 class="text-h5 text-bold text-white q-ma-none">Secure Payment Details</h2>
                  <p class="text-caption text-grey-5">Complete your transaction to begin.</p>
                </div>
              </div>
              <div class="gt-xs row q-gutter-x-sm opacity-50">
                <div class="card-brand">VISA</div>
                <div class="card-brand">MC</div>
              </div>
            </div>

            <div class="row q-col-gutter-md q-mb-xl">
              <div class="col-4" v-for="method in paymentMethods" :key="method.name">
                <q-btn flat no-caps :class="activeMethod === method.name ? 'tab-active' : 'tab-inactive'"
                  class="full-width q-py-md rounded-xl transition-all" @click="activeMethod = method.name">
                  <q-icon :name="method.icon" :size="method.size || 'sm'" class="q-mr-sm" />
                  <span class="text-bold gt-xs">{{ method.label }}</span>
                </q-btn>
              </div>
            </div>

            <q-form class="q-gutter-y-lg">
              <div>
                <label class="text-7 text-grey-5 text-bold text-uppercase tracking-widest q-ml-sm">Cardholder
                  Name</label>
                <q-input v-model="form.name" filled dark placeholder="e.g. Orion Starwalker"
                  class="cosmic-input q-mt-xs">
                  <template v-slot:prepend><q-icon name="person" /></template>
                </q-input>
              </div>

              <div>
                <label class="text-7 text-grey-5 text-bold text-uppercase tracking-widest q-ml-sm">Card Number</label>
                <q-input v-model="form.number" filled dark mask="#### #### #### ####" placeholder="0000 0000 0000 0000"
                  class="cosmic-input font-mono q-mt-xs">
                  <template v-slot:prepend><q-icon name="payment" /></template>
                  <template v-slot:append><q-icon name="lock" size="xs" color="grey-7" /></template>
                </q-input>
              </div>

              <div class="row q-col-gutter-lg">
                <div class="col-12 col-sm-6">
                  <label class="text-7 text-grey-5 text-bold text-uppercase tracking-widest q-ml-sm">Expiry Date</label>
                  <q-input v-model="form.expiry" filled dark mask="## / ##" placeholder="MM / YY"
                    class="cosmic-input text-center q-mt-xs">
                    <template v-slot:prepend><q-icon name="calendar_today" /></template>
                  </q-input>
                </div>
                <div class="col-12 col-sm-6">
                  <div class="row justify-between q-px-sm">
                    <label class="text-7 text-grey-5 text-bold text-uppercase tracking-widest">CVC / CVV</label>
                    <span class="text-7 text-grey-7 cursor-pointer hover-white">Where is this?</span>
                  </div>
                  <q-input v-model="form.cvc" filled dark type="password" placeholder="•••"
                    class="cosmic-input text-center q-mt-xs">
                    <template v-slot:prepend><q-icon name="security" /></template>
                  </q-input>
                </div>
              </div>

              <div class="q-pt-xl">
                <q-btn unelevated class="full-width checkout-btn q-py-lg group" rounded>
                  <div class="row items-center q-gutter-x-md">
                    <span class="text-h6 text-bold text-uppercase tracking-wide">Complete Transaction</span>
                    <q-icon name="arrow_forward" size="sm" class="group-hover-translate-x" />
                  </div>
                  <div class="text-caption text-bold opacity-70">Activate Your Journey</div>
                </q-btn>

                <div class="row justify-center items-center q-gutter-x-sm q-mt-md text-7 text-grey-7">
                  <q-icon name="lock" color="positive" />
                  <span>Payments are secure and encrypted.</span>
                </div>
              </div>
            </q-form>
          </q-card>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
</script>

<style scoped>
@import url('../styles/payment.css');
</style>