import Oficinas from "./Oficinas";
import Calendario from "./Calendario";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Inicio = ({ usuario, setUsuario }) => {
  const navigate = useNavigate();
  const [mostrarMenuCuenta, setMostrarMenuCuenta] = useState(false);

  const handleLogout = () => {
    setUsuario(null);
    setMostrarMenuCuenta(false);
    navigate("/");
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
                  <button className="block px-4 py-2 hover:bg-gray-200 w-full text-left">
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
          <Oficinas usuario={usuario} />
        </div>
        <div>
          <Calendario />
        </div>
      </main>
    </div>
  );
};

export default Inicio;
