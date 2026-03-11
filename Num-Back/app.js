import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from 'url';

// Configuración manual de dotenv para asegurar que encuentre el archivo
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '.env') });

import conectarMongo from "./database/cnx-mongo.js";
import { generarlecturadiaria } from "./controllers/lecturas.js";

// Rutas
import usuarioRoute from "./routes/usuario.js";
import lecturaRoute from "./routes/lecturas.js";
import pagosRoute from "./routes/pagos.js";
import authRoute from "./routes/auth.js";
import mercadopagoRoute from "./routes/mercadopago.js";

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
app.use("/api/mercadopago", mercadopagoRoute);

generarlecturadiaria();

const PORT = process.env.PORT_LOCAL || process.env.PORT || 5040;

app.listen(PORT, () => {
  console.log(`🔥 Servidor escuchando en el puerto ${PORT}`);
  console.log(`✅ Token MP cargado: ${!!process.env.MERCADOPAGO_ACCESS_TOKEN}`);
});
