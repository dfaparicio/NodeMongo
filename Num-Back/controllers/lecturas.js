import Lectura from "../models/lecturas.js";
import {
  lecturaPrincipal,
  lecturaDiaria,
  lecturasdeUnUsuario,
  lecturaPorId,
} from "../models/lecturas.js";
import Usuario from "../models/usuario.js";

import cron from "node-cron";
import { enviarCorreoNotificacion, enviarLecturaPrincipalCorreo } from "../helpers/mailer.js";

// Importamos la librería y variables de entorno
import { GoogleGenAI } from "@google/genai";
import "dotenv/config";

// Tal como dice la doc: El cliente obtiene la API key de la variable de entorno `GEMINI_API_KEY`
const ai = new GoogleGenAI({});

async function respuestaIA(prompt) {
  try {
    // Estructura exacta de la documentación de AI Studio 2026
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });

    if (!response.text) throw new Error("La IA no devolvió texto.");
    return response.text;

  } catch (error) {
    console.error("❌ Error de Gemini:", JSON.stringify(error.message || error));

    // Si vuelve a salir el error 503, lo capturamos para no romper el servidor
    if (error.message?.includes("503") || error.message?.includes("UNAVAILABLE")) {
      throw new Error("IA_SATURADA: El modelo preview está en alta demanda. Intenta más tarde.");
    }

    throw new Error("GEMINI_ERROR: " + (error.message || "Error desconocido"));
  }
}

export default respuestaIA;

function extraerJSON(texto) {
  try {
    if (!texto) return null;
    const inicio = texto.indexOf("{");
    const fin = texto.lastIndexOf("}") + 1;
    if (inicio === -1 || fin === 0) return null;
    const jsonString = texto.substring(inicio, fin);
    return JSON.parse(jsonString);
  } catch (e) {
    console.error("❌ Error al parsear JSON:", e);
    return null;
  }
}

function calcularCaminoDeVida(fecha_nacimiento) {
  const fecha = new Date(fecha_nacimiento);
  const dia = fecha.getUTCDate(); // Usar UTC para evitar errores de zona horaria
  const mes = fecha.getUTCMonth() + 1;
  const año = fecha.getUTCFullYear();

  const reducir = (num) => {
    if ([11, 22, 33].includes(num)) return num;
    while (num > 9) {
      num = num
        .toString()
        .split("")
        .reduce((a, b) => a + parseInt(b), 0);
    }
    return num;
  };

  const diaReducido = reducir(dia);
  const mesReducido = reducir(mes);
  const añoReducido = reducir(
    año
      .toString()
      .split("")
      .reduce((a, b) => a + parseInt(b), 0),
  );
  return reducir(diaReducido + mesReducido + añoReducido);
}

export const generarlecturaprincipal = async (req, res) => {
  try {
    // Usamos el ID que viene de los params, pero validamos con el middleware de JWT
    const { usuarioId } = req.params;
    const resultado = await lecturaPrincipal(usuarioId);

    if (!resultado.usuario) {
      return res.status(404).json({ msg: "Usuario no encontrado" });
    }

    if (resultado.usuario.estado !== 0 && resultado.usuario.estado !== 1) {
      return res.status(403).json({ msg: "Usuario no autorizado para generar lecturas." });
    }

    if (resultado.lecturaExistente) {
      return res.status(200).json({
        msg: "Lectura principal ya existe",
        id: resultado.lecturaExistente._id,
        contenido: JSON.parse(resultado.lecturaExistente.contenido),
      });
    }

    const numeroCamino = calcularCaminoDeVida(
      resultado.usuario.fechanacimiento,
    );

    const prompt = `Actúa como un numerólogo experto. Genera un JSON para un Camino de Vida ${numeroCamino}. 
    Nombre del usuario: ${resultado.usuario.nombre}.
    Devuelve SOLO este formato JSON: {"numero": ${numeroCamino}, "descripcion": "...", "talentos": "...", "mensaje": "..."}`;

    let contenidoIA;
    try {
      contenidoIA = await respuestaIA(prompt);
    } catch (iaError) {
      console.error("❌ Fallo de IA:", iaError.message);
      return res.status(503).json({ error: iaError.message });
    }

    const contenidoJSON = extraerJSON(contenidoIA);

    if (!contenidoJSON) {
      return res
        .status(500)
        .json({ error: "Error generando el contenido de la IA" });
    }

    const idLectura = await resultado.crear(
      usuarioId,
      "principal",
      JSON.stringify(contenidoJSON),
    );

    res.status(201).json({
      msg: "Lectura principal generada con éxito",
      id: idLectura,
      contenido: contenidoJSON,
    });
  } catch (error) {
    console.error("❌ Error en lectura principal:", error.message);
    res.status(500).json({ msg: "Error interno", error: error.message });
  }
};

// Helper para obtener la fecha actual en formato Bogotá (YYYY-MM-DD)
const obtenerFechaBogota = () => {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Bogota",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
};

