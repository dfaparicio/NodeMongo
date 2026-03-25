<template>
  <q-card class="glass-panel no-border" style="min-width: 500px; border: 1px solid rgba(212, 175, 55, 0.4) !important;">
    <q-card-section class="row items-center q-pa-lg border-bottom-glass q-mb-md">
      <div class="text-h5 text-gold font-serif tracking-widest q-ma-none">Afinación Cósmica</div>
      <q-space />
      <q-btn icon="close" flat round dense v-close-popup class="text-grey-5 hover-gold"/>
    </q-card-section>

    <q-card-section class="q-px-xl q-pb-xl">
      <q-form @submit="onSubmit" class="column q-gutter-y-lg">
        
        <div>
          <label class="text-caption text-gold opacity-80 uppercase tracking-widest q-mb-sm block">Nombre Completo</label>
          <q-input 
            v-model="editData.nombre" 
            dark 
            outlined 
            class="rounded-lg bg-glass-dark" 
            :rules="[val => !!val || 'El nombre es obligatorio']"
          >
            <template v-slot:prepend><q-icon name="person" color="primary" size="xs"/></template>
          </q-input>
        </div>
        
        <div>
          <label class="text-caption text-gold opacity-80 uppercase tracking-widest q-mb-sm block">Correo Electrónico</label>
          <q-input 
            v-model="editData.email" 
            dark 
            outlined 
            class="rounded-lg bg-glass-dark" 
            :rules="[val => !!val || 'El email es obligatorio']"
          >
            <template v-slot:prepend><q-icon name="alternate_email" color="primary" size="xs"/></template>
          </q-input>
        </div>

        <div class="row q-col-gutter-lg">
          <div class="col-12 col-sm-6">
            <label class="text-caption text-gold opacity-80 uppercase tracking-widest q-mb-sm block">Edad Terrenal</label>
            <q-input 
              v-model.number="editData.edad" 
              type="number" 
              dark 
              outlined 
              class="rounded-lg bg-glass-dark"
            >
              <template v-slot:prepend><q-icon name="hourglass_empty" color="primary" size="xs"/></template>
            </q-input>
          </div>
          <div class="col-12 col-sm-6">
            <label class="text-caption text-gold opacity-80 uppercase tracking-widest q-mb-sm block">Jerarquía / Rol</label>
            <q-select
              v-model="editData.rol"
              :options="['USER_ROLE', 'ADMIN_ROLE', 'OTHER_ROLE']"
              dark
              outlined
              class="rounded-lg bg-glass-dark"
              color="primary"
            />
          </div>
        </div>

        <div class="row q-gutter-x-md q-pt-md">
          <q-btn flat label="CANCELAR" color="grey-5" v-close-popup class="col rounded-lg font-serif tracking-widest" no-caps/>
          <q-btn unelevated label="ACTUALIZAR" type="submit" color="primary" text-color="black" :loading="loading" class="col text-weight-bold rounded-lg font-serif tracking-widest" no-caps/>
        </div>
      </q-form>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useAdminStore } from '../../store/admin.js';
import { useQuasar } from 'quasar';

const props = defineProps({
  user: { type: Object, required: true }
});

const emit = defineEmits(['updated']);
const adminStore = useAdminStore();
const $q = useQuasar();
const loading = ref(false);

const editData = ref({
  nombre: '',
  email: '',
  edad: 0,
  rol: 'USER_ROLE'
});

onMounted(() => {
  if (props.user) {
    editData.value = { ...props.user };
  }
});

const onSubmit = async () => {
  loading.value = true;
  try {
    await adminStore.updateUsuario(props.user._id, editData.value);
    emit('updated');
  } catch (error) {
    $q.notify({
      message: 'Error al actualizar el usuario',
      color: 'negative',
      icon: 'error'
    });
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.q-field :deep(.q-field__control) {
  background: rgba(255, 255, 255, 0.03);
}
</style>
