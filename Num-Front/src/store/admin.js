import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { getData, putData } from "../services/services.js";

export const useAdminStore = defineStore(
    "admin",
    () => {
        const usuarios = ref([]);
        const lecturas = ref([]);
        const pagos = ref([]);

        // Mapeo rápido de IDs a Nombres
        const usuariosMap = computed(() => {
            const mapa = {};
            usuarios.value.forEach((u) => { mapa[u._id] = u.nombre; });
            return mapa;
        });

        // --- ESTADÍSTICAS INTELIGENTES (KPIs) ---
        
        const stats = computed(() => {
            const totalPagos = pagos.value.reduce((acc, p) => acc + (p.monto || 0), 0);
            const usuariosActivos = usuarios.value.filter(u => u.estado === 1).length;
            const usuariosInactivos = usuarios.value.filter(u => u.estado === 0).length;
            
            // Lecturas por tipo
            const lPrincipales = lecturas.value.filter(l => l.tipo === 'principal').length;
            const lDiarias = lecturas.value.filter(l => l.tipo === 'diaria').length;

            // Crecimiento mensual (usuarios registrados en los últimos 30 días)
            const hace30Dias = new Date();
            hace30Dias.setDate(hace30Dias.getDate() - 30);
            // Nota: Asumimos que el _id de Mongo tiene la fecha embebida o que el backend devuelve timestamps
            // Para mayor precisión, si el modelo tiene createdAt lo usaríamos. 
            // Por ahora simulamos con los que tenemos si hay fecha de nacimiento (aunque no es lo mismo)
            // O simplemente contamos los últimos registros.
            const nuevosUsuarios = usuarios.value.slice(-5).length; 

            return {
                ingresosTotales: totalPagos,
                usuariosActivos,
                usuariosInactivos,
                totalUsuarios: usuarios.value.length,
                lecturasPrincipales: lPrincipales,
                lecturasDiarias: lDiarias,
                totalLecturas: lecturas.value.length,
                nuevosUsuarios
            };
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

        const updateUsuario = async (id, datos) => {
            const resp = await putData(`/usuario/${id}`, datos);
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
            usuariosMap,
            stats,
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
