# 📋 CHECKLIST - COBERTURA DE PRUEBAS JEST

## 🎯 ESTADO ACTUAL

**Proyecto:** Numeris Astral - Backend
**Tipo de pruebas:** Integración REALES (código del proyecto)
**Base de datos:** MongoDB en memoria (mongodb-memory-server)

---

## ✅ PRUEBAS IMPLEMENTADAS

### 1. Setup de Pruebas
- ✅ `jest.setup.js` - Configuración de MongoDB en memoria
- ✅ `jest.config.js` - Configuración de Jest habilitada

### 2. Pruebas de Integración - Auth
- ✅ `auth.integration.test.js`
  - ✅ Registro de usuario (POST /api/auth/registro)
  - ✅ Login con credenciales correctas (POST /api/auth/login)
  - ✅ Login con contraseña incorrecta
  - ✅ Acceso a ruta protegida con token (GET /api/auth/renew)
  - ✅ Acceso a ruta protegida sin token

### 3. Pruebas de Integración - Usuarios CRUD
- ✅ `usuarios.integration.test.js`
  - ✅ Crear usuario (POST /api/usuario)
  - ✅ Obtener usuario por email (GET /api/usuario/email)
  - ✅ Actualizar usuario (PUT /api/usuario/:id)
  - ✅ Activar usuario (PUT /api/usuario/activar/:id)
  - ✅ Inactivar usuario (PUT /api/usuario/inactivar/:id)
  - ✅ Cambiar contraseña (PUT /api/usuario/password/:id)
  - ✅ Cambiar contraseña con contraseña incorrecta
  - ✅ Eliminar usuario (DELETE /api/usuario/:id)
  - ✅ Acceder sin token
  - ✅ Acceder con token inválido

---

## ❌ PRUEBAS FALTANTES PARA 100% DE COBERTURA

### Models (2/3)
- ❌ `lectura.model.test.js` - Modelo de Lectura
- ❌ `pago.model.test.js` - Modelo de Pago
- ✅ `usuario` - Probado en integración

### Controllers (2/5)
- ❌ `lecturas.controller.test.js` - Controlador de Lecturas
- ❌ `pagos.controller.test.js` - Controlador de Pagos
- ✅ `auth.controller` - Probado en integración
- ✅ `usuario.controller` - Probado en integración

### Routes (0/5)
- ❌ `auth.routes.test.js` - Rutas de autenticación
- ❌ `lecturas.routes.test.js` - Rutas de lecturas
- ❌ `mercadopago.routes.test.js` - Rutas de MercadoPago
- ❌ `pagos.routes.test.js` - Rutas de pagos
- ❌ `usuario.routes.test.js` - Rutas de usuarios

### Middlewares (0/8)
- ❌ `validar-jwt.test.js` - Validación de JWT
- ❌ `validar-rol.test.js` - Validación de roles
- ❌ `validarCampos.test.js` - Validación de campos
- ❌ `validarLecturas.test.js` - Validación de lecturas
- ❌ `validarPagos.test.js` - Validación de pagos
- ❌ `validarRegistro.test.js` - Validación de registro
- ❌ `validarUsuario.test.js` - Validación de usuario
- ❌ `verificarLecturas.test.js` - Verificación de lecturas
- ❌ `verificarPagoExiste.test.js` - Verificación de pagos

### Helpers (0/6)
- ❌ `fechas.test.js` - Manejo de fechas
- ❌ `generar-jwt.test.js` - Generación de tokens JWT
- ❌ `mailer.test.js` - Envío de emails
- ❌ `nodemailer.test.js` - Configuración de email
- ❌ `pagos.test.js` - Lógica de pagos

### Integration Tests Adicionales
- ❌ `lecturas.integration.test.js` - CRUD de lecturas numerológicas
- ❌ `pagos.integration.test.js` - Proceso de pagos completo
- ❌ `mercadopago.integration.test.js` - Integración con MercadoPago

### Otros
- ❌ `app.test.js` - Configuración principal de Express
- ❌ `database.test.js` - Conexión a MongoDB
- ❌ `cron-tasks.test.js` - Tareas programadas (lecturas diarias, expiración)

---

## 📊 RESUMEN DE COBERTURA

| Componente | Implementado | Total | % Completado |
|------------|--------------|-------|--------------|
| Models | 1 | 3 | 33% |
| Controllers | 3 | 5 | 60% |
| Routes | 0 | 5 | 0% |
| Middlewares | 0 | 8 | 0% |
| Helpers | 0 | 6 | 0% |
| Integration Tests | 2 | 5 | 40% |
| **TOTAL** | **6** | **32** | **19%** |

---

## 🎯 PRÓXIMOS PASOS RECOMENDADOS

### Prioridad Alta (para producción)
1. ✅ ~~Pruebas de autenticación~~
2. ✅ ~~Pruebas de CRUD usuarios~~
3. ⏳ Pruebas de lecturas (core del negocio)
4. ⏳ Pruebas de pagos (core del negocio)

### Prioridad Media
5. ⏳ Pruebas de middlewares críticos (JWT, validaciones)
6. ⏳ Pruebas de helpers (fechas, JWT)

### Prioridad Baja
7. ⏳ Pruebas de routes
8. ⏳ Pruebas de tareas programadas (cron)

---

## 🚀 CÓMO EJECUTAR LAS PRUEBAS

```bash
# Ejecutar todas las pruebas
npm run test

# Ejecutar pruebas en modo watch
npm run test:watch

# Ejecutar pruebas con cobertura
npm run test:coverage

# Ejecutar pruebas en modo verbose
npm run test:verbose
```

---

## 📝 NOTAS

- **Tipo de pruebas actuales:** Integración con código real
- **Base de datos:** MongoDB en memoria (mongodb-memory-server)
- **Requests HTTP:** Reales con supertest
- **Autenticación:** JWT real generado en pruebas
- **No se usan mocks de modelos o DB**

Para crear más pruebas, sigue el patrón de `auth.integration.test.js` y `usuarios.integration.test.js`.
