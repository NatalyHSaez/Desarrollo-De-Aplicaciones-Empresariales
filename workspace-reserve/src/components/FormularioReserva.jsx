import React, { useState } from "react";

const FormularioReserva = ({ oficina, onClose }) => {
  const [formulario, setFormulario] = useState({ fecha: "", horaInicio: "", horaFin: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Reserva confirmada:", {
      oficina: oficina.nombre,
      ...formulario,
    });
    alert("¡Reserva realizada con éxito!");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg mx-2">
        <h3 className="text-2xl font-bold mb-4">Reservar: {oficina.nombre}</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Fecha</label>
            <input
              type="date"
              name="fecha"
              value={formulario.fecha}
              onChange={handleChange}
              className="w-full border rounded p-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Hora de Inicio</label>
            <input
              type="time"
              name="horaInicio"
              value={formulario.horaInicio}
              onChange={handleChange}
              className="w-full border rounded p-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Hora de Finalización</label>
            <input
              type="time"
              name="horaFin"
              value={formulario.horaFin}
              onChange={handleChange}
              className="w-full border rounded p-2"
              required
            />
          </div>
          <div className="flex justify-end space-x-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded"
            >
              Confirmar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormularioReserva;