🧪 Guía Completa de Implementación de Jest
¿Qué es Jest y por qué lo usamos?
Jest es una herramienta para probar código automáticamente. Imagina que tienes que probar manualmente cada botón, cada formulario, cada función... llevaría horas. Con Jest, esas pruebas se ejecutan en segundos cuando hacemos cambios.

Ventajas:

Detecta errores antes de producción - Los bugs se descubren en desarrollo, no en producción
Ahorra tiempo de desarrollo - Un clic ejecuta todas las pruebas
Documentación viva del código - Las pruebas muestran cómo se usa cada función
Permite refactorizar con confianza - Cambias código sin miedo de romper nada que ya funciona
📦 Instalación

npm install --save-dev jest @vue/test-utils @vue/vue3-jest babel-jest jest-environment-jsdom

¿Qué hace cada paquete?

Paquete	Para qué sirve
jest	Framework de pruebas (ejecuta los tests)
@vue/test-utils	Herramientas para montar componentes Vue en pruebas
@vue/vue3-jest	Transforma componentes Vue a JS para que Jest las entienda
babel-jest	Traduce JS moderno a JS compatible con navegadores
jest-environment-jsdom	Simula un navegador en las pruebas (para Vue)

¿Por qué --save-dev?
dev significa "development only" - estas herramientas solo se necesitan mientras desarrollamos. No se envían al servidor final, manteniendo el proyecto más ligero y rápido en producción.

⚙️ package.json - Scripts de pruebas
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "test:verbose": "jest --verbose"
  }
}

Para qué sirve cada script:
Script	¿Qué hace?	¿Cuándo usarlo?

npm test	Ejecuta todas las pruebas una vez	Antes de subir cambios o desplegar

npm run test:watch	Ejecuta pruebas y las repite cuando guardas archivos	Mientras programas, para ver resultados rápidos

npm run test:coverage	Muestra qué porcentaje del código está probado	Para saber qué partes necesitan más pruebas

npm run test:verbose	Muestra todos los detalles de cada prueba	Cuando algo falla y necesitas depurar

📁 Resumen rapido 

Archivo	Proyecto	Función principal
babel.config.js	Frontend	Traduce JS moderno para navegadores
jest.config.js	Backend	Configura cómo encontrar y ejecutar pruebas
jest.setup.js	Backend	Prepara MongoDB en memoria y limpia datos
jest.config.js	Frontend	Configura pruebas para Vue 3
jest.setup.js	Frontend	Mocks de localStorage y window para pruebas Vue



📁 Archivos de configuración
babel.config.js (Num-Front)
export default {
  presets: ['@babel/preset-env', {
    targets: { node: 'current' }
  }]
}
Para qué sirve:
Tu proyecto usa Vue 3 y JavaScript moderno (ES6+, módulos, operadores modernos como ?). Babel "traduce" este código a JavaScript que navegadores viejos entienden antes de que Jest ejecute las pruebas.

jest.config.js (Num-Backend)

export default {
  testEnvironment: 'node',           // Usa Node.js (sin navegador, más rápido)
  setupFilesAfterEnv: ['./jest.setup.js'],  // Carga setup de BD en memoria
  testMatch: [                           // Dónde buscar archivos de prueba
    '**/__tests__/**/*.js',
    '**/?(*.)+(spec|test).js'
  ],
  moduleFileExtensions: ['js', 'json', 'mjs'],  // Extensiones que reconoce
  collectCoverageFrom: [                      // Qué archivos/carpas analizar para cobertura
    'controllers/**/*.js',
    'routes/**/*.js',
    'models/**/*.js',
    'helpers/**/*.js',
    '!**/node_modules/**',
    '!**/jest.config.js',
    '!**/jest.setup.js'
  ],
  coverageThreshold: {                        // Requiere mínimo 50% de cobertura
    global: {
      branches: 50,
      functions: 50,
      lines: 50,
      statements: 50
    }
  }
}

Para qué sirve cada parte:

testEnvironment: Define qué tipo de entorno usar (Node para backend)

setupFilesAfterEnv: Qué archivo cargar antes de las pruebas (setup de MongoDB)

testMatch: Dónde buscar los archivos de prueba

collectCoverageFrom: Qué carpetas incluir en el análisis de cobertura

coverageThreshold: Qué porcentaje mínimo de código debe estar probado




jest.setup.js (Num-Backend)

import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

let mongoServer;

beforeAll(async () => {
  // Levanta MongoDB en memoria antes de TODAS las pruebas
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri, { dbName: 'test_numeris_astral' });
});

