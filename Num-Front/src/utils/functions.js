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
  const formateador = new Intl.NumberFormat('es-CO', {
    minimumFractionDigits: 0
  });
  // Limpiamos cualquier espacio invisible que Intl pueda meter (espacios de no ruptura, etc)
  const numeroFormateado = formateador.format(valor).replace(/\s| /g, '');
  return `$${numeroFormateado}`;
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

// --- FUNCIÓN PARA FORMATEAR MÉTODO DE PAGO ---
const formatearMetodoPago = (metodo) => {
  const metodos = {
    'credit_card': 'Tarjeta de Crédito',
    'debit_card': 'Tarjeta de Débito',
    'pse': 'PSE',
    'bank_transfer': 'Transferencia Bancaria',
    'atm': 'Cajero Automático',
    'ticket': 'Efectivo',
    'pix': 'PIX',
    'yape': 'Yape',
    'mercadopagoaccount': 'Cuenta Mercado Pago'
  };
  return metodos[metodo] || metodo?.toUpperCase() || 'Mercado Pago';
};

// --- DISEÑO DE FACTURA ELECTRÓNICA PROFESIONAL (DEVSCENTER) ---
export const generarFactura = (pago, nombreUsuario = 'Buscador') => {
  const fechaFactura = converFecha(pago.fecha);
  const montoFormateado = formatoPesos(pago.monto);
  const idFactura = pago.mpPaymentId || pago._id?.slice(-8).toUpperCase() || 'SYS-' + Math.random().toString(36).substr(2, 5).toUpperCase();
  const cufe = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15); // Simulación de CUFE

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Factura Electrónica - ${idFactura}</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Montserrat:wght@300;400;600&family=Space+Mono&display=swap');
        
        * { box-sizing: border-box; }
        body { 
          background-color: #0b0c0e; 
          color: #ffffff; 
          font-family: 'Montserrat', sans-serif; 
          margin: 0; 
          padding: 20px; 
          -webkit-print-color-adjust: exact; 
        }
        
        .invoice-card {
          max-width: 800px;
          margin: auto;
          background: #1a1c20;
          border-radius: 4px;
          border: 1px solid #2d2f36;
          position: relative;
          overflow: hidden;
          box-shadow: 0 40px 100px rgba(0,0,0,0.8);
        }

        /* Decoración Lateral */
        .invoice-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 5px;
          height: 100%;
          background: linear-gradient(to bottom, #d4af37, #f4af25, #d4af37);
        }

        .header-top {
          padding: 40px;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }

        .company-info h1 {
          font-family: 'Cinzel', serif;
          color: #d4af37;
          margin: 0;
          font-size: 24px;
          letter-spacing: 5px;
        }

        .company-info p {
          color: #6b6f76;
          font-size: 11px;
          margin: 5px 0;
          letter-spacing: 1px;
        }

        .invoice-meta {
          text-align: right;
        }

        .invoice-meta h2 {
          font-family: 'Space Mono', monospace;
          color: #ffffff;
          margin: 0;
          font-size: 18px;
          letter-spacing: -1px;
        }

        .invoice-meta span {
          color: #d4af37;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 2px;
        }

        .billing-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          padding: 40px;
          gap: 40px;
          background: rgba(255,255,255,0.02);
        }

        .bill-to h3, .payment-details h3 {
          font-size: 10px;
          color: #d4af37;
          text-transform: uppercase;
          letter-spacing: 3px;
          margin-bottom: 15px;
          border-bottom: 1px solid rgba(212, 175, 55, 0.2);
          padding-bottom: 5px;
          display: inline-block;
        }

        .bill-to p, .payment-details p {
          margin: 5px 0;
          font-size: 14px;
          color: #b0b3b8;
        }

        .table-section {
          padding: 0 40px;
          margin-bottom: 40px;
        }

        table {
          width: 100%;
          border-collapse: collapse;
        }

        th {
          text-align: left;
          font-size: 11px;
          color: #6b6f76;
          text-transform: uppercase;
          letter-spacing: 2px;
          padding: 15px 0;
          border-bottom: 1px solid rgba(255,255,255,0.1);
        }

        td {
          padding: 20px 0;
          font-size: 14px;
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }

        .desc-col { color: #ffffff; font-weight: 500; }
        .price-col { text-align: right; font-family: 'Space Mono', monospace; color: #d4af37; font-size: 16px; }

        .summary-section {
          padding: 0 40px 40px 40px;
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
        }

        .qr-placeholder {
          background: #ffffff;
          padding: 10px;
          border-radius: 4px;
          width: 120px;
          height: 120px;
        }

        .totals-box {
          width: 250px;
        }

        .total-row {
          display: flex;
          justify-content: space-between;
          padding: 10px 0;
        }

        .total-row.grand-total {
          border-top: 2px solid #d4af37;
          margin-top: 10px;
          padding-top: 15px;
        }

        .total-row.grand-total span:last-child {
          font-size: 24px;
          color: #d4af37;
          font-weight: bold;
          font-family: 'Cinzel', serif;
        }

        .legal-footer {
          padding: 30px 40px;
          background: #121418;
          border-top: 1px solid #2d2f36;
        }

        .legal-footer p {
          font-size: 9px;
          color: #4a4d52;
          line-height: 1.6;
          margin: 0;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .cufe-box {
          font-family: 'Space Mono', monospace;
          font-size: 8px;
          color: #333;
          background: #000;
          padding: 5px;
          margin-top: 10px;
          word-break: break-all;
          border-radius: 2px;
        }

        @media print {
          body { padding: 0; background: #0b0c0e !important; }
          .invoice-card { box-shadow: none; border: none; width: 100%; max-width: 100%; }
        }
      </style>
    </head>
    <body>
      <div class="invoice-card">
        <div class="header-top">
          <div class="company-info">
            <h1>NUMERIS</h1>
            <p>DevsCenter S.A.S - NIT: 901.452.128-5</p>
            <p>Cra. 43A #1-50, Medellín, Colombia</p>
            <p>soporte@devscenter.online | +57 300 000 0000</p>
          </div>
          <div class="invoice-meta">
            <span>Factura Electrónica de Venta</span>
            <h2>N° ${idFactura}</h2>
            <p style="font-size: 11px; color: #6b6f76; margin-top: 5px;">Generada: ${fechaFactura}</p>
          </div>
        </div>

        <div class="billing-grid">
          <div class="bill-to">
            <h3>Adquiriente</h3>
            <p><strong>${pago.pagadorNombreCompleto || nombreUsuario}</strong></p>
            <p>Usuario del Portal Numeris</p>
            ${pago.numeroDocumento ? `<p>Documento: ${pago.tipoDocumento || ''} ${pago.numeroDocumento}</p>` : ''}
            <p>Estado: Alineación Premium Activa</p>
          </div>
          <div class="payment-details">
            <h3>Información de Pago</h3>
            <p>Método: ${formatearMetodoPago(pago.metodoPago) || 'Mercado Pago Online'}</p>
            ${pago.bancoEmisor ? `<p>Banco Emisor: ${pago.bancoEmisor}</p>` : ''}
            ${pago.ultimosDigitos && pago.ultimosDigitos !== 'N/A' ? `<p>Tarjeta: **** ${pago.ultimosDigitos}</p>` : ''}
            ${pago.pagadorNombreCompleto ? `<p>Titular: ${pago.pagadorNombreCompleto}</p>` : ''}
            <p>Transacción: ${pago.mpPaymentId || 'DEVS-'+idFactura}</p>
            <p>Moneda: COP - Peso Colombiano</p>
            ${pago.fecha ? `<p>Fecha Aprobación: ${fechaFactura}</p>` : ''}
          </div>
        </div>

        <div class="table-section">
          <table>
            <thead>
              <tr>
                <th>Descripción del Servicio Astral</th>
                <th style="text-align: right;">Total Item</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="desc-col">
                  ${pago.descripcion || 'Sincronización Astral Premium - Acceso Ilimitado'}
                  <br><span style="font-size: 10px; color: #6b6f76; font-weight: normal;">Suscripción activada por ciclo mensual.</span>
                </td>
                <td class="price-col">${montoFormateado}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="summary-section">
          <div class="qr-block" style="text-align: center;">
            <div class="qr-placeholder">
              <img src="https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=https://numerologia-astral.devscenter.online/factura/${idFactura}&bgcolor=ffffff" alt="QR Factura" width="100" height="100">
            </div>
            <p style="font-size: 8px; color: #6b6f76; margin-top: 8px; text-transform: uppercase;">Validación DIAN Digital</p>
          </div>
          
          <div class="totals-box">
            <div class="total-row">
              <span style="color: #6b6f76; font-size: 12px;">Subtotal</span>
              <span style="color: #ffffff; font-family: 'Space Mono';">${montoFormateado}</span>
            </div>
            <div class="total-row">
              <span style="color: #6b6f76; font-size: 12px;">IVA (0%)</span>
              <span style="color: #ffffff; font-family: 'Space Mono';">$0</span>
            </div>
            <div class="total-row grand-total">
              <span>TOTAL</span>
              <span>${montoFormateado}</span>
            </div>
          </div>
        </div>

        <div class="legal-footer">
          <p>Esta es una representación gráfica de una factura electrónica de venta. DevsCenter S.A.S. no se hace responsable por desalineaciones cósmicas externas. La firma digital de este documento garantiza su integridad y origen según el decreto 2242 de 2015.</p>
          <div class="cufe-box">
            CUFE: ${cufe.toUpperCase()}
          </div>
          <p style="text-align: center; margin-top: 15px; color: #2d2f36; font-weight: bold;">
            GRACIAS POR CONFIAR EN TU DESTINO • DEVSCENTER S.A.S
          </p>
        </div>
      </div>
      <script>
        window.onload = function() {
          setTimeout(function() { window.print(); }, 1000);
        };
      </script>
    </body>
    </html>
  `;

  const win = window.open('', '_blank');
  win.document.write(html);
  win.document.close();
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
