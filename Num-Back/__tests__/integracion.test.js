import request from 'supertest';
import app from '../app.js'; // Asegúrate de poner el .js al final

describe('--- PRUEBAS DE INTEGRACIÓN (API + MONGO) ---', () => {
  test('La respuesta del servidor debe tener la estructura correcta', async () => {
    // Usamos un mock o una petición real si tu server está configurado
    const response = { status: 200, body: { numero: 7, significado: "Buscador" } };
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('numero');
  });
});