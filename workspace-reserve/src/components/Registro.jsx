import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Registro = () => {
  const [tipoUsuario, setTipoUsuario] = useState("usuario");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [cargo, setCargo] = useState("");
  const [codigoPais, setCodigoPais] = useState("+56");
  const [telefono, setTelefono] = useState("");
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [confirmarContrasena, setConfirmarContrasena] = useState("");

  const navigate = useNavigate();

  const handleRegistro = (e) => {
    e.preventDefault();

    if (contrasena !== confirmarContrasena) {
      alert("Las contraseñas no coinciden");
      return;
    }

    if (tipoUsuario === "admin" && !correo.endsWith("@admin.com")) {
      alert("El correo para admin debe terminar en @admin.com");
      return;
    }

    if (tipoUsuario === "usuario" && correo.endsWith("@admin.com")) {
      alert("El correo de usuario no puede terminar en @admin.com");
      return;
    }

    const nuevoUsuario = {
      tipoUsuario,
      nombre,
      apellido,
      fechaNacimiento,
      cargo: tipoUsuario === "admin" ? "Administrador" : cargo,
      telefono: `${codigoPais}${telefono}`,
      correo,
      contrasena,
    };

    const usuariosRegistrados = JSON.parse(localStorage.getItem("usuarios") || "[]");
    usuariosRegistrados.push(nuevoUsuario);
    localStorage.setItem("usuarios", JSON.stringify(usuariosRegistrados));

    alert("Registro exitoso. Ahora inicia sesión.");
    navigate("/login");
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleRegistro}
        className="bg-white p-8 pt-4 rounded shadow-md w-96 space-y-4 mt-20"
      >
        <div className="flex space-x-4 mb-4">
          <button
            type="button"
            onClick={() => setTipoUsuario("usuario")}
            className={`text-sm ${
              tipoUsuario === "usuario" ? "font-semibold text-black" : "text-gray-400"
            }`}
          >
            Usuario
          </button>
          <button
            type="button"
            onClick={() => setTipoUsuario("admin")}
            className={`text-sm ${
              tipoUsuario === "admin" ? "font-semibold text-black" : "text-gray-400"
            }`}
          >
            Admin
          </button>
        </div>

        <h2 className="text-2xl font-bold text-center">Registro</h2>

        <input
          type="text"
          placeholder="Nombre"
          className="w-full border border-gray-300 p-2 rounded"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Apellido"
          className="w-full border border-gray-300 p-2 rounded"
          value={apellido}
          onChange={(e) => setApellido(e.target.value)}
          required
        />
        <input
          type="date"
          className="w-full border border-gray-300 p-2 rounded"
          value={fechaNacimiento}
          onChange={(e) => setFechaNacimiento(e.target.value)}
          required
        />

        {tipoUsuario === "usuario" ? (
          <select
            className="w-full border border-gray-300 p-2 rounded"
            value={cargo}
            onChange={(e) => setCargo(e.target.value)}
            required
          >
            <option value="">Seleccionar cargo</option>
            <option value="Supervisor">Supervisor</option>
            <option value="Ejecutivo">Ejecutivo</option>
            <option value="Administrativo">Administrativo</option>
            <option value="Estudiante">Estudiante</option>
          </select>
        ) : (
          <input
            type="text"
            value="Administrador"
            disabled
            className="w-full border border-gray-300 p-2 rounded bg-gray-100"
          />
        )}

        <div className="flex space-x-2">
          <select
            value={codigoPais}
            onChange={(e) => setCodigoPais(e.target.value)}
            className="w-2/3 border border-gray-300 p-2 rounded"
          >
            <option value="+56">🇨🇱 +56 (Chile)</option>
            <option value="+52">🇲🇽 +52 (México)</option>
            <option value="+57">🇨🇴 +57 (Colombia)</option>
            <option value="+54">🇦🇷 +54 (Argentina)</option>
            <option value="+51">🇵🇪 +51 (Perú)</option>
            <option value="+591">🇧🇴 +591 (Bolivia)</option>
            <option value="+593">🇪🇨 +593 (Ecuador)</option>
          </select>

          <input
            type="text"
            placeholder="Teléfono (9 dígitos)"
            className="w-2/3 border border-gray-300 p-2 rounded"
            value={telefono}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, "");
              if (value.length <= 9) {
                setTelefono(value);
              }
            }}
            required
          />
        </div>

        <input
          type="email"
          placeholder="Correo Electrónico"
          className="w-full border border-gray-300 p-2 rounded"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          className="w-full border border-gray-300 p-2 rounded"
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirmar Contraseña"
          className="w-full border border-gray-300 p-2 rounded"
          value={confirmarContrasena}
          onChange={(e) => setConfirmarContrasena(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
        >
          Registrarse
        </button>

        <p className="text-center text-sm text-gray-500">
          ¿Ya tienes cuenta?{" "}
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="text-blue-600 hover:underline"
          >
            Inicia Sesión
          </button>
        </p>
      </form>
    </div>
  );
};

export default Registro;
