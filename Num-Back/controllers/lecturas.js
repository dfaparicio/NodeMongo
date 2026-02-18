import {
  lecturaPrincipal,
  lecturaDiaria,
  lecturasdeUnUsuario,
  lecturaPorId,
} from "../models/lecturas.js";

import { GoogleGenAI } from "@google/genai";
import "dotenv/config";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function respuestaIA(prompt) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });

    return response.text;
  } catch (error) {
    console.error("❌ Error detectado:", error.message);
    return null;
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

//LÓGICA DE APOYO
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

    const contenidoIA = await respuestaIA(prompt);
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
    console.error(error);
    res.status(500).json({ msg: "Error interno" });
  }
};

export const generarlecturadiaria = async (req, res) => {
  try {
    const { usuarioId } = req.params;
    const resultado = await lecturaDiaria(usuarioId);

    if (!resultado.usuario || resultado.usuario.estado !== 1) {
      return res.status(404).json({ msg: "Usuario no encontrado o inactivo" });
    }

    const principal = await resultado.obtenerLecturaPrincipal(usuarioId);
    if (!principal) {
      return res
        .status(400)
        .json({ msg: "Primero debes generar la lectura principal." });
    }

    const lecturaHoy = await resultado.obtenerLecturaDiariaHoy(usuarioId);
    if (lecturaHoy) {
      return res.status(200).json({
        msg: "Lectura diaria ya generada hoy",
        contenido: JSON.parse(lecturaHoy.contenido),
      });
    }

    const prompt = `Genera una lectura diaria basada en este perfil: ${principal.contenido}. 
    Devuelve SOLO un JSON: {"fecha": "${new Date().toLocaleDateString()}", "mensaje": "...", "energia": "..."}`;

    const contenidoIA = await respuestaIA(prompt);
    const contenidoJSON = extraerJSON(contenidoIA);

    const idLectura = await resultado.crear(
      usuarioId,
      "diaria",
      JSON.stringify(contenidoJSON),
    );

    res.status(201).json({
      msg: "Lectura diaria generada",
      contenido: contenidoJSON,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error interno" });
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
    res
      .status(500)
      .json({
        msg: "Error al obtener la lectura por ID",
        error: error.message,
      });
  }
};
