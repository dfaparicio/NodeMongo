import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { getData, putData, deleteData } from "../services/services.js";

export const useAdminStore = defineStore(
    "admin",
    () => {
        const usuarios = ref([]);
        const lecturas = ref([]);
        const pagos = ref([]);
        const loading = ref(false);

        // Mapeo rápido de IDs a Nombres para mostrar en tablas de pagos/lecturas
        const usuariosMap = computed(() => {
            const mapa = {};
            usuarios.value.forEach((u) => { mapa[u._id] = u.nombre; });
            return mapa;
        });

        // --- ESTADÍSTICAS INTELIGENTES (KPIs) ---
        const stats = computed(() => {
            const totalPagos = pagos.value.reduce((acc, p) => acc + (Number(p.monto) || 0), 0);
            const usuariosActivos = usuarios.value.filter(u => u.estado === 1).length;
            
            // Lecturas por tipo
            const lPrincipales = lecturas.value.filter(l => l.tipo === 'principal').length;
            const lDiarias = lecturas.value.filter(l => l.tipo === 'diaria').length;

            return {
                ingresosTotales: totalPagos,
                usuariosActivos,
                totalUsuarios: usuarios.value.length,
                lecturasPrincipales: lPrincipales,
                lecturasDiarias: lDiarias,
                totalLecturas: lecturas.value.length,
                pagosPendientes: pagos.value.filter(p => p.estado === 'pendiente').length
            };
        });

        const fetchUsuarios = async () => {
            try {
                const resp = await getData("/usuario");
                usuarios.value = resp.usuarios || (Array.isArray(resp) ? resp : []);
            } catch (error) {
                console.error("Error fetching usuarios:", error);
                usuarios.value = [];
            }
        };

        const fetchLecturas = async () => {
            try {
                const resp = await getData("/lectura");
                lecturas.value = resp.lecturas || (Array.isArray(resp) ? resp : []);
            } catch (error) {
                console.error("Error fetching lecturas:", error);
                lecturas.value = [];
            }
        };

        const fetchPagos = async () => {
            try {
                const resp = await getData("/pago");
                pagos.value = resp.pagos || (Array.isArray(resp) ? resp : []);
            } catch (error) {
                console.error("Error fetching pagos:", error);
                pagos.value = [];
            }
        };

        const fetchAll = async () => {
            loading.value = true;
            try {
                await Promise.all([fetchUsuarios(), fetchLecturas(), fetchPagos()]);
            } finally {
                loading.value = false;
            }
        };

        const updateUsuario = async (id, datos) => {
            const resp = await putData(`/usuario/${id}`, datos);
            await fetchUsuarios();
            return resp;
        };

        const deleteUsuario = async (id) => {
            const resp = await deleteData(`/usuario/${id}`);
            await fetchUsuarios();
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
            loading,
            usuariosMap,
            stats,
            fetchUsuarios,
            fetchLecturas,
            fetchPagos,
            fetchAll,
            updateUsuario,
            deleteUsuario,
            toggleUsuarioEstado,
        };
    },
    { persist: true }
);
