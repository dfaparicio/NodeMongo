import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { getData } from "../services/services.js";

export const useAdminStore = defineStore("admin", () => {
    // State
    const usuarios = ref([]);
    const lecturas = ref([]);
    const pagos = ref([]);

    const loading = ref({
        usuarios: false,
        lecturas: false,
        pagos: false
    });

    const errors = ref({
        usuarios: null,
        lecturas: null,
        pagos: null
    });

    // Global error computed to stay compatible with components for now, 
    // or we can update components (better update components)
    const error = computed(() => errors.value.usuarios || errors.value.lecturas || errors.value.pagos);
    const isLoading = computed(() => loading.value.usuarios || loading.value.lecturas || loading.value.pagos);

    // Mappings
    const usuariosMap = computed(() => {
        const mapa = {};
        usuarios.value.forEach((u) => {
            mapa[u._id] = u.nombre;
        });
        return mapa;
    });

    // Actions
    const fetchUsuarios = async () => {
        loading.value.usuarios = true;
        errors.value.usuarios = null;
        try {
            const resp = await getData("/usuario");
            usuarios.value = resp.usuarios || [];
        } catch (err) {
            errors.value.usuarios = "Error al cargar usuarios";
            console.error(err);
        } finally {
            loading.value.usuarios = false;
        }
    };

    const fetchLecturas = async () => {
        loading.value.lecturas = true;
        errors.value.lecturas = null;
        try {
            const resp = await getData("/lectura");
            lecturas.value = resp.lecturas || [];
        } catch (err) {
            errors.value.lecturas = "Error al cargar lecturas";
            console.error(err);
        } finally {
            loading.value.lecturas = false;
        }
    };

    const fetchPagos = async () => {
        loading.value.pagos = true;
        errors.value.pagos = null;
        try {
            const resp = await getData("/pago");
            pagos.value = Array.isArray(resp) ? resp : [];
        } catch (err) {
            errors.value.pagos = "Error al cargar pagos";
            console.error(err);
        } finally {
            loading.value.pagos = false;
        }
    };

    const fetchAll = async () => {
        try {
            // Intenta cargar usuarios primero ya que lo necesitan las otras vistas para el mapa
            await fetchUsuarios();
            await Promise.all([fetchLecturas(), fetchPagos()]);
        } catch (err) {
            console.error("Error en sincronización total:", err);
        }
    };

    return {
        usuarios,
        lecturas,
        pagos,
        loading,
        isLoading,
        errors,
        error,
        usuariosMap,
        fetchUsuarios,
        fetchLecturas,
        fetchPagos,
        fetchAll,
    };
});
