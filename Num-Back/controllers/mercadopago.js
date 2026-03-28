import { preference, payment } from "../config/mercadopago.js";
import Pago from "../models/pagos.js";
import Usuario from "../models/usuario.js";
import Lectura from "../models/lecturas.js";
import { generarLecturaDiariaUsuario, generarLecturaPrincipalInterna } from "./lecturas.js";
import { enviarFacturaCorreo } from "../helpers/mailer.js";
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
        success: `${BASE_URL}/#/pagos/exito`,
        failure: `${BASE_URL}/#/pagos/fallo`,
        pending: `${BASE_URL}/#/pagos/pendiente`,
      },
      auto_return: "approved",
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
  let descripcionPlan = "Plan Básico";

  if (montoPagado >= 5000) {
    diasAAgregar = 365;
    descripcionPlan = "Plan Premium";
  } else if (montoPagado >= 3000) {
    diasAAgregar = 180;
    descripcionPlan = "Plan Medio";
  }

  const infoPago = {
    usuarioId,
    monto: montoPagado,
    descripcion: descripcionPlan,
    estado: status === "approved" ? "aprobado" : status === "in_process" ? "en_proceso" : "pendiente",
    moneda: paymentData.currency_id || "COP",

    // Estado del pago
    estadoDetalle: paymentData.status_detail || "",
    operationType: paymentData.operation_type || "",

    // Fechas de Mercado Pago
    fecha: paymentData.date_approved || new Date(),
    fechaCreacion: paymentData.date_created || null,
    fechaAprobacion: paymentData.date_approved || null,
    fechaLiberacion: paymentData.money_release_date || null,
    fechaUltimoMovimiento: paymentData.date_last_updated || null,

    // IDs de Mercado Pago
    mpPaymentId: paymentId,
    mpPreferenceId: preferenceId || "",

    // Información del método de pago
    metodoPago: paymentData.payment_method_id || "",
    tipoPago: paymentData.payment_type_id || "",

    // Información de la tarjeta (si aplica)
    ultimosDigitos: paymentData.card?.last_four_digits || "N/A",
    nombreTarjeta: paymentData.card?.holder?.name || "",
    bancoEmisor: paymentData.card?.issuer?.name || "",
    primerosDigitos: paymentData.card?.first_six_digits || "",

    // Información del pagador
    pagadorEmail: paymentData.payer?.email || "",
    pagadorNombre: paymentData.payer?.first_name || "",
    pagadorApellido: paymentData.payer?.last_name || "",
    pagadorNombreCompleto: paymentData.payer?.name || "",
    tipoDocumento: paymentData.payer?.identification?.type || "",
    numeroDocumento: paymentData.payer?.identification?.number || "",
  };

  const nuevoPago = await new Pago(infoPago).save();

  if (status === "approved") {
    const hoy = new Date();
    const nuevaExpiracion = new Date(hoy);
    nuevaExpiracion.setDate(hoy.getDate() + diasAAgregar);

    // Actualizamos y obtenemos el usuario fresco
    const usuario = await Usuario.findByIdAndUpdate(usuarioId,
      { $set: { estado: 1, fechaExpiracion: nuevaExpiracion } },
      { new: true }
    );

    console.log(`🎉 [PAGO APROBADO] Usuario ${usuario.email} activado por ${diasAAgregar} días.`);
    console.log(`🎉 [PAGO APROBADO] Fecha de expiración: ${nuevaExpiracion.toISOString()}`);

    // 1. Enviar Factura Profesional (Sin await para no bloquear el flujo de MP)
    if (usuario && usuario.email) {
      enviarFacturaCorreo(usuario.email, usuario.nombre, infoPago)
        .catch(e => console.error("❌ [PAGO] Error factura automática:", e.message));
    }

    // 2. Generar Lectura Principal (el correo se envía automáticamente desde la función interna)
    try {
      console.log(`📖 [PAGO] Generando lectura principal para usuario ${usuarioId}...`);
      await generarLecturaPrincipalInterna(usuarioId);
      console.log(`✅ [PAGO] Lectura principal generada exitosamente.`);
    } catch (e) {
      console.error("❌ [PAGO] Error generando lectura post-pago:", e.message);
      console.error("❌ [PAGO] Stack:", e.stack);
    }

    // 3. Generar Lectura Diaria (con await explícito para asegurar ejecución)
    try {
      console.log(`📖 [PAGO] Generando lectura diaria para usuario ${usuarioId}...`);
      const resultadoDiaria = await generarLecturaDiariaUsuario(usuarioId);
      if (resultadoDiaria.success) {
        console.log(`✅ [PAGO] Lectura diaria generada exitosamente:`, resultadoDiaria.msg);
      } else {
        console.log(`ℹ️ [PAGO] Lectura diaria:`, resultadoDiaria.msg || "No se generó lectura diaria");
      }
    } catch (e) {
      console.error("❌ [PAGO] Error generando lectura diaria post-pago:", e.message);
      console.error("❌ [PAGO] Stack:", e.stack);
    }

    console.log(`✅ [PAGO APROBADO] Flujo de pago completado para usuario ${usuarioId}`);
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

      // Información adicional del pago para el frontend
      const paymentDetails = {
        monto: paymentData.transaction_amount || 0,
        id: payment_id,
        fechaAprobacion: paymentData.date_approved || new Date(),
        metodoPago: paymentData.payment_method_id || "",
        tipoPago: paymentData.payment_type_id || "",
        bancoEmisor: paymentData.card?.issuer?.name || "",
        ultimosDigitos: paymentData.card?.last_four_digits || "N/A",
        pagadorEmail: paymentData.payer?.email || "",
        pagadorNombreCompleto: paymentData.payer?.name || "",
        tipoDocumento: paymentData.payer?.identification?.type || "",
        numeroDocumento: paymentData.payer?.identification?.number || "",
      };

      return res.json({
        success: true,
        status: resultado.status,
        usuario: usuarioActualizado,
        lecturas,
        pagos,
        detalles: paymentDetails
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
               (p.preference_id === preference_id || (fechaPago > haceDosMinutos && Math.round(p.transaction_amount) >= 2000));
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
