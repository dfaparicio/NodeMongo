import mongoose from "mongoose";

export default async function conectarMongo(){
  try {
    await mongoose.connect(process.env.MONGO_URL)
    console.log('Base de Datos conectada!!!');
  } catch (error) {
    console.log(error);
  }
}

