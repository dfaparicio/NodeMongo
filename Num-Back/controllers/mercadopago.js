import { preference, payment } from "../config/mercadopago.js";
import Pago from "../models/pagos.js";
import Usuario from "../models/usuario.js";
import Lectura from "../models/lecturas.js";
import { generarLecturaDiariaUsuario } from "./lecturas.js";
import { enviarFacturaCorreo, enviarLecturaPrincipalCorreo } from "../helpers/mailer.js";
import dotenv from "dotenv";
dotenv.config();

export const crearPreferencia = async (req, res) => {
  const { monto, titulo } = req.body;
  const usuario = req.usuario;
  const usuarioId = usuario?._id || usuario?.id;

  if (!usuarioId) return res.status(401).json({ success: false, error: "No autorizado" });

  const origin = req.get('origin');
  let BASE_URL = process.env.URL_FRONT || origin || "http://localhost:5173";
  
  BASE_URL = BASE_URL.replace(/\/$/, "");
  const isLocal = BASE_URL.includes("localhost");

  try {
    const montoFinal = Number(monto);
    const descripcionPlan = `${titulo} - Acceso Premium a Numeris Astral`;

    const body = {
      items: [{
        id: "plan-suscripcion",
        title: descripcionPlan,
        description: `Suscripción para: ${usuario.nombre}`,
        quantity: 1,
        unit_price: montoFinal,
        currency_id: "COP",
      }],
      back_urls: {
        success: `${BASE_URL}/pagos/exito`,
        failure: `${BASE_URL}/pagos/fallo`,
        pending: `${BASE_URL}/pagos/pendiente`,
      },
      auto_return: isLocal ? undefined : "approved",
      external_reference: usuarioId.toString(),
      binary_mode: true,
      statement_descriptor: "NUMERIS ASTRAL",
    };

    const response = await preference.create({ body });

    res.json({
      success: true,
      id: response.id,
      init_point: process.env.MERCADOPAGO_ACCESS_TOKEN?.startsWith("TEST-") 
                  ? response.sandbox_init_point 
                  : response.init_point,
    });

  } catch (error) {
    console.error("Error MP:", error.message);
    res.status(500).json({ success: false, error: "Error al generar link" });
  }
};

// --- FUNCIÓN HELPER MAESTRA ---
const procesarResultadoPago = async (paymentData) => {
  const status = paymentData.status;
  const paymentId = paymentData.id.toString();
  const preferenceId = paymentData.preference_id;
  const usuarioId = paymentData.external_reference;
  const montoPagado = paymentData.transaction_amount;

  console.log(`📊 [MP] Verificando Pago Real: ID=${paymentId}, Estado=${status}`);

  let pagoExistente = await Pago.findOne({ mpPaymentId: paymentId });
  if (pagoExistente) return { success: true, status, pago: pagoExistente };

  if (status !== "approved" && status !== "in_process" && status !== "pending") {
    return { success: false, status };
  }

  console.log(`✅ Registrando pago real en la base de datos...`);

  let diasAAgregar = 30;
  let descripcionPlan = "Suscripción Mensual";

  if (montoPagado >= 420000) {
    diasAAgregar = 365;
    descripcionPlan = "Suscripción Anual";
  } else if (montoPagado >= 240000) {
    diasAAgregar = 180;
    descripcionPlan = "Suscripción Semestral";
  }

  const infoPago = {
    usuarioId,
    monto: montoPagado,
    descripcion: descripcionPlan,
    estado: status === "approved" ? "aprobado" : "en_proceso",
    mpPaymentId: paymentId,
    mpPreferenceId: preferenceId || "",
    metodoPago: paymentData.payment_method_id || "",
    tipoPago: paymentData.payment_type_id || "",
    ultimosDigitos: paymentData.card?.last_four_digits || "N/A",
    estadoDetalle: paymentData.status_detail,
    fecha: paymentData.date_approved || new Date()
  };

  const nuevoPago = await new Pago(infoPago).save();

  if (status === "approved") {
    const hoy = new Date();
    const nuevaExpiracion = new Date(hoy);
    nuevaExpiracion.setDate(hoy.getDate() + diasAAgregar);

    // Actualizamos y obtenemos el usuario fresco
    const usuario = await Usuario.findByIdAndUpdate(usuarioId, { 
      $set: { estado: 1, fechaExpiracion: nuevaExpiracion } 
    }, { new: true });

    console.log(`🎉 Usuario ${usuario.email} activado por ${diasAAgregar} días.`);
    
    // 1. Enviar Factura Profesional (Sin await para no bloquear el flujo de MP)
    if (usuario && usuario.email) {
      enviarFacturaCorreo(usuario.email, usuario.nombre, infoPago)
        .catch(e => console.error("❌ Error factura automática:", e.message));
    }

    // 2. Generar y Enviar Lectura Principal si no existe
    try {
      const resultLectura = await generarLecturaPrincipalInterna(usuarioId);
      if (usuario && usuario.email) {
        enviarLecturaPrincipalCorreo(usuario.email, usuario.nombre, resultLectura)
          .catch(e => console.error("❌ Error email lectura automática:", e.message));
      }
    } catch (e) {
      console.error("❌ Error generando lectura post-pago:", e.message);
    }

    // 3. Generar Lectura Diaria
    generarLecturaDiariaUsuario(usuarioId).catch(e => console.error("❌ Error diaria automática:", e.message));
  }

  return { success: true, status, pago: nuevoPago };
};

