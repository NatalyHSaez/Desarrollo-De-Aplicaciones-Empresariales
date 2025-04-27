import React, { useState, useEffect } from "react";
import { FaSearch, FaFilter } from "react-icons/fa";

const Usuarios = () => {
  const [busqueda, setBusqueda] = useState("");
  const [mostrarFiltros, setMostrarFiltros] = useState(false);
  const [filtroCargo, setFiltroCargo] = useState("");
  const [usuarios, setUsuarios] = useState([]);

  // Cargar usuarios desde localStorage
  useEffect(() => {
    const usuariosGuardados = JSON.parse(localStorage.getItem("usuarios")) || [];
    setUsuarios(usuariosGuardados);
  }, []);

  // Filtrar usuarios según búsqueda y cargo
  const usuariosFiltrados = usuarios.filter((usuario) => {
    const nombreCoincide = usuario.nombre.toLowerCase().includes(busqueda.toLowerCase());
    const cargoCoincide = filtroCargo ? usuario.cargo === filtroCargo : true;
    return nombreCoincide && cargoCoincide;
  });

  // Obtener cargos únicos para el filtro
  const cargosUnicos = [...new Set(usuarios.map((usuario) => usuario.cargo))];

  // Contar las próximas reservas de cada usuario, excepto los administradores
  const contarProximasReservas = (idUsuario) => {
    if (usuarios.find((usuario) => usuario.id === idUsuario).cargo === "Administrador") {
      return 0; // Los administradores no tienen reservas
    }
    
    const reservas = JSON.parse(localStorage.getItem("reservas")) || [];
    const reservasUsuario = reservas.filter((reserva) => reserva.usuarioId === idUsuario);
    return reservasUsuario.length;
  };

  return (
    <div className="p-4">
      {/* Buscador y botón de filtros */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Buscar por nombre"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
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
            value={filtroCargo}
            onChange={(e) => setFiltroCargo(e.target.value)}
            className="border rounded p-2"
          >
            <option value="">Filtrar por cargo</option>
            {cargosUnicos.map((cargo) => (
              <option key={cargo} value={cargo}>
                {cargo}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Lista de usuarios */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {usuariosFiltrados.length === 0 ? (
          <p>No se encontraron usuarios.</p>
        ) : (
          usuariosFiltrados.map((usuario) => (
            <div
              key={usuario.id}
              className="border p-4 rounded shadow hover:shadow-md transition relative"
            >
              {/* Imagen de perfil */}
              <div className="flex justify-center mb-4">
                <img
                  src={usuario.imagenPerfil || "/img/perfil.jpg"}
                  alt={usuario.nombre}
                  className="h-32 w-32 object-cover rounded-full"
                />
              </div>

              {/* Información del usuario */}
              <h2 className="text-xl font-semibold mb-1">{usuario.nombre} {usuario.apellido}</h2>
              <p className="text-gray-600 mb-2">Cargo: {usuario.cargo}</p>
              <p className="text-sm text-gray-600">Teléfono: {usuario.telefono}</p>
              <p className="text-sm text-gray-600">Email: {usuario.correo}</p>

              {/* Número de próximas reservas */}
              {usuario.cargo !== "Administrador" && (
                <p className="text-sm text-gray-600">
                  Próximas reservas: {contarProximasReservas(usuario.id)}
                </p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Usuarios;
