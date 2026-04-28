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

// Mock de useRouter
jest.mock('vue-router', () => ({
  ...jest.requireActual('vue-router'),
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    go: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    currentRoute: { value: { path: '/' } },
    resolve: jest.fn(() => ({ href: '/' }))
  }),
  RouterLink: {
    name: 'RouterLink',
    template: '<a><slot></slot></a>'
  }
}));

// Mock de useAuthStore
jest.mock('./src/store/auth.js', () => ({
  useAuthStore: () => ({
    token: null,
    user: null,
    lecturasguardadas: [],
    setLectura: jest.fn(),
    setPagosUsuario: jest.fn()
  })
}));

// Mock de servicios
jest.mock('./src/services/services.js', () => ({
  postData: jest.fn(),
  getData: jest.fn(),
  putData: jest.fn(),
  deleteData: jest.fn()
}));
