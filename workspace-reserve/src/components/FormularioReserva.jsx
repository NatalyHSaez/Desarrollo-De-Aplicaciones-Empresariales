import { useState } from "react";

const FormularioReserva = ({ oficina, onClose }) => {
  const [fecha, setFecha] = useState("");

  const handleReserva = () => {
    if (!fecha) {
      alert("Por favor selecciona una fecha.");
      return;
    }

    const nuevaReserva = {
      oficina: oficina.nombre,
      fecha,
      usuario: "123@gmail.com", // Ajustar si hay sistema de login real
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
        <label className="block mb-2">Fecha de reserva:</label>
        <input
          type="date"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
          className="border rounded w-full p-2 mb-4"
        />
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
