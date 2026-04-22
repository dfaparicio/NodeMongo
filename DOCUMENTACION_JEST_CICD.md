# Documentación Técnica - JEST y CI/CD
## Proyecto: Numeris Astral

---

## 📋 Tabla de Contenidos

1. [Instalación de Dependencias](#instalación-de-dependencias)
2. [Archivos de Configuración](#archivos-de-configuración)
3. [Archivos de Pruebas](#archivos-de-pruebas)
4. [Scripts de Ejecución](#scripts-de-ejecución)
5. [Pipeline CI/CD](#pipeline-cicd)
6. [Flujo de Git con Pull Request](#flujo-de-git-con-pull-request)

---

## 📦 Instalación de Dependencias

### Backend (Num-Back)

| Comando | ¿Qué hace? | ¿Qué instala? |
|---------|------------|---------------|
| `npm install` | Instala todas las dependencias del proyecto | Todas las dependencias de producción y desarrollo |
| `npm install --save-dev jest` | Instala Jest como dependencia de desarrollo | Jest - Framework de pruebas |
| `npm install --save-dev mongodb-memory-server` | Instala servidor MongoDB en memoria | MongoDB simulado para pruebas sin BD real |
| `npm install --save-dev supertest` | Instala Supertest para pruebas HTTP | Herramienta para probar endpoints de Express |

**Comando completo de instalación:**
```bash
cd Num-Back
npm install
```

### Frontend (Num-Front)

| Comando | ¿Qué hace? | ¿Qué instala? |
|---------|------------|---------------|
| `npm install` | Instala todas las dependencias del proyecto | Todas las dependencias de producción y desarrollo |
| `npm install --save-dev jest` | Instala Jest como dependencia de desarrollo | Jest - Framework de pruebas |
| `npm install --save-dev @vue/test-utils` | Instala utilidades de prueba para Vue | Herramientas para probar componentes Vue |
| `npm install --save-dev @vue/vue3-jest` | Instala preprocesador de Vue para Jest | Transforma archivos .vue para Jest |
| `npm install --save-dev jest-environment-jsdom` | Instala entorno JSDOM para Jest | Simula el DOM del navegador en Node.js |
| `npm install --save-dev babel-jest` | Instala transformador Babel para Jest | Permite usar ES6+ en las pruebas |
| `npm install --save-dev @babel/core` | Instala núcleo de Babel | Compilador de JavaScript |
| `npm install --save-dev @babel/preset-env` | Instala preset de Babel | Configuración para soportar ES moderno |

**Comando completo de instalación:**
```bash
cd Num-Front
npm install
```

---

## ⚙️ Archivos de Configuración

### Backend (Num-Back)

| Archivo | Ruta | Función |
|---------|------|---------|
| **jest.config.js** | `Num-Back/jest.config.js` | Configura Jest: ambiente Node, patrones de test, timeout, cobertura mínima 50% |
| **jest.setup.js** | `Num-Back/jest.setup.js` | Configura MongoDB en memoria para pruebas, limpia BD entre tests |
| **.env.test** | `Num-Back/.env.test` | Variables de entorno exclusivas para pruebas (JWT, URLs, tokens de prueba) |

### Frontend (Num-Front)

| Archivo | Ruta | Función |
|---------|------|---------|
| **jest.config.js** | `Num-Front/jest.config.js` | Configura Jest: ambiente JSDOM, transformación de archivos .vue, Babel |
| **jest.setup.js** | `Num-Front/jest.setup.js` | Mocks globales: localStorage, window.open, matchMedia |
| **babel.config.js** | `Num-Front/babel.config.js` | Configura Babel: permite transpilar JavaScript moderno (ES6+) para Jest |

### CI/CD (GitHub)

| Archivo | Ruta | Función |
|---------|------|---------|
| **test.yml** | `.github/workflows/test.yml` | Pipeline de GitHub Actions: ejecuta pruebas de backend y frontend automáticamente |

---

## 🧪 Archivos de Pruebas

### Backend (Num-Back)

| Archivo | Ruta | Función |
|---------|------|---------|
| **auth.integration.test.js** | `Num-Back/__tests__/auth.integration.test.js` | Pruebas de autenticación: registro, login, renovación de token, rutas protegidas |
| **usuarios.integration.test.js** | `Num-Back/__tests__/usuarios.integration.test.js` | Pruebas CRUD de usuarios: buscar, actualizar, activar, inactivar, eliminar, cambio de contraseña |

### Frontend (Num-Front)

| Archivo | Ruta | Función |
|---------|------|---------|
| **services.test.js** | `Num-Front/__tests__/services/services.test.js` | Pruebas de servicios: getData, postData, putData, deleteData con mocks de axios |
| **functions.test.js** | `Num-Front/__tests__/utils/functions.test.js` | Pruebas de utilidades: formatoPesos, converFecha, resetearHoras, generarRangoFechas, obtenerEstadoLectura |

---

## 🚀 Scripts de Ejecución

### Backend (Num-Back)

En `package.json` del backend:

| Script | Comando | Función |
|--------|---------|---------|
| **test** | `npm test` | Ejecuta todas las pruebas una vez |
| **test:watch** | `npm run test:watch` | Ejecuta pruebas en modo observador (se reejecutan al guardar cambios) |
| **test:coverage** | `npm run test:coverage` | Ejecuta pruebas y genera reporte de cobertura de código |
| **test:verbose** | `npm run test:verbose` | Ejecuta pruebas con salida detallada |

**Ejemplo de uso:**
```bash
cd Num-Back
npm test                    # Ejecuta todas las pruebas
npm run test:watch          # Modo observador
npm run test:coverage       # Genera reporte de cobertura
```

### Frontend (Num-Front)

En `package.json` del frontend:

| Script | Comando | Función |
|--------|---------|---------|
| **test** | `npm test` | Ejecuta todas las pruebas una vez |
| **test:watch** | `npm run test:watch` | Ejecuta pruebas en modo observador |
| **test:coverage** | `npm run test:coverage` | Ejecuta pruebas y genera reporte de cobertura |
| **test:verbose** | `npm run test:verbose` | Ejecuta pruebas con salida detallada |

**Ejemplo de uso:**
```bash
cd Num-Front
npm test                    # Ejecuta todas las pruebas
npm run test:watch          # Modo observador
npm run test:coverage       # Genera reporte de cobertura
```

---

## 🔄 Pipeline CI/CD

### Archivo: `.github/workflows/test.yml`

#### Estructura del Pipeline

```
┌─────────────────────────────────────────────────────────────┐
│                    GITHUB ACTIONS                            │
│                  (Automático al hacer PR)                    │
└──────────────────────┬──────────────────────────────────────┘
                       │
           ┌───────────┴───────────┐
           │                       │
           ▼                       ▼
┌──────────────────────┐  ┌──────────────────────┐
│   JOB: Backend       │  │   JOB: Frontend      │
│                      │  │                      │
│ 1. Checkout          │  │ 1. Checkout          │
│ 2. Setup Node.js 22  │  │ 2. Setup Node.js 22  │
│ 3. npm install       │  │ 3. npm install       │
│ 4. npm test          │  │ 4. npm test          │
│                      │  │                      │
│ Variables de entorno:│  │ Variables de entorno:│
│ - NODE_ENV=test      │  │ - NODE_ENV=test      │
│ - SECRETORPRIVATEKEY │  │                      │
│ - RESEND_API_KEY     │  │                      │
│                      │  │                      │
│ Directorio: Num-Back │  │ Directorio: Num-Front │
└──────────────────────┘  └──────────────────────┘
           │                       │
           └───────────┬───────────┘
                       ▼
              ┌────────────────┐
              │  ✅ PASA       │ ❌ FALLA
              │  (VERDE)       │ (ROJO)
              └───────┬────────┘
                      │
        ✅ PASAN AMBOS │ AMBOS DEBEN PASAR
        ──────────────┴──────────────
                      │
                      ▼
            ┌─────────────────┐
            │   MERGE PERMITIDO   │
            │  (Se puede hacer merge a main) │
            └─────────────────┘
```

#### Detalles del Pipeline

**Disparadores (Triggers):**
- Se ejecuta automáticamente al hacer **push** a la rama `main`
- Se ejecuta automáticamente al crear un **Pull Request** a la rama `main`

**Job: Backend Tests**
1. **Checkout**: Descarga el código del repositorio
2. **Setup Node.js**: Configura Node.js versión 22
3. **Install dependencies**: Ejecuta `npm install --legacy-peer-deps` en `Num-Back`
4. **Run tests**: Ejecuta `npm test -- --verbose --no-coverage --detectOpenHandles`

**Variables de entorno del Backend:**
- `NODE_ENV=test`
- `SECRETORPRIVATEKEY=test_secret_key_12345_for_testing_only`
- `RESEND_API_KEY=re_test_dummy_key_for_testing`

**Job: Frontend Tests**
1. **Checkout**: Descarga el código del repositorio
2. **Setup Node.js**: Configura Node.js versión 22
3. **Install dependencies**: Ejecuta `npm install --legacy-peer-deps` en `Num-Front`
4. **Run tests**: Ejecuta `npm test -- --verbose --no-coverage`

**Variables de entorno del Frontend:**
- `NODE_ENV=test`

**Resultados:**
- ✅ **VERDE**: Ambos jobs pasan → Pull Request lista para merge
- ❌ **ROJO**: Al menos un job falla → No se permite hacer merge

---

## 🌿 Flujo de Git con Pull Request

### Diagrama de Flujo Completo

```
┌─────────────────────────────────────────────────────────────────┐
│                     DESARROLLO LOCAL                            │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
                    ┌────────────────┐
                    │  Rama: test    │
                    │ (git checkout test) │
                    └────────┬───────┘
                             │
                    [Desarrollar código]
                             │
                             ▼
                    ┌────────────────┐
                    │  git add .     │
                    │  (Staged files)│
                    └────────┬───────┘
                             │
                             ▼
                    ┌────────────────┐
                    │  git commit -m │
                    │  "Mensaje del  │
                    │   commit"      │
                    └────────┬───────┘
                             │
                             ▼
                    ┌────────────────┐
                    │  git push      │
                    │  origin test   │
                    └────────┬───────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                        GITHUB                                    │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
                    ┌────────────────┐
                    │  Crear PR      │
                    │  (Pull Request)│
                    │  test → main   │
                    └────────┬───────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                    GITHUB ACTIONS SE INICIA                      │
│                  (Automaticamente al crear PR)                   │
└────────────────────────────┬────────────────────────────────────┘
                             │
                    ┌────────┴────────┐
                    │                 │
                    ▼                 ▼
        ┌───────────────┐   ┌───────────────┐
        │ Backend Tests │   │ Frontend Tests│
        └───────┬───────┘   └───────┬───────┘
                │                   │
        ┌───────┴───────┐   ┌───────┴───────┐
        │ PASA ✅       │   │ FALLA ❌      │
        │ (Verde)       │   │ (Rojo)        │
        └───────┬───────┘   └───────┬───────┘
                │                   │
                ▼                   ▼
        ┌───────────────┐   ┌───────────────┐
        │    MERGE      │   │  NO MERGE     │
        │   PERMITIDO   │   │   BLOQUEADO   │
        └───────┬───────┘   └───────┬───────┘
                │                   │
                ▼                   ▼
        ┌───────────────┐   ┌───────────────┐
        │  Se puede     │   │  Corregir     │
        │  hacer merge  │   │  código y     │
        │  a main       │   │  hacer push   │
        └───────────────┘   └───────┬───────┘
                                    │
                                    ▼
                           [Ciclo se repite]
                           (Tests se ejecutan)
```

### Pasos Detallados

#### 1. Desarrollo en Rama `test`
```bash
git checkout test
# Realizar cambios en el código
```

#### 2. Staged y Commit
```bash
git add .
git commit -m "Descripción de los cambios"
```

#### 3. Push a GitHub
```bash
git push origin test
```

#### 4. Crear Pull Request
- Ir a GitHub
- Crear Pull Request desde `test` hacia `main`
- **JEST se ejecuta automáticamente**

#### 5. Ejecución de Tests (GitHub Actions)

**Backend Tests:**
- Ejecuta `npm test` en `Num-Back`
- Prueba 5 casos en `auth.integration.test.js`
- Prueba 10 casos en `usuarios.integration.test.js`
- Total: 15 pruebas de backend

**Frontend Tests:**
- Ejecuta `npm test` en `Num-Front`
- Prueba 8 casos en `services.test.js`
- Prueba 15 casos en `functions.test.js`
- Total: 23 pruebas de frontend

#### 6. Resultados

**✅ PASA (Verde):**
```
Backend Tests: ✅ 15/15 pasaron
Frontend Tests: ✅ 23/23 pasaron
```
→ Pull Request lista para hacer **merge a `main`**

**❌ FALLA (Rojo):**
```
Backend Tests: ❌ 1/15 falló
Frontend Tests: ✅ 23/23 pasaron
```
→ **No se permite merge**
→ Corregir el código → hacer push → tests se reejecutan

---

## 📊 Resumen de Pruebas

### Backend (15 pruebas)

| Archivo | Pruebas | Qué verifica |
|---------|---------|--------------|
| `auth.integration.test.js` | 5 | Registro, login, token, rutas protegidas |
| `usuarios.integration.test.js` | 10 | CRUD usuarios, búsqueda, activación, password, eliminación |

### Frontend (23 pruebas)

| Archivo | Pruebas | Qué verifica |
|---------|---------|--------------|
| `services.test.js` | 8 | GET, POST, PUT, DELETE y manejo de errores |
| `functions.test.js` | 15 | Formato precios, fechas, rangos, estados |

### Total: 38 pruebas

---

## 🔧 Comandos Rápidos

### Backend
```bash
cd Num-Back
npm test                # Ejecutar pruebas
npm run test:watch      # Modo observador
npm run test:coverage   # Reporte de cobertura
```

### Frontend
```bash
cd Num-Front
npm test                # Ejecutar pruebas
npm run test:watch      # Modo observador
npm run test:coverage   # Reporte de cobertura
```

### Git
```bash
git checkout test       # Cambiar a rama test
git add .               # Staged todos los cambios
git commit -m "msg"     # Commit con mensaje
git push origin test    # Push a GitHub
```

---

## 📁 Estructura de Archivos de Pruebas

```
NodeMongo/
├── .github/
│   └── workflows/
│       └── test.yml              # Pipeline CI/CD
├── Num-Back/
│   ├── jest.config.js            # Configuración Jest Backend
│   ├── jest.setup.js             # Setup MongoDB en memoria
│   ├── .env.test                 # Variables de entorno pruebas
│   ├── package.json              # Scripts de prueba
│   └── __tests__/
│       ├── auth.integration.test.js
│       └── usuarios.integration.test.js
└── Num-Front/
    ├── jest.config.js            # Configuración Jest Frontend
    ├── jest.setup.js             # Mocks globales
    ├── babel.config.js           # Configuración Babel
    ├── package.json              # Scripts de prueba
    └── __tests__/
        ├── services/
        │   └── services.test.js
        └── utils/
            └── functions.test.js
```

---

*Documentación generada para el proyecto Numeris Astral - JEST y CI/CD*
