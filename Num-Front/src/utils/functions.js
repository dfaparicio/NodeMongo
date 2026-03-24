// Limpiar fechas de MongoDB y formatear correctamente para Colombia
export const converFecha = (dateSource) => {
  if (!dateSource) return "--";
  
  // Si es un string de fecha (ej: "1990-10-27"), nos aseguramos de que no pierda el día por el desfase UTC
  // Al crear un Date de un string YYYY-MM-DD sin hora, JS lo asume como UTC medianoche.
  // En Colombia (UTC-5), eso se convierte en las 7:00 PM del día ANTERIOR.
  let fecha;
  if (typeof dateSource === 'string' && dateSource.includes('-') && !dateSource.includes('T')) {
    const [year, month, day] = dateSource.split('-').map(Number);
    fecha = new Date(year, month - 1, day); // Crear en hora local
  } else {
    fecha = new Date(dateSource);
  }

  if (isNaN(fecha.getTime())) return "--";

  // Usar Intl para asegurar formato correcto en español y manejo de zonas horarias
  return new Intl.DateTimeFormat('es-CO', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'America/Bogota'
  }).format(fecha);
};

// Resetear horas a 0 en zona horaria de Colombia
export const resetearHoras = (fecha) => {
  const d = new Date(fecha);
  // Ajustamos a Colombia para la comparación
  const bogotaDate = new Date(d.toLocaleString("en-US", {timeZone: "America/Bogota"}));
  bogotaDate.setHours(0, 0, 0, 0);
  return bogotaDate;
};

// Formato de moneda colombiana
export const formatoPesos = (valor) => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0
  }).format(valor);
};

// Generar rango de fechas para el carrusel de lectura diaria
export const generarRangoFechas = (centro, radio, stringHoy) => {
  const fechas = [];
  for (let i = -radio; i <= radio; i++) {
    const d = new Date(centro);
    d.setDate(d.getDate() + i);
    const dReset = resetearHoras(d);
    const str = converFecha(dReset);
    fechas.push({
      str,
      date: dReset,
      isHoy: str === stringHoy,
      labelCarrusel: `${d.getDate()}/${d.getMonth() + 1}`
    });
  }
  return fechas;
};

// Determinar el estado de una lectura para la UI
export const obtenerEstadoLectura = (lectura, fechaSeleccionada, hoy) => {
  if (lectura) return 'encontrada';
  if (fechaSeleccionada < hoy) return 'pasada_sin_generar';
  if (fechaSeleccionada > hoy) return 'futura';
  return 'no_generada_hoy';
};

