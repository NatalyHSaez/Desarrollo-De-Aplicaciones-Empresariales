import { useState } from "react";
import oficinas from "../data/oficinas";
import { FaSearch, FaFilter } from "react-icons/fa";

const Oficinas = ({ usuario }) => {
  const [busqueda, setBusqueda] = useState("");
  const [mostrarFiltros, setMostrarFiltros] = useState(false);
  const [filtroTipo, setFiltroTipo] = useState("");
  const [filtroCapacidad, setFiltroCapacidad] = useState("");
  const [filtroTorre, setFiltroTorre] = useState("");
  const [filtroPiso, setFiltroPiso] = useState(""); // string, convertiremos a int al comparar

  const handleBusqueda = (e) => setBusqueda(e.target.value);

  const oficinasFiltradas = oficinas.filter((oficina) => {
    const coincideBusqueda =
      oficina.nombre.toLowerCase().includes(busqueda.toLowerCase());

    const coincideTipo = filtroTipo
      ? oficina.tipo.toLowerCase() === filtroTipo.toLowerCase()
      : true;

    const coincideCapacidad = filtroCapacidad
      ? oficina.capacidad === parseInt(filtroCapacidad, 10)
      : true;

    const coincideTorre = filtroTorre
      ? oficina.torre.toLowerCase() === filtroTorre.toLowerCase()
      : true;

    const coincidePiso =
      filtroPiso !== ""
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

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Oficinas Disponibles</h2>

      {/* Barra de búsqueda y botón de filtro */}
      <div className="flex items-center gap-2 mb-4 max-w-md">
        <div className="relative w-full">
          <input
            type="text"
            value={busqueda}
            onChange={handleBusqueda}
            placeholder="Buscar..."
            className="border border-gray-300 rounded px-3 py-2 w-full pr-10"
          />
          <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        <button
          onClick={() => setMostrarFiltros(!mostrarFiltros)}
          className="bg-green-500 hover:bg-green-600 text-white p-2 rounded"
        >
          <FaFilter />
        </button>
      </div>

      {/* Menú desplegable de filtros */}
      {mostrarFiltros && (
        <div className="mb-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          <select
            value={filtroTipo}
            onChange={(e) => setFiltroTipo(e.target.value)}
            className="border rounded p-2"
          >
            <option value="">Tipo</option>
            <option value="oficina">Oficina</option>
            <option value="sala de reuniones">Sala de Reuniones</option>
            <option value="sala de estudio">Sala de Estudio</option>
          </select>

          <input
            type="number"
            value={filtroCapacidad}
            onChange={(e) => setFiltroCapacidad(e.target.value)}
            placeholder="Capacidad"
            className="border rounded p-2"
          />

          <input
            type="text"
            value={filtroTorre}
            onChange={(e) => setFiltroTorre(e.target.value)}
            placeholder="Torre"
            className="border rounded p-2"
          />

          <input
            type="number"
            value={filtroPiso}
            onChange={(e) => setFiltroPiso(e.target.value)}
            placeholder="Piso"
            className="border rounded p-2"
          />
        </div>
      )}

      {/* Lista de oficinas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {oficinasFiltradas.map((oficina, index) => (
          <div
            key={index}
            className="border p-4 rounded shadow hover:shadow-md transition relative"
          >
            {usuario && (
              <button className="absolute top-2 left-2 bg-green-500 hover:bg-green-600 text-white text-sm px-3 py-1 rounded">
                Reservar
              </button>
            )}
            <img
              src={oficina.imagen}
              alt={oficina.nombre}
              className="w-full h-40 object-cover rounded mb-2"
            />
            <h3 className="text-lg font-semibold">{oficina.nombre}</h3>
            <p className="text-sm text-gray-600">{oficina.tipo}</p>
            <p className="text-sm text-gray-600">
              Torre {oficina.torre} - Piso {oficina.piso}
            </p>
            <p className="text-sm text-gray-600">
              Capacidad: {oficina.capacidad}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Oficinas;
