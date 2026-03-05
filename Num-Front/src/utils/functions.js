// Limpiar fechas de Mongoo
export const converFecha = (dateSource) => {
  if (!dateSource) return "--";

  const fecha = new Date(dateSource);

  if (isNaN(fecha.getTime())) return "--";

  const meses = [
    "Ene",
    "Feb",
    "Mar",
    "Abr",
    "May",
    "Jun",
    "Jul",
    "Ago",
    "Sep",
    "Oct",
    "Nov",
    "Dic",
  ];

  const dia = fecha.getUTCDate();
  const mes = meses[fecha.getUTCMonth()];
  const anio = fecha.getUTCFullYear();

  return `${dia} ${mes} ${anio}`;
};


// Rango de fechas para el carrusel
export const generarRangoFechas = (fechaCentro, rango = 2, hoyStr = '') => {
  const fechas = [];
  for (let i = -rango; i <= rango; i++) {
    const d = new Date(fechaCentro);
    d.setDate(d.getDate() + i);
    d.setHours(0, 0, 0, 0);

    const strFecha = converFecha(d);
    const partes = strFecha.split(' ');

    fechas.push({
      date: d,
      str: strFecha,
      labelCarrusel: partes.length >= 2 ? `${partes[1].toUpperCase()} ${partes[0]}` : strFecha,
      isHoy: strFecha === hoyStr
    });
  }
  return fechas;
};

// Estado de lectura segun la fecha 
export const obtenerEstadoLectura = (lecturaActual, fechaSeleccionadaDate, fechaHoyDate) => {
  if (lecturaActual) return 'encontrada';
  
  const timeSeleccionado = fechaSeleccionadaDate.getTime();
  const timeHoy = fechaHoyDate.getTime();

  if (timeSeleccionado < timeHoy) return 'pasada_sin_generar';
  if (timeSeleccionado > timeHoy) return 'futura';
  return 'hoy_sin_generar';
};

// Resetea la fecha
export const resetearHoras = (date) => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
};


// Convierte monto a pesos
export const formatoPesos = (valor) => {
  if (valor === undefined || valor === null || isNaN(valor)) {
    return '$ 0';
  }

  const formateador = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 3, 
    maximumFractionDigits: 3 
  });

  return formateador.format(valor).replace(/[a-zA-Z]/g, '').trim();
};







