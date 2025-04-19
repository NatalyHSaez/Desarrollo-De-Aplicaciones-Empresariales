import React, { useState, useEffect } from "react";
import oficinas from "../data/oficinas";

const ProximasReservas = () => {
  const [reservas, setReservas] = useState([]);

  useEffect(() => {
    const reservasGuardadas = JSON.parse(localStorage.getItem("reservas")) || [];
    setReservas(reservasGuardadas);
  }, []);

  const handleAnularReserva = (index) => {
    const reservasGuardadas = JSON.parse(localStorage.getItem("reservas")) || [];
    reservasGuardadas.splice(index, 1);
    localStorage.setItem("reservas", JSON.stringify(reservasGuardadas));
    setReservas(reservasGuardadas);
  };

  const handleModificarReserva = (index) => {
    console.log("Modificar reserva:", reservas[index]);
    // Aquí podrías abrir un modal o redirigir a un formulario
  };

  const obtenerImagenOficina = (oficinaId) => {
    const oficina = oficinas.find((oficina) => oficina.id === oficinaId);
    return oficina ? `/${oficina.imagen}` : "";  };
  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Próximas Reservas</h2>

      {reservas.length === 0 ? (
        <p>No tienes reservas próximas.</p>
      ) : (
        <div className="space-y-4">
          {reservas.map((reserva, index) => (
            <div
              key={index}
              className="border p-4 rounded shadow hover:shadow-md transition relative flex items-center space-x-4"
            >
              {/* Imagen de la oficina */}
              <div className="w-24 h-24 bg-gray-200 rounded-md overflow-hidden">
                <img
                  src={obtenerImagenOficina(reserva.oficinaId)}
                  alt={reserva.oficina}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Información de la reserva */}
              <div className="flex-1">
  <h3 className="text-lg font-semibold">{reserva.oficina}</h3>
  <p className="text-sm text-gray-600">Usuario: {reserva.usuario || "anónimo"}</p>
  <p className="text-sm text-gray-600">
    Inicio: {reserva.fechaInicio || "?"} a las {reserva.horaInicio || "?"}
  </p>
  <p className="text-sm text-gray-600">
    Fin: {reserva.fechaFin || "?"} a las {reserva.horaFin || "?"}
  </p>
</div>


              {/* Botones */}
              <button
                onClick={() => handleModificarReserva(index)}
                className="absolute top-2 right-2 bg-gray-500 hover:bg-gray-600 text-white text-sm px-3 py-1 rounded"
              >
                Modificar
              </button>

              <button
                onClick={() => handleAnularReserva(index)}
                className="absolute bottom-2 right-2 bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded"
              >
                Anular
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProximasReservas;