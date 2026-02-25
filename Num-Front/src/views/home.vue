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
                        class="font-serif text-weight-bold text-subtitle1 tracking-logo nav-text transition-colors">NUMERIS</span>
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
/* Importación de Fuentes */
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap');

/* Variables base */
.bg-void {
    background-color: #020202;
}

.bg-black {
    background-color: #000000;
}

.text-void {
    color: #020202;
}

.font-display {
    font-family: 'Space Grotesk', sans-serif;
}

.font-serif {
    font-family: 'Playfair Display', serif;
}

.mix-blend-screen {
    mix-blend-mode: screen;
}

.mix-blend-overlay {
    mix-blend-mode: overlay;
}

/* Utilidades estructurales */
.w-full {
    width: 100%;
}

.max-w-7xl {
    max-width: 80rem;
}

.max-w-6xl {
    max-width: 72rem;
}

.max-w-5xl {
    max-width: 64rem;
}

.max-w-3xl {
    max-width: 48rem;
}

.max-w-lg {
    max-width: 32rem;
}

.mx-auto {
    margin-left: auto;
    margin-right: auto;
}

.px-8 {
    padding-left: 2rem;
    padding-right: 2rem;
}

.py-4 {
    padding-top: 1rem;
    padding-bottom: 1rem;
}

.p-8 {
    padding: 2rem;
}

.p-2 {
    padding: 0.5rem;
}

.gap-2 {
    gap: 0.5rem;
}

.gap-sm {
    gap: 0.25rem;
}

.rounded-2xl {
    border-radius: 1rem;
}

.rounded-xl {
    border-radius: 0.75rem;
}

/* Opacidades y colores específicos */
.opacity-40 {
    opacity: 0.4;
}

.opacity-30 {
    opacity: 0.3;
}

.opacity-80 {
    opacity: 0.8;
}

.text-white-80 {
    color: rgba(255, 255, 255, 0.8);
}

.text-white-50 {
    color: rgba(255, 255, 255, 0.5);
}

.text-white-30 {
    color: rgba(255, 255, 255, 0.3);
}

.text-white-20 {
    color: rgba(255, 255, 255, 0.2);
}

.bg-black-80 {
    background-color: rgba(0, 0, 0, 0.8);
}

.bg-black-50 {
    background-color: rgba(0, 0, 0, 0.5);
}

.bg-black-40 {
    background-color: rgba(0, 0, 0, 0.4);
}

.border-primary-10 {
    border: 1px solid rgba(244, 175, 37, 0.1);
}

.border-primary-20 {
    border: 1px solid rgba(244, 175, 37, 0.2);
}

.border-primary-30 {
    border: 1px solid rgba(244, 175, 37, 0.3);
}

.border-t-white-5 {
    border-top: 1px solid rgba(255, 255, 255, 0.05);
}

/* Tipografía especializada */
.tracking-logo {
    letter-spacing: 0.2em;
}

.tracking-links {
    letter-spacing: 0.15em;
}

.text-micro {
    font-size: 10px;
}

.hero-title {
    font-size: 4rem;
    line-height: 0.9;
    letter-spacing: -0.02em;
}

.hero-subtitle {
    font-size: 1.25rem;
    letter-spacing: 0.05em;
    max-width: 42rem;
}

/* Efectos visuales de fondo y luces */
.bg-cosmic-gradient {
    background: radial-gradient(circle at 50% 30%, rgba(20, 15, 5, 0.4) 0%, rgba(5, 4, 2, 0.95) 60%, #000000 100%);
}

.volumetric-light {
    position: absolute;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(244, 175, 37, 0.05) 0%, transparent 70%);
    top: -50%;
    left: -50%;
    pointer-events: none;
    z-index: 0;
}

/* Navbar y Footer interactivo */
.nav-text {
    color: white;
}

.nav-group:hover .nav-icon {
    transform: rotate(180deg);
}

.nav-group:hover .nav-text {
    color: #f4af25;
}

.blur-glow {
    filter: blur(12px);
}

.nav-link {
    color: rgba(255, 255, 255, 0.6);
    text-decoration: none;
}

.nav-link:hover {
    color: #f4af25;
    text-shadow: 0 0 10px rgba(244, 175, 37, 0.5);
}

.footer-link {
    color: rgba(255, 255, 255, 0.4);
    font-size: 0.875rem;
    text-decoration: none;
    transition: color 0.3s;
}

