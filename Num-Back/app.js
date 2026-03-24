import 'dotenv/config'; // CARGA DIRECTA Y ABSOLUTA
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from 'url';

// 1. CONFIGURACIÓN DE RUTAS LOCALES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import conectarMongo from "./database/cnx-mongo.js";

// Importación de rutas
import usuarioRoute from "./routes/usuario.js";
import lecturaRoute from "./routes/lecturas.js";
import pagosRoute from "./routes/pagos.js";
import authRoute from "./routes/auth.js";
import mercadopagoRoute from "./routes/mercadopago.js";

// 0. IMPORTAR TAREAS AUTOMÁTICAS (CRON)
import { generarlecturadiaria } from "./controllers/lecturas.js";
import { tareaVerificarExpiracion } from "./controllers/usuario.js";

const app = express();

// 2. CONECTAR A MONGODB
conectarMongo();

// ACTIVAR AUTOMATIZACIONES
generarlecturadiaria(); // Lecturas a las 5:00 AM
tareaVerificarExpiracion(); // Expiraciones a las 8:30 AM

// 3. CONFIGURACIÓN DE CORS
const whitelist = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'https://numerologia-astral.devscenter.online',
  'https://nodemongo-ihx8.onrender.com'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (whitelist.indexOf(origin) !== -1 || process.env.NODE_ENV !== 'production') {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  allowedHeaders: ['Content-Type', 'x-token', 'Authorization'],
  credentials: true
}));

app.use(express.json());

// 4. SERVIR ARCHIVOS ESTÁTICOS
app.use(express.static(path.join(__dirname, "public")));

// 5. RUTAS DE LA API
app.get("/api/ping", (req, res) => res.json({ status: "online", node: process.version }));
app.use("/api/usuario", usuarioRoute);
app.use("/api/lectura", lecturaRoute);
app.use("/api/pago", pagosRoute);
app.use("/api/auth", authRoute);
app.use("/api/mercadopago", mercadopagoRoute);

// 6. SPA HANDLER
app.get(/.*/, (req, res) => {
  if (req.path.includes(".") || req.path.startsWith("/api")) {
    return res.status(404).send("Not found");
  }
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// 7. GLOBAL ERROR HANDLER
app.use((err, req, res, next) => {
  console.error("❌ ERROR CRÍTICO:", err.message);
  res.status(500).json({ success: false, error: "Error interno del servidor", detalle: err.message });
});

const PORT = process.env.PORT || 5040;

app.listen(PORT, () => {
  console.log(`🚀 Servidor numeris encendido: http://localhost:${PORT}`);
  console.log(`✅ Base de datos cargada: ${!!process.env.MONGO_URL}`);
  console.log(`✅ Token MP cargado: ${!!process.env.MERCADOPAGO_ACCESS_TOKEN}`);
  console.log(`✅ JWT Secret cargado: ${!!process.env.SECRETORPRIVATEKEY}`);
});
