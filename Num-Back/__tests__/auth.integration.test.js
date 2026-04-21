/**
 * ===============================================
 * PRUEBAS DE INTEGRACIÓN - AUTH
 * Proyecto: Numeris Astral - Backend
 * ===============================================
 *
 * Estas prueban ejecutan CÓDIGO REAL del proyecto
 * usando MongoDB en memoria y requests HTTP.
 *
 * PRUEBAS REALES:
 * - Registro de usuario (endpoint público)
 * - Login de usuario (endpoint público)
 * - Obtener usuario con token (endpoint protegido)
 */

import { describe, test, expect, beforeAll, afterAll } from '@jest/globals';
import request from 'supertest';
import express from 'express';
import cors from 'cors';
import authRoute from '../routes/auth.js';
import usuarioRoute from '../routes/usuario.js';
import Usuario from '../models/usuario.js';

// Configurar entorno de prueba
process.env.SECRETORPRIVATEKEY = 'test_secret_key_12345_for_testing_only';
process.env.NODE_ENV = 'test';

// Crear app Express para pruebas
const testApp = express();
testApp.use(cors());
testApp.use(express.json());
testApp.use('/api/auth', authRoute);
testApp.use('/api/usuario', usuarioRoute);

describe('🧪 PRUEBAS DE INTEGRACIÓN - AUTH (CÓDIGO REAL)', () => {

    // ==================================================
    // 1. PRUEBA: REGISTRO DE USUARIO (CÓDIGO REAL)
    // ==================================================
    test('✅ Debe registrar un nuevo usuario - CÓDIGO REAL', async () => {
        const nuevoUsuario = {
            nombre: 'Usuario Test',
            email: 'test@integration.com',
            password: 'Password123!',
            fechanacimiento: '1990-06-15'
        };

        const response = await request(testApp)
            .post('/api/auth/registro')
            .send(nuevoUsuario)
            .expect('Content-Type', /json/)
            .expect(201);

        expect(response.body).toHaveProperty('msg', '¡Bienvenido al Cosmos! Revisa tu email para ver tu mensaje de bienvenida 🌠');
        expect(response.body).toHaveProperty('usuario');
        expect(response.body).toHaveProperty('token');
        expect(response.body.usuario).toHaveProperty('email', nuevoUsuario.email);
        expect(response.body.usuario).toHaveProperty('nombre', nuevoUsuario.nombre);
        expect(response.body.usuario).not.toHaveProperty('password');

        // Verificar que el usuario está en la BD
        const usuarioEnBD = await Usuario.findOne({ email: nuevoUsuario.email });
        expect(usuarioEnBD).toBeTruthy();
        expect(usuarioEnBD.nombre).toBe(nuevoUsuario.nombre);
    });

    // ==================================================
    // 2. PRUEBA: LOGIN DE USUARIO (CÓDIGO REAL)
    // ==================================================
    test('✅ Debe hacer login con credenciales correctas - CÓDIGO REAL', async () => {
        // Primero crear un usuario
        const usuario = {
            nombre: 'Usuario Login',
            email: 'login@test.com',
            password: 'Login123!',
            fechanacimiento: '1995-12-20'
        };

        await request(testApp)
            .post('/api/auth/registro')
            .send(usuario);

        // Ahora hacer login
        const response = await request(testApp)
            .post('/api/auth/login')
            .send({
                email: usuario.email,
                password: usuario.password
            })
            .expect('Content-Type', /json/)
            .expect(200);

        expect(response.body).toHaveProperty('usuario');
        expect(response.body).toHaveProperty('token');
        expect(response.body.usuario).toHaveProperty('email', usuario.email);
        expect(response.body.token).toBeTruthy();
    });

    // ==================================================
    // 3. PRUEBA: LOGIN CON CREDENCIALES INCORRECTAS
    // ==================================================
    test('❌ Debe rechazar login con contraseña incorrecta - CÓDIGO REAL', async () => {
        const response = await request(testApp)
            .post('/api/auth/login')
            .send({
                email: 'login@test.com',
                password: 'PasswordIncorrecta123!'
            })
            .expect(401);

        expect(response.body).toHaveProperty('error', 'Credenciales incorrectas');
    });

    // ==================================================
    // 4. PRUEBA: ACCEDER A RUTA PROTEGIDA CON TOKEN
    // ==================================================
    test('✅ Debe acceder a ruta protegida con token válido - CÓDIGO REAL', async () => {
        // Crear usuario y obtener token
        const usuario = {
            nombre: 'Usuario Token',
            email: 'token@test.com',
            password: 'Token123!',
            fechanacimiento: '2000-01-01'
        };

        const registroResponse = await request(testApp)
            .post('/api/auth/registro')
            .send(usuario);

        const token = registroResponse.body.token;

        // Usar el token para acceder a ruta protegida
        const response = await request(testApp)
            .get('/api/auth/renew')
            .set('x-token', token)
            .expect('Content-Type', /json/)
            .expect(200);

        expect(response.body).toHaveProperty('usuario');
        expect(response.body).toHaveProperty('token');
    });

    // ==================================================
    // 5. PRUEBA: RUTA PROTEGIDA SIN TOKEN
    // ==================================================
    test('❌ Debe rechazar ruta protegida sin token - CÓDIGO REAL', async () => {
        const response = await request(testApp)
            .get('/api/auth/renew')
            .expect(401);

        expect(response.body).toHaveProperty('msg', 'No hay token en la petición');
    });
});
