const tareas = [];
let editando = null; // índice de la tarea en edición

const ESTADOS = ["Inicial", "Pendiente", "Finalizada", "Rechazada"];
const SOLICITANTES = ["Juan Pablo Rochaix", "Lionel", "Leonardo"];

const form = document.getElementById("formTarea");
const lista = document.getElementById("listaTareas");
const inputNombre = document.getElementById("nombre");
const selEstado = document.getElementById("estado");
const selSolicitante = document.getElementById("solicitante");
const inputFechaPedido = document.getElementById("fechaPedido");
const inputFechaFin = document.getElementById("fechaFin");

function hoy() {
  const d = new Date();
  const mes = String(d.getMonth() + 1).padStart(2, "0");
  const dia = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${mes}-${dia}`;
}

function formatear(fecha) {
  if (!fecha) return "";
  const [a, m, d] = fecha.split("-");
  return `${d}/${m}/${a}`;
}

// Solo Finalizada y Rechazada admiten fecha de finalización
function admiteFechaFin(estado) {
  return estado === "Finalizada" || estado === "Rechazada";
}

// Habilita/deshabilita la fecha de finalización según el estado
function sincronizarFechaFin(estado, input) {
  if (admiteFechaFin(estado)) {
    input.disabled = false;
  } else {
    input.disabled = true;
    input.value = "";
  }
}

function crearSelect(opciones, valor) {
  const sel = document.createElement("select");
  opciones.forEach(o => {
    const op = document.createElement("option");
    op.textContent = o;
    sel.appendChild(op);
  });
  sel.value = valor;
  return sel;
}

function crearBoton(texto, titulo, fn) {
  const b = document.createElement("button");
  b.type = "button";
  b.className = "icono";
  b.title = titulo;
  b.textContent = texto;
  b.onclick = fn;
  return b;
}

function celda(contenido) {
  const td = document.createElement("td");
  if (typeof contenido === "string") td.textContent = contenido;
  else td.appendChild(contenido);
  return td;
}

function actualizarContador() {
  const cont = document.getElementById("contador");
  cont.innerHTML = "";
  ESTADOS.forEach(e => {
    const span = document.createElement("span");
    span.className = "chip " + e;
    span.textContent = e + ": " + tareas.filter(t => t.estado === e).length;
    cont.appendChild(span);
  });
}

function render() {
  actualizarContador();
  lista.innerHTML = "";
  tareas.forEach((t, i) => {
    const tr = document.createElement("tr");
    const acc = document.createElement("td");
    acc.className = "acciones";

    if (i === editando) {
      const nombre = document.createElement("input");
      nombre.type = "text";
      nombre.value = t.nombre;
      const estado = crearSelect(ESTADOS, t.estado);
      const solic = crearSelect(SOLICITANTES, t.solicitante);
      const fPedido = document.createElement("input");
      fPedido.type = "date";
      fPedido.value = t.fechaPedido;
      const fFin = document.createElement("input");
      fFin.type = "date";
      fFin.value = t.fechaFin;
      sincronizarFechaFin(t.estado, fFin);

      estado.onchange = () => {
        sincronizarFechaFin(estado.value, fFin);
        if (admiteFechaFin(estado.value) && !fFin.value) fFin.value = hoy();
      };

      tr.className = t.estado;
      [nombre, estado, solic, fPedido, fFin].forEach(c => tr.appendChild(celda(c)));

      acc.append(
        crearBoton("💾", "Guardar cambios", () => {
          if (!nombre.value.trim()) { alert("El nombre de la tarea no puede estar vacío."); return; }
          t.nombre = nombre.value.trim();
          t.estado = estado.value;
          t.solicitante = solic.value;
          t.fechaPedido = fPedido.value;
          t.fechaFin = admiteFechaFin(estado.value) ? fFin.value : "";
          editando = null;
          render();
        }),
        crearBoton("❌", "Cancelar", () => { editando = null; render(); })
      );
    } else {
      tr.className = t.estado;
      [t.nombre, t.estado, t.solicitante, formatear(t.fechaPedido), formatear(t.fechaFin)]
        .forEach(x => tr.appendChild(celda(x)));
      acc.append(
        crearBoton("✏️", "Modificar", () => { editando = i; render(); }),
        crearBoton("🗑️", "Eliminar", () => eliminar(i))
      );
    }

    tr.appendChild(acc);
    lista.appendChild(tr);
  });
}

function eliminar(i) {
  if (confirm("¿Eliminar la tarea \"" + tareas[i].nombre + "\"?")) {
    tareas.splice(i, 1);
    editando = null;
    render();
  }
}

selEstado.addEventListener("change", () => {
  sincronizarFechaFin(selEstado.value, inputFechaFin);
  if (admiteFechaFin(selEstado.value) && !inputFechaFin.value) inputFechaFin.value = hoy();
});

form.addEventListener("submit", e => {
  e.preventDefault();
  tareas.push({
    nombre: inputNombre.value.trim(),
    estado: selEstado.value,
    solicitante: selSolicitante.value,
    fechaPedido: inputFechaPedido.value,
    fechaFin: admiteFechaFin(selEstado.value) ? inputFechaFin.value : ""
  });
  form.reset();
  inputFechaPedido.value = hoy();
  sincronizarFechaFin(selEstado.value, inputFechaFin);
  render();
});

inputFechaPedido.value = hoy();
sincronizarFechaFin(selEstado.value, inputFechaFin);
render();
