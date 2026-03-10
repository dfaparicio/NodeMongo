// Limpiar fechas de MongoDB
export const converFecha = (dateSource) => {
  if (!dateSource) return "--";
  const fecha = new Date(dateSource);
  if (isNaN(fecha.getTime())) return "--";
  const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  return `${fecha.getDate()} de ${meses[fecha.getMonth()]}, ${fecha.getFullYear()}`;
};

// Resetear horas a 0 para comparaciones precisas de fechas
export const resetearHoras = (fecha) => {
  const d = new Date(fecha);
  d.setHours(0, 0, 0, 0);
  return d;
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

// Generar PDF de factura con diseño Premium
export const generarFactura = (pago, nombreUsuario = 'Buscador') => {
  const fechaFactura = converFecha(pago.fecha);
  const montoFormateado = formatoPesos(pago.monto);
  const idFactura = pago._id?.slice(-8).toUpperCase() || Math.random().toString(36).substr(2, 8).toUpperCase();

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Montserrat:wght@300;400;600&display=swap');
        
        body { 
          background-color: #0b0c0e; 
          color: #ffffff; 
          font-family: 'Montserrat', sans-serif; 
          margin: 0; 
          padding: 0;
          -webkit-print-color-adjust: exact;
        }

        .receipt-container {
          max-width: 700px;
          margin: 40px auto;
          background: #16181d;
          border: 1px solid #d4af37;
          padding: 50px;
          position: relative;
          box-shadow: 0 20px 40px rgba(0,0,0,0.5);
        }

        .watermark {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) rotate(-45deg);
          font-family: 'Cinzel', serif;
          font-size: 120px;
          color: rgba(212, 175, 55, 0.03);
          white-space: nowrap;
          z-index: 0;
          pointer-events: none;
        }

        .header {
          text-align: center;
          border-bottom: 1px solid rgba(212, 175, 55, 0.3);
          padding-bottom: 30px;
          margin-bottom: 40px;
          position: relative;
          z-index: 1;
        }

        h1 {
          font-family: 'Cinzel', serif;
          color: #d4af37;
          letter-spacing: 8px;
          margin: 0;
          font-size: 32px;
        }

        .subtitle {
          font-size: 10px;
          letter-spacing: 4px;
          color: #888;
          margin-top: 10px;
          text-transform: uppercase;
        }

        .info-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          margin-bottom: 50px;
          position: relative;
          z-index: 1;
        }

        .info-block h4 {
          color: #d4af37;
          text-transform: uppercase;
          font-size: 11px;
          letter-spacing: 2px;
          margin-bottom: 15px;
          border-bottom: 1px solid rgba(212, 175, 55, 0.1);
          padding-bottom: 5px;
        }

        .info-block p {
          margin: 5px 0;
          font-size: 14px;
          color: #ccc;
        }

        .details-table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 50px;
          position: relative;
          z-index: 1;
        }

        .details-table th {
          text-align: left;
          color: #d4af37;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 1px;
          padding: 15px;
          border-bottom: 2px solid #d4af37;
        }

        .details-table td {
          padding: 20px 15px;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          font-size: 15px;
        }

        .total-section {
          text-align: right;
          position: relative;
          z-index: 1;
        }

        .total-box {
          display: inline-block;
          background: rgba(212, 175, 55, 0.1);
          padding: 20px 40px;
          border-radius: 4px;
          border: 1px solid rgba(212, 175, 55, 0.3);
        }

        .total-label {
          font-size: 12px;
          color: #888;
          text-transform: uppercase;
          display: block;
          margin-bottom: 5px;
        }

        .total-amount {
          font-family: 'Cinzel', serif;
          font-size: 28px;
          color: #d4af37;
          font-weight: bold;
        }

        .footer {
          margin-top: 60px;
          text-align: center;
          font-size: 10px;
          color: #555;
          letter-spacing: 1px;
          line-height: 1.8;
        }

        @media print {
          body { background: white; color: black; }
          .receipt-container { margin: 0; box-shadow: none; border: 1px solid #ddd; width: 100%; }
          .total-box { border: 1px solid #ddd; }
        }
      </style>
    </head>
    <body>
      <div class="receipt-container">
        <div class="watermark">NUMERIS</div>
        
        <div class="header">
          <h1>NUMERIS</h1>
          <div class="subtitle">Comprobante de Transacción Digital</div>
        </div>

        <div class="info-grid">
          <div class="info-block">
            <h4>Detalles del Cliente</h4>
            <p><strong>Nombre:</strong> ${nombreUsuario}</p>
            <p><strong>Referencia:</strong> #USR-${pago.usuario?.slice(-5).toUpperCase() || 'SYS'}</p>
          </div>
          <div class="info-block" style="text-align: right;">
            <h4>Detalles del Recibo</h4>
            <p><strong>ID:</strong> ${idFactura}</p>
            <p><strong>Fecha:</strong> ${fechaFactura}</p>
          </div>
        </div>

        <table class="details-table">
          <thead>
            <tr>
              <th>Descripción del Servicio</th>
              <th style="text-align: right;">Monto</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>${pago.descripcion}</td>
              <td style="text-align: right; font-weight: 600;">${montoFormateado}</td>
            </tr>
          </tbody>
        </table>

        <div class="total-section">
          <div class="total-box">
            <span class="total-label">Total Pagado</span>
            <span class="total-amount">${montoFormateado}</span>
          </div>
        </div>

        <div class="footer">
          <p>Este documento es un comprobante oficial de pago generado por Numeris.</p>
          <p>© 2026 Numeris • San Gil, Santander, Colombia • Conexión Universal</p>
        </div>
      </div>
    </body>
    </html>
  `;

  const win = window.open('', '_blank');
  win.document.write(html);
  win.document.close();
  setTimeout(() => { win.print(); }, 500);
};

// Generar PDF de Lectura Principal con diseño Premium
export const generarPDFLectura = (lectura, nombreUsuario = 'Buscador') => {
  const { numero, descripcion, talentos, mensaje } = lectura.contenido;
  const fechaLectura = converFecha(lectura.fechaLectura);

  const html = `
    <html>
    <head>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&display=swap');
        body { background: #0b0c0e; color: white; font-family: sans-serif; padding: 60px; }
        .container { border: 2px solid #d4af37; padding: 40px; }
        h1 { font-family: 'Cinzel', serif; color: #d4af37; text-align: center; letter-spacing: 5px; }
        .numero { font-size: 60px; color: #d4af37; text-align: center; font-family: 'Cinzel', serif; margin: 20px 0; }
        h3 { color: #d4af37; border-left: 3px solid #d4af37; padding-left: 15px; text-transform: uppercase; }
        p { line-height: 1.8; color: #ccc; }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>NUMERIS</h1>
        <p style="text-align:center">${fechaLectura} • ${nombreUsuario}</p>
        <div class="numero">${numero}</div>
        <h3>Descripción</h3><p>${descripcion}</p>
        <h3>Tus Talentos</h3><p>${talentos}</p>
        <h3>Mensaje Estelar</h3><p>${mensaje}</p>
      </div>
    </body>
    </html>
  `;

  const win = window.open('', '_blank');
  win.document.write(html);
  win.document.close();
  setTimeout(() => { win.print(); }, 500);
};