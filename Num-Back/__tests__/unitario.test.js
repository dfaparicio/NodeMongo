const calcularNumeroVida = (fecha) => {
  const digitos = fecha.replace(/-/g, '');
  let suma = [...digitos].reduce((acc, n) => acc + parseInt(n), 0);
  while (suma > 9 && suma !== 11 && suma !== 22) {
    suma = [...suma.toString()].reduce((acc, n) => acc + parseInt(n), 0);
  }
  return suma;
};

describe('--- PRUEBAS UNITARIAS (BACKEND) ---', () => {
  test('Debe calcular correctamente el número 7 para la fecha 1995-07-12', () => {
    const resultado = calcularNumeroVida('1995-07-12');
    expect(resultado).toBe(7);
  });

  test('Debe respetar el número maestro 11 sin reducirlo a 2', () => {
    const resultado = calcularNumeroVida('1997-25-01');
    expect(resultado).toBe(11);
  });
});