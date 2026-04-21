# Configuración de CI/CD con GitHub Actions

## Descripción

Este pipeline ejecuta automáticamente las pruebas cada vez que haces un `git push` a la rama `main` o abres un Pull Request.

## Estructura del Workflow

### Ubicación
`.github/workflows/test.yml` - Este archivo define las acciones que GitHub ejecutará.

### Qué hace el workflow

El workflow tiene **2 jobs** (tareas) que se ejecutan en paralelo:

#### 1. Backend Tests
- Se posiciona en la carpeta `Num-Back`
- Instala Node.js versión 20
- Instala las dependencias con `npm ci`
- Ejecuta las pruebas con `npm test`

#### 2. Frontend Tests
- Se posiciona en la carpeta `Num-Front`
- Instala Node.js versión 20
- Instala las dependencias con `npm ci`
- Ejecuta las pruebas con `npm test`

## Cómo funciona

### Disparadores (triggers)
```yaml
on:
  push:
    branches: [main]      # Al hacer push a main
  pull_request:
    branches: [main]      # Al abrir PR a main
```

### Resultados
- **Check verde** ✅: Todas las pruebas pasaron → El código puede integrarse
- **X roja** ❌: Alguna prueba falló → El pipeline bloquea la integración

## Pasos para activar

1. **Subir el workflow a GitHub**
   ```bash
   git add .github/workflows/test.yml
   git commit -m "Add CI/CD workflow"
   git push origin main
   ```

2. **Verificar que funcione**
   - Ve a tu repositorio en GitHub
   - Haz clic en la pestaña "Actions"
   - Verás el workflow ejecutándose

3. **Probar localmente antes de push**
   ```bash
   # Backend
   cd Num-Back
   npm test

   # Frontend
   cd Num-Front
   npm test
   ```

## Ajustes útiles

### Cambiar la versión de Node.js
Busca `node-version: '20'` y cámbialo por la versión que uses.

### Agregar más ramas
```yaml
on:
  push:
    branches: [main, develop, staging]
```

### Ejecutar pruebas con coverage
```yaml
- name: Run tests with coverage
  run: npm run test:coverage
```

## Notas importantes

- Las pruebas se ejecutan en un entorno virtual de GitHub (Ubuntu)
- `npm ci` es más rápido y seguro que `npm install` para CI
- Si alguna prueba falla, verás el error detallado en el log del workflow
- Los jobs se ejecutan en paralelo para ser más rápidos