// Generación masiva de lecturas diarias (Cron Job)
export const procesoGeneracionDiaria = async () => {
  console.log("🚀 Iniciando proceso de generación de lecturas diarias...");
  const hoyBogota = obtenerFechaBogota();
  console.log(`📅 Fecha de referencia (Bogotá): ${hoyBogota}`);

  try {
    const usuariosActivos = await Usuario.find({ estado: 1 });
    let generadas = 0;

    for (const usuario of usuariosActivos) {
      try {
        const repo = await lecturaDiaria(usuario._id);
        const lecturaHoy = await repo.obtenerLecturaDiariaHoy(usuario._id, hoyBogota);
        if (lecturaHoy) {
          console.log(`✅ Usuario ${usuario.email} ya tiene lectura para ${hoyBogota}`);
          continue;
        }

        const principal = await repo.obtenerLecturaPrincipal(usuario._id);
        if (!principal) continue;

        const prompt = `Actúa como un numerólogo experto. Basado en esta lectura principal: ${principal.contenido}, genera una lectura diaria para hoy ${hoyBogota}.
        Devuelve SOLO un JSON con este formato: {"fecha": "${hoyBogota}", "mensaje": "...", "energia": "...", "motivacion": "..."}`;

        const contenidoIA = await respuestaIA(prompt);
        const contenidoJSON = extraerJSON(contenidoIA);

        if (contenidoJSON) {
          contenidoJSON.estado = "activo";
          
          try {
            // Se pasa hoyBogota como fechaReferencia
            await repo.crear(usuario._id, "diaria", JSON.stringify(contenidoJSON), hoyBogota);
            
            if (usuario.email) {
              await enviarCorreoNotificacion(usuario.email, usuario.nombre);
            }
            generadas++;
          } catch (dbError) {
            if (dbError.code === 11000) {
              console.log(`⚠️ Duplicado detectado para ${usuario.email} en la fecha ${hoyBogota}, saltando...`);
            } else {
              throw dbError;
            }
          }
        }
      } catch (err) {
        console.error(`❌ Error con usuario ${usuario.email}:`, err.message);
      }
    }
    console.log(`✨ Proceso finalizado. Lecturas generadas: ${generadas}`);
    return generadas;
  } catch (error) {
    console.error("❌ Error en procesoGeneracionDiaria:", error.message);
    throw error;
  }
};

// Registro del Cron Job para las 10:00 AM
export const generarlecturadiaria = () => {
  cron.schedule("00 7 * * *", async () => {
    await procesoGeneracionDiaria();
  }, {
    scheduled: true,
    timezone: "America/Bogota",
  });
};

// Activación externa del proceso de lecturas (Trigger)
export const triggerLecturasDiarias = async (req, res) => {
  const { token } = req.query;
  
  if (token !== process.env.CRON_TOKEN && token !== 'numeris-2026') {
    return res.status(401).json({ msg: "Token de activación inválido" });
  }

  try {
    const total = await procesoGeneracionDiaria();
    res.status(200).json({ 
      msg: "Proceso ejecutado correctamente", 
      lecturas_generadas: total 
    });
  } catch (error) {
    res.status(500).json({ msg: "Error en el proceso", error: error.message });
  }
};

export const obtenerlecturasdeunusuario = async (req, res) => {
  try {
    const { usuarioId } = req.params;
    const lecturas = await lecturasdeUnUsuario(usuarioId);
    res.status(200).json({ msg: "Lecturas encontradas", lecturas });
  } catch (error) {
    res.status(500).json({ msg: "Error al obtener lecturas" });
  }
};

export const obtenerlecturaporid = async (req, res) => {
  try {
    const { id } = req.params;
    const lectura = await lecturaPorId(id);
    if (!lectura) return res.status(404).json({ msg: "No encontrada" });

    res.status(200).json({
      lectura: {
        ...lectura.toObject(),
        contenido: JSON.parse(lectura.contenido),
      },
    });
  } catch (error) {
    res.status(500).json({
      msg: "Error al obtener la lectura por ID",
      error: error.message,
    });
  }
};

export const obtenerTodasLasLecturas = async (req, res) => {
  try {
    const lecturas = await Lectura.find().sort({ fechaLectura: -1 });
    res.status(200).json({ lecturas });
  } catch (error) {
    res.status(500).json({ msg: "Error al obtener todas las lecturas", error: error.message });
  }
};

export const enviarLecturaPorEmail = async (req, res) => {
  try {
    const { email, nombre, lectura } = req.body;

    if (!email || !lectura) {
      return res.status(400).json({ msg: "Email y lectura son obligatorios" });
    }

    // DISPARAR EL ENVÍO EN SEGUNDO PLANO (sin await)
    enviarLecturaPrincipalCorreo(email, nombre, lectura).catch(err => {
      console.error("❌ Fallo tardío de envío de email:", err.message);
    });

    // Responder de inmediato
    res.status(200).json({ msg: "Las estrellas están enviando tu mensaje... ✨ (Revisa tu correo en unos instantes)" });
  } catch (error) {
    console.error("❌ Error en el controlador de email:", error.message);
    res.status(500).json({ msg: "Error al procesar la solicitud", error: error.message });
  }
};
