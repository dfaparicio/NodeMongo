/**
 * ===============================================
 * CONFIGURACIÓN DE JEST PARA BACKEND
 * Proyecto: Numeris Astral - Backend
 * ===============================================
 *
 * Esta configuración está diseñada para probar una aplicación
 * Node.js con Express, MongoDB y ES modules.
 */

export default {
  // ==================================================
  // 1. AMBIENTE DE PRUEBAS
  // ==================================================
  testEnvironment: 'node',

  // ==================================================
  // 2. PATRONES PARA BUSCAR ARCHIVOS DE PRUEBA
  // ==================================================
  // Busca archivos que terminen en .test.js o .spec.js
  // y archivos dentro de carpetas __tests__
  testMatch: [
    '**/__tests__/**/*.js',
    '**/?(*.)+(spec|test).js'
  ],

  // ==================================================
  // 3. EXTENSIONES DE ARCHIVOS
  // ==================================================
  moduleFileExtensions: ['js', 'json', 'mjs'],

  // ==================================================
  // 4. CONFIGURACIÓN PARA ES MODULES
  // ==================================================
  // Como el backend usa "type": "module" en package.json
  // Necesitamos esta configuración especial
  transform: {},
  preset: null,

  // ==================================================
  // 5. DIRECTORIOS A IGNORAR
  // ==================================================
  testPathIgnorePatterns: [
    '/node_modules/',
    '/dist/',
    '/build/'
  ],

  // ==================================================
  // 6. COBERTURA DE CÓDIGO (opcional pero útil)
  // ==================================================
  coverageProvider: 'v8',
  collectCoverageFrom: [
    'controllers/**/*.js',
    'routes/**/*.js',
    'models/**/*.js',
    'helpers/**/*.js',
    '!**/node_modules/**',
    '!**/jest.config.js',
    '!**/jest.setup.js'
  ],

  // ==================================================
  // 7. COBERTURA MÍNIMA REQUERIDA
  // ==================================================
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 50,
      lines: 50,
      statements: 50
    }
  },

  // ==================================================
  // 8. ALIASES DE MÓDULOS (si se usan)
  // ==================================================
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1'
  },

  // ==================================================
  // 9. ARCHIVO DE SETUP GLOBAL
  // ==================================================
  setupFilesAfterEnv: ['./jest.setup.js'],

  // ==================================================
  // 10. TIMEOUT POR DEFECTO
  // ==================================================
  // 10 segundos para APIs externas y operaciones de DB
  testTimeout: 10000,

  // ==================================================
  // 11. FORMATO DE SALIDA
  // ==================================================
  verbose: true
};
