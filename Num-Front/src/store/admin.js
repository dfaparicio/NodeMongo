import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { getData } from "../services/services.js";

export const useAdminStore = defineStore(
    "admin",
    () => {
        const usuarios = ref([]);
        const lecturas = ref([]);
        const pagos = ref([]);

        const usuariosMap = computed(() => {
            const mapa = {};
            usuarios.value.forEach((u) => {
                mapa[u._id] = u.nombre;
            });
            return mapa;
        });

        const fetchUsuarios = async () => {
            const resp = await getData("/usuario");
            usuarios.value = resp.usuarios || [];
        };

        const fetchLecturas = async () => {
            const resp = await getData("/lectura");
            lecturas.value = resp.lecturas || [];
        };

        const fetchPagos = async () => {
            const resp = await getData("/pago");
            pagos.value = Array.isArray(resp) ? resp : [];
        };

        const fetchAll = async () => {
            await Promise.all([fetchUsuarios(), fetchLecturas(), fetchPagos()]);
        };

        return {
            usuarios,
            lecturas,
            pagos,
            usuariosMap,
            fetchUsuarios,
            fetchLecturas,
            fetchPagos,
            fetchAll,
        };
    },
    { persist: true }
);
