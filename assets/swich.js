// Este script permite alternar entre dos secciones de contenido en una página web. Entre semana y fin de semana, mostrando solo la sección correspondiente al botón presionado.
document.addEventListener("DOMContentLoaded", function() {
  function mostrar(seccion) {
    // Ocultar solo las secciones internas
    document.querySelectorAll(".seccion-reunion").forEach(function(elemento) {
      elemento.style.display = "none";
    });

    // Mostrar la sección seleccionada
    var seleccion = document.getElementById(seccion);
    if (seleccion) {
      seleccion.style.display = "block";
    }
  }

  // Agregar eventos a los botones
  var btnEntreSemana = document.getElementById("entre-semana-btn");
  var btnFinSemana = document.getElementById("fin-semana-btn");

  if (btnEntreSemana && btnFinSemana) {
    btnEntreSemana.addEventListener("click", function() {
      mostrar("entre-semana");
    });

    btnFinSemana.addEventListener("click", function() {
      mostrar("fin-semana");
    });
  }

  // Mostrar la sección "entre-semana" por defecto
  mostrar("entre-semana");
});