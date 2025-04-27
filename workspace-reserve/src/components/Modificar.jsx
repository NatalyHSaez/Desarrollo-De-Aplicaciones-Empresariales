import React, { useState } from "react";

const Modificar = ({ reserva, onClose, actualizarReservas }) => {
  const [formData, setFormData] = useState({
    oficina: reserva.oficina || "",
    usuario: reserva.usuario || "",
    fechaInicio: reserva.fechaInicio || "",
    horaInicio: reserva.horaInicio || "",
    fechaFin: reserva.fechaFin || "",
    horaFin: reserva.horaFin || "",
    oficinaId: reserva.oficinaId || null,
    index: reserva.index, // <-- Importante: guardar también el índice
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleGuardarCambios = () => {
    const reservasGuardadas = JSON.parse(localStorage.getItem("reservas")) || [];

    const reservaActualizada = {
      ...formData,
      index: reserva.index, // Aseguramos que conserve el mismo index
    };

    reservasGuardadas[reserva.index] = reservaActualizada;
    localStorage.setItem("reservas", JSON.stringify(reservasGuardadas));
    actualizarReservas(reservasGuardadas);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-96 relative">
        <h2 className="text-xl font-semibold mb-4">Modificar Reserva</h2>

        {/* Formulario */}
        <div className="space-y-3">
          {/* Oficina (solo lectura) */}
          <div>
            <label className="block text-sm font-medium">Oficina</label>
            <input
              type="text"
              name="oficina"
              value={formData.oficina}
              readOnly
              disabled
              className="border p-2 rounded w-full bg-gray-100 cursor-not-allowed"
            />
          </div>

          {/* Usuario (solo lectura) */}
          <div>
            <label className="block text-sm font-medium">Usuario</label>
            <input
              type="text"
              name="usuario"
              value={formData.usuario}
              readOnly
              disabled
              className="border p-2 rounded w-full bg-gray-100 cursor-not-allowed"
            />
          </div>

          {/* Fechas y horas */}
          <div className="flex space-x-2">
            <div className="flex-1">
              <label className="block text-sm font-medium">Fecha Inicio</label>
              <input
                type="date"
                name="fechaInicio"
                value={formData.fechaInicio}
                onChange={handleChange}
                className="border p-2 rounded w-full"
              />
            </div>

            <div className="flex-1">
              <label className="block text-sm font-medium">Hora Inicio</label>
              <input
                type="time"
                name="horaInicio"
                value={formData.horaInicio}
                onChange={handleChange}
                className="border p-2 rounded w-full"
              />
            </div>
          </div>

          <div className="flex space-x-2">
            <div className="flex-1">
              <label className="block text-sm font-medium">Fecha Fin</label>
              <input
                type="date"
                name="fechaFin"
                value={formData.fechaFin}
                onChange={handleChange}
                className="border p-2 rounded w-full"
              />
            </div>

            <div className="flex-1">
              <label className="block text-sm font-medium">Hora Fin</label>
              <input
                type="time"
                name="horaFin"
                value={formData.horaFin}
                onChange={handleChange}
                className="border p-2 rounded w-full"
              />
            </div>
          </div>
        </div>

        {/* Botones */}
        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-400 hover:bg-gray-500 text-white rounded"
          >
            Cancelar
          </button>
          <button
            onClick={handleGuardarCambios}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
          >
            Guardar Cambios
          </button>
        </div>

        {/* Botón de cerrar */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 text-2xl"
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default Modificar;
