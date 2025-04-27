import React, { useState } from "react";

const Historial = ({ oficina, usuario, onClose }) => {
  const [nombre, setNombre] = useState(usuario.nombre);
  const [email, setEmail] = useState(usuario.email);
  const [cargo, setCargo] = useState(usuario.cargo);

  // Aquí supongo que oficina tiene una propiedad reservas o puedes traerlas desde otro lado
  const reservas = oficina.reservas || []; 

  const handleGuardar = () => {
    // Aquí iría la lógica para guardar cambios (ej: hacer un fetch a la API)
    console.log("Datos actualizados:", { nombre, email, cargo });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
        >
          ✕
        </button>

        {/* Perfil del usuario */}
        <div className="flex items-center gap-4 mb-6">
          <img
            src={usuario.imagenPerfil || "https://via.placeholder.com/100"}
            alt="Perfil"
            className="w-24 h-24 rounded-full object-cover"
          />
          <div className="flex-1">
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="text-xl font-bold w-full border p-2 rounded mb-2"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="text-gray-600 w-full border p-2 rounded mb-2"
            />
            <input
              type="text"
              value={cargo}
              onChange={(e) => setCargo(e.target.value)}
              className="text-gray-600 w-full border p-2 rounded"
            />
          </div>
        </div>

        {/* Próximas reservas */}
        <h2 className="text-lg font-semibold mb-2">Próximas Reservas</h2>
        {reservas.length > 0 ? (
          <ul className="space-y-2">
            {reservas.map((reserva, index) => (
              <li
                key={index}
                className="border p-2 rounded flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold">{reserva.fecha}</p>
                  <p className="text-sm text-gray-600">{reserva.hora}</p>
                </div>
                <div className="text-sm text-gray-500">{reserva.estado}</div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No hay reservas próximas.</p>
        )}

        {/* Botón para guardar cambios */}
        <button
          onClick={handleGuardar}
          className="mt-6 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Guardar Cambios
        </button>
      </div>
    </div>
  );
};

export default Historial;
