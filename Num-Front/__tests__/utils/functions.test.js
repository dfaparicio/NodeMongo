/**
 * ===============================================
 * PRUEBAS DE UTILIDADES - FUNCIÓNES REALES
 * Proyecto: Numeris Astral - Frontend
 * ===============================================
 *
 * Estas pruebas ejecutan CÓDIGO REAL del proyecto
 * probando las funciones auxiliares.
 *
 * PRUEBAS REALES:
 * - Conversión de fechas
 * - Formato de moneda
 * - Cálculo de rango de fechas
 * - Estado de lecturas
 */

import { describe, test, expect, beforeEach } from '@jest/globals';
import { converFecha, formatoPesos, resetearHoras, generarRangoFechas, obtenerEstadoLectura } from '../../src/utils/functions';

describe('🧪 PRUEBAS DE UTILIDADES - CÓDIGO REAL', () => {

    // ==================================================
    // 1. PRUEBA: FORMATEO DE PRECIOS BÁSICO
    // ==================================================
    test('Debe formatear 1000 correctamente (formato colombiano)', () => {
        const resultado = formatoPesos(1000);
        // En Colombia se usa punto para miles: $1.000
        expect(resultado).toContain('$1.000');
    });

    // ==================================================
    // 2. PRUEBA: FORMATEO DE PRECIOS CON MILES
    // ==================================================
    test('Debe formatear 5000 correctamente (formato colombiano)', () => {
        const resultado = formatoPesos(5000);
        expect(resultado).toContain('$5.000');
    });

    // ==================================================
    // 3. PRUEBA: FORMATEO DE PRECIOS CON MILLONES
    // ==================================================
    test('Debe formatear 1000000 correctamente (formato colombiano)', () => {
        const resultado = formatoPesos(1000000);
        // En Colombia: 1.000.000 (un millón)
        expect(resultado).toContain('$1.000.000');
    });

    // ==================================================
    // 4. PRUEBA: FORMATEO DE CERO
    // ==================================================
    test('Debe formatear 0 como $0', () => {
        const resultado = formatoPesos(0);
        expect(resultado).toBe('$0');
    });

    // ==================================================
    // 5. PRUEBA: CONVERSIÓN DE FECHA VÁLIDA (STRING YYYY-MM-DD)
    // ==================================================
    test('Debe convertir una fecha string YYYY-MM-DD a formato local', () => {
        const resultado = converFecha('2024-04-20');
        expect(resultado).toContain('2024');
        expect(resultado).toContain('abril');
        expect(resultado).not.toBe('--');
    });

    // ==================================================
    // 6. PRUEBA: CONVERSIÓN DE FECHA NULA
    // ==================================================
    test('Debe devolver -- para fecha nula', () => {
        expect(converFecha(null)).toBe('--');
        expect(converFecha(undefined)).toBe('--');
        expect(converFecha('')).toBe('--');
    });

    // ==================================================
    // 7. PRUEBA: RESETEAR HORAS
    // ==================================================
    test('Debe resetear las horas de una fecha a 0', () => {
        const fecha = new Date('2024-04-20T15:30:00');
        const fechaReset = resetearHoras(fecha);
        const horas = fechaReset.getHours();
        const minutos = fechaReset.getMinutes();
        const segundos = fechaReset.getSeconds();

        expect(horas).toBe(0);
        expect(minutos).toBe(0);
        expect(segundos).toBe(0);
    });

    // ==================================================
    // 8. PRUEBA: GENERAR RANGO DE FECHAS
    // ==================================================
    test('Debe generar un rango de fechas alrededor de una fecha central', () => {
        const centro = new Date('2024-04-20');
        const radio = 1;
        const stringHoy = converFecha(centro);

        const resultado = generarRangoFechas(centro, radio, stringHoy);

        expect(resultado).toHaveLength(3); // -1, 0, +1

        // Verificar que exactamente un elemento es "hoy"
        const hoyCount = resultado.filter(r => r.isHoy).length;
        expect(hoyCount).toBe(1);

        // Verificar que al menos uno de los elementos tiene el string correcto
        const tieneHoyString = resultado.some(r => r.str === stringHoy);
        expect(tieneHoyString).toBe(true);
    });

    // ==================================================
    // 9. PRUEBA: OBTENER ESTADO LECTURA - ENCONTRADA
    // ==================================================
    test('Debe devolver "encontrada" cuando existe lectura', () => {
        const hoy = new Date('2024-04-20');
        const fechaSeleccionada = new Date('2024-04-20');
        const lectura = { contenido: { numero: 5 } };

        const resultado = obtenerEstadoLectura(lectura, fechaSeleccionada, hoy);
        expect(resultado).toBe('encontrada');
    });

    // ==================================================
    // 10. PRUEBA: OBTENER ESTADO LECTURA - PASADA
    // ==================================================
    test('Debe devolver "pasada_sin_generar" cuando la fecha es pasada', () => {
        const hoy = new Date('2024-04-20');
        const fechaSeleccionada = new Date('2024-04-15');
        const lectura = null;

        const resultado = obtenerEstadoLectura(lectura, fechaSeleccionada, hoy);
        expect(resultado).toBe('pasada_sin_generar');
    });

    // ==================================================
    // 11. PRUEBA: OBTENER ESTADO LECTURA - FUTURA
    // ==================================================
    test('Debe devolver "futura" cuando la fecha es futura', () => {
        const hoy = new Date('2024-04-20');
        const fechaSeleccionada = new Date('2024-04-25');
        const lectura = null;

        const resultado = obtenerEstadoLectura(lectura, fechaSeleccionada, hoy);
        expect(resultado).toBe('futura');
    });

    // ==================================================
    // 12. PRUEBA: OBTENER ESTADO LECTURA - HOY SIN GENERAR
    // ==================================================
    test('Debe devolver "no_generada_hoy" cuando es hoy y no hay lectura', () => {
        const hoy = new Date('2024-04-20');
        const fechaSeleccionada = new Date('2024-04-20');
        const lectura = null;

        const resultado = obtenerEstadoLectura(lectura, fechaSeleccionada, hoy);
        expect(resultado).toBe('no_generada_hoy');
    });

    // ==================================================
    // 13. PRUEBA: FECHA INVÁLIDA
    // ==================================================
    test('Debe devolver -- para fecha inválida', () => {
        expect(converFecha('fecha-invalida')).toBe('--');
    });

    // ==================================================
    // 14. PRUEBA: FORMATO PRECIOS CON NÚMEROS GRANDES
    // ==================================================
    test('Debe formatear correctamente números grandes (formato colombiano)', () => {
        expect(formatoPesos(10000000)).toContain('$10.000.000');
        expect(formatoPesos(999999999)).toContain('$999.999.999');
    });

    // ==================================================
    // 15. PRUEBA: RANGO DE FECHAS CON RADIO 2
    // ==================================================
    test('Debe generar rango de 5 días con radio 2', () => {
        const centro = new Date('2024-04-20');
        const radio = 2;
        const stringHoy = converFecha(centro);

        const resultado = generarRangoFechas(centro, radio, stringHoy);

        expect(resultado).toHaveLength(5); // -2, -1, 0, +1, +2

        // Verificar que exactamente un elemento es "hoy"
        const hoyCount = resultado.filter(r => r.isHoy).length;
        expect(hoyCount).toBe(1);

        // Verificar que al menos uno de los elementos tiene el string correcto
        const tieneHoyString = resultado.some(r => r.str === stringHoy);
        expect(tieneHoyString).toBe(true);
    });
});