// --- DISEÑO DE FACTURA PREMIUM ---
export const generarFactura = (pago, nombreUsuario = 'Buscador') => {
  const fechaFactura = converFecha(pago.fecha);
  const montoFormateado = formatoPesos(pago.monto);
  const idFactura = pago.mpPaymentId || pago._id?.slice(-8).toUpperCase() || 'SYS-' + Math.random().toString(36).substr(2, 5).toUpperCase();

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Montserrat:wght@300;400;600&display=swap');
        body { background-color: #0b0c0e; color: #ffffff; font-family: 'Montserrat', sans-serif; margin: 0; padding: 40px; -webkit-print-color-adjust: exact; }
        .receipt-container { max-width: 800px; margin: auto; background: #16181d; border: 1px solid #d4af37; padding: 60px; position: relative; box-shadow: 0 20px 40px rgba(0,0,0,0.5); }
        .watermark { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%) rotate(-45deg); font-family: 'Cinzel', serif; font-size: 150px; color: rgba(212, 175, 55, 0.02); white-space: nowrap; pointer-events: none; }
        .header { text-align: center; border-bottom: 1px solid rgba(212, 175, 55, 0.3); padding-bottom: 30px; margin-bottom: 40px; }
        h1 { font-family: 'Cinzel', serif; color: #d4af37; letter-spacing: 10px; margin: 0; font-size: 36px; }
        .subtitle { font-size: 11px; letter-spacing: 5px; color: #888; margin-top: 10px; text-transform: uppercase; }
        .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; margin-bottom: 50px; }
        .info-block h4 { color: #d4af37; text-transform: uppercase; font-size: 12px; letter-spacing: 2px; margin-bottom: 15px; border-bottom: 1px solid rgba(212, 175, 55, 0.1); padding-bottom: 5px; }
        .info-block p { margin: 8px 0; font-size: 14px; color: #ccc; }
        .details-table { width: 100%; border-collapse: collapse; margin-bottom: 50px; }
        .details-table th { text-align: left; color: #d4af37; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; padding: 15px; border-bottom: 2px solid #d4af37; }
        .details-table td { padding: 20px 15px; border-bottom: 1px solid rgba(255,255,255,0.05); font-size: 15px; }
        .total-section { text-align: right; }
        .total-box { display: inline-block; background: rgba(212, 175, 55, 0.05); padding: 25px 50px; border-radius: 4px; border: 1px solid rgba(212, 175, 55, 0.2); }
        .total-label { font-size: 12px; color: #888; text-transform: uppercase; display: block; margin-bottom: 10px; }
        .total-amount { font-family: 'Cinzel', serif; font-size: 32px; color: #d4af37; font-weight: bold; }
        .footer { margin-top: 80px; text-align: center; font-size: 11px; color: #555; letter-spacing: 1px; line-height: 2; border-top: 1px solid rgba(255,255,255,0.05); padding-top: 30px; }
        @media print { body { background: white !important; color: black !important; padding: 0; } .receipt-container { margin: 0; box-shadow: none; border: 1px solid #ddd; width: 100%; max-width: 100%; background: white !important; color: black !important; } .total-box { border: 1px solid #ddd; background: #f9f9f9 !important; } h1, .total-amount, .info-block h4 { color: #000 !important; } }
      </style>
    </head>
    <body>
      <div class="receipt-container">
        <div class="watermark">NUMERIS</div>
        <div class="header">
          <h1>NUMERIS</h1>
          <div class="subtitle">Recibo de Activación Energética</div>
        </div>
        <div class="info-grid">
          <div class="info-block">
            <h4>Buscador</h4>
            <p><strong>Nombre:</strong> ${nombreUsuario}</p>
            <p><strong>Estado:</strong> Alineado con el Cosmos</p>
          </div>
          <div class="info-block" style="text-align: right;">
            <h4>Detalles de Transacción</h4>
            <p><strong>ID Pago:</strong> ${idFactura}</p>
            <p><strong>Fecha:</strong> ${fechaFactura}</p>
          </div>
        </div>
        <table class="details-table">
          <thead>
            <tr>
              <th>Servicio Astral</th>
              <th style="text-align: right;">Inversión</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>${pago.descripcion || 'Acceso Premium Numeris'}</td>
              <td style="text-align: right; font-weight: 600; color: #d4af37;">${montoFormateado}</td>
            </tr>
          </tbody>
        </table>
        <div class="total-section">
          <div class="total-box">
            <span class="total-label">Total Acreditado</span>
            <span class="total-amount">${montoFormateado}</span>
          </div>
        </div>
        <div class="footer">
          <p>Este comprobante certifica tu acceso al Portal de Numerología Astral.<br>
          La energía fluye donde la intención se pone.<br>
          © 2026 Numeris • Conexión Universal</p>
        </div>
      </div>
    </body>
    </html>
  `;

  const win = window.open('', '_blank');
  win.document.write(html);
  win.document.close();
  setTimeout(() => { win.print(); }, 800);
};

// --- DISEÑO DE LECTURA PRINCIPAL PROFESIONAL (PDF) ---
export const generarPDFLectura = (lectura, nombreUsuario = 'Buscador') => {
  const { numero, descripcion, talentos, mensaje } = lectura.contenido;
  const fechaLectura = converFecha(lectura.fechaLectura);

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Lectura Principal - ${nombreUsuario}</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Montserrat:wght@300;400;600&display=swap');
        
        * { box-sizing: border-box; }
        body { background-color: #ffffff; color: #1a1a1a; font-family: 'Montserrat', sans-serif; margin: 0; padding: 0; -webkit-print-color-adjust: exact; }
        
        .page { width: 210mm; min-height: 297mm; padding: 25mm; margin: auto; background: white; border: 1px solid #eee; position: relative; overflow: hidden; }
        
        /* Bordes Decorativos */
        .border-frame { position: absolute; top: 10mm; left: 10mm; right: 10mm; bottom: 10mm; border: 1px solid #d4af37; pointer-events: none; }
        .corner { position: absolute; width: 30px; height: 30px; border: 3px solid #d4af37; }
        .top-left { top: -2px; left: -2px; border-right: none; border-bottom: none; }
        .top-right { top: -2px; right: -2px; border-left: none; border-bottom: none; }
        .bottom-left { bottom: -2px; left: -2px; border-right: none; border-top: none; }
        .bottom-right { bottom: -2px; right: -2px; border-left: none; border-top: none; }

        .header { text-align: center; margin-bottom: 40px; margin-top: 20px; }
        .header h1 { font-family: 'Cinzel', serif; font-size: 32pt; color: #d4af37; margin: 0; letter-spacing: 8px; }
        .header .subtitle { font-size: 10pt; letter-spacing: 4px; color: #666; text-transform: uppercase; margin-top: 5px; }
        
        .user-info { text-align: center; margin-bottom: 40px; border-bottom: 1px solid #eee; padding-bottom: 20px; font-size: 11pt; color: #444; }

        .number-section { text-align: center; margin-bottom: 50px; }
        .number-circle { display: inline-block; width: 100px; height: 100px; line-height: 94px; border: 2px solid #d4af37; border-radius: 50%; font-family: 'Cinzel', serif; font-size: 42pt; color: #d4af37; background: #fffaf0; }
        .number-label { font-size: 9pt; letter-spacing: 3px; color: #888; margin-bottom: 10px; text-transform: uppercase; }

        .section { margin-bottom: 35px; }
        .section-title { font-family: 'Cinzel', serif; font-size: 14pt; color: #d4af37; border-bottom: 1px solid #f0e6d2; padding-bottom: 8px; margin-bottom: 15px; text-transform: uppercase; letter-spacing: 2px; }
        .section-content { font-size: 11pt; line-height: 1.7; text-align: justify; color: #333; }

        .highlight-box { background: #fffcf2; border-left: 4px solid #d4af37; padding: 25px; margin: 40px 0; font-style: italic; }
        .highlight-title { font-family: 'Cinzel', serif; font-size: 10pt; color: #d4af37; margin-bottom: 10px; letter-spacing: 2px; font-style: normal; }

        .footer { position: absolute; bottom: 20mm; left: 0; right: 0; text-align: center; font-size: 8pt; color: #aaa; letter-spacing: 1px; }

        @media print {
          body { background: white; }
          .page { border: none; margin: 0; width: 100%; box-shadow: none; }
        }
      </style>
    </head>
    <body>
      <div class="page">
        <div class="border-frame">
          <div class="corner top-left"></div><div class="corner top-right"></div>
          <div class="corner bottom-left"></div><div class="corner bottom-right"></div>
        </div>

        <div class="header">
          <h1>NUMERIS</h1>
          <div class="subtitle">Análisis de Frecuencia Vibratoria</div>
        </div>

        <div class="user-info">
          Buscador: <strong>${nombreUsuario}</strong> &nbsp; | &nbsp; Fecha de Canalización: ${fechaLectura}
        </div>

        <div class="number-section">
          <div class="number-label">Camino de Vida</div>
          <div class="number-circle">${numero}</div>
        </div>

        <div class="section">
          <div class="section-title">Esencia y Propósito</div>
          <div class="section-content">${descripcion}</div>
        </div>

        <div class="section">
          <div class="section-title">Dones Celestiales</div>
          <div class="section-content">${talentos}</div>
        </div>

        <div class="highlight-box">
          <div class="highlight-title">Mensaje de las Estrellas</div>
          "${mensaje}"
        </div>

        <div class="footer">
          DOCUMENTO OFICIAL DE NUMERIS ASTRAL • GUÍA ESPIRITUAL PERSONALIZADA<br>
          © 2026 PORTAL DE CONOCIMIENTO UNIVERSAL
        </div>
      </div>
    </body>
    </html>
  `;

  const win = window.open('', '_blank');
  win.document.write(html);
  win.document.close();
  // Damos un poco más de tiempo para que carguen las fuentes antes de imprimir
  setTimeout(() => { win.print(); }, 1000);
};
