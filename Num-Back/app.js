import express from "express";
import cors from "cors";
import "dotenv/config";
import conectarMongo from "./database/cnx-mongo.js";

// Importar la función de automatización desde tu controlador
import { generarlecturadiaria } from "./controllers/lecturas.js";

// Rutas
import usuarioRoute from "./routes/usuario.js";
import lecturaRoute from "./routes/lecturas.js";
import pagosRoute from "./routes/pagos.js";
import authRoute from "./routes/auth.js";

const app = express();

// Conectar a MongoDB
conectarMongo();

// Middlewares globales
app.use(cors({
  origin: '*',
  allowedHeaders: ['Content-Type', 'x-token']
}));
app.use(express.json());

// Rutas
app.use("/api/usuario", usuarioRoute);
app.use("/api/lectura", lecturaRoute);
app.use("/api/pago", pagosRoute);
app.use("/api/auth", authRoute);

// 🔥 INICIAR AUTOMATIZACIÓN (Esto activa el cron job al arrancar el servidor)
generarlecturadiaria();

const PORT = process.env.PORT_LOCAL || process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🔥 Servidor escuchando en el puerto ${PORT}`);
  console.log(`⏰ Cron Job de lecturas diarias programado para las 10:00 AM (Bogotá)`);
});