export const generarFactura = (pago, nombreUsuario = 'Buscador') => {
  const fechaFactura = new Date(pago.fecha).toLocaleDateString('es-CO');
  const montoFormateado = formatoPesos(pago.monto);
  const idFactura = pago._id || pago.id || Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
  const descripcion = pago.descripcion || 'Servicio de Numerología';

  const html = `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <title>Factura - ${idFactura}</title>
      <style>
        /* Importamos una fuente moderna y elegante */
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;600;700&display=swap');
        
        :root {
          --primary: #270075;
          --dark: #c0c7ff;
          --gray: #64748b;
          --light: #f8fafc;
        }

        body {
          font-family: 'Montserrat', sans-serif;
          color: #333;
          margin: 0;
          padding: 0;
          background-color: #f4f4f5; /* Fondo gris muy sutil para la pantalla */
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }

        .invoice-container {
          max-width: 800px;
          margin: 40px auto;
          padding: 50px;
          background: #fff;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
          border-top: 8px solid var(--primary);
          border-radius: 8px;
          position: relative;
          overflow: hidden;
        }

        /* Marca de agua de fondo */
        .watermark {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) rotate(-30deg);
          font-size: 110px;
          color: rgba(244, 175, 37, 0.2);
          font-weight: 700;
          text-transform: uppercase;
          z-index: 0;
          pointer-events: none;
          white-space: nowrap;
        }

        .content {
          position: relative;
          z-index: 1;
        }

        .header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          border-bottom: 2px solid #eee;
          padding-bottom: 30px;
          margin-bottom: 30px;
        }

        .logo-section h1 {
          margin: 0;
          font-size: 32px;
          font-weight: 700;
          letter-spacing: 4px;
          color: var(--dark);
          text-transform: uppercase;
        }

        .logo-section h1 span {
          color: var(--primary);
        }

        .logo-section p {
          margin: 5px 0 0;
          font-size: 11px;
          color: var(--gray);
          letter-spacing: 2px;
          text-transform: uppercase;
        }

        .invoice-details {
          text-align: right;
        }

        .invoice-details h2 {
          margin: 0;
          font-size: 24px;
          color: var(--gray);
          text-transform: uppercase;
          letter-spacing: 2px;
        }

        .invoice-details p {
          margin: 5px 0;
          font-size: 14px;
          font-weight: 600;
        }

        .invoice-details p span {
          font-weight: 400;
          color: var(--gray);
        }

        .info-grid {
          display: flex;
          justify-content: space-between;
          margin-bottom: 40px;
        }

        .info-box {
          width: 45%;
        }

        .info-box h3 {
          font-size: 11px;
          text-transform: uppercase;
          color: var(--gray);
          border-bottom: 1px solid var(--primary);
          padding-bottom: 5px;
          margin-bottom: 10px;
          letter-spacing: 1px;
        }

        .info-box p {
          margin: 4px 0;
          font-size: 14px;
          line-height: 1.6;
        }

        .invoice-table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 30px;
        }

        .invoice-table th {
          background-color: var(--dark);
          color: var(--primary);
          padding: 15px;
          text-align: left;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .invoice-table th.text-right {
          text-align: right;
        }

        .invoice-table td {
          padding: 15px;
          border-bottom: 1px solid #eee;
          font-size: 14px;
        }

        .invoice-table td.text-right {
          text-align: right;
          font-weight: 600;
        }

        .totals {
          width: 50%;
          margin-left: auto;
        }

        .totals-row {
          display: flex;
          justify-content: space-between;
          padding: 10px 15px;
          font-size: 14px;
        }

        .totals-row.grand-total {
          background-color: var(--light);
          font-size: 20px;
          font-weight: 700;
          color: var(--dark);
          border-left: 4px solid var(--primary);
          margin-top: 10px;
        }

        .totals-row.grand-total span:last-child {
          color: var(--primary);
        }

        .footer {
          margin-top: 60px;
          padding-top: 20px;
          border-top: 1px solid #eee;
          text-align: center;
          font-size: 11px;
          color: var(--gray);
          line-height: 1.6;
        }

        /* Reglas específicas para cuando se guarda como PDF o se imprime */
        @media print {
          body { background: white; margin: 0; padding: 0; }
          .invoice-container { box-shadow: none; border-top: none; margin: 0; padding: 20px; }
          .header { border-top: 8px solid var(--primary); padding-top: 30px; }
          .watermark { color: rgba(244, 175, 37, 0.08); } /* Un poco más visible al imprimir */
        }
      </style>
    </head>
    <body>
      <div class="invoice-container">
        <div class="watermark">NUMEROLOGÍA</div>
        
        <div class="content">
          <div class="header">
            <div class="logo-section">
              <h1>NUMERO<span>LOGÍA</span></h1>
              <p>Descifra tu código cósmico</p>
            </div>
            <div class="invoice-details">
              <h2>RECIBO</h2>
              <p><span>Nº:</span> #${idFactura}</p>
              <p><span>Fecha:</span> ${fechaFactura}</p>
            </div>
          </div>

          <div class="info-grid">
            <div class="info-box">
              <h3>Emitido por</h3>
              <p><strong>Numerología</strong></p>
              <p>Sede Principal</p>
              <p>San Gil, Santander, Colombia</p>
              <p style="color: #f4af25;">plataforma@numerologia.com</p>
            </div>
            <div class="info-box" style="text-align: right;">
              <h3>Facturado a</h3>
              <p><strong>${nombreUsuario}</strong></p>
              <p>Cliente Digital</p>
              <p>Intercambio Energético</p>
            </div>
          </div>

          <table class="invoice-table">
            <thead>
              <tr>
                <th>Descripción del Servicio</th>
                <th style="text-align: center;">Estado</th>
                <th class="text-right">Importe</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <strong>${descripcion}</strong><br>
                  <span style="font-size: 12px; color: #64748b;">Acceso a plataforma y reporte digital</span>
                </td>
                <td style="text-align: center; color: #34d399; font-weight: 600;">Completado</td>
                <td class="text-right">${montoFormateado}</td>
              </tr>
            </tbody>
          </table>

          <div class="totals">
            <div class="totals-row">
              <span>Subtotal</span>
              <span>${montoFormateado}</span>
            </div>
            <div class="totals-row">
              <span>Impuestos (0%)</span>
              <span>$ 0,00</span>
            </div>
            <div class="totals-row grand-total">
              <span>Total Pagado</span>
              <span>${montoFormateado}</span>
            </div>
          </div>

          <div class="footer">
            <p>Gracias por permitirnos acompañarte en tu viaje de autoconocimiento.</p>
            <p>Este documento es un comprobante de pago electrónico. Conserva este recibo para tu historial.</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;

  const ventanaImpresion = window.open('', '_blank');
  ventanaImpresion.document.write(html);
  ventanaImpresion.document.close();
  ventanaImpresion.focus();
  
  // Aumentamos el tiempo a 500ms para asegurar que la fuente de Google cargue antes de imprimir
  setTimeout(() => {
    ventanaImpresion.print();
  }, 500);
};