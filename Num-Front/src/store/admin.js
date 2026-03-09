import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { getData, putData } from "../services/services.js";

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

        // 🚀 Función para actualizar TODO el usuario directamente en la BD
        const updateUsuario = async (id, datos) => {
            console.log("📡 Store: Petición enviada al servidor para ID:", id);
            const resp = await putData(`/usuario/${id}`, datos);
            await fetchUsuarios(); // Refrescamos la lista local
            return resp;
        };

        const toggleUsuarioEstado = async (id, estadoActual) => {
            const endpoint = estadoActual === 1
                ? `/usuario/inactivar/${id}`
                : `/usuario/activar/${id}`;
            const resp = await putData(endpoint, {});
            await fetchUsuarios();
            return resp;
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
            updateUsuario,
            toggleUsuarioEstado,
        };
    },
    { persist: true }
);
