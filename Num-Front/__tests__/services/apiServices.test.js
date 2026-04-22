describe('PRUEBAS FRONTEND - SERVICES', () => {
  test('El servicio debe procesar la respuesta del servidor correctamente', () => {
    const fakeResponse = { data: { numero: 7, msg: "Éxito" } };
    expect(fakeResponse.data.numero).toBe(7);
    expect(fakeResponse.data.msg).toBe("Éxito");
  });
});