afterEach(async () => {
  // Limpia la base de datos después de CADA prueba
  // Así cada prueba empieza "limpia" y no afecta a otras
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  // Cierra MongoDB y libera memoria al FINAL de TODAS las pruebas
  await mongoose.disconnect();
  await mongoServer.stop();
});

Para qué sirve cada función:

beforeAll: Se ejecuta UNA VEZ antes de todas las pruebas (levanta BD)
afterEach: Se ejecuta después de CADA prueba (limpia BD)
afterAll: Se ejecuta UNA VEZ al final (cierra BD)
jest.config.js (Num-Front)

export default {
  testEnvironment: 'jsdom',                    // Simula navegador (para probar componentes)
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],  // Carga setup de mocks
  testEnvironmentOptions: {
    customExportConditions: ["node", "node-addons"],
  },
  testMatch: [                                 // Dónde buscar archivos de prueba
    '**/__tests__/**/*.[jt]s?(x)',
    '**/?(*.)+(spec|test).[jt]s?(x)'
  ],
  moduleFileExtensions: ['vue', 'js', 'json', 'mjs'],  // Extensiones que reconoce
  transform: {                                   // Cómo procesar archivos
    '^.+\\.vue$': '@vue/vue3-jest',  // Transforma Vue a JS
    '^.+\\.(js|jsx|mjs)$': 'babel-jest'  // Traduce JS moderno
  },
  verbose: true,                                  // Muestra detalles en consola
  testTimeout: 10000                              // 10 segundos máx por prueba
};
Para qué sirve cada parte:

testEnvironment: jsdom: Simula DOM del navegador para pruebas Vue
transform: Convierte Vue y JS moderno a JS que Jest entienda
setupFilesAfterEnv: Carga mocks antes de las pruebas
testMatch: Dónde encontrar archivos de prueba
verbose: Muestra salida detallada en consola
jest.setup.js (Num-Front)

global.matchMedia = jest.fn().mockImplementation(query => ({
  matches: false,
  media: query
}));

// Mock de window.open (usado en funciones.js para generar PDFs)
global.open = jest.fn();

// Mock de localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn()
};
global.localStorage = localStorageMock;
Para qué sirve cada mock:

matchMedia: Simula queries de CSS para responsive (ej: mobile, desktop)
window.open: Evita que se abran ventanas reales durante pruebas
localStorage: Guarda datos sin afectar navegador real
🧪 Cómo funcionan las pruebas - Patrón AAA
Las pruebas usan el patrón AAA: Arrange (Preparar) → Act (Actuar) → Assert (Verificar).

Ejemplo:

test('Debe crear usuario', async () => {
  // ARRANGE (Preparar)
  const nuevoUsuario = {
    nombre: 'Juan',
    email: 'juan@test.com',
    password: 'Password123!'
  };
  
  // ACT (Actuar)
  const response = await crearUsuario(nuevoUsuario);
  
  // ASSERT (Verificar)
  expect(response).toHaveProperty('id');
  expect(response.nombre).toBe('Juan');
});

📂 Archivos de prueba creados
Backend (Num-Back)
Archivo	Qué prueba	Tipo
auth.integration.test.js	Registro, login, autenticación	Integración
usuarios.integration.test.js	CRUD de usuarios	Integración
Frontend (Num-Front)
Archivo	Qué prueba	Tipo
functions.test.js	Utilidades de fechas y moneda	Unitaria
services.test.js	Servicios HTTP con axios	Unitaria

🎯 Pruebas implementadas (35 total)

🎯Backend: 12 pruebas
Registro de usuario
Login con credenciales correctas
Rechazo de login con contraseña incorrecta
Acceso a rutas protegidas con token
Crear usuario (POST)
Obtener usuario por email (GET)
Activar usuario (PUT)
Inactivar usuario (PUT)
Cambiar contraseña (PUT)
Eliminar usuario (DELETE)
Rechazo de acceso sin token
Rechazo de acceso con token inválido

🎯Frontend: 23 pruebas
Formato de moneda ($1,000, $5.000, etc.)
Conversión de fechas string a formato local
Resetear horas de fechas a 0
Generar rango de fechas
Estados de lectura (encontrada, pasada, futura, no generada)
Llamadas HTTP GET (éxito y error)
Llamadas HTTP POST (éxito y error)
Llamadas HTTP PUT (éxito y error)
Llamadas HTTP DELETE (éxito y error)
Renderizado de componentes (PrimaryButton)
Props de componentes (label, icon, to)
Eventos de componentes (click)