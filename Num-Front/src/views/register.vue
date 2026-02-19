<template>
    <div
        class="bg-background-light dark:bg-void font-display h-screen w-full overflow-hidden text-slate-800 dark:text-slate-100 selection:bg-primary selection:text-white">
        <div class="flex h-full w-full relative">
            <div class="hidden lg:flex lg:w-[60%] h-full relative overflow-hidden bg-void border-r border-white/5">
                <div class="absolute inset-0 w-full h-full">
                    <img alt="Nebulosa profunda en tonos violeta e índigo"
                        class="object-cover w-full h-full opacity-80 mix-blend-overlay"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCOYC3SQk2mjOD_3Oz2LYFJi3QaADHLEXIGGNKuXHT08lXzlJaolS88F-zszgIY6Qmst4pnYXuYAWivn1GXXlX7wJXHId17ctPlFAE5Ivt-DFYsYd78Nx7xM8kFqp5boA68hMw9OXdkLe6KVHqqjLumwk575WqlyoFsl5SJ_ajsogHnqcdN9H1CNxTWoawJD38vYPo8EVNa9fID2JskLszZRmaGkOmTaI21vFJxQ6l4ssRIBOl1anYpGmLs_ivOY8o3TBN7xQrxRmE" />
                </div>
                <div
                    class="absolute inset-0 bg-gradient-to-br from-indigo-900/40 via-purple-900/30 to-background-dark/90">
                </div>
                <div class="absolute inset-0 flex items-center justify-center opacity-60">
                    <img alt="Geometría sagrada dorada brillando en la oscuridad"
                        class="object-cover w-full h-full mix-blend-screen opacity-50"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuA0XMIupUmXUu4OKxJegFu5lFdMLRVaacsP3VfUR5NH5CZ1Be5cRqA1kKXtQddiZCuBuiUzibqqBH6sG6nAFywNV4_pTfGJXIMKPy43H3xD0qJacj-B4BDHgvCxrahs386FqOa-mYYTfD12nztWvXu1jp6NYUSfX51Fqmp5gDcynM-vHxlWDtfrT8y52MBM3TwSE_Dov-xNfQvpeKkC2ij_dWh0T_hSXDY5PPmOydLPrzCyqGbeeULURTKRy55W_jMlaAMTQQnTR0M" />
                </div>
                <div class="relative z-10 w-full h-full flex flex-col justify-between p-12 text-white">
                    <div class="flex items-center gap-2 opacity-80">
                        <span class="material-icons text-primary text-3xl">auto_awesome</span>
                        <span class="text-xl font-bold tracking-widest uppercase text-primary/80">Guía
                            Numerológica</span>
                    </div>
                    <div class="max-w-xl space-y-6 mb-12">
                        <h2
                            class="font-serif text-5xl italic leading-tight text-transparent bg-clip-text bg-gradient-to-r from-primary-light via-primary to-amber-600 drop-shadow-sm">
                            "No estás aquí por accidente. Tu fecha de nacimiento es un código esperando ser descifrado."
                        </h2>
                        <p class="text-lg text-gray-300 font-light leading-relaxed">
                            Genera tu carta numerológica exacta y profunda. Descubre tu Número de Destino, comprende los
                            talentos ocultos de tu alma y asume el control del camino que las estrellas escribieron para
                            ti.
                        </p>
                        <div class="flex items-center gap-4 pt-4">
                            <div class="flex -space-x-3">
                                <img alt="Usuario 1" class="w-10 h-10 rounded-full border-2 border-primary/50"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuB4QqQfw2dZYRgRRoAmE00Hzt4rVb9gt6aynSwvSXBQ5e8xBk--yLd2XXS5iDDmo8SNtK10-uUGILlC77Ww-fqL3N6EtvBvZ6lS33LQdxC3SpaS8NVfmncJJqierNLOmkJALgL6ZmRqon9fh9WX_9CIX7cFxH9aD9xSkgeEZFIOymTqLNXKZ8VkKo7iTmSoQVFwb0Id65GwWO93LAJLjvhvURIn2lLocMYkIDin0OGDiL-K1kUnNg5O15ek04LK7gNJzMireaf2MkI" />
                                <img alt="Usuario 2" class="w-10 h-10 rounded-full border-2 border-primary/50"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCj36BvfOdcs71S5yqw-sLtzgxAIHjXiyY8In3Wr8AEln9Z093nvEeBBHj_MEIkvhcBVjTv-JJ5Hj9g9wBM_6RfQW3d7KqdfID9kuIxxb_gjfzF6dPBf24sXPqsdDmDhBmPpZ2ZdfgJTDtpYAjtR7dVuCBOAbiajo7kVwFYpdIUUy0YdzOAr64K-QOt5CRJMaeIgKJd4bfYsyV6J5a0uVP4H0qqHhV2cQFuv0YdpQylBsBkmGqMeMk9d-bO4M98VjHXKVzvdyxf4SE" />
                                <img alt="Usuario 3" class="w-10 h-10 rounded-full border-2 border-primary/50"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCLCwZXUhNVM0zwzzY8HmEGHTL1qo4mdjf59Yr-rXSCB2OTgVmXAJXKthexHpFhMzdeVYcKgd-59CXjv-17V5ZZiRLrC0r8YTd0DjGYe4FNYO-83VlwDgkY995fjm5YBTth4VMzCj3Xed7QY1fSge4kqlXdpMY8Hh94fLWomtdscHisVpJPO_sQRt6eG1j51F_1pZBYuUXhaHjaCQWsz4K-QrSKs8FGUCoeXXnBI61ywZsC-yxbtBvG-kHSR4n2cMIfVFCDFAvDMZc" />
                            </div>
                            <span class="text-sm text-primary/80 font-medium">Más de 12,000 personas han descubierto su
                                camino</span>
                        </div>
                    </div>
                </div>
            </div>
            <div
                class="w-full lg:w-[40%] h-full relative flex items-center justify-center p-6 lg:p-12 bg-background-dark overflow-y-auto">
                <div class="absolute inset-0 overflow-hidden pointer-events-none">
                    <div
                        class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20">
                    </div>
                    <div class="absolute -top-20 -right-20 w-96 h-96 bg-primary/5 rounded-full blur-[100px]"></div>
                    <div class="absolute bottom-0 left-0 w-64 h-64 bg-indigo-900/10 rounded-full blur-[80px]"></div>
                </div>
                <div
                    class="glass-panel w-full max-w-md p-8 md:p-10 rounded-2xl relative z-10 shadow-2xl border-t border-white/10 my-8">
                    <div class="text-center mb-8">
                        <h1 class="font-serif text-3xl md:text-4xl text-white mb-2 tracking-wide">Comienza Tu Viaje
                            Numerológico</h1>
                        <p class="text-gray-400 text-xs font-medium tracking-widest uppercase">Descubre tu propósito</p>
                    </div>
                    <form class="space-y-4">
                        <div class="space-y-2 group">
                            <label class="block text-[10px] uppercase tracking-widest text-primary font-bold ml-1"
                                for="fullname">Nombre Completo</label>
                            <div class="relative">
                                <span
                                    class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                                </span>
                                <input
                                    class="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-primary/20 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-300"
                                    id="fullname" name="fullname" placeholder="Ej: Juan Pérez" type="text" />
                            </div>
                        </div>

                        <div class="space-y-2 group">
                            <label class="block text-[10px] uppercase tracking-widest text-primary font-bold ml-1"
                                for="dob">Fecha de Nacimiento</label>
                            <div class="relative">
                                <span
                                    class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                                </span>
                                <input
                                    class="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-primary/20 rounded-lg text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-300 appearance-none"
                                    id="dob" name="dob" type="date" />
                            </div>
                        </div>

                        <div class="space-y-2 group">
                            <label class="block text-[10px] uppercase tracking-widest text-primary font-bold ml-1"
                                for="email">Correo Electrónico</label>
                            <div class="relative">
                                <span
                                    class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                                </span>
                                <input
                                    class="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-primary/20 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-300"
                                    id="email" name="email" placeholder="tuemail@ejemplo.com" type="email" />
                            </div>
                        </div>

                        <div class="space-y-2 group">
                            <label class="block text-[10px] uppercase tracking-widest text-primary font-bold ml-1"
                                for="password">Contraseña</label>
                            <div class="relative">
                                <span
                                    class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                                </span>
                                <input
                                    class="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-primary/20 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-300"
                                    id="password" name="password" placeholder="••••••••" type="password" />
                            </div>
                        </div>

                        <primaryButton primaryButton label="Registrarme" icon="east" :to="''"><span
                                class="material-icons text-sm">auto_awesome</span></primaryButton>

                    </form>

                    <div class="mt-8 text-center">
                        <p class="text-sm text-gray-400">
                            ¿Ya tienes una cuenta?, Inicia sesión
                        </p>
                        <br>
                        <primaryButton label="Login" icon="east" :to="'/'" />
                    </div>
                </div>

                <div class="absolute bottom-4 text-[10px] text-gray-600 tracking-widest uppercase">
                    © 2026 Guía Numerológica. Todos los derechos reservados.
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import primaryButton from '../components/primaryButton.vue'; 
</script>