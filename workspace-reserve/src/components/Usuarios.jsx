import { useEffect, useState } from "react";

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [reservas, setReservas] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    const datosUsuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const datosReservas = JSON.parse(localStorage.getItem("reservas")) || [];

    setUsuarios(datosUsuarios);
    setReservas(datosReservas);
  }, []);

  const handleBusquedaChange = (e) => {
    setBusqueda(e.target.value);
  };

  const contarReservasPorUsuario = (nombre) => {
    return reservas.filter((reserva) => reserva.usuario === nombre).length;
  };

  // Filtrar usuarios que no sean "Administrador" y que coincidan con la búsqueda
  const usuariosFiltrados = usuarios.filter((usuario) => {
    // Excluir administradores
    if (usuario.cargo.toLowerCase() === "administrador") return false;

    // Filtrar por nombre, apellido, correo, teléfono o cargo
    const busquedaLower = busqueda.toLowerCase();
    return (
      usuario.nombre.toLowerCase().includes(busquedaLower) ||
      usuario.apellido.toLowerCase().includes(busquedaLower) ||
      usuario.correo.toLowerCase().includes(busquedaLower) ||
      usuario.telefono.toLowerCase().includes(busquedaLower) ||
      usuario.cargo.toLowerCase().includes(busquedaLower)
    );
  });

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Lista de Usuarios</h2>

      {/* Buscador */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Buscar..."
          value={busqueda}
          onChange={handleBusquedaChange}
          className="w-full border rounded p-2"
        />
      </div>

      {usuariosFiltrados.length === 0 ? (
        <p>No se encontraron usuarios.</p>
      ) : (
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">Nombre</th>
              <th className="border px-4 py-2">Apellido</th>
              <th className="border px-4 py-2">Cargo</th>
              <th className="border px-4 py-2">Correo</th>
              <th className="border px-4 py-2">Teléfono</th>
              <th className="border px-4 py-2">Reservas</th>
            </tr>
          </thead>
          <tbody>
            {usuariosFiltrados.map((usuario, index) => {
              const cantidadReservas = contarReservasPorUsuario(usuario.nombre);

              return (
                <tr key={index} className="text-center">
                  <td className="border px-4 py-2">{usuario.nombre}</td>
                  <td className="border px-4 py-2">{usuario.apellido}</td>
                  <td className="border px-4 py-2">{usuario.cargo}</td>
                  <td className="border px-4 py-2">{usuario.correo}</td>
                  <td className="border px-4 py-2">{usuario.telefono}</td>
                  <td className="border px-4 py-2">{cantidadReservas}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Usuarios;
