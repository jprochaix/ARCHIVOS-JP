// Buscamos los elementos del HTML con document.querySelector
const formulario = document.querySelector("#formulario");
const inputNumero1 = document.querySelector("#numero1");
const inputNumero2 = document.querySelector("#numero2");
const selectOperacion = document.querySelector("#operacion");
const resultado = document.querySelector("#resultado");

// Una función para cada operación: reciben dos números y devuelven el resultado
function sumar(a, b) {
  return a + b;
}

function restar(a, b) {
  return a - b;
}

function multiplicar(a, b) {
  return a * b;
}

function dividir(a, b) {
  return a / b;
}

// Cuando se envía el formulario, hacemos el cálculo
formulario.addEventListener("submit", function (evento) {
  evento.preventDefault(); // evita que la página se recargue

  const numero1 = Number(inputNumero1.value);
  const numero2 = Number(inputNumero2.value);
  const operacion = selectOperacion.value;

  let total;

  // Según la operación elegida, llamamos a la función correspondiente
  if (operacion === "sumar") {
    total = sumar(numero1, numero2);
  } else if (operacion === "restar") {
    total = restar(numero1, numero2);
  } else if (operacion === "multiplicar") {
    total = multiplicar(numero1, numero2);
  } else if (operacion === "dividir") {
    if (numero2 === 0) {
      resultado.textContent = "No se puede dividir por cero";
      return;
    }
    total = dividir(numero1, numero2);
  }

  resultado.textContent = "Resultado: " + total;
  
});