// VERIFICACIÓN (Llamada por el frontend al volver de Mercado Pago)
export const verificarPago = async (req, res) => {
  const { payment_id } = req.query;
  if (!payment_id) return res.status(400).json({ success: false, error: "ID faltante" });

  try {
    console.log(`🔍 Verificando pago con Mercado Pago API: ${payment_id}`);
    const paymentData = await payment.get({ id: payment_id });
    const resultado = await procesarResultadoPago(paymentData);
    
    if (resultado.success) {
      const usuarioId = paymentData.external_reference;
      
      // --- SINCRONIZACIÓN TOTAL TRAS PAGO ---
      const [usuarioActualizado, lecturasRaw, pagos] = await Promise.all([
        Usuario.findById(usuarioId),
        Lectura.find({ usuarioId }).sort({ fechaLectura: -1 }),
        Pago.find({ usuarioId }).sort({ fecha: -1 })
      ]);

      const lecturas = lecturasRaw.map(l => {
        const obj = l.toObject();
        try { obj.contenido = typeof l.contenido === 'string' ? JSON.parse(l.contenido) : l.contenido; }
        catch (e) { console.error("Parse error:", l._id); }
        return obj;
      });

      return res.json({ 
        success: true, 
        status: resultado.status, 
        usuario: usuarioActualizado,
        lecturas,
        pagos,
        detalles: { monto: paymentData.transaction_amount, id: payment_id }
      });
    }
    res.json({ success: false, status: resultado.status });
  } catch (error) {
    console.error("Error en verificación:", error.message);
    res.status(500).json({ success: false });
  }
};

// WEBHOOK (Notificación automática de Mercado Pago)
export const recibirNotificacion = async (req, res) => {
  const { topic, id } = req.query;
  const paymentId = id || (req.body?.data?.id);
  
  if (topic === "payment" || req.body?.type === "payment") {
    try {
      const paymentData = await payment.get({ id: paymentId });
      await procesarResultadoPago(paymentData);
    } catch (e) { console.error("Webhook Error:", e.message); }
  }
  res.status(200).send("OK");
};

// CONSULTA DE ESTADO (Sondeo del Frontend)
export const consultarEstadoPago = async (req, res) => {
  const { preference_id } = req.query;
  const usuarioId = req.usuario._id;

  if (!preference_id) return res.status(400).json({ success: false });

  try {
    // 1. Miramos si ya se registró en nuestra DB (por Webhook o Redirección)
    let pago = await Pago.findOne({ mpPreferenceId: preference_id }).sort({ fecha: -1 });

    // 2. Si no está en DB (común en LOCALHOST), preguntamos a la API de MP con FILTRO DE TIEMPO ESTRICTO
    if (!pago) {
      console.log(`🔍 [Polling Local] Consultando API de Mercado Pago...`);
      const searchResult = await payment.search({ 
        qs: { 
          external_reference: usuarioId.toString(), 
          sort: 'date_created', 
          criteria: 'desc' 
        } 
      });

      const pagosEncontrados = searchResult.results || [];
      
      // REGLA DE ORO: Solo aceptamos pagos de los últimos 2 MINUTOS
      const haceDosMinutos = new Date(Date.now() - 2 * 60 * 1000);

      const paymentData = pagosEncontrados.find(p => {
        const fechaPago = new Date(p.date_created);
        return p.status === 'approved' && 
               (p.preference_id === preference_id || (fechaPago > haceDosMinutos && Math.round(p.transaction_amount) >= 50000));
      });

      if (paymentData) {
        console.log(`✅ [Polling Local] Pago detectado en API. Registrando...`);
        const resultado = await procesarResultadoPago(paymentData);
        if (resultado.success) pago = resultado.pago;
      }
    }

    if (pago && pago.estado === "aprobado") {
      return res.json({ 
        success: true, 
        estado: "aprobado", 
        pagoId: pago.mpPaymentId 
      });
    }

    res.json({ success: false, estado: "pendiente" });

  } catch (error) {
    console.error("Error en consulta:", error.message);
    res.status(500).json({ success: false });
  }
};
