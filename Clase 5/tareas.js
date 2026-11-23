// Array que contiene la Lista de tareas
const listaTareas = [];

const form = document.getElementById("formTarea");
const inputTarea = document.getElementById("tarea");
const ul = document.getElementById("listaTareas");

// Índice de la tarea que se está editando (-1 = ninguna)
let indiceEditando = -1;

// Mueve la tarea i hacia arriba (-1) o hacia abajo (+1)
function moverTarea(i, direccion) {
  const j = i + direccion;
  if (j < 0 || j >= listaTareas.length) return;
  [listaTareas[i], listaTareas[j]] = [listaTareas[j], listaTareas[i]];
  indiceEditando = -1;
  mostrarTareas();
}

function mostrarTareas() {
  ul.innerHTML = "";

  listaTareas.forEach((tarea, i) => {
    const li = document.createElement("li");

    if (i === indiceEditando) {
      // Modo edición: input + Guardar / Cancelar
      const input = document.createElement("input");
      input.type = "text";
      input.value = tarea;

      const btnOk = document.createElement("button");
      btnOk.textContent = "Guardar";
      btnOk.onclick = () => {
        const nuevo = input.value.trim();
        if (nuevo === "") return;
        listaTareas[i] = nuevo;
        indiceEditando = -1;
        mostrarTareas();
      };

      const btnCancelar = document.createElement("button");
      btnCancelar.textContent = "Cancelar";
      btnCancelar.onclick = () => {
        indiceEditando = -1;
        mostrarTareas();
      };

      li.append(input, btnOk, btnCancelar);
    } else {
      // Modo normal: texto + Modificar / Eliminar
      const span = document.createElement("span");
      span.textContent = tarea;

      const btnMod = document.createElement("button");
      btnMod.textContent = "Modificar";
      btnMod.onclick = () => {
        indiceEditando = i;
        mostrarTareas();
      };

      const btnSubir = document.createElement("button");
      btnSubir.textContent = "↑";
      btnSubir.title = "Subir";
      btnSubir.disabled = i === 0;
      btnSubir.onclick = () => moverTarea(i, -1);

      const btnBajar = document.createElement("button");
      btnBajar.textContent = "↓";
      btnBajar.title = "Bajar";
      btnBajar.disabled = i === listaTareas.length - 1;
      btnBajar.onclick = () => moverTarea(i, 1);

      const btnDel = document.createElement("button");
      btnDel.textContent = "Eliminar";
      btnDel.className = "eliminar";
      btnDel.onclick = () => {
        listaTareas.splice(i, 1);
        indiceEditando = -1;
        mostrarTareas();
      };

      li.append(span, btnSubir, btnBajar, btnMod, btnDel);
    }

    ul.appendChild(li);
  });
}

// Click en "Guardar" (o Enter): agrega la tarea a la lista
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const texto = inputTarea.value.trim();
  if (texto === "") return;

  listaTareas.push(texto);
  inputTarea.value = "";
  inputTarea.focus();
  mostrarTareas();
});
