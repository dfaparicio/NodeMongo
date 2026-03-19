import mongoose from "mongoose";

export default async function conectarMongo() {
  try {
    const isProduction = process.env.NODE_ENV === 'production';
    const dbUrl = isProduction ? process.env.MONGO_URL : (process.env.MONGO_URL_LOCAL || process.env.MONGO_URL);

    if (!dbUrl) {
      console.error(`❌ ERROR: La variable ${isProduction ? 'MONGO_URL' : 'MONGO_URL_LOCAL'} no está definida en el entorno (Render/Local).`);
      return;
    }

    // Mostrar una versión segura de la URL en los logs para depurar (ocultando contraseña)
    const maskedUrl = dbUrl.replace(/\/\/.*@/, "//*****:*****@");
    console.log(`🔍 Intentando conectar a (${isProduction ? 'Producción' : 'Local'}): ${maskedUrl}`);

    // Forzamos el uso de la base de datos 'test'
    await mongoose.connect(dbUrl, {
      dbName: 'test'
    });

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
    
    if (error.message.includes('Authentication failed')) {
      console.error("👉 REVISIÓN: La contraseña o el usuario en Render son INCORRECTOS.");
    }
  }
}
