/**
 * Mock del servicio de correos para pruebas
 * Evita hacer requests reales a la API de Resend y sus rate limits
 */

export const enviarEmail = jest.fn().mockResolvedValue({ id: 'test-email-id' });
export const enviarBienvenida = jest.fn().mockResolvedValue({});
export const enviarRecuperacion = jest.fn().mockResolvedValue({});
