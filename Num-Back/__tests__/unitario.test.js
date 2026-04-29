const calcularNumeroVida = (fecha) => {
  const digitos = fecha.replace(/-/g, '');
  let suma = [...digitos].reduce((acc, n) => acc + parseInt(n), 0);
  
  // Reducción a un solo dígito, respetando números maestros 11 y 22
  while (suma > 9 && suma !== 11 && suma !== 22) {
    suma = [...suma.toString()].reduce((acc, n) => acc + parseInt(n), 0);
  }
  return suma;
};


describe('--- PRUEBAS UNITARIAS DE NUMEROLOGÍA ---', () => {
  
  test('Debe calcular correctamente el número 7 para la fecha 1995-07-12', () => {
    const resultado = calcularNumeroVida('1995-07-12');
    expect(resultado).toBe(7);
  });

  test('Debe respetar el número maestro 11 (no reducirlo a 2)', () => {
    const resultado = calcularNumeroVida('1988-01-11');
    expect(resultado).toBe(11);
  });

  test('Debe sumar correctamente una fecha simple como 2000-01-01 (resultado 4)', () => {
    const resultado = calcularNumeroVida('2000-01-01');
    expect(resultado).toBe(4);
  });

});
