
function showTab(id) {
  document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  var elementosSeleccionados = document.getElementsByClassName('selected');
  while (elementosSeleccionados.length > 0) {
    elementosSeleccionados[0].classList.remove('selected');
  }
  document.getElementById("button-"+id).classList.add('selected');
}
function guardarNombre() {
  const nombre = document.getElementById("nombre").value.trim();
  if (nombre !== "") {
    localStorage.setItem("nombreUsuario", nombre);
    mostrarApp(nombre);
  }
}
function mostrarApp(nombre) {
  document.getElementById("login-screen").style.display = "none";
  document.getElementById("bienvenida").textContent = "Bienvenido/a, " + nombre;
  document.querySelector(".container").style.display = "flex";
}
function addGlass() {
  var glass = document.createElement("img");
  glass.src = "images/hidrate/glass.png"; 
  glass.classList = "glass"; 
  var glassContainer = document.getElementById("glass-container");
  glassContainer.appendChild(glass);
  sumarVaso('agua');
}
function addWc() {
  var wc_box = document.createElement("div");
  wc_box.classList = "wc_box"; 
  var wc = document.createElement("img");
  wc.src = "images/hidrate/wc.png"; 
  wc.classList = "wc"; 
  var wcContainer = document.getElementById("wc-container");
  wc_box.appendChild(wc);
  var input = document.getElementById("eventML");
  var ml_text = document.createElement("p");
  ml_text.textContent = input.value + " ml";
  ml_text.classList = "wc_text";
  wc_box.appendChild(ml_text);
  wcContainer.appendChild(wc_box);
  input.value = "";
  sumarVaso('elim');
}
function sumarVaso(tipo) {
  const key = tipo + '-count';
  let count = parseInt(localStorage.getItem(key) || "0") + 1;
  localStorage.setItem(key, count);
  document.getElementById(key).textContent = count;
  if (tipo === 'agua') {
    document.getElementById('agua-alerta').textContent = count < 6 ? "Aporte insuficiente de agua." : "";
  }
  if (tipo === 'elim') {
    document.getElementById('elim-alerta').textContent = count < 1 ? "Registro bajo de eliminación." : "";
  }
}
function actualizarEjercicio() {
  const pasos = 4500;
  const objetivo = 10000;
  const kcal = Math.round(pasos * 0.04);
  const km = (pasos * 0.0007).toFixed(1);
  const progreso = Math.min(100, (pasos / objetivo) * 100);
  document.getElementById('pasos').textContent = pasos;
  document.getElementById('kcal').textContent = kcal;
  document.getElementById('km').textContent = km;
  document.getElementById('barra-progreso').style.width = progreso + '%';
}
function showUpp() {
  queryContainer.style.display = "none";
  uppStateContainer.style.display = "block";
}
function showUppQuery() {
  uppStateContainer.style.display = "none";
  queryContainer.style.display = "block";
}
window.onload = function () {
  const nombre = localStorage.getItem("nombreUsuario");
  if (nombre) {
    mostrarApp(nombre);
  } else {
    document.querySelector(".container").style.display = "none";
    document.getElementById("login-screen").style.display = "flex";
  }
  ['agua', 'elim'].forEach(tipo => {
    const key = tipo + '-count';
    let count = parseInt(localStorage.getItem(key) || "0");
    document.getElementById(key).textContent = count;
  });
  actualizarEjercicio();
}
