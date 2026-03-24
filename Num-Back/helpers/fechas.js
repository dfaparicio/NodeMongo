import { DateTime } from "luxon";

/**
 * Utilidad para manejar fechas en la zona horaria de Colombia (America/Bogota)
 */

// Obtener la fecha y hora actual en Colombia
export const obtenerAhoraColombia = () => {
    return DateTime.now().setZone("America/Bogota").toJSDate();
};

// Convertir un string de fecha (YYYY-MM-DD) a un objeto Date a la medianoche de Colombia
export const procesarFechaNacimiento = (fechaStr) => {
    if (!fechaStr) return null;
    // Forzamos a que sea la medianoche de Colombia para evitar desfases UTC
    return DateTime.fromISO(fechaStr, { zone: "America/Bogota" }).startOf('day').toJSDate();
};

// Formatear una fecha para mostrarla como string ISO legible en Colombia
export const formatearISOColombia = (date) => {
    if (!date) return null;
    return DateTime.fromJSDate(date).setZone("America/Bogota").toISO();
};
