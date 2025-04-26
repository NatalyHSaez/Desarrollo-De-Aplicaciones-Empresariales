import React, { useState, useEffect } from "react";
import Oficinas from "./Oficinas";
import Calendario from "./Calendario";
import { useNavigate } from "react-router-dom";
import oficinasData from "../data/oficinas"; 
import ProximasReservas from "./ProximasReservas";

const Inicio = ({ usuario, setUsuario }) => {
  const navigate = useNavigate();
  const [mostrarMenuCuenta, setMostrarMenuCuenta] = useState(false);
  const [reservas, setReservas] = useState([]); // Estado para las reservas del usuario

  useEffect(() => {
    if (usuario) {
      // Cargar las reservas del usuario
      fetch(`/api/reservas/${usuario.id}`) // Cambiar la URL a la ruta correcta de tu backend
        .then((response) => response.json())
        .then((data) => setReservas(data));
    }
  }, [usuario]);

  const handleLogout = () => {
    setUsuario(null);
    setMostrarMenuCuenta(false);
    navigate("/");
  };

  // Función para verificar si una oficina está disponible para una reserva
  const esDisponible = (fecha, oficinaId) => {
    // Verificar si la fecha es válida (no es pasada)
    const fechaActual = new Date();
    if (new Date(fecha) < fechaActual) {
      alert("No puedes reservar en una fecha pasada.");
      return false;
    }

    // Verificar si ya hay una reserva en la misma fecha y oficina
    const existeReserva = reservas.some(
      (reserva) => reserva.fecha === fecha && reserva.oficinaId === oficinaId
    );
    
    if (existeReserva) {
      alert("Ya existe una reserva en este horario.");
      return false;
    }

    return true;
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white px-6 py-4 shadow-md flex justify-between items-center relative">
        <h1 className="text-xl font-bold">WorkSpace Reserve</h1>
        <div className="relative">
          <button
            onClick={() => setMostrarMenuCuenta(!mostrarMenuCuenta)}
            className="bg-green-500 hover:bg-green-400 text-white px-4 py-2 rounded-lg"
          >
            Cuenta
          </button>
          {mostrarMenuCuenta && (
            <div className="absolute right-0 mt-2 bg-white border rounded shadow-lg text-black z-10">
              {usuario ? (
                <>
                  <button
                    className="block px-4 py-2 hover:bg-gray-200 w-full text-left"
                    onClick={() => alert("Ver perfil")}
                  >
                    Ver Perfil
                  </button>
                  <button
                    className="block px-4 py-2 hover:bg-gray-200 w-full text-left"
                    onClick={handleLogout}
                  >
                    Cerrar Sesión
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="block px-4 py-2 hover:bg-gray-200 w-full text-left"
                    onClick={() => navigate("/login")}
                  >
                    Iniciar Sesión
                  </button>
                  <button
                    className="block px-4 py-2 hover:bg-gray-200 w-full text-left"
                    onClick={() => navigate("/registro")}
                  >
                    Registrarse
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </header>

      <main className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Oficinas 
            usuario={usuario} 
            oficinas={oficinasData} 
            esDisponible={esDisponible} // Pasar la función de disponibilidad
          />
        </div>
        <div>
          <Calendario />
          {usuario && <ProximasReservas usuario={usuario} />}
        </div>
      </main>
    </div>
  );
};

export default Inicio;
