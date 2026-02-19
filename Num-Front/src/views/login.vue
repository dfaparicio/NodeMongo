<template>
    <div
        class="flex h-screen w-full relative bg-background-light dark:bg-void font-display overflow-hidden text-slate-800 dark:text-slate-100">

        <div class="hidden lg:flex lg:w-[60%] h-full relative overflow-hidden bg-void">
            <div class="absolute inset-0 w-full h-full">
                <img src="https://images.unsplash.com/photo-1464802686167-b939a6910659?auto=format&fit=crop&q=80"
                    class="object-cover w-full h-full opacity-80 mix-blend-overlay" alt="Nebula">
            </div>
            <div class="absolute inset-0 bg-gradient-to-br from-indigo-900/40 via-purple-900/30 to-background-dark/90">
            </div>

            <div class="relative z-10 w-full h-full flex flex-col justify-between p-12 text-white">
                <div class="flex items-center gap-2 opacity-80">
                    <span class="material-icons text-primary text-3xl">auto_awesome</span>
                    <span class="text-xl font-bold tracking-widest uppercase text-primary/80">Guía Cósmica</span>
                </div>
                <div class="max-w-xl space-y-6 mb-12">
                    <h2
                        class="font-serif text-5xl italic leading-tight text-transparent bg-clip-text bg-gradient-to-r from-primary-light via-primary to-amber-600">
                        "El universo habla; los números revelan tu propósito."
                    </h2>
                    <p class="text-lg text-gray-300 font-light">
                        Accede a tu carta numerológica y descubre la vibración exacta que guía tu destino.
                    </p>
                </div>
            </div>
        </div>

        <div class="w-full lg:w-[40%] h-full relative flex items-center justify-center p-6 lg:p-12 bg-background-dark">
            <div
                class="glass-panel w-full max-w-md p-8 md:p-12 rounded-2xl relative z-10 shadow-2xl border-t border-white/10">

                <div class="text-center mb-10">
                    <h1 class="font-serif text-4xl text-white mb-2 tracking-wide">Descifra tu Camino</h1>
                    <p class="text-gray-400 text-sm font-medium tracking-wider uppercase">Tu viaje continúa</p>
                </div>

                <form @submit.prevent="login" class="space-y-6">
                    <div class="space-y-2 group">
                        <label class="block text-xs uppercase tracking-widest text-primary font-bold ml-1">Correo Electrónico</label>
                        <div class="relative">
                            <span
                                class="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500 group-focus-within:text-primary">
                                <span class="material-icons text-xl">alternate_email</span>
                            </span>
                            <input v-model="email" type="email" placeholder="buscador@universo.com"
                                class="w-full pl-10 pr-4 py-3 bg-white/5 border border-primary/20 rounded-lg text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" />
                        </div>
                    </div>

                    <div class="space-y-2 group">
                        <label
                            class="block text-xs uppercase tracking-widest text-primary font-bold ml-1">Clave Secreta</label>
                        <div class="relative">
                            <span
                                class="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500 group-focus-within:text-primary">
                                <span class="material-icons text-xl">lock_outline</span>
                            </span>
                            <input v-model="password" :type="showPassword ? 'text' : 'password'" placeholder="••••••••"
                                class="w-full pl-10 pr-4 py-3 bg-white/5 border border-primary/20 rounded-lg text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" />
                            <span @click="showPassword = !showPassword"
                                class="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-gray-500 hover:text-white">
                                <span class="material-icons text-lg">{{ showPassword ? 'visibility' : 'visibility_off'
                                }}</span>
                            </span>
                        </div>
                        <div class="flex justify-end mt-1">
                            <a class="text-xs text-gray-400 hover:text-primary transition-colors duration-200"
                                href="#">¿Olvidaste tu llave cósmica?</a>
                        </div>
                    </div>

                    <button type="submit"
                        class="w-full py-3.5 bg-gradient-to-r from-primary via-yellow-500 to-amber-600 text-background-dark font-bold rounded-lg shadow-lg hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2">
                        <span>Revelar mi Camino</span>
                        <span class="material-icons text-sm">east</span>
                    </button>
                </form>

                <div class="relative my-8">
                    <div class="absolute inset-0 flex items-center">
                        <div class="w-full border-t border-white/10"></div>
                    </div>
                    <div class="relative flex justify-center text-xs"><span class="px-4 bg-[#1a150e] text-gray-500">O sintoniza tu energía con</span></div>
                </div>

                <div class="grid grid-cols-2 gap-4">
                    <button
                        class="flex items-center justify-center gap-2 py-2.5 border border-white/10 rounded-lg hover:bg-white/5 text-gray-300 text-sm">
                        <i class="fa-brands fa-google"></i>
                        Google
                    </button>
                    <button
                        class="flex items-center justify-center gap-2 py-2.5 border border-white/10 rounded-lg hover:bg-white/5 text-gray-300 text-sm">
                        <i class="fa-brands fa-apple"></i>
                        Apple
                    </button>
                </div>
                <div class="mt-10 text-center">
                    <p class="text-sm text-gray-400">
                        ¿Aún no conoces tus números?
                        <a class="text-primary hover:text-primary-light font-semibold hover:underline decoration-primary/50 underline-offset-4 transition-all"
                            href="#">Inicia tu viaje aquí.</a>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { postData } from '../services/services.js';
import { useAuthStore } from '../store/auth.js';

const email = ref("");
const password = ref("");
const showPassword = ref(false);
const useAuth = useAuthStore();

const login = async () => {
    try {
        const res = await postData("auth/login", {
            email: email.value,
            password: password.value
        });

        console.log(res);
        useAuth.token = res.data.token;
        console.log(useAuth.token);

    } catch (error) {
        console.log(error.response);
    }
}
</script>

<style scoped>
@import "../styles/login-styles.css";
</style>