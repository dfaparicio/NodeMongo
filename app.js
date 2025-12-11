import express from "express";
import cors from "cors";
import "dotenv/config";
import { conectarMongo } from "./database/cnx-mongo.js";

// Rutas
import usuarioRoute from "./routes/usuario.js";/* 
import lecturaRoute from "./routes/lecturas.js"; */
import pagosRoute from "./routes/pagos.js";

const app = express();

// Conectar a MongoDB
conectarMongo();

// Middlewares globales
app.use(cors());
app.use(express.json());

// Rutas
app.use("/api/usuario", usuarioRoute);/* 
app.use("/api/lectura", lecturaRoute); */
app.use("/api/pago", pagosRoute);

// Puerto
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🔥 Servidor escuchando en el puerto ${PORT}`);
});
