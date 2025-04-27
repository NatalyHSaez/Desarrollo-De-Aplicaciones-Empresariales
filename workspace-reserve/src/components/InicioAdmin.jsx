import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Calendario from "./Calendario"; // ✅ Importar Calendario
import ProximasReservas from "./ProximasReservas"; // ✅ Importar ProximasReservas
import Usuarios from "./Usuarios"; // ✅ Importar Usuarios

const InicioAdmin = ({ usuario, setUsuario }) => {
  const [mostrarMenuCuenta, setMostrarMenuCuenta] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setUsuario(null);
    setMostrarMenuCuenta(false);
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-red-600 text-white px-6 py-4 shadow-md flex justify-between items-center relative">
        <h1 className="text-xl font-bold">WorkSpace Reserve Administrador</h1>
        <div className="relative">
          <button
            onClick={() => setMostrarMenuCuenta(!mostrarMenuCuenta)}
            className="bg-green-500 hover:bg-green-400 text-white px-4 py-2 rounded-lg"
          >
            Cuenta
          </button>
          {mostrarMenuCuenta && (
            <div className="absolute right-0 mt-2 bg-white border rounded shadow-lg text-black z-10">
              <button
                className="block px-4 py-2 hover:bg-gray-200 w-full text-left"
                onClick={() => navigate("/perfil")}
              >
                Ver Perfil
              </button>
              <button
                className="block px-4 py-2 hover:bg-gray-200 w-full text-left"
                onClick={handleLogout}
              >
                Cerrar Sesión
              </button>
            </div>
          )}
        </div>
      </header>

      <main className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Columna con el componente Usuarios */}
        <div className="lg:col-span-2">
          <Usuarios />  {/* Mostrar el contenido de Usuarios.jsx */}
        </div>

        {/* Columna para el calendario y próximas reservas */}
        <div>
          <Calendario />
          {usuario && <ProximasReservas usuario={usuario} />}
        </div>
      </main>
    </div>
  );
};

export default InicioAdmin;
