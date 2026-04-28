/**
 * EJEMPLO MÍNIMO - PRUEBA DE LOGIN
 *
 * Este es un ejemplo simple para aprender a probar
 * componentes de Vue con Jest.
 */

import { describe, test, expect } from "@jest/globals";
import { mount } from "@vue/test-utils";
import VistaLogin from "../../src/views/login.vue";

describe("Pruebas de Login", () => {


  // Test 1: ¿El componente existe?
  test("El componente debe existir", () => {
    const componente = mount(VistaLogin);
    expect(componente.exists()).toBe(true);
  });

// test: define una prueba. Es donde describes qué quieres verificar.
// mount: crea una instancia del componente de Vue en un entorno de prueba (lo renderiza sin necesidad de abrir un navegador real).
// expect: inicia la verificación; se usa para hacer una afirmación sobre el resultado.
// .toBe: es el matcher que compara el valor obtenido con el esperado (en este caso, true).
// exists(): es un método del wrapper que devuelve true si el componente se renderizó correctamente.


  // Test 2: ¿Tiene campo de contraseña?
  test("Debe tener campo de contraseña", () => {
    const componente = mount(VistaLogin);
    const etiquetas = componente.findAll("label");
    const etiquetaContrasena = etiquetas.find((e) =>
      e.text().includes("Contraseña"),
    );
    expect(etiquetaContrasena).toBeDefined();
  });


// test: define la prueba. Aquí dices qué quieres comprobar.
// mount: crea el componente en el entorno de prueba (lo “enciende” para poder revisarlo).
// findAll("label"): busca todas las etiquetas <label> que existen dentro del componente.
// .find(...): revisa una por una esas etiquetas hasta encontrar una que cumpla la condición.
// e.text(): obtiene el texto que tiene esa etiqueta (lo que ve el usuario).
// .includes("Contraseña"): revisa si ese texto contiene la palabra "Contraseña" (no tiene que ser exacto, solo que la incluya).
// expect: empieza la verificación.
// .toBeDefined(): comprueba que sí se encontró algo (o sea, que la etiqueta existe y no es undefined).


});

// npx jest __tests__/views/login_EJEMPLO.test.js

/*
 * ===========================================
 * EXPLICACIÓN:
 * ===========================================
 *
 * Test 1:
 * - Crea el componente de login
 * - Verifica que existe (no está roto)
 *
 * Test 2:
 * - Crea el componente
 * - Busca TODAS las etiquetas (labels)
 * - Encuentra la que dice "Contraseña"
 * - Verifica que esa etiqueta existe
 *
 * ===========================================
 * MÉTODOS:
 * ===========================================
 *
 * mount()      = Crea el componente
 * .exists()    = Dice si el componente existe
 * .toBe()      = Verifica que es verdadero (true)
 * .findAll()   = Busca TODOS los elementos
 * .find()      = Busca uno que cumpla la condición
 * .text()      = Obtiene el texto del elemento
 * .includes()  = Verifica si el texto contiene una palabra
 * .toBeDefined()= Verifica que el elemento existe
 *
 * ===========================================
 */
