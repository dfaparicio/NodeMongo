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