import mongoose from "mongoose";

export default async function conectarMongo() {
  try {
    // Conexión fija y exclusiva a MongoDB Atlas
    const dbUrl = process.env.MONGO_URL;

    if (!dbUrl) {
      throw new Error("❌ Error: La variable MONGO_URL no está definida en el entorno.");
    }

    await mongoose.connect(dbUrl);
    console.log("✅ Conexión establecida con MongoDB Atlas (Producción) 🚀");
    
  } catch (error) {
    console.error("❌ Error de conexión a MongoDB Atlas:");
    console.error(error.message);
  }
}
