import { Notify } from 'quasar';

/**
 * Utilidad de Notificaciones Cósmicas para Numeris
 */

const baseConfig = {
  position: 'top',
  timeout: 3000,
  textColor: 'white',
  classes: 'cosmic-notify', // Clase base para el efecto cristal
  html: true
};

export const showNotify = {
  // Notificación de Éxito (Alineación Estelar - Borde Dorado)
  success(message, caption = 'La energía fluye correctamente') {
    Notify.create({
      ...baseConfig,
      message: `${message}`,
      caption: `${caption}`,
      icon: 'auto_awesome',
      color: 'transparent', // Usamos transparente para que mande nuestro CSS
      classes: `${baseConfig.classes} border-success`
    });
  },

  // Notificación de Error (Desalineación Cósmica - Borde Rojo Cristal)
  error(message, caption = 'La energía no pudo alinearse') {
    Notify.create({
      ...baseConfig,
      message: `${message}`,
      caption: `${caption}`,
      icon: 'warning',
      color: 'transparent',
      classes: `${baseConfig.classes} border-error`
    });
  },

  // Notificación de Información (Mensaje del Universo - Borde Azul)
  info(message, caption = 'Aviso del cosmos') {
    Notify.create({
      ...baseConfig,
      message: `${message}`,
      caption: `${caption}`,
      icon: 'info',
      color: 'transparent',
      classes: `${baseConfig.classes} border-primary`
    });
  },

  // Notificación de Advertencia (Eclipse Detectado - Borde Plateado)
  warning(message, caption = 'Atención a las señales') {
    Notify.create({
      ...baseConfig,
      message: `${message}`,
      caption: `${caption}`,
      icon: 'priority_high',
      color: 'transparent',
      classes: `${baseConfig.classes} border-warning`
    });
  },

  // Confirmación Interactiva (Paso Sagrado)
  confirm(message, caption, onOk, onCancel = () => {}) {
    Notify.create({
      ...baseConfig,
      message: `${message}`,
      caption: `${caption}`,
      icon: 'auto_fix_high',
      color: 'transparent',
      position: 'center',
      timeout: 0,
      multiLine: true,
      classes: 'cosmic-notify cosmic-confirm-notify q-pa-lg',
      actions: [
        { 
          label: 'SÍ, ES CORRECTO', 
          color: 'gold', 
          handler: onOk, 
          class: 'text-weight-bold q-px-md text-white' 
        },
        { 
          label: 'REVISAR', 
          color: 'grey-4', 
          handler: onCancel,
          class: 'q-ml-sm opacity-50'
        }
      ]
    });
  }
};
