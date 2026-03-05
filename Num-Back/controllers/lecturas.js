import Lectura from "../models/lecturas.js";
import {
  lecturaPrincipal,
  lecturaDiaria,
  lecturasdeUnUsuario,
  lecturaPorId,
} from "../models/lecturas.js";
import Usuario from "../models/usuario.js";

import cron from "node-cron";
import { enviarCorreoNotificacion } from "../helpers/mailer.js";

// Importamos la librería y variables de entorno
import { GoogleGenAI } from "@google/genai";
import "dotenv/config";

// Tal como dice la doc: El cliente obtiene la API key de la variable de entorno `GEMINI_API_KEY`
const ai = new GoogleGenAI({});

async function respuestaIA(prompt) {
  try {
    // Estructura exacta de la documentación
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

    if (resultado.usuario.estado !== 1) {
      return res.status(403).json({ msg: "Usuario no activo." });
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

export const generarlecturadiaria = () => {
  cron.schedule(
    "50 09 * * *",
    async () => {
      console.log("⏰ [Cron] Generando lecturas diarias para usuarios activos...");

      try {
        const usuariosActivos = await Usuario.find({ estado: 1 });
        console.log(`👥 Usuarios activos detectados: ${usuariosActivos.length}`);

        for (const usuario of usuariosActivos) {
          try {
            const repo = await lecturaDiaria(usuario._id);

            // 1. Saltarlos si ya tienen lectura hoy
            const lecturaHoy = await repo.obtenerLecturaDiariaHoy(usuario._id);
            if (lecturaHoy) continue;

            // 2. Solo generar si ya tienen una Lectura Principal
            const principal = await repo.obtenerLecturaPrincipal(usuario._id);
            if (!principal) {
              console.log(`⏩ Salteando ${usuario.email}: Falta lectura principal.`);
              continue;
            }

            // 3. Generar Lectura Diaria
            const prompt = `Genera una lectura diaria basada en este perfil numerológico: ${principal.contenido}. 
            Devuelve SOLO un JSON: {"fecha": "${new Date().toLocaleDateString()}", "mensaje": "...", "energia": "...", "motivacion": "..."}`;

            const contenidoIA = await respuestaIA(prompt);
            const contenidoJSON = extraerJSON(contenidoIA);

            if (contenidoJSON) {
              contenidoJSON.estado = "activo";
              await repo.crear(usuario._id, "diaria", JSON.stringify(contenidoJSON));

              if (usuario.email) {
                await enviarCorreoNotificacion(usuario.email, usuario.nombre);
              }
              console.log(`✅ Lectura diaria enviada a: ${usuario.email}`);
            }
          } catch (err) {
            console.error(`❌ Error con usuario ${usuario._id}:`, err.message);
          }
        }
      } catch (error) {
        console.error("❌ Error global en Cron:", error.message);
      }
    },
    {
      scheduled: true,
      timezone: "America/Bogota",
    },
  );
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
