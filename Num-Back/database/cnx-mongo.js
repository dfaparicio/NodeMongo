import mongoose from "mongoose";

export default async function conectarMongo() {
  try {
    // URL exacta: mongodb+srv://admin_db:Admin123@basededatos.k4jtqfv.mongodb.net/test?appName=BaseDeDatos
    const dbUrl = process.env.MONGO_URL;

    if (!dbUrl) {
      throw new Error("❌ Error: No se ha detectado la variable MONGO_URL en el entorno.");
    }

    // Opciones recomendadas para estabilidad en MongoDB Atlas
    await mongoose.connect(dbUrl);

    console.log("✅ Conexión exitosa a MongoDB Atlas 🚀");
    console.log("📂 Trabajando en la base de datos: 'test' (se creará automáticamente si no existe)");
    
  } catch (error) {
    console.error("❌ Error crítico de conexión:");
    console.error(error.message);
    
    if (error.message.includes('IP address')) {
      console.error("👉 REVISIÓN: Tu IP actual o la de Render no está autorizada en el panel de Network Access de MongoDB Atlas.");
    }
  }
}
