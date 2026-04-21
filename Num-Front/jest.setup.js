/**
 * ===============================================
 * SETUP DE PRUEBAS - FRONTEND (Vue 3)
 * Proyecto: Numeris Astral - Frontend
 * ===============================================
 */

// Configuración global para las pruebas de Vue
global.matchMedia = jest.fn().mockImplementation(query => ({
  matches: false,
  media: query
}));

// Mock de window.open (usado en functions.js para generar PDFs)
global.open = jest.fn();

// Mock de localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn()
};
global.localStorage = localStorageMock;
