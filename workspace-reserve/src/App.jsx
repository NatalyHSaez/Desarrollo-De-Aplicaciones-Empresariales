import React, { useState } from "react";
import { Menu } from "@headlessui/react";
import { FaSearch, FaFilter, FaUser } from "react-icons/fa";
import { motion } from "framer-motion";

// Componentes
import Oficinas from "./components/Oficinas";
import Calendario from "./components/Calendario";

const App = () => {
  const [reservas, setReservas] = useState([
    new Date(2025, 3, 20),
    new Date(2025, 3, 22),
  ]);
  const [mostrarFiltros, setMostrarFiltros] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Encabezado */}
      <header className="flex items-center justify-between p-4 bg-blue-600 text-white">
        <h1 className="text-2xl font-bold">WorkSpace Reserve</h1>

        <Menu as="div" className="relative">
          <Menu.Button className="flex items-center space-x-2 bg-blue-500 p-2 rounded-md">
            <FaUser className="text-white" />
            <span>Cuenta</span>
          </Menu.Button>

          {/* Menú desplegable */}
          <Menu.Items className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
            <motion.div
              className="py-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`w-full text-left px-4 py-2 text-sm text-gray-700 ${
                      active ? "bg-gray-100" : ""
                    }`}
                  >
                    Iniciar sesión
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`w-full text-left px-4 py-2 text-sm text-gray-700 ${
                      active ? "bg-gray-100" : ""
                    }`}
                  >
                    Registrarse
                  </button>
                )}
              </Menu.Item>
            </motion.div>
          </Menu.Items>
        </Menu>
      </header>

      {/* Contenido principal */}
      <div className="flex flex-1 flex-col md:flex-row p-4 space-x-0 md:space-x-4">
        {/* Sección de oficinas */}
        <div className="flex-1 bg-white rounded-lg shadow-md p-4 mb-4 md:mb-0">
          <h2 className="text-xl font-bold mb-4">Oficinas Disponibles</h2>

          {/* Buscador + Filtro */}
          <div className="relative w-full max-w-lg mb-4">
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Buscar..."
                className="w-full h-12 p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <button className="h-12 w-12 flex items-center justify-center bg-blue-500 text-white border-t border-b border-blue-500">
                <FaSearch />
              </button>

              <button
                className="h-12 w-12 flex items-center justify-center bg-gray-500 text-white rounded-r-md border border-gray-500 transition-transform transform hover:scale-110"
                onClick={() => setMostrarFiltros(!mostrarFiltros)}
              >
                <FaFilter />
              </button>
            </div>

            {/* Filtros animados */}
            {mostrarFiltros && (
              <motion.div
                className="absolute z-10 mt-2 w-full bg-white border rounded shadow-lg p-4 grid grid-cols-1 gap-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700">Fecha</label>
                  <input
                    type="date"
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Categoría</label>
                  <select className="mt-1 block w-full border border-gray-300 rounded-md p-2">
                    <option>Oficina</option>
                    <option>Sala de Reuniones</option>
                    <option>Sala de Estudio</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Capacidad</label>
                  <select className="mt-1 block w-full border border-gray-300 rounded-md p-2">
                    <option>Individual</option>
                    <option>Menos de 10</option>
                    <option>10 - 30</option>
                    <option>30 - 50</option>
                    <option>50 - 100</option>
                    <option>Más de 100</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Ubicación</label>
                  <select className="mt-1 block w-full border border-gray-300 rounded-md p-2">
                    <option>Piso 1</option>
                    <option>Piso 2</option>
                    <option>Piso 3</option>
                    <option>Piso 4</option>
                  </select>
                </div>
              </motion.div>
            )}
          </div>

          {/* Oficinas */}
          <Oficinas />
        </div>

        {/* Calendario */}
        <div className="w-full md:w-1/3 p-4 bg-white rounded-lg shadow-md">
          <Calendario reservas={reservas} />
        </div>
      </div>

      {/* Footer */}
      <footer className="p-4 bg-gray-800 text-white text-center">
        <p>&copy; 2025 - WorkSpace Reserve</p>
      </footer>
    </div>
  );
};

export default App;
