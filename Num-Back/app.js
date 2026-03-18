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
  origin: 'https://numerologiaastral.jagsnexus.site',
  allowedHeaders: ['Content-Type', 'x-token']
}));
app.use(express.json());

// 1. Servir archivos estáticos (Prioridad para JS, CSS, Imágenes)
app.use(express.static(path.join(__dirname, "public")));

// 2. Rutas de la API
app.get("/api/ping", (req, res) => res.send("pong")); // Ruta para despertar el servidor sin carga
app.use("/api/usuario", usuarioRoute);
app.use("/api/lectura", lecturaRoute);
app.use("/api/pago", pagosRoute);
app.use("/api/auth", authRoute);
app.use("/api/mercadopago", mercadopagoRoute);

// 3. LA SOLUCIÓN: Solo si NO es un archivo real y NO es API, sirve el index.html
app.get(/.*/, (req, res) => {
  // Si la petición pide algo que parece un archivo (tiene extensión), pero no se encontró arriba,
  // no le mandes el index.html porque causará el error de MIME type.
  if (req.path.includes(".") || req.path.startsWith("/api")) {
    return res.status(404).send("Not found");
  }
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

generarlecturadiaria();

const PORT = process.env.PORT || 5040;

app.listen(PORT, () => {
  console.log(`🔥 Servidor escuchando en el puerto ${PORT}`);
  console.log(`✅ MongoDB URL configurada: ${!!process.env.MONGO_URL}`);
  console.log(`✅ Token MP cargado: ${!!process.env.MERCADOPAGO_ACCESS_TOKEN}`);
});
