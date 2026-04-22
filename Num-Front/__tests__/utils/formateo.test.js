describe('PRUEBAS FRONTEND - UTILS', () => {
  test('Debe limpiar guiones de la fecha para el envío', () => {
    const input = '1995-07-12';
    const output = input.replace(/-/g, "");
    expect(output).toBe('19950712');
  });
});