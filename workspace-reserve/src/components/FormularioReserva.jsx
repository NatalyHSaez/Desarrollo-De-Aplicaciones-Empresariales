import { useState } from "react";

const FormularioReserva = ({ oficina, onClose, usuario }) => {
  const [fechaInicio, setFechaInicio] = useState("");
  const [horaInicio, setHoraInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [horaFin, setHoraFin] = useState("");

  const handleReserva = () => {
    if (!fechaInicio || !horaInicio || !fechaFin || !horaFin) {
      alert("Por favor completa todos los campos.");
      return;
    }

    const nuevaReserva = {
      oficina: oficina.nombre,
      oficinaId: oficina.id, // para la imagen
      fechaInicio,
      horaInicio,
      fechaFin,
      horaFin,
      usuario: usuario?.email || "anónimo",
    };

    const reservasGuardadas = JSON.parse(localStorage.getItem("reservas")) || [];
    const nuevasReservas = [...reservasGuardadas, nuevaReserva];

    localStorage.setItem("reservas", JSON.stringify(nuevasReservas));
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-lg"
        >
          ✕
        </button>
        <h2 className="text-xl font-semibold mb-4">
          Reserva: {oficina.nombre}
        </h2>

        <div className="mb-4">
          <label className="block mb-1">Fecha de inicio:</label>
          <input
            type="date"
            value={fechaInicio}
            onChange={(e) => setFechaInicio(e.target.value)}
            className="border rounded w-full p-2"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Hora de inicio:</label>
          <input
            type="time"
            value={horaInicio}
            onChange={(e) => setHoraInicio(e.target.value)}
            className="border rounded w-full p-2"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Fecha de finalización:</label>
          <input
            type="date"
            value={fechaFin}
            onChange={(e) => setFechaFin(e.target.value)}
            className="border rounded w-full p-2"
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1">Hora de finalización:</label>
          <input
            type="time"
            value={horaFin}
            onChange={(e) => setHoraFin(e.target.value)}
            className="border rounded w-full p-2"
          />
        </div>

        <button
          onClick={handleReserva}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded w-full"
        >
          Confirmar Reserva
        </button>
      </div>
    </div>
  );
};

export default FormularioReserva;
