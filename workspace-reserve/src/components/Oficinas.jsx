import React, { useState } from "react";
import oficinas from "../data/oficinas";
import { FaSearch, FaFilter } from "react-icons/fa";
import FormularioReserva from "./FormularioReserva"; // Asegúrate de importar correctamente

const Oficinas = ({ usuario, actualizarReservas }) => {
  const [busqueda, setBusqueda] = useState("");
  const [mostrarFiltros, setMostrarFiltros] = useState(false);
  const [filtroTipo, setFiltroTipo] = useState("");
  const [filtroCapacidad, setFiltroCapacidad] = useState("");
  const [filtroTorre, setFiltroTorre] = useState("");
  const [filtroPiso, setFiltroPiso] = useState("");
  const [oficinaSeleccionada, setOficinaSeleccionada] = useState(null);

  const handleBusqueda = (e) => setBusqueda(e.target.value);

  const oficinasFiltradas = oficinas.filter((oficina) => {
    const coincideBusqueda = oficina.nombre
      .toLowerCase()
      .includes(busqueda.toLowerCase());
    const coincideTipo = filtroTipo ? oficina.tipo === filtroTipo : true;
    const coincideCapacidad = filtroCapacidad
      ? oficina.capacidad >= parseInt(filtroCapacidad, 10)
      : true;
    const coincideTorre = filtroTorre ? oficina.torre === filtroTorre : true;
    const coincidePiso = filtroPiso
      ? oficina.piso === parseInt(filtroPiso, 10)
      : true;
    return (
      coincideBusqueda &&
      coincideTipo &&
      coincideCapacidad &&
      coincideTorre &&
      coincidePiso
    );
  });

  const tiposUnicos = [...new Set(oficinas.map((oficina) => oficina.tipo))];

  return (
    <div className="p-4">
      {/* Buscador y botón de filtros */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Buscar..."
            value={busqueda}
            onChange={handleBusqueda}
            className="w-full border rounded p-2 pl-10"
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        <button
          onClick={() => setMostrarFiltros(!mostrarFiltros)}
          className="flex items-center bg-gray-200 hover:bg-gray-300 px-3 py-2 rounded"
        >
          <FaFilter className="mr-2" />
          Filtros
        </button>
      </div>

      {/* Filtros avanzados */}
      {mostrarFiltros && (
        <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
          <select
            value={filtroTipo}
            onChange={(e) => setFiltroTipo(e.target.value)}
            className="border rounded p-2"
          >
            <option value="">Tipo</option>
            {tiposUnicos.map((tipo) => (
              <option key={tipo} value={tipo}>
                {tipo}
              </option>
            ))}
          </select>
          <input
            type="number"
            placeholder="Capacidad mínima"
            value={filtroCapacidad}
            onChange={(e) => setFiltroCapacidad(e.target.value)}
            className="border rounded p-2"
          />
          <input
            type="text"
            placeholder="Torre"
            value={filtroTorre}
            onChange={(e) => setFiltroTorre(e.target.value)}
            className="border rounded p-2"
          />
          <input
            type="number"
            placeholder="Piso"
            value={filtroPiso}
            onChange={(e) => setFiltroPiso(e.target.value)}
            className="border rounded p-2"
          />
        </div>
      )}

      {/* Lista de oficinas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {oficinasFiltradas.map((oficina) => (
          <div
            key={oficina.id}
            className="border p-4 rounded shadow hover:shadow-md transition relative"
          >
            <img
              src={oficina.imagen}
              alt={oficina.nombre}
              className="h-48 w-full object-cover rounded mb-4"
            />
            <h2 className="text-xl text-black font-semibold mb-1">{oficina.nombre}</h2>
            <p className="text-gray-600 mb-2">{oficina.tipo}</p>
            <p className="text-sm text-gray-600">
              Torre {oficina.torre} - Piso {oficina.piso}
            </p>
            <p className="text-sm text-gray-600 mb-2">
              Capacidad: {oficina.capacidad}
            </p>
            {usuario && usuario.cargo !== "Administrador" && (
              <button
                onClick={() => setOficinaSeleccionada(oficina)}
                className="absolute top-2 right-2 bg-green-500 hover:bg-green-600 text-white text-sm px-3 py-1 rounded"
              >
                Reservar
              </button>
            )}
            {usuario && usuario.cargo === "Administrador" && (
              <button
                onClick={() => setOficinaSeleccionada(oficina)}
                className="absolute top-2 right-2 bg-blue-500 hover:bg-blue-600 text-white text-sm px-3 py-1 rounded"
              >
                Modificar
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Modal de reserva */}
      {oficinaSeleccionada && (
        <FormularioReserva
          oficina={oficinaSeleccionada}
          usuario={usuario}
          onClose={() => setOficinaSeleccionada(null)}
        />
      )}
    </div>
  );
};

export default Oficinas;
