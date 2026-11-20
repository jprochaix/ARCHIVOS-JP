// Buscamos los elementos del HTML con document.querySelector
const inputNumero1 = document.querySelector("#numero1");
const inputNumero2 = document.querySelector("#numero2");
const resultado = document.querySelector("#resultado");

const btnSumar = document.querySelector("#btnSumar");
const btnRestar = document.querySelector("#btnRestar");
const btnMultiplicar = document.querySelector("#btnMultiplicar");
const btnDividir = document.querySelector("#btnDividir");

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

// Cada botón ejecuta su propia operación al hacer click
btnSumar.addEventListener("click", function () {
  const numero1 = Number(inputNumero1.value);
  const numero2 = Number(inputNumero2.value);
  resultado.textContent = "Resultado: " + sumar(numero1, numero2);
});

btnRestar.addEventListener("click", function () {
  const numero1 = Number(inputNumero1.value);
  const numero2 = Number(inputNumero2.value);
  resultado.textContent = "Resultado: " + restar(numero1, numero2);
});

btnMultiplicar.addEventListener("click", function () {
  const numero1 = Number(inputNumero1.value);
  const numero2 = Number(inputNumero2.value);
  resultado.textContent = "Resultado: " + multiplicar(numero1, numero2);
});

btnDividir.addEventListener("click", function () {
  const numero1 = Number(inputNumero1.value);
  const numero2 = Number(inputNumero2.value);

  if (numero2 === 0) {
    resultado.textContent = "No se puede dividir por cero";
    return;
  }

  resultado.textContent = "Resultado: " + dividir(numero1, numero2);
});
