/**
 * ===============================================
 * CONFIGURACIÓN DE BABEL PARA PRUEBAS
 * Proyecto: Numeris Astral - Frontend (Vue 3)
 * ===============================================
 *
 * Esta configuración permite que Jest transpile
 * correctamente los archivos JavaScript modernos.
 */

export default {
  presets: [
    ['@babel/preset-env', {
      targets: {
        node: 'current'
      }
    }]
  ]
};
