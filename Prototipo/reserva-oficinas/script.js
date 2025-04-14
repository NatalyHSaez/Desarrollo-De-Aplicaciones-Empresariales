function mostrarFormulario(oficina) {
    document.getElementById("formularioOverlay").classList.remove("hidden");
    document.getElementById("tituloOficina").textContent = oficina;
    document.getElementById("mensajeExito").classList.add("hidden");
  }
  
  function cerrarFormulario() {
    document.getElementById("formularioOverlay").classList.add("hidden");
    document.getElementById("reservaForm").reset();
  }
  
  document.getElementById("reservaForm").addEventListener("submit", function (e) {
    e.preventDefault();
  
    const nombre = document.getElementById("nombre").value;
    const fecha = document.getElementById("fecha").value;
    const hora = document.getElementById("hora").value;
    const oficina = document.getElementById("tituloOficina").textContent;
  
    console.log(`Reserva realizada: ${nombre} reservó ${oficina} el ${fecha} a las ${hora}`);
  
    document.getElementById("mensajeExito").classList.remove("hidden");
    this.reset();
  });
  