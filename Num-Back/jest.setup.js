/**
 * ===============================================
 * SETUP DE PRUEBAS - BASE DE DATOS EN MEMORIA
 * Proyecto: Numeris Astral - Backend
 * ===============================================
 *
 * Este archivo configura una base de datos MongoDB
 * en memoria para pruebas de integración reales.
 *
 * Usa mongodb-memory-server para evitar conectar
 * a la base de datos de producción.
 */

import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

let mongoServer;

/**
 * Conecta a MongoDB en memoria antes de todas las pruebas
 */
beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();

    await mongoose.connect(mongoUri, {
        dbName: 'test_numeris_astral'
    });

    console.log('🧪 MongoDB en memoria iniciado para pruebas');
});

/**
 * Limpia la base de datos después de cada prueba
 * EXCEPTO los usuarios creados para autenticación
 */
afterEach(async () => {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
        const collection = collections[key];
        if (key !== 'usuarios') { // No limpiar usuarios para mantener los tokens válidos
            await collection.deleteMany({});
        } else {
            // Solo limpiar usuarios que no sean admin o de prueba
            await collection.deleteMany({
                email: { $nin: ['admin@test.com', 'test@integration.com', 'login@test.com', 'token@test.com'] }
            });
        }
    }
});

/**
 * Desconecta y cierra MongoDB después de todas las pruebas
 */
afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
    console.log('🧪 MongoDB en memoria cerrado');
});
