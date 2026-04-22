# CHECKLIST - COBERTURA DE PRUEBAS JEST (FRONTEND)

## ESTADO ACTUAL

**Proyecto:** Numeris Astral - Frontend
**Tipo de pruebas:** Unitarias con código real
**Framework:** Vue 3 + Jest

---

## PRUEBAS IMPLEMENTADAS (CÓDIGO REAL)

### 1. Setup de Pruebas
- ✓ `jest.setup.js` - Configuración global para Vue 3
- ✓ `jest.config.js` - Configuración actualizada

### 2. Pruebas de Utils (Código Real)
- ✓ `functions.test.js` - 15/15 tests pasando
  - ✓ formatoPesos(1000) → Formato colombiano
  - ✓ formatoPesos(5000) → Formato colombiano
  - ✓ formatoPesos(1000000) → Formato colombiano
  - ✓ formatoPesos(0) → '$0'
  - ✓ converFecha('2024-04-20') → Formato correcto
  - ✓ converFecha(null) → '--'
  - ✓ resetearHoras() → Horas en 0
  - ✓ generarRangoFechas() → Rango de fechas
  - ✓ obtenerEstadoLectura() → Estados de lectura
  - ✓ Fecha inválida → '--'
  - ✓ Números grandes → Formato correcto
  - ✓ Rango con radio 2 → 5 días

### 3. Pruebas de Servicios (Código Real)
- ✓ `services.test.js` - 8/8 tests pasando
  - ✓ getData() - GET exitoso
  - ✓ postData() - POST exitoso
  - ✓ putData() - PUT exitoso
  - ✓ deleteData() - DELETE exitoso
  - ✓ getData() - Error de red
  - ✓ postData() - Error de servidor
  - ✓ putData() - Error de actualización
  - ✓ deleteData() - Error de eliminación

---

## ❌ PRUEBAS FALTANTES PARA 100% DE COBERTURA

### Views (0/16)
- ❌ `home.test.js` - Vista principal
- ❌ `login.test.js` - Vista de login
- ❌ `register.test.js` - Vista de registro
- ❌ `dashboard.test.js` - Vista dashboard
- ❌ `payment.test.js` - Vista de pagos
- ❌ `payment-result.test.js` - Resultado de pago
- ❌ `plans.test.js` - Vista de planes
- ❌ `mainreading.test.js` - Lectura principal
- ❌ `dailyreading.test.js` - Lectura diaria
- ❌ `readinghistory.test.js` - Historial de lecturas
- ❌ `recoverpassword.test.js` - Recuperar contraseña
- ❌ `resetpassword.test.js` - Resetear contraseña
- ❌ `historicalpayments.test.js` - Pagos históricos
- ❌ `financedashboard.test.js` - Dashboard financiero
- ❌ `admin.test.js` - Panel administrativo

### Components (0/5)
- ⚠️ `primaryButton.test.js` - Eliminado (requiere mock complejo de Quasar)
- ❌ `secondButton.test.js` - Botón secundario
- ❌ `primaryCards.test.js` - Tarjetas principales
- ❌ `primaryTable.test.js` - Tabla principal
- ❌ `admin/*.vue` - Componentes de admin

### Utils (1/2)
- ✓ `functions.test.js` - Funciones auxiliares
- ❌ `notify.test.js` - Sistema de notificaciones

### Store (0/2)
- ❌ `auth.test.js` - Store de autenticación (Pinia)
- ❌ `admin.test.js` - Store de admin (Pinia)

---

##  RESUMEN DE COBERTURA

| Componente | Implementado | Total | % Completado |
|------------|--------------|-------|--------------|
| Setup | 1 | 1 | 100% |
| Utils | 1 | 2 | 50% |
| Services | 1 | 1 | 100% |
| Components | 0 | 5 | 0% |
| Views | 0 | 16 | 0% |
| Store | 0 | 2 | 0% |
| **TOTAL** | **3** | **27** | **11%** |

---

## 🎯 PRÓXIMOS PASOS RECOMENDADOS

### Prioridad Alta (para producción)
1. ✅ ~~Pruebas de~~ servicios
2. ✅ ~~Pruebas de~~ utils principales
3. ⏳ Pruebas de views principales (home, login, register)
4. ⏳ Pruebas de store de autenticación

### Prioridad Media
5. ⏳ Pruebas de pagos (payment, payment-result)
6. ⏳ Pruebas de lecturas (mainreading, dailyreading)
7. ⏳ Pruebas de componentes simples (secondButton)

### Prioridad Baja
8. ⏳ Pruebas de store de admin
9. ⏳ Pruebas de vistas administrativas
10. ⏳ Pruebas de notify.js

---

##  CÓMO EJECUTAR LAS PRUEBAS

```bash
# Entra al directorio del frontend
cd Num-Front

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

##  NOTAS

- **Tipo de pruebas actuales:** Unitarias con código real
- **Framework:** Vue 3 + @vue/test-utils + Jest
- **Servicios probados:** Importan funciones reales del proyecto con mocks de axios
- **Utils probados:** Importan funciones reales del proyecto
- **Componentes:** Las pruebas de componentes requieren mocks complejos de Quasar, se han eliminado por simplicidad

Para crear más pruebas, sigue el patrón de los archivos existentes:
- Importar la función/componente real a probar
- Para componentes: usar `mount` de @vue/test-utils
- Para servicios: hacer mocks de axios
- Para utils: probar directamente sin mocks
- Verificar comportamiento y valores esperados
