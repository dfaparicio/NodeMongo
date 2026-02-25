<template>
    <q-layout view="hHh lpR fFf" class="bg-void font-display text-white relative-position">

        <div class="fixed-full z-0 bg-black">
            <q-img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBaGe8OAVZTtjDPF8_0Wk9ZfHQf8n4h43KtWqY_P0Fe1RAw86VV7g_b9Xvv6AAbAXOA9KW9TxRMaIchOItZqHFOwApBZ0ezEg5DlHjJY55R1DvXwGbuhYzW_OLir7YjQX6KZXOx9rmddxWMaNJfI5h0OXt0shqAKFWXPlFm_vXxIaarHPAMEhaeIeFtTHvGrIWkyAqtWZH-x4UIIN-g0g5iOEjghIGhX4s2EjWpEdYcE1QaDO4wvqlBeKBbbj3SwkDh07MfrfrAJGs"
                class="absolute-full opacity-40 mix-blend-screen" fit="cover" />
            <div class="absolute-full bg-cosmic-gradient"></div>
            <div class="volumetric-light pulse-anim"></div>
        </div>

        <q-header class="bg-transparent text-white q-py-md" style="z-index: 9999;">
            <div class="row justify-between items-center max-w-7xl mx-auto q-px-lg">
                <div class="row items-center q-gutter-sm cursor-pointer nav-group">
                    <div class="relative-position flex flex-center">
                        <q-icon name="pentagon" color="primary" size="sm" class="nav-icon transition-transform" />
                        <div class="absolute-full bg-primary blur-glow rounded-full opacity-20"></div>
                    </div>
                    <span
                        class="font-serif text-weight-bold text-subtitle1 tracking-logo nav-text transition-colors">NUMEROLOGÍA</span>
                </div>

                <div class="row items-center q-gutter-sm">
                    <SecondButton label="Ingresar" to="/login" />
                    <SecondButton label="Comenzar Viaje" to="/register" />
                </div>

            </div>
        </q-header>

        <q-page-container>
            <q-page class="flex column items-center justify-start q-px-md q-pb-xl pt-12 max-w-7xl mx-auto">

                <div class="column items-center text-center w-full max-w-5xl">

                    <div class="relative-position hero-circles q-mb-xl pointer-events-none">
                        <div class="absolute-full rounded-full border-primary-10 constellation-spin"></div>
                        <div class="absolute-full inset-8 rounded-full border-primary-20 constellation-spin-reverse">
                        </div>

                        <div class="absolute-full flex flex-center">
                            <div class="absolute-full pulse-fast opacity-30">
                                <span class="absolute text-primary text-caption" style="top:10%; left:20%;">3</span>
                                <span class="absolute text-primary text-caption" style="top:15%; right:25%;">6</span>
                                <span class="absolute text-primary text-caption" style="bottom:20%; left:30%;">9</span>
                                <span class="absolute text-primary text-caption" style="top:50%; left:10%;">1</span>
                                <span class="absolute text-primary text-caption" style="bottom:10%; right:20%;">7</span>
                            </div>
                        </div>

                        <div
                            class="absolute-full inset-16 rounded-full overflow-hidden hero-core-glow bg-black-50 backdrop-blur-sm border-primary-30">
                            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBnqCH6Bi3fVlXCZX7MHw3sWd-hjTUmJn7pCdGkX4PvJjaAL1Xpv8SyQJkdAGkmSbGzykF9jFC7DoqgmMD2TjKID2Um40_8Mn4d-azwcsevStYeCHod0GHRAQb8OgVd0CKLCXDqlBm05iG5YESD8eQ5Iu9XxqeZtBzGG6tt5AiKQSeDiWA_is9s-LGk12lQDSBp4OSNTjbtZpnX6aPl_1DHWAfVxNRZIaAKQra-znrQBM0zJF3iLhtvXZYx0T2N_fssBOvIsWtV29o"
                                class="w-full h-full object-cover opacity-60 mix-blend-overlay" />
                            <svg class="absolute-full opacity-40" viewBox="0 0 100 100">
                                <defs>
                                    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" style="stop-color:#f4af25;stop-opacity:1" />
                                        <stop offset="100%" style="stop-color:#000;stop-opacity:0" />
                                    </linearGradient>
                                </defs>
                                <circle cx="50" cy="50" r="40" stroke="url(#grad1)" stroke-width="0.5" fill="none" />
                                <line x1="50" y1="10" x2="50" y2="90" stroke="#f4af25" stroke-width="0.2" />
                                <line x1="10" y1="50" x2="90" y2="50" stroke="#f4af25" stroke-width="0.2" />
                            </svg>
                        </div>
                    </div>

                    <div class="hero-text-container relative-position z-top">
                        <h1 class="font-serif hero-title text-weight-bold text-white drop-shadow-2xl q-ma-none">
                            EL UNIVERSO SUSURRA EN <span class="gold-gradient-text block q-mt-sm">NÚMEROS</span>
                        </h1>
                        <p
                            class="font-display gold-subhead hero-subtitle text-weight-medium text-uppercase q-mt-md mx-auto">
                            Tu fecha de nacimiento es un mapa estelar esperando ser descifrado...
                        </p>
                    </div>

                    <div class="w-full max-w-3xl q-mt-xl q-mb-xl">
                        <div
                            class="trust-bar backdrop-blur-sm py-4 px-8 rounded-full row items-center justify-between q-col-gutter-md">
                            <div class="row items-center q-gutter-sm col-12 col-sm-auto justify-center">
                                <q-icon name="verified_user" color="primary" size="sm" class="opacity-80" />
                                <span class="text-caption text-weight-medium text-white-80 tracking-wide">Iluminando el
                                    camino de +10,000 almas</span>
                            </div>
                            <div class="row items-center q-gutter-md trust-badges col-12 col-sm-auto justify-center">
                                <div class="row items-center q-gutter-xs">
                                    <q-icon name="lock" size="xs" />
                                    <span class="text-micro text-uppercase tracking-wider">Conexión Segura</span>
                                </div>
                                <div class="row items-center q-gutter-xs">
                                    <q-icon name="privacy_tip" size="xs" />
                                    <span class="text-micro text-uppercase tracking-wider">Energía Protegida</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                <div class="row q-col-gutter-lg w-full max-w-6xl relative-position z-top q-mb-xl">
                    <div class="col-12 col-md-4">
                        <div
                            class="glass-panel p-8 rounded-2xl flex column items-start text-left feature-card relative-position overflow-hidden cursor-pointer">
                            <div class="feature-glow absolute"></div>
                            <div
                                class="feature-icon rounded-full border-primary-30 flex flex-center q-mb-md text-primary bg-black-40">
                                <q-icon name="all_inclusive" size="sm" />
                            </div>
                            <h3 class="font-serif text-h5 text-white q-mb-sm tracking-wide q-mt-none">Ciclos y Lecciones
                            </h3>
                            <p class="text-caption text-white-50 font-light" style="line-height: 1.6;">
                                ¿Sientes que el universo te repite la misma prueba? Descubre la matemática sagrada que
                                guía tus patrones kármicos y libera tu destino.
                            </p>
                            <div class="feature-divider w-full q-mt-lg"></div>
                        </div>
                    </div>

                    <div class="col-12 col-md-4">
                        <div
                            class="glass-panel p-8 rounded-2xl flex column items-start text-left feature-card relative-position overflow-hidden cursor-pointer">
                            <div class="feature-glow absolute"></div>
                            <div
                                class="feature-icon rounded-full border-primary-30 flex flex-center q-mb-md text-primary bg-black-40">
                                <q-icon name="face" size="sm" />
                            </div>
                            <h3 class="font-serif text-h5 text-white q-mb-sm tracking-wide q-mt-none">Tu Verdadera
                                Esencia</h3>
                            <p class="text-caption text-white-50 font-light" style="line-height: 1.6;">
                                Más allá de tu nombre físico existe una frecuencia única. Conoce la vibración profunda
                                de tu alma a través del espejo de los números.
                            </p>
                            <div class="feature-divider w-full q-mt-lg"></div>
                        </div>
                    </div>

                    <div class="col-12 col-md-4">
                        <div
                            class="glass-panel p-8 rounded-2xl flex column items-start text-left feature-card relative-position overflow-hidden cursor-pointer">
                            <div class="feature-glow absolute"></div>
                            <div
                                class="feature-icon rounded-full border-primary-30 flex flex-center q-mb-md text-primary bg-black-40">
                                <q-icon name="schedule" size="sm" />
                            </div>
                            <h3 class="font-serif text-h5 text-white q-mb-sm tracking-wide q-mt-none">Sincronía Cósmica
                            </h3>
                            <p class="text-caption text-white-50 font-light" style="line-height: 1.6;">
                                El reloj del cosmos jamás se detiene. Aprende a descifrar si el universo te está
                                abriendo los caminos o pidiendo introspección.
                            </p>
                            <div class="feature-divider w-full q-mt-lg"></div>
                        </div>
                    </div>
                </div>

            </q-page>
        </q-page-container>

        <q-footer class="bg-black-80 backdrop-blur-md border-t-white-5 q-py-lg text-center relative-position z-top">
            <div class="row justify-center q-gutter-md q-mb-sm">
                <a href="#" class="footer-link">Términos</a>
                <a href="#" class="footer-link">Privacidad</a>
                <a href="#" class="footer-link">Soporte</a>
            </div>
            <p class="text-micro text-uppercase text-white-20 tracking-logo q-ma-none">© 2026 Numeris. El Mapa Oculto.
            </p>
        </q-footer>

    </q-layout>
</template>

<script setup>
import SecondButton from "../components/secondButton.vue"

</script>

<style scoped>
@import url('../styles/home.css');
</style>