import { useState } from "react";

const FormularioReserva = ({ oficina, onClose, usuario }) => {
  const [fechaInicio, setFechaInicio] = useState("");
  const [horaInicio, setHoraInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [horaFin, setHoraFin] = useState("");

  // Para modo edición (solo si Admin)
  const [nombreOficina, setNombreOficina] = useState(oficina.nombre);
  const [ubicacion, setUbicacion] = useState(oficina.ubicacion || "");
  const [capacidad, setCapacidad] = useState(oficina.capacidad || "");

  const handleReserva = () => {
    if (!fechaInicio || !horaInicio || !fechaFin || !horaFin) {
      alert("Por favor completa todos los campos.");
      return;
    }

    const ahora = new Date();
    const fechaHoraInicio = new Date(`${fechaInicio}T${horaInicio}:00`);

    if (fechaHoraInicio <= ahora) {
      alert("La reserva debe ser al menos una hora después de la hora actual.");
      return;
    }

    const nuevaReserva = {
      oficina: oficina.nombre,
      oficinaId: oficina.id,
      fechaInicio,
      horaInicio,
      fechaFin,
      horaFin,
      usuario: usuario?.nombre || "anónimo",
    };

    const reservasGuardadas = JSON.parse(localStorage.getItem("reservas")) || [];
    const nuevasReservas = [...reservasGuardadas, nuevaReserva];

    localStorage.setItem("reservas", JSON.stringify(nuevasReservas));
    onClose();
  };

  const handleEditarOficina = () => {
    // Guardar cambios en la oficina (simulado aquí)
    const oficinasGuardadas = JSON.parse(localStorage.getItem("oficinas")) || [];
    const nuevasOficinas = oficinasGuardadas.map((o) =>
      o.id === oficina.id
        ? { ...o, nombre: nombreOficina, ubicacion, capacidad }
        : o
    );

    localStorage.setItem("oficinas", JSON.stringify(nuevasOficinas));
    alert("Oficina actualizada exitosamente.");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute bg-green-200 top-2 right-2 text-gray-500 hover:text-gray-700 text-lg"
        >
          ✕
        </button>

        {/* Si el usuario es Admin, muestra campos para editar oficina */}
        {usuario?.cargo === "Administrador" ? (
          <>
            <h2 className="text-xl text-black-600 font-semibold mb-4">
              Editar Oficina
            </h2>

            <div className="mb-4">
              <label className="text-black-600 block mb-1">Nombre:</label>
              <input
                type="text"
                value={nombreOficina}
                onChange={(e) => setNombreOficina(e.target.value)}
                className="text-black-600 border rounded w-full p-2"
              />
            </div>

            <div className="mb-4">
              <label className="text-black-600 block mb-1">Ubicación:</label>
              <input
                type="text"
                value={ubicacion}
                onChange={(e) => setUbicacion(e.target.value)}
                className="text-black-600 border rounded w-full p-2"
              />
            </div>

            <div className="mb-6">
              <label className="text-black-600 block mb-1">Capacidad:</label>
              <input
                type="number"
                value={capacidad}
                onChange={(e) => setCapacidad(e.target.value)}
                className="text-black-600 border rounded w-full p-2"
              />
            </div>

            <button
              onClick={handleEditarOficina}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded w-full"
            >
              Guardar Cambios
            </button>
          </>
        ) : (
          <>
            {/* Si es usuario normal, muestra formulario de reserva */}
            <h2 className="text-xl text-black-600 font-semibold mb-4">
              Reserva: {oficina.nombre}
            </h2>

            <div className="mb-4">
              <label className="text-black-600 block mb-1">Fecha de inicio:</label>
              <input
                type="date"
                value={fechaInicio}
                onChange={(e) => setFechaInicio(e.target.value)}
                className="text-black-600 border rounded w-full p-2"
              />
            </div>

            <div className="mb-4">
              <label className="text-black-600 block mb-1">Hora de inicio:</label>
              <input
                type="time"
                value={horaInicio}
                onChange={(e) => setHoraInicio(e.target.value)}
                className="text-black-600 border rounded w-full p-2"
              />
            </div>

            <div className="mb-4">
              <label className="text-black-600 block mb-1">Fecha de finalización:</label>
              <input
                type="date"
                value={fechaFin}
                onChange={(e) => setFechaFin(e.target.value)}
                className="text-black-600 border rounded w-full p-2"
              />
            </div>

            <div className="mb-6">
              <label className="text-black-600 block mb-1">Hora de finalización:</label>
              <input
                type="time"
                value={horaFin}
                onChange={(e) => setHoraFin(e.target.value)}
                className="text-black-600 border rounded w-full p-2"
              />
            </div>

            <button
              onClick={handleReserva}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded w-full"
            >
              Confirmar Reserva
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default FormularioReserva;