.footer-link:hover {
    color: #f4af25;
}

/* Animaciones de la constelación (Hero) */
.hero-circles {
    width: 18rem;
    height: 18rem;
    margin: 0 auto;
}

.inset-8 {
    top: 2rem;
    right: 2rem;
    bottom: 2rem;
    left: 2rem;
    position: absolute;
}

.inset-16 {
    top: 4rem;
    right: 4rem;
    bottom: 4rem;
    left: 4rem;
    position: absolute;
}

.hero-core-glow {
    box-shadow: 0 0 80px rgba(244, 175, 37, 0.2);
}

.constellation-spin {
    animation: slow-spin 120s linear infinite;
}

.constellation-spin-reverse {
    animation: slow-spin 90s linear infinite reverse;
}

@keyframes slow-spin {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}

.pulse-anim {
    animation: pulse 10s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.pulse-fast {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {

    0%,
    100% {
        opacity: 1;
    }

    50% {
        opacity: .5;
    }
}

/* Gradientes de texto */
.gold-gradient-text {
    background: linear-gradient(135deg, #ffeebb 0%, #d4af37 50%, #b8860b 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.gold-subhead {
    color: #d4af37;
    text-shadow: 0 0 10px rgba(212, 175, 55, 0.3);
}

/* Input y Botón */
.input-glass-wrapper {
    background: rgba(2, 2, 2, 0.4);
    border: 1px solid rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(12px);
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
}

.md-flex-row {
    flex-direction: column;
}

.md-text-left {
    text-align: center;
}

@media (min-width: 768px) {
    .md-flex-row {
        flex-direction: row;
    }

    .md-text-left {
        text-align: left;
    }

    .hero-circles {
        width: 24rem;
        height: 24rem;
    }

    .hero-title {
        font-size: 5rem;
    }
}

@media (min-width: 1024px) {
    .hero-title {
        font-size: 6rem;
    }
}

.glass-input {
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(8px);
    border: 1px solid rgba(244, 175, 37, 0.3);
    color: #fff;
    outline: none;
    transition: all 0.3s;
}

.glass-input::placeholder {
    color: rgba(255, 255, 255, 0.4);
    text-align: center;
}

@media (min-width: 768px) {
    .glass-input::placeholder {
        text-align: left;
    }
}

.glass-input:focus {
    border-color: #f4af25;
    box-shadow: 0 0 15px rgba(244, 175, 37, 0.2);
}

.radiant-btn {
    background: linear-gradient(to right, #b37e0e, #f4af25, #b37e0e);
    background-size: 200% auto;
    transition: 0.5s;
    box-shadow: 0 0 20px rgba(244, 175, 37, 0.4);
    border: none;
    cursor: pointer;
}

.radiant-btn:hover {
    background-position: right center;
    box-shadow: 0 0 40px rgba(244, 175, 37, 0.6);
}

.btn-group:hover .btn-icon {
    transform: translateX(4px);
}

/* Trust bar */
.trust-bar {
    background: linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.03) 20%, rgba(255, 255, 255, 0.03) 80%, transparent 100%);
    border-top: 1px solid rgba(255, 255, 255, 0.05);
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.trust-badges {
    opacity: 0.6;
    filter: grayscale(100%);
    transition: all 0.5s;
}

.trust-badges:hover {
    opacity: 1;
    filter: grayscale(0%);
}

/* Feature Cards (Grid) */
.glass-panel {
    background: rgba(10, 8, 5, 0.6);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid rgba(244, 175, 37, 0.2);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.5);
}

.feature-card {
    transition: all 0.5s;
    top: 0;
}

.feature-card:hover {
    border-color: rgba(244, 175, 37, 0.5);
    transform: translateY(-8px);
}

.feature-icon {
    width: 3.5rem;
    height: 3.5rem;
}

.feature-glow {
    top: -1rem;
    right: -1rem;
    width: 6rem;
    height: 6rem;
    background-color: rgba(244, 175, 37, 0.05);
    border-radius: 50%;
    filter: blur(24px);
    transition: all 0.5s;
}

.feature-card:hover .feature-glow {
    background-color: rgba(244, 175, 37, 0.2);
}

.feature-divider {
    height: 1px;
    background: linear-gradient(to right, rgba(244, 175, 37, 0.5), transparent);
}
</style>