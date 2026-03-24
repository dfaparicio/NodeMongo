import { Notify } from 'quasar';

/**
 * Utilidad de Notificaciones Cósmicas para Numeris
 */

const baseConfig = {
  position: 'top',
  timeout: 3000,
  textColor: 'white',
  classes: 'glass-panel cosmic-notify', // Clases CSS personalizadas
  html: true
};

export const showNotify = {
  // Notificación de Éxito (Alineación Estelar)
  success(message, caption = 'La energía fluye correctamente') {
    Notify.create({
      ...baseConfig,
      message: `<span class="text-weight-bold font-serif">✨ ${message}</span>`,
      caption: `<span class="text-grey-4">${caption}</span>`,
      icon: 'auto_awesome',
      color: 'positive',
      classes: `${baseConfig.classes} border-success`
    });
  },

  // Notificación de Error (Desalineación Cósmica)
  error(message, caption = 'La energía no pudo alinearse') {
    Notify.create({
      ...baseConfig,
      message: `<span class="text-weight-bold font-serif">☄️ ${message}</span>`,
      caption: `<span class="text-grey-4">${caption}</span>`,
      icon: 'warning',
      color: 'negative',
      classes: `${baseConfig.classes} border-error`
    });
  },

  // Notificación de Información (Mensaje del Universo)
  info(message, caption = 'Aviso del cosmos') {
    Notify.create({
      ...baseConfig,
      message: `<span class="text-weight-bold font-serif">🔭 ${message}</span>`,
      caption: `<span class="text-grey-4">${caption}</span>`,
      icon: 'info',
      color: 'primary',
      classes: `${baseConfig.classes} border-primary`
    });
  },

  // Notificación de Advertencia (Eclipse Detectado)
  warning(message, caption = 'Atención a las señales') {
    Notify.create({
      ...baseConfig,
      message: `<span class="text-weight-bold font-serif">🌙 ${message}</span>`,
      caption: `<span class="text-grey-4">${caption}</span>`,
      icon: 'priority_high',
      color: 'warning',
      classes: `${baseConfig.classes} border-warning`
    });
  },

  // Confirmación Interactiva (Paso Sagrado)
  confirm(message, caption, onOk, onCancel = () => {}) {
    Notify.create({
      ...baseConfig,
      message: `<span class="text-h6 font-serif">✨ ${message}</span>`,
      caption: `<span class="text-subtitle2 text-grey-4">${caption}</span>`,
      icon: 'auto_fix_high',
      color: 'indigo-10',
      position: 'center',
      timeout: 0,
      multiLine: true,
      classes: 'glass-panel border-primary q-pa-lg cosmic-confirm-notify',
      actions: [
        { 
          label: 'SÍ, ES CORRECTO', 
          color: 'primary', 
          handler: onOk, 
          class: 'text-weight-bold q-px-md bg-primary text-white shadow-2' 
        },
        { 
          label: 'REVISAR', 
          color: 'grey-4', 
          handler: onCancel,
          class: 'q-ml-sm'
        }
      ]
    });
  }
};
