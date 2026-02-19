<template>
    <input type="text" v-model="usuario">
    <input type="text" v-model="password">
    <button @click="login()">Ingresar</button>
</template>

<script setup>
import { ref } from 'vue';
import { postData } from '../services/services.js';

import { useAuthStore } from '../store/auth.js';

let usuario = ref("");
let password = ref("");
const useAuth = useAuthStore();

const login = async () => {
    try {
        const res = await postData("auth/login", {
            email: usuario.value,
            password: password.value
        })

        console.log(res);
        useAuth.token = res.data.token
        console.log(useAuth.token);
        

    } catch (error) {
        console.log(error.response);

    }
}
</script>