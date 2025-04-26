import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProximasReservas from "./ProximasReservas";

const Perfil = ({ usuario }) => {
  const navigate = useNavigate();
  const [editando, setEditando] = useState(false);
  const [nuevoUsuario, setNuevoUsuario] = useState({ ...usuario });
  const [nuevaImagen, setNuevaImagen] = useState(null);

  if (!usuario) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <p className="text-2xl text-gray-700">Debes iniciar sesión para ver tu perfil.</p>
      </div>
    );
  }

  const handleGuardar = () => {
    const usuarioActualizado = {
      ...usuario, // Mantenemos la información original
      ...nuevoUsuario, // Sobreescribimos solo lo que se haya cambiado
      imagen: nuevaImagen || usuario.imagen, // Imagen nueva si se cambió
    };
    localStorage.setItem("usuario", JSON.stringify(usuarioActualizado));
    setEditando(false);
    window.location.reload();
  };

  const handleImagenChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNuevaImagen(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEliminar = () => {
    console.log("Eliminando perfil...");
    // Elimina los datos del usuario del localStorage
    localStorage.removeItem("usuario");

    // Verificar si la eliminación fue exitosa
    const usuarioEliminado = localStorage.getItem("usuario");
    if (!usuarioEliminado) {
      console.log("Perfil eliminado exitosamente");
      // Redirige al usuario a la página de registro
      navigate("/registro");
    } else {
      console.log("No se pudo eliminar el perfil");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex items-center justify-center">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-md p-8 space-y-8">
        {/* Imagen de perfil + nombre */}
        <div className="flex flex-col items-center space-y-4">
          <div className="w-40 h-40 rounded-full border-2 border-gray-300 overflow-hidden shadow-sm">
            <img
              src={nuevaImagen || usuario.imagen || "/img/perfil.jpg"} // Imagen predeterminada si no hay imagen de perfil
              alt="Perfil"
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="text-3xl font-bold text-center">{usuario.nombre} {usuario.apellido}</h2> {/* Mostrar apellido */}
        </div>

        {/* Descripción */}
        {!editando && (
          <div className="bg-gray-50 p-6 rounded-xl">
            <h3 className="text-2xl font-semibold mb-4">Sobre mí</h3>
            <p className="text-lg">{usuario.descripcion || "No hay descripción aún."}</p>
          </div>
        )}

        {/* Información de perfil */}
        {!editando && (
          <div>
            <h3 className="text-2xl font-semibold mb-4">Información de Perfil</h3>
            <ul className="list-none space-y-2 text-lg">
              <li><strong>Nombre:</strong> {usuario.nombre}</li>
              {usuario.apellido && <li><strong>Apellido:</strong> {usuario.apellido}</li>}
              {usuario.cargo && <li><strong>Cargo:</strong> {usuario.cargo}</li>}
              {usuario.fechaNacimiento && <li><strong>Fecha de Nacimiento:</strong> {usuario.fechaNacimiento}</li>}
              {usuario.telefono && <li><strong>Teléfono:</strong> {usuario.telefono}</li>}
              <li><strong>Email:</strong> {usuario.correo}</li> {/* Mostrar el email */}
            </ul>
          </div>
        )}

        {/* Botón para activar edición */}
        {!editando && (
          <div className="flex justify-center">
            <button
              onClick={() => setEditando(true)}
              className="bg-blue-600 hover:bg-blue-500 text-white text-lg px-6 py-2 rounded-xl transition"
            >
              Editar Perfil
            </button>
          </div>
        )}

        {/* Formulario de edición */}
        {editando && (
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold mb-4">Editar Perfil</h3>

            {/* Cambiar Imagen */}
            <div className="flex flex-col space-y-2">
              <label className="text-lg font-semibold">Imagen de Perfil</label>
              <input type="file" accept="image/*" onChange={handleImagenChange} />
            </div>

            {/* Nombre */}
            <div className="flex flex-col space-y-2">
              <label className="text-lg font-semibold">Nombre y Apellido</label>
              <input
                type="text"
                className="border rounded-xl p-3"
                value={nuevoUsuario.nombre || ""}
                onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, nombre: e.target.value })}
              />
            </div>

            {/* Cargo */}
            <div className="flex flex-col space-y-2">
              <label className="text-lg font-semibold">Cargo</label>
              <input
                type="text"
                className="border rounded-xl p-3"
                value={nuevoUsuario.cargo || ""}
                onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, cargo: e.target.value })}
              />
            </div>

            {/* Fecha de nacimiento */}
            <div className="flex flex-col space-y-2">
              <label className="text-lg font-semibold">Fecha de Nacimiento</label>
              <input
                type="date"
                className="border rounded-xl p-3"
                value={nuevoUsuario.fechaNacimiento || ""}
                onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, fechaNacimiento: e.target.value })}
              />
            </div>

            {/* Teléfono */}
            <div className="flex flex-col space-y-2">
              <label className="text-lg font-semibold">Número de Teléfono</label>
              <input
                type="text"
                className="border rounded-xl p-3"
                value={nuevoUsuario.telefono || ""}
                onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, telefono: e.target.value })}
              />
            </div>

            {/* Email */}
            <div className="flex flex-col space-y-2">
              <label className="text-lg font-semibold">Correo Electrónico</label>
              <input
                type="email"
                className="border rounded-xl p-3"
                value={nuevoUsuario.correo || ""}
                onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, email: e.target.value })}
              />
            </div>

            {/* Descripción */}
            <div className="flex flex-col space-y-2">
              <label className="text-lg font-semibold">Descripción</label>
              <textarea
                className="border rounded-xl p-3"
                value={nuevoUsuario.descripcion || ""}
                onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, descripcion: e.target.value })}
                rows="4"
              />
            </div>

            {/* Contraseña */}
            <div className="flex flex-col space-y-2">
              <label className="text-lg font-semibold">Nueva Contraseña</label>
              <input
                type="password"
                className="border rounded-xl p-3"
                placeholder="********"
                onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, contraseña: e.target.value })}
              />
            </div>

            {/* Botones de acción */}
            <div className="flex gap-4 justify-center">
              <button
                onClick={handleGuardar}
                className="bg-green-500 hover:bg-green-400 text-white text-lg px-6 py-2 rounded-xl transition"
              >
                Guardar Cambios
              </button>
              <button
                onClick={() => setEditando(false)}
                className="bg-gray-500 hover:bg-gray-400 text-white text-lg px-6 py-2 rounded-xl transition"
              >
                Cancelar
              </button>
            </div>
          </div>
        )}

        {/* Sección de Reservas */}
        {!editando && (
          <>
            <div>
              <h3 className="text-2xl font-semibold mb-4">Reservas Pendientes</h3>
              <ProximasReservas usuario={usuario} estado="pendiente" />
            </div>

            <div>
              <h3 className="text-2xl font-semibold mb-4">Reservas Ejecutadas</h3>
              <ProximasReservas usuario={usuario} estado="ejecutada" />
            </div>

            <div>
              <h3 className="text-2xl font-semibold mb-4">Reservas Canceladas</h3>
              <ProximasReservas usuario={usuario} estado="cancelada" />
            </div>

            {/* Botón volver al inicio */}
            <div className="flex justify-center pt-6">
              <button
                onClick={() => navigate("/")}
                className="bg-purple-600 hover:bg-purple-500 text-white text-lg px-8 py-3 rounded-xl transition"
              >
                Volver al Inicio
              </button>
            </div>
          </>
        )}

        {/* Botón de eliminar perfil */}
        <div className="flex justify-center pt-6">
          <button
            onClick={handleEliminar}
            className="bg-red-600 hover:bg-red-500 text-white text-lg px-8 py-3 rounded-xl transition"
          >
            Eliminar Perfil
          </button>
        </div>
      </div>
    </div>
  );
};

export default Perfil;
