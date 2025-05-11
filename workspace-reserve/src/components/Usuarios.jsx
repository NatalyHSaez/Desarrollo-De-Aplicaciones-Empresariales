import { useEffect, useState } from "react";

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [reservas, setReservas] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const [usuarioEditado, setUsuarioEditado] = useState(null);
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    correo: "",
    telefono: "",
    fechaNacimiento: "",
    contrasena: "",
  });

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

  const usuariosFiltrados = usuarios.filter((usuario) => {
    if (usuario.cargo.toLowerCase() === "administrador") return false;
    const busquedaLower = busqueda.toLowerCase();
    return (
      usuario.nombre.toLowerCase().includes(busquedaLower) ||
      usuario.apellido.toLowerCase().includes(busquedaLower) ||
      usuario.correo.toLowerCase().includes(busquedaLower) ||
      usuario.telefono.toLowerCase().includes(busquedaLower) ||
      usuario.cargo.toLowerCase().includes(busquedaLower)
    );
  });

  const handleUsuarioClick = (usuario) => {
    setUsuarioSeleccionado(usuario);
    setFormData({
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      correo: usuario.correo,
      telefono: usuario.telefono,
      fechaNacimiento: usuario.fechaNacimiento,
      contrasena: usuario.contrasena,
    });
    setUsuarioEditado(usuario);
  };

  const handleCerrarPerfil = () => {
    setUsuarioSeleccionado(null);
    setUsuarioEditado(null);
  };

  const formatearFechaNacimiento = (fecha) => {
    const fechaObj = new Date(fecha);
    return new Intl.DateTimeFormat("es-ES", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(fechaObj);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleGuardarCambios = () => {
    const usuariosActualizados = usuarios.map((usuario) =>
      usuario.nombre === usuarioEditado.nombre ? { ...usuario, ...formData } : usuario
    );
    setUsuarios(usuariosActualizados);
    localStorage.setItem("usuarios", JSON.stringify(usuariosActualizados));
    setUsuarioSeleccionado({ ...usuarioEditado, ...formData });
    setUsuarioEditado(null);
  };

  return (
    <div className="relative p-6">
      <h2 className="text-2xl font-bold mb-4">Usuarios Registrados</h2>

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
                <tr
                  key={index}
                  className="text-center cursor-pointer"
                  onClick={() => handleUsuarioClick(usuario)}
                >
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

      {/* Overlay de perfil de usuario */}
      {usuarioSeleccionado && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10">
          <div className="bg-white p-6 rounded shadow-lg w-1/2">
            <button
              onClick={handleCerrarPerfil}
              className="bg-red-500 text-white px-4 py-2 rounded mb-4"
            >
              Cerrar Perfil
            </button>
            <h3 className="text-xl font-semibold">Perfil de {usuarioSeleccionado.nombre}</h3>
            {usuarioEditado ? (
              <div>
                <label className="block">
                  Nombre:
                  <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    className="border rounded p-2 mt-1 w-full"
                  />
                </label>
                <label className="block">
                  Apellido:
                  <input
                    type="text"
                    name="apellido"
                    value={formData.apellido}
                    onChange={handleInputChange}
                    className="border rounded p-2 mt-1 w-full"
                  />
                </label>
                <label className="block">
                  Correo:
                  <input
                    type="email"
                    name="correo"
                    value={formData.correo}
                    onChange={handleInputChange}
                    className="border rounded p-2 mt-1 w-full"
                  />
                </label>
                <label className="block">
                  Teléfono:
                  <input
                    type="tel"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleInputChange}
                    className="border rounded p-2 mt-1 w-full"
                  />
                </label>
                <label className="block">
                  Fecha de Nacimiento:
                  <input
                    type="date"
                    name="fechaNacimiento"
                    value={formData.fechaNacimiento}
                    onChange={handleInputChange}
                    className="border rounded p-2 mt-1 w-full"
                  />
                </label>
                <label className="block">
                  Contraseña:
                  <input
                    type="password"
                    name="contrasena"
                    value={formData.contrasena}
                    onChange={handleInputChange}
                    className="border rounded p-2 mt-1 w-full"
                  />
                </label>
                <button
                  onClick={handleGuardarCambios}
                  className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
                >
                  Guardar Cambios
                </button>
              </div>
            ) : (
              <div>
                <p><strong>Nombre:</strong> {usuarioSeleccionado.nombre}</p>
                <p><strong>Apellido:</strong> {usuarioSeleccionado.apellido}</p>
                <p><strong>Cargo:</strong> {usuarioSeleccionado.cargo}</p>
                <p><strong>Correo:</strong> {usuarioSeleccionado.correo}</p>
                <p><strong>Teléfono:</strong> {usuarioSeleccionado.telefono}</p>
                <p><strong>Fecha de Nacimiento:</strong> {formatearFechaNacimiento(usuarioSeleccionado.fechaNacimiento)}</p>
                <p><strong>Contraseña:</strong> {usuarioSeleccionado.contrasena}</p>
                <p><strong>Reservas:</strong> {contarReservasPorUsuario(usuarioSeleccionado.nombre)}</p>
                <button
                  onClick={() => setUsuarioEditado(usuarioSeleccionado)}
                  className="bg-green-500 text-white px-4 py-2 rounded mt-4"
                >
                  Editar
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Usuarios;
