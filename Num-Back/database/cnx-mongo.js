import mongoose from "mongoose";

export default async function conectarMongo() {
  try {
    // URL base de Atlas
    const dbUrl = process.env.MONGO_URL;

    if (!dbUrl) {
      throw new Error("❌ Error: No se encontró la variable MONGO_URL.");
    }

    // FORZAMOS el uso de la base de datos 'test'
    await mongoose.connect(dbUrl, {
      dbName: 'test'
    });

    console.log("✅ Conexión exitosa a MongoDB Atlas 🚀");
    console.log("📂 BASE DE DATOS ACTIVA: 'test'");
    
  } catch (error) {
    console.error("❌ Error de conexión:");
    console.error(error.message);
  }
}
