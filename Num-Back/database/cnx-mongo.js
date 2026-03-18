import mongoose from "mongoose";

export default async function conectarMongo() {
  try {
    // Priorizamos MONGO_URL (Producción) y si no existe usamos la Local
    const dbUrl = process.env.MONGO_URL || process.env.MONGO_URL_LOCAL;

    if (!dbUrl) {
      throw new Error("❌ No se encontró la URL de conexión a MongoDB en las variables de entorno.");
    }

    await mongoose.connect(dbUrl);
    
    const status = dbUrl.includes('mongodb.net') ? 'Producción (Atlas) 🚀' : 'Local 🏠';
    console.log(`✅ Base de Datos conectada exitosamente a: ${status}`);
    
  } catch (error) {
    console.error("❌ Error crítico al conectar a MongoDB:");
    console.error(error.message);
    if (error.message.includes('IP address')) {
      console.error("👉 TIP: Asegúrate de que la IP de Render esté permitida en MongoDB Atlas (Network Access -> Allow Access From Anywhere 0.0.0.0/0)");
    }
  }
}

