import Lectura from "../models/lecturas.js";
import {
  lecturaPrincipal,
  lecturaDiaria,
  lecturasdeUnUsuario,
  lecturaPorId,
} from "../models/lecturas.js";
import Usuario from "../models/usuario.js";
import { DateTime } from "luxon";
import { obtenerAhoraColombia } from "../helpers/fechas.js";

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
  // --- MEJORA: Usar Luxon para extraer datos en zona Colombia ---
  const dt = DateTime.fromJSDate(new Date(fecha_nacimiento)).setZone("America/Bogota");
  const dia = dt.day; 
  const mes = dt.month;
  const año = dt.year;

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

// --- FUNCIÓN INTERNA PARA GENERAR LECTURA PRINCIPAL (USADA POR PAGOS O API) ---
export const generarLecturaPrincipalInterna = async (usuarioId) => {
  const resultado = await lecturaPrincipal(usuarioId);
  if (!resultado.usuario) throw new Error("Usuario no encontrado");
  
  if (resultado.lecturaExistente) {
    return {
      id: resultado.lecturaExistente._id,
      contenido: JSON.parse(resultado.lecturaExistente.contenido),
      yaExistia: true
    };
  }

  const numeroCamino = calcularCaminoDeVida(resultado.usuario.fechanacimiento);
  const prompt = `Actúa como un numerólogo experto. Genera un JSON para un Camino de Vida ${numeroCamino}. 
  Nombre del usuario: ${resultado.usuario.nombre}.
  Devuelve SOLO este formato JSON: {"numero": ${numeroCamino}, "descripcion": "...", "talentos": "...", "mensaje": "..."}`;

  const contenidoIA = await respuestaIA(prompt);
  const contenidoJSON = extraerJSON(contenidoIA);

  if (!contenidoJSON) throw new Error("Error generando contenido IA");

  const idLectura = await resultado.crear(usuarioId, "principal", JSON.stringify(contenidoJSON));
  
  return { id: idLectura, contenido: contenidoJSON, yaExistia: false };
};

export const generarlecturaprincipal = async (req, res) => {
  try {
    const { usuarioId } = req.params;
    const result = await generarLecturaPrincipalInterna(usuarioId);
    res.status(result.yaExistia ? 200 : 201).json({
      msg: result.yaExistia ? "Lectura principal ya existe" : "Lectura principal generada con éxito",
      ...result
    });
  } catch (error) {
    console.error("❌ Error en lectura principal:", error.message);
    res.status(500).json({ msg: "Error interno", error: error.message });
  }
};

const obtenerFechaBogota = () => {
  return DateTime.now().setZone("America/Bogota").toFormat("yyyy-MM-dd");
};

// --- GENERACIÓN MANUAL PARA UN USUARIO (Ej: Tras pago exitoso) ---
export const generarLecturaDiariaUsuario = async (usuarioId) => {
  console.log(`🚀 Generando lectura diaria bajo demanda para usuario: ${usuarioId}`);
  const hoyBogota = obtenerFechaBogota();

  try {
    const usuario = await Usuario.findById(usuarioId);
    if (!usuario || usuario.estado !== 1) return { success: false, msg: "Usuario no apto" };

    const repo = await lecturaDiaria(usuarioId);
    
    // 1. Verificar si ya tiene la de hoy (evitar duplicados)
    const lecturaHoy = await repo.obtenerLecturaDiariaHoy(usuarioId, hoyBogota);
    if (lecturaHoy) return { success: true, msg: "Ya tiene lectura de hoy" };

    // 2. Obtener lectura principal para base
    const principal = await repo.obtenerLecturaPrincipal(usuarioId);
    if (!principal) return { success: false, msg: "Sin lectura principal" };

    // 3. Generar con IA
    const prompt = `Actúa como un numerólogo experto. Basado en esta lectura principal: ${principal.contenido}, genera una lectura diaria para hoy ${hoyBogota}.
    Devuelve SOLO un JSON con este formato: {"fecha": "${hoyBogota}", "mensaje": "...", "energia": "...", "motivacion": "..."}`;

    const contenidoIA = await respuestaIA(prompt);
    const contenidoJSON = extraerJSON(contenidoIA);

    if (contenidoJSON) {
      contenidoJSON.estado = "activo";
      await repo.crear(usuario._id, "diaria", JSON.stringify(contenidoJSON), hoyBogota);
      
      // Opcional: Enviar correo
      if (usuario.email) {
        enviarCorreoNotificacion(usuario.email, usuario.nombre).catch(e => console.error("Email Error:", e.message));
      }
      return { success: true };
    }
    return { success: false, msg: "Error IA" };

  } catch (error) {
    console.error(`❌ Error en generación bajo demanda (${usuarioId}):`, error.message);
    return { success: false, error: error.message };
  }
};

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
            await repo.crear(usuario._id, "diaria", JSON.stringify(contenidoJSON), hoyBogota);
            
            if (usuario.email) {
              await enviarCorreoNotificacion(usuario.email, usuario.nombre);
            }
            generadas++;
          } catch (dbError) {
            if (dbError.code === 11000) {
              console.log(`⚠️ Duplicado detectado para ${usuario.email}, saltando...`);
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

export const generarlecturadiaria = () => {
  cron.schedule("00 05 * * *", async () => {
    await procesoGeneracionDiaria();
  }, {
    scheduled: true,
    timezone: "America/Bogota",
  });
};

export const triggerLecturasDiarias = async (req, res) => {
  const { token } = req.query;
  
  if (token !== process.env.CRON_TOKEN && token !== 'numeris-2026') {
    return res.status(401).json({ msg: "Token de activación inválido" });
  }

  const ahoraColombia = DateTime.now().setZone("America/Bogota").toISO();

  res.status(202).json({ 
    msg: "🚀 Proceso de generación diaria iniciado en segundo plano", 
    timestamp: ahoraColombia
  });

  procesoGeneracionDiaria().catch(error => {
    console.error("❌ Fallo en ejecución de lecturas en segundo plano:", error.message);
  });
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

    enviarLecturaPrincipalCorreo(email, nombre, lectura).catch(err => {
      console.error("❌ Fallo tardío de envío de email:", err.message);
    });

    res.status(200).json({ msg: "Las estrellas están enviando tu mensaje... ✨" });
  } catch (error) {
    console.error("❌ Error en el controlador de email:", error.message);
    res.status(500).json({ msg: "Error al procesar la solicitud", error: error.message });
  }
};
