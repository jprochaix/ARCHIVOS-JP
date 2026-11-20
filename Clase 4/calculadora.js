// Buscamos los elementos del HTML con document.querySelector
const formulario = document.querySelector("#formulario");
const inputNumero1 = document.querySelector("#numero1");
const inputNumero2 = document.querySelector("#numero2");
const selectOperacion = document.querySelector("#operacion");
const resultado = document.querySelector("#resultado");

// Cuando se envía el formulario, hacemos el cálculo
formulario.addEventListener("submit", function (evento) {
  evento.preventDefault(); // evita que la página se recargue

  // .value devuelve texto, Number() lo convierte a número
  const numero1 = Number(inputNumero1.value);
  const numero2 = Number(inputNumero2.value);
  const operacion = selectOperacion.value;

  let total;

  if (operacion === "sumar") {
    total = numero1 + numero2;
  } else if (operacion === "restar") {
    total = numero1 - numero2;
  } else if (operacion === "multiplicar") {
    total = numero1 * numero2;
  } else if (operacion === "dividir") {
    if (numero2 === 0) {
      resultado.textContent = "No se puede dividir por cero";
      return; // salimos de la función
    }
    total = numero1 / numero2;
  }

  resultado.textContent = "Resultado: " + total;
});
