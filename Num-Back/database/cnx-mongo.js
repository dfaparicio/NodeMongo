import mongoose from "mongoose";

export default async function conectarMongo(){
  try {
    const dbUrl = process.env.MONGO_URL_LOCAL || process.env.MONGO_URL;
    await mongoose.connect(dbUrl)
    console.log(`Base de Datos conectada a: ${dbUrl.includes('localhost') ? 'Local' : 'Producción'}!!!`);
  } catch (error) {
    console.log(error);
  }
}

