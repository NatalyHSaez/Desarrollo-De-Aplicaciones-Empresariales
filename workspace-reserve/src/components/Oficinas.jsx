import React, { useState } from "react";
import oficinas from "../data/oficinas";
import { FaSearch, FaFilter } from "react-icons/fa";
import FormularioReserva from "./FormularioReserva";
import Historial from "./Historial";

const Oficinas = ({ usuario, actualizarReservas }) => {
  const [busqueda, setBusqueda] = useState("");
  const [mostrarFiltros, setMostrarFiltros] = useState(false);
  const [filtroTipo, setFiltroTipo] = useState("");
  const [filtroCapacidad, setFiltroCapacidad] = useState("");
  const [filtroTorre, setFiltroTorre] = useState("");
  const [filtroPiso, setFiltroPiso] = useState("");
  const [oficinaSeleccionada, setOficinaSeleccionada] = useState(null);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    tipo: "",
    capacidad: 1,
    torre: "",
    piso: 0,
  });

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

  const handleEditar = (oficina) => {
    setOficinaSeleccionada(oficina);
    setFormData({ ...oficina });
    setModoEdicion(true);
  };

  const handleGuardarCambios = () => {
    if (formData.capacidad < 1) {
      alert("La capacidad debe ser al menos 1.");
      return;
    }
    console.log("Cambios guardados:", formData);
    setModoEdicion(false);
    setOficinaSeleccionada(null);
    // Aquí iría la lógica para actualizar la oficina en backend o estado global
  };

  return (
    <div className="p-4">
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

        {usuario && usuario.cargo !== "Administrador" && (
          <button
            onClick={() => setMostrarFiltros(!mostrarFiltros)}
            className="flex items-center bg-gray-200 hover:bg-gray-300 px-3 py-2 rounded"
          >
            <FaFilter className="mr-2" />
            Filtros
          </button>
        )}
      </div>

      {mostrarFiltros && (
        <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
          <select
            value={filtroTipo}
            onChange={(e) => setFiltroTipo(e.target.value)}
            className="border bg-white-600 text-gray rounded p-2"
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
                onClick={() => handleEditar(oficina)}
                className="absolute top-2 right-2 bg-blue-500 hover:bg-blue-600 text-white text-sm px-3 py-1 rounded"
              >
                Editar
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Modal para reservar (usuarios normales) */}
      {oficinaSeleccionada && !modoEdicion && usuario.cargo !== "Administrador" && (
        <FormularioReserva
          oficina={oficinaSeleccionada}
          usuario={usuario}
          onClose={() => setOficinaSeleccionada(null)}
        />
      )}

      {/* Modal de edición (solo administradores) */}
      {modoEdicion && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md space-y-4">
            <h2 className="text-xl font-semibold mb-2">Editar Oficina</h2>
            <input
              type="text"
              placeholder="Nombre"
              value={formData.nombre}
              onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
              className="w-full border rounded p-2"
            />
            <select
              value={formData.tipo}
              onChange={(e) => setFormData({ ...formData, tipo: e.target.value })}
              className="w-full border rounded p-2"
            >
              <option value="">Selecciona un tipo</option>
              <option value="Oficina">Oficina</option>
              <option value="Sala de Reuniones">Sala de Reuniones</option>
              <option value="Sala de Estudio">Sala de Estudio</option>
            </select>
            <input
              type="number"
              min={1}
              placeholder="Capacidad"
              value={formData.capacidad}
              onChange={(e) => setFormData({ ...formData, capacidad: parseInt(e.target.value, 10) })}
              className="w-full border rounded p-2"
            />
            <input
              type="text"
              placeholder="Torre"
              value={formData.torre}
              onChange={(e) => setFormData({ ...formData, torre: e.target.value })}
              className="w-full border rounded p-2"
            />
            <input
              type="number"
              placeholder="Piso"
              value={formData.piso}
              onChange={(e) => setFormData({ ...formData, piso: parseInt(e.target.value, 10) })}
              className="w-full border rounded p-2"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setModoEdicion(false);
                  setOficinaSeleccionada(null);
                }}
                className="px-4 py-2 bg-gray-400 hover:bg-gray-500 text-white rounded"
              >
                Cancelar
              </button>
              <button
                onClick={handleGuardarCambios}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Oficinas;
