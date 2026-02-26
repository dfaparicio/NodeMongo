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
