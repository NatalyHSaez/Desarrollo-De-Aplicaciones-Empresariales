import React, { useState, useEffect } from "react";
import oficinas from "../data/oficinas";
import Modificar from "./Modificar"; // Importamos el formulario de modificación

const ProximasReservas = () => {
  const [reservas, setReservas] = useState([]);
  const [reservaAModificar, setReservaAModificar] = useState(null);
  const [mostrarModificar, setMostrarModificar] = useState(false);
  const [usuario, setUsuario] = useState(null); // Almacenar al usuario actual

  useEffect(() => {
    // Obtener datos del usuario actual (esto dependerá de tu sistema de autenticación)
    const usuarioActual = JSON.parse(localStorage.getItem("usuario")) || { nombre: "anónimo", cargo: "usuario" };
    setUsuario(usuarioActual);

    // Obtener las reservas guardadas
    const reservasGuardadas = JSON.parse(localStorage.getItem("reservas")) || [];
    setReservas(filtrarReservasPorUsuario(reservasGuardadas, usuarioActual));
  }, []);

  // Filtra las reservas según el cargo del usuario
  const filtrarReservasPorUsuario = (reservas, usuario) => {
    // Si el usuario es administrador, mostrar todas las reservas de los demás usuarios
    if (usuario.cargo === "Administrador") {
      // Filtrar solo reservas de otros usuarios (excluyendo al administrador)
      return reservas.filter(reserva => reserva.usuario !== usuario.nombre).sort((a, b) => new Date(a.fechaInicio) - new Date(b.fechaInicio)); // Ordenar por fecha de inicio
    } else {
      // Si el usuario no es administrador, mostrar solo las reservas de ese usuario
      return reservas.filter(reserva => reserva.usuario === usuario.nombre);
    }
  };

  const handleAnularReserva = (index) => {
    const reservasGuardadas = JSON.parse(localStorage.getItem("reservas")) || [];
    reservasGuardadas.splice(index, 1);
    localStorage.setItem("reservas", JSON.stringify(reservasGuardadas));
    setReservas(filtrarReservasPorUsuario(reservasGuardadas, usuario)); // Refrescar las reservas después de anular
  };

  const handleModificarReserva = (index) => {
    setReservaAModificar({ ...reservas[index], index });
    setMostrarModificar(true);
  };

  const obtenerImagenOficina = (oficinaId) => {
    const oficina = oficinas.find((oficina) => oficina.id === oficinaId);
    return oficina ? `/${oficina.imagen}` : "";
  };

  return (
    <div className="p-4">
      <h2 className="text-xl text-black-600 font-semibold mb-4">Próximas Reservas</h2>

      {reservas.length === 0 ? (
        <p className="text-black-600">No tienes reservas próximas.</p>
      ) : (
        <div className="space-y-4 overflow-y-auto max-h-[500px]"> {/* Agregar scroll si es necesario */}
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
              {reserva.usuario === usuario.nombre || usuario.cargo === "Administrador" ? (
                <>
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
                </>
              ) : null}
            </div>
          ))}
        </div>
      )}

      {/* Formulario de Modificar */}
      {mostrarModificar && reservaAModificar && (
        <Modificar
          reserva={reservaAModificar}
          onClose={() => setMostrarModificar(false)}
          actualizarReservas={(nuevasReservas) => setReservas(nuevasReservas)}
        />
      )}
    </div>
  );
};

export default ProximasReservas;
