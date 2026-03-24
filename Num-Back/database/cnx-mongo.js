import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export default async function conectarMongo() {
  try {
    const isProduction = process.env.NODE_ENV === 'production';
    const dbUrl = process.env.MONGO_URL;

    if (!dbUrl) {
      console.error(`❌ ERROR: MONGO_URL no está definida en el entorno (.env).`);
      return;
    }

    // Mostrar una versión segura de la URL en los logs para depurar
    const maskedUrl = dbUrl.replace(/\/\/(.*)@/, "//*****:*****@");
    console.log(`🔍 Intentando conectar a (${isProduction ? 'Producción' : 'Local'}): ${maskedUrl}`);

    // Conexión estándar (deja que el nombre de la DB venga en la URL)
    await mongoose.connect(dbUrl);

    // Extraer información real de la conexión establecida
    const { host, name } = mongoose.connection;
    
    console.log("========================================");
    console.log("✅ ¡CONEXIÓN EXITOSA A MONGODB!");
    console.log(`🌐 Host: ${host}`);
    console.log(`📂 Base de Datos Activa: ${name}`);
    console.log("========================================");
    
  } catch (error) {
    console.error("❌ ERROR CRÍTICO DE CONEXIÓN:");
    console.error(error.message);
  }
}
