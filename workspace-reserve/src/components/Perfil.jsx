import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProximasReservas from "./ProximasReservas";
import { FaPlusCircle } from "react-icons/fa";
import AgregarOficina from "./AgregarOficina"; 
import Oficinas from "./Oficinas"; // Importando el componente Oficinas

const Perfil = ({ usuario }) => {
  const navigate = useNavigate();
  const [editando, setEditando] = useState(false);
  const [nuevoUsuario, setNuevoUsuario] = useState({ ...usuario });
  const [nuevaImagen, setNuevaImagen] = useState(null);
  const [agregarOficina, setAgregarOficina] = useState(false);

  if (!usuario) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <p className="text-2xl text-gray-700">Debes iniciar sesión para ver tu perfil.</p>
      </div>
    );
  }

  const handleGuardar = () => {
    const usuarioActualizado = {
      ...usuario,
      ...nuevoUsuario,
      imagen: nuevaImagen || usuario.imagen,
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
    localStorage.removeItem("usuario");
    const usuarioEliminado = localStorage.getItem("usuario");
    if (!usuarioEliminado) {
      console.log("Perfil eliminado exitosamente");
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
              src={nuevaImagen || usuario.imagen || "/img/perfil.jpg"}
              alt="Perfil"
              className="w-full h-full object-cover"
            />
          </div>
          {editando ? (
            <input
              type="file"
              onChange={handleImagenChange}
              className="mt-4 text-blue-600"
            />
          ) : null}
          <h2 className="text-3xl font-bold text-center">{usuario.nombre} {usuario.apellido}</h2>
        </div>

        {/* Formulario de edición */}
        {editando && (
          <div className="space-y-4">
            <input
              type="text"
              value={nuevoUsuario.nombre}
              onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, nombre: e.target.value })}
              className="w-full p-3 border rounded-xl"
              placeholder="Nombre"
            />
            <input
              type="text"
              value={nuevoUsuario.apellido}
              onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, apellido: e.target.value })}
              className="w-full p-3 border rounded-xl"
              placeholder="Apellido"
            />
            <input
              type="text"
              value={usuario.cargo}
              disabled
              className="w-full p-3 border rounded-xl bg-gray-200 cursor-not-allowed"
              placeholder="Cargo"
            />
            <input
              type="date"
              value={nuevoUsuario.fechaNacimiento}
              onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, fechaNacimiento: e.target.value })}
              className="w-full p-3 border rounded-xl"
            />
            <input
              type="tel"
              value={nuevoUsuario.telefono}
              onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, telefono: e.target.value })}
              className="w-full p-3 border rounded-xl"
              placeholder="Teléfono"
            />
            <textarea
              value={nuevoUsuario.descripcion}
              onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, descripcion: e.target.value })}
              className="w-full p-3 border rounded-xl"
              placeholder="Descripción"
            />
          </div>
        )}

        {/* Mostrar la descripción si no está en modo edición */}
        {!editando && (
          <div className="bg-gray-50 p-6 rounded-xl">
            <h3 className="text-2xl font-semibold mb-4">Sobre mí</h3>
            <p className="text-lg">{usuario.descripcion || "No hay descripción aún."}</p>
          </div>
        )}

        {/* Mostrar información de perfil */}
        {!editando && (
          <div>
            <h3 className="text-2xl font-semibold mb-4">Información de Perfil</h3>
            <ul className="list-none space-y-2 text-lg">
              <li><strong>Nombre:</strong> {usuario.nombre}</li>
              {usuario.apellido && <li><strong>Apellido:</strong> {usuario.apellido}</li>}
              {usuario.cargo && <li><strong>Cargo:</strong> {usuario.cargo}</li>}
              {usuario.fechaNacimiento && <li><strong>Fecha de Nacimiento:</strong> {usuario.fechaNacimiento}</li>}
              {usuario.telefono && <li><strong>Teléfono:</strong> {usuario.telefono}</li>}
              <li><strong>Email:</strong> {usuario.correo}</li>
            </ul>
            {/* Botón para editar perfil */}
            <div className="flex justify-between pt-4">
              <button
                onClick={() => setEditando(true)}
                className="bg-gray-600 hover:bg-blue-500 text-white text-lg px-6 py-2 rounded-xl min-w-[200px] transition"
              >
                Editar Perfil
              </button>
              {usuario.cargo === "Administrador" && (
                <button
                  onClick={() => setAgregarOficina(true)}
                  className="flex items-center bg-gray-600 hover:bg-gray-500 text-white text-lg px-6 py-2 rounded-xl min-w-[200px] transition"
                >
                  <FaPlusCircle className="mr-2" /> Agregar Oficina
                </button>
              )}
            </div>
          </div>
        )}

        {/* Mostrar reservas si no es administrador */}
        {usuario.cargo !== "Administrador" && !editando && (
          <>
            <div>
              <ProximasReservas usuario={usuario} estado="pendiente" />
            </div>
          </>
        )}

        {/* Mostrar botón y oficinas solo si es administrador */}
        {usuario.cargo === "Administrador" && (
          <>
            <div className="flex justify-center pt-6">
              <Oficinas />
            </div>
          </>
        )}

        {/* Botón para guardar los cambios */}
        {editando && (
          <div className="flex justify-center pt-6">
            <button
              onClick={handleGuardar}
              className="bg-gray-600 hover:bg-gray-500 text-white text-lg px-6 py-2 rounded-xl min-w-[200px] transition"
            >
              Guardar Cambios
            </button>
          </div>
        )}

        {/* Botones de Volver al inicio y Eliminar perfil, más separados */}
        <div className="flex justify-center space-x-6 pt-6">
          <button
            onClick={() => navigate("/")}
            className="bg-gray-600 hover:bg-gray-500 text-white text-lg px-6 py-2 rounded-xl min-w-[200px] transition"
          >
            Volver al Inicio
          </button>
          <button
            onClick={handleEliminar}
            className="bg-red-600 hover:bg-red-500 text-white text-lg px-6 py-2 rounded-xl min-w-[200px] transition"
          >
            Eliminar Perfil
          </button>
        </div>
      </div>

      {/* Mostrar formulario de agregar oficina */}
      {agregarOficina && <AgregarOficina setAgregarOficina={setAgregarOficina} />}
    </div>
  );
};

export default Perfil